import React from 'react';

// Header 컴포넌트의 props 타입 정의
interface HeaderProps {
  navigate: (path: string) => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  const handleProfileClick = () => {
    navigate('/mypage'); // 실제 마이페이지 경로로 변경 필요
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* 1. 로고 영역 */}
      <div className="flex items-center">
        {/* 클릭하면 홈 페이지로 이동하는 링크입니다. */}
        <a
          href="/"
          className="flex items-center text-sm font-bold text-gray-900 px-2 pl-10" // 글자 스타일 여기서 지정
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          AromaBase
        </a>
      </div>

      {/* 2. 검색창 영역 */}
      <div className="flex-grow mx-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="향수, 브랜드, 노트, 유저 검색..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-700"
            aria-label="Search"
          />
          {/* 검색 아이콘 (SVG) */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
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
        </div>
      </div>

      {/* 3. 내비게이션 링크 및 사용자 액션 영역 */}
      <nav className="flex items-center space-x-6 ml-auto">
        {/* 로그인 버튼 */}
        <button
          onClick={handleLoginClick} // 클릭 시 로그인 페이지로 이동
          className="text-sm text-gray-600 hover:text-black transition-colors duration-200 whitespace-nowrap"
        >
          로그인
        </button>
        {/* 회원가입 버튼 */}
        <button
          onClick={handleRegisterClick} // 클릭 시 회원가입 페이지로 이동
          className="text-sm px-2 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap"
        >
          회원가입
        </button>

        {/* 프로필 아이콘 (SVG) */}
        <a href="#" onClick={handleProfileClick} className="text-gray-600 hover:text-black transition-colors duration-200">
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