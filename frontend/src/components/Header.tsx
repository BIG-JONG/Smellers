import React from 'react';

import logoImage from '@/assets/aromabaselogo.png';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* 1. 로고 영역 */}
      <div className="flex items-center">
        {/* 기존 텍스트 로고 대신 이미지 로고로 교체합니다. */}
        {/* 클릭하면 홈 페이지로 이동하는 링크입니다. */}
        <a href="/" className="flex items-center">
          {/* src 속성에 임포트한 logoImage 변수를 사용합니다. */}
          {/* h-8은 이미지의 높이를 조절하는 Tailwind CSS 클래스입니다. 필요에 따라 조절하세요. */}
          <img src={logoImage} alt="AromaBase Logo" className="h-8 mr-2" />
          {/* 기존의 <h1>AromaBase</h1> 텍스트는 이제 필요 없으므로 삭제하거나 주석 처리합니다. */}
        </a>
      </div>

      {/* 2. 검색창 영역 */}
      <div className="flex-grow mx-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="향수, 브랜드, 노트 검색..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
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
      <nav className="flex items-center space-x-6">
        {/* <ul className="flex space-x-6">
          <li>
            <a href="/find-perfume" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap">향수 찾기</a>
          </li>
          <li>
            <a href="/write-review" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap">리뷰 작성</a>
          </li>
          <li>
            <a href="/community" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">커뮤니티</a>
          </li>
        </ul> */}

        <div className="flex items-center space-x-4 ml-6"> {/* 내비게이션과 구분 */}
          {/* 로그인/회원가입 버튼 */}
          <button className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap">로그인</button>
          <button className="text-sm px-2 py-2 bg-black text-white rounded-md hover:bg-black transition-colors duration-200 whitespace-nowrap">회원가입</button>

          {/* 프로필 아이콘 (SVG) */}
          <a href="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
