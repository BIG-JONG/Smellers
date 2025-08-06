import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import UserProfileSection from "@/components/UserProfileSection";
import Pagination from "@/components/Pagination";
import axios from "axios";

// API 응답 데이터 형식을 위한 인터페이스
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

// 컴포넌트에서 사용할 사용자 데이터 형식
interface User {
    userId: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
    isFollowing: boolean;
}

// API 응답 데이터를 `User` 타입으로 변환하는 헬퍼 함수
const mapRawDataToUser = (rawData: RawUserData[]): User[] => {
    return rawData.map(item => ({
        userId: item.followed.userId,
        nickname: item.followed.nickname,
        email: item.followed.email,
        profileImageUrl: item.followed.profileImg || 'https://placehold.co/40x40',
        isFollowing: true, // 초기 상태는 '팔로잉' 리스트이므로 항상 true
    }));
};

const FollowListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [followingUsers, setFollowingUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFollowActionLoading, setIsFollowActionLoading] = useState(false);
    const pageSize = 18;
    const navigate = useNavigate();

    // 팔로잉 유저 목록을 불러오는 비동기 함수
    const fetchFollowingUsers = useCallback(async () => {
        try {
            const token = sessionStorage.getItem('token');
            const userIdString = sessionStorage.getItem('user_id');

            if (!token || !userIdString) {
                throw new Error('로그인이 필요합니다. 토큰이 없습니다.');
            }
            const userId = JSON.parse(userIdString);

            const res = await axios.get(`http://localhost:4000/following/userList/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 프로필 이미지 URL을 완성하고 상태 업데이트
            const mappedUsers = mapRawDataToUser(res.data.data).map(user => ({
                ...user,
                profileImageUrl: user.profileImageUrl
                    ? `http://localhost:4000/uploads/${user.profileImageUrl}`
                    : 'https://placehold.co/40x40'
            }));
            setFollowingUsers(mappedUsers);
        } catch (error) {
            console.error('팔로잉 리스트를 가져오지 못했습니다.', error);
        }
    }, []);

    useEffect(() => {
        fetchFollowingUsers();
    }, [fetchFollowingUsers]);

    // 팔로우/언팔로우 API를 호출하는 함수
    const handleFollowToggle = useCallback(async (targetUserId: number, isCurrentlyFollowing: boolean) => {
        setIsFollowActionLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('로그인이 필요합니다.');
            }

            if (isCurrentlyFollowing) {
                await axios.get(`http://localhost:4000/following/unfollow/${targetUserId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { userId: targetUserId }
                });
                alert('언팔로우 되었습니다.');

                // 수정된 부분: 언팔로우 성공 시 해당 사용자를 리스트에서 제거
                setFollowingUsers(prevUsers => prevUsers.filter(user => user.userId !== targetUserId));
            } else {
                // 팔로우 API 호출
                await axios.post(`http://localhost:4000/following/userRegister/${targetUserId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('팔로우 되었습니다.');

                // 팔로우 성공 시 해당 사용자를 리스트에 추가하는 로직은 이 페이지에서는 필요하지 않습니다.
            }

        } catch (error) {
            console.error('팔로우/언팔로우 실패:', error);
            alert('작업에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsFollowActionLoading(false);
        }
    }, []);

    // 유저 프로필 클릭 시 상세 페이지로 이동하는 함수
    const handleUserClick = useCallback((nickname: string, userId: number) => {
        navigate(`/user/${nickname}?userId=${userId}`);
    }, [navigate]);

    // 검색어에 따라 유저 목록 필터링
    const filteredUsers = followingUsers.filter(user =>
        user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션 로직
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedUsers = filteredUsers.slice(startIndex, endIndex);
    const totalPage = Math.ceil(filteredUsers.length / pageSize);

    return (
        <div className="mt-10">
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-[280px]">
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="유저 닉네임 검색"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {pagedUsers.map(user => (
                    <UserProfileSection
                        key={user.userId}
                        profileImageUrl={user.profileImageUrl}
                        nickname={user.nickname}
                        email={user.email}
                        isCurrentUser={false}
                        isFollowing={user.isFollowing}
                        isFollowActionLoading={isFollowActionLoading}
                        onFollow={() => handleFollowToggle(user.userId, false)}
                        onUnfollow={() => handleFollowToggle(user.userId, true)}
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