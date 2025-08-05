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
        userId: number;
        nickname: string;
        email: string;
        profileImg: string | null;
        userStatus: "Y" | "N";
    };
}

interface User {
    userId: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
    isFollowing: boolean;
}

const mapRawDataToUser = (rawData: RawUserData[]): User[] => {
    return rawData.map(item => ({
        userId: item.followed.userId,
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

                const res = await axios.get(`http://localhost:4000/following/userList/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const mappedUsers = mapRawDataToUser(res.data.data).map(user => ({
                    ...user,
                    profileImageUrl: user.profileImageUrl
                        ? `http://localhost:4000/uploads/${user.profileImageUrl}`
                        : 'https://placehold.co/40x40'
                }));

                setFollowingUsers(mappedUsers);
            } catch (error) {
                console.error('팔로잉 리스트 받아오기 실패', error);
            }
        };
        fetchFollowingUsers();
    }, []);

    const handleFollowToggle = useCallback((targetUserId: number) => {
        setFollowingUsers(prevUsers =>
            prevUsers.map(user =>
                user.userId === targetUserId
                    ? { ...user, isFollowing: !user.isFollowing }
                    : user
            )
        );
    }, []);

    const handleUserClick = useCallback((nickname: string, userId: number) => {
        navigate(`/user/${nickname}?userId=${userId}`);
    }, [navigate]);

    const filteredUsers = followingUsers.filter(user =>
        user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedUsers = filteredUsers.slice(startIndex, endIndex);
    const totalPage = Math.ceil(filteredUsers.length / pageSize);

    return (
        <div className="mt-10">
            {/* --- */}
            {/* ⭐ max-w-[200px]를 max-w-[280px]로 변경 ⭐ */}
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-[280px]">
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="유저 닉네임 검색"
                    />
                </div>
            </div>
            {/* --- */}

            <div className="space-y-4">
                {pagedUsers.map(user => (
                    <UserProfileSection
                        key={user.nickname}
                        profileImageUrl={user.profileImageUrl}
                        nickname={user.nickname}
                        email={user.email}
                        isCurrentUser={false}
                        isFollowing={user.isFollowing}
                        onFollow={() => handleFollowToggle(user.userId)}
                        onUnfollow={() => handleFollowToggle(user.userId)}
                        onProfileClick={() => handleUserClick(user.nickname, user.userId)}
                    />
                ))}
            </div>

            <Pagination
                pageSize={pageSize}
                totalPage={totalPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default FollowListPage;