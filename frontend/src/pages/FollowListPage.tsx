
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import UserProfileSection from "@/components/UserProfileSection";
import Pagination from "@/components/Pagination";
import axios from "axios";

interface RawUserData {
  followerId: number;
  createdAt: string;
  updatedAt: string;
  followed: {
    nickname: string;
    email: string;
    profileImg: string | null;
    userStatus: "Y" | "N";
  };
}
interface User {
  nickname: string;
  email: string;
  profileImageUrl: string;
  isFollowing: boolean;
}

const mapRawDataToUser = (rawData: RawUserData[]): User[] => {
  return rawData.map(item => ({
    nickname: item.followed.nickname,
    email: item.followed.email,
    profileImageUrl: item.followed.profileImg || 'https://placehold.co/40x40',
    isFollowing: true,
  }));
};


const FollowListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const userIdString = sessionStorage.getItem('user_id');

        if (!token || !userIdString) throw new Error('로그인이 필요, 토큰 없음');
        const userId = JSON.parse(userIdString);
        console.log('userId:', userId);

        const res = await axios.get(`http://localhost:4000/following/userList/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const mappedUsers = mapRawDataToUser(res.data.data);
        console.log(res.data.data)
        setFollowingUsers(mappedUsers);
      } catch (error) {
        console.error('팔로잉 리스트 받아오기 실패', error);
      }
    };
    fetchFollowingUsers();
  }, []);

  const handleFollowToggle = useCallback((targetNickname: string) => {
    setFollowingUsers(prevUsers =>
      prevUsers.map(user =>
        user.nickname === targetNickname
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  }, []);

  const handleUserClick = useCallback((nickname: string) => {
    navigate(`/user/${nickname}`);
  }, [navigate]);
  
  // searchTerm에 따라 필터링된 유저 목록
  const filteredUsers = followingUsers.filter(user =>
    user.nickname && user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // 페이지네이션에 따른 아이템 슬라이스
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedUsers = filteredUsers.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPage = Math.ceil(filteredUsers.length / pageSize);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-10">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {pagedUsers.map(user => (
          <UserProfileSection
            key={user.nickname}
            profileImageUrl={user.profileImageUrl}
            nickname={user.nickname}
            email={user.email}
            isCurrentUser={false}
            isFollowing={user.isFollowing}
            onFollow={() => handleFollowToggle(user.nickname)}
            onUnfollow={() => handleFollowToggle(user.nickname)}
            onProfileClick={() => handleUserClick(user.nickname)}
          />
        ))}
      </div>
      
      <Pagination
        pageSize={pageSize}
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FollowListPage;