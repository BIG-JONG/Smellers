import React, { useState } from 'react';

interface HeaderProps {
  navigate: (path: string) => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const token = sessionStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  // 검색 로직을 처리하는 함수
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <a
          href="/"
          className="flex items-center text-sm font-bold text-gray-900 px-2 pl-10"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          AromaBase
        </a>
      </div>

      <div className="flex-grow mx-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="향수, 브랜드, 노트, 유저 검색..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-700"
            aria-label="Search"
          />
          <button
            onClick={handleSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex items-center space-x-6 ml-auto">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/mypage/perfumes')}
              className="text-sm text-gray-600 hover:text-black transition-colors duration-200 whitespace-nowrap"
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
              className="text-sm px-2 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-black transition-colors duration-200 whitespace-nowrap"
            >
              로그인
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm px-2 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap"
            >
              회원가입
            </button>
          </>
        )}
        <a href="#" onClick={() => navigate('/mypage/perfumes')} className="text-gray-600 hover:text-black transition-colors duration-200">
          <svg
            className="size-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      </nav>
    </header>
  );
};

export default Header;
