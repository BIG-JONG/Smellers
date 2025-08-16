import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '@/components/UserProfile';

interface User {
  userId: string;
  nickname: string;
  profileImg: string | null;
}

const UserSearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        setUsers([]);
        return;
      }

      setLoading(true);
      setError(null);
      setUsers([]);
      
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/users/findUser/${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.data && Array.isArray(response.data)) {
          const mappedUsers = response.data.map((item: any) => ({
            userId: item.userId.toString(),
            nickname: item.nickname,
            profileImg: item.profileImg || null,
          }));
          
          setUsers(mappedUsers);
        } else {
          setError("검색 결과 데이터 형식이 올바르지 않습니다.");
          setUsers([]);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
            setError("로그인 세션이 만료");
        } else {
            setError("유저 검색 실패: 백 로직을 확인");
        }
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleUserClick = (userId: string, nickname: string) => {
    navigate(`/user/${nickname}?userId=${userId}`);
  };

  if (loading) {
    return <div className="text-center p-8 text-lg font-medium text-gray-700">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-lg font-medium text-red-500">{error}</div>;
  }
  
  return (
    <div className="pt-[20px] p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">"{query}"에 대한 유저 검색 결과</h1>
      
      {users.length > 0 ? (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserProfile
              key={user.userId}
              nickName={user.nickname}
              userId={user.userId}
              profileImageUrl={user.profileImg ? `http://localhost:4000/uploads/${user.profileImg}` : undefined}
              onClick={() => handleUserClick(user.userId, user.nickname)}
              alt={user.nickname}
              className='flex items-center gap-3 p-2 pl-8 border-b border-gray-200 hover:bg-gray-100 cursor-pointer'
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10 text-lg font-medium">
          유저 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default UserSearchResultsPage;