
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import UserProfileSection from "@/components/UserProfileSection";
import Pagination from "@/components/Pagination";

// User 타입 인터페이스를 정의합니다.
// 이 인터페이스를 정의해서 TypeScript가 데이터 구조를 명확히 알 수 있도록 합니다.
interface User {
  nickname: string;
  email: string;
  isFollowing: boolean;
}

const FollowListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 상태 변수에 User[] 타입 명시
  const [followingUsers, setFollowingUsers] = useState<User[]>([
    {
      nickname: 'testUser',
      email: 'test@gmail.com',
      isFollowing: true,
    },
    {
      nickname: 'testUser2',
      email: 'test2@gmail.com',
      isFollowing: true,
    },
  ]);

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
  
  // searchTerm에 따라 필터링된 유저 목록을 만듭니다.
  // 이 부분이 에러를 해결하는 핵심입니다.
  const filteredUsers = followingUsers.filter(user =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredUsers.map(user => (
          <UserProfileSection
            key={user.nickname}
            profileImageUrl="https://placehold.co/40x40"
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
      
      <Pagination/>
    </div>
  );
};

export default FollowListPage;