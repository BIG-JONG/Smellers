import React, { useState } from 'react';

interface HeaderProps {
  navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('perfume');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = sessionStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.trim(); 
      if (searchType === 'user') {
        navigate(`/search/user?q=${query}`);
      } else {
        navigate(`/search?q=${query}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTypeSelect = (type: string) => {
    setSearchType(type);
    setIsDropdownOpen(false);
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

      <div className="flex-grow mx-8 max-w-md flex items-center">
        {/* 검색 입력창과 드롭다운을 감싸는 컨테이너 */}
        <div className="flex items-center w-full relative bg-gray-100 rounded-full border border-gray-300">
          {/* 드롭다운 버튼 */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center h-10 px-4 text-sm text-gray-600 rounded-l-full bg-gray-100 border-r border-gray-300 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
            >
              {searchType === 'perfume' ? '향수' : '유저'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleTypeSelect('perfume')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  향수
                </button>
                <button
                  onClick={() => handleTypeSelect('user')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  유저
                </button>
              </div>
            )}
          </div>

          {/* 검색 입력창 */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={searchType === 'perfume' ? '향수 검색...' : '유저 닉네임 검색...'}
              className="w-full h-10 py-2 pl-10 pr-4 bg-gray-100 rounded-r-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-700"
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
              className="text-sm px-4 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap"
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
              className="text-sm px-4 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap"
            >
              회원가입
            </button>
          </>
        )}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/mypage/perfumes');
          }}
          className="text-gray-600 hover:text-black transition-colors duration-200"
        >
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
