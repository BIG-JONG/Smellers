import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import UserProfileSection from "@/components/UserProfileSection";
import Pagination from "@/components/Pagination";
import axios from "axios";
import Alert from '@/components/Alert';
import Layout from "@/components/Layout";

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
    const [isFollowActionLoading, setIsFollowActionLoading] = useState(false);
    const pageSize = 20;
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
    const [alertMessage, setAlertMessage] = useState("");

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
                setAlertType("success");
                setAlertMessage("언팔로우가 되엇습니다.")
                setShowAlert(true);

                setTimeout(() => {
                setFollowingUsers(prevUsers => prevUsers.filter(user => user.userId !== targetUserId));
                setShowAlert(false); 
            }, );

            } else {
                await axios.post(`http://localhost:4000/following/userRegister/${targetUserId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAlertType("success");
                setAlertMessage("팔로우 되었습니다.");
            }

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        } catch (error) {
            setAlertType("error");
            setAlertMessage("작업에 실패했습니다. 다시 시도해주세요.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } finally {
            setIsFollowActionLoading(false);
          
        }
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
        <Layout>
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
        {pagedUsers.length > 0 ? (
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
        ) : (
        <div className="text-center text-gray-500 py-10">
            <p>결과가 없습니다.</p>
        </div>
        )}
        {showAlert && (
            <div className="mt-4">
                <Alert message={alertMessage} type={alertType} />
            </div>
        )}
         {filteredUsers.length > 0 && (
            <Pagination
                pageSize={pageSize}
                totalPage={totalPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        )}
        </div>
        </Layout>
    );
};

export default FollowListPage;