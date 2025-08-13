import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

type LayoutProps = {
  children: React.ReactNode;
};

interface UserInfo {
  name: string;
  email: string;
  profileImg?: string;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  const headerHeight = '64px';

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");

    if (storedUserId && token) {
      const fetchUserInfo = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/users/${storedUserId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.data) {
            setUserInfo({
              name: res.data.nickname,
              email: res.data.email,
              profileImg: res.data.profileImg
            });
          }
        } catch (err) {
          console.error("사용자 정보 가져오기 실패:", err);
          setUserInfo(null);
        }
      };
      fetchUserInfo();
    } else {
      setUserInfo(null);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('token');
    setUserInfo(null);
    setIsSidebarOpen(false);
    navigate('/');
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Sidebar
        isOpen={isSidebarOpen}
        className={`fixed top-[${headerHeight}] left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
                    h-[calc(100vh-${headerHeight})]
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:shadow-none lg:h-full lg:top-0`}
        isLoggedIn={!!userInfo}
        user={userInfo || undefined}
        onLogout={handleLogout}
        onMouseLeave={handleSidebarClose}
      />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-700 bg-white hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-inset focus:ring-black"
        aria-label="Toggle sidebar"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <main className={`flex flex-col justify-start items-center px-4 w-full transition-all duration-300
                        flex-grow h-full pt-16`}> 
        {children}
      </main>
    </div>
  );
}

export default Layout;