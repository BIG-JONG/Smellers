// frontend/src/App.tsx

import React, { useState, useEffect } from 'react';

// 공통 레이아웃 컴포넌트 임포트
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

// 페이지 컴포넌트 임포트 (대소문자 일치 확인)
import LoginPage from '@/pages/LogInPage'; // LogInPage -> LoginPage로 변경
import SignupPage from '@/pages/SignUpPage'; // SignUpPage -> SignupPage로 변경

function App() {
  // --- 사이드바 열림/닫힘 상태 관리 ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 열기 핸들러
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  // 사이드바 닫기 핸들러
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // --- 기본적인 페이지 라우팅 상태 관리 ---
  // 현재 URL 경로를 상태로 관리합니다. 기본값은 '/login'으로 설정합니다.
  const [currentPath, setCurrentPath] = useState(window.location.pathname === '/' ? '/login' : window.location.pathname);

  // URL이 변경될 때마다 currentPath 상태를 업데이트합니다.
  // 브라우저의 뒤로가기/앞으로가기 버튼 동작을 감지합니다.
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 페이지 이동 함수: URL을 변경하고 currentPath 상태를 업데이트합니다.
  // 이 함수는 모든 페이지 컴포넌트에 prop으로 전달됩니다.
  const navigate = (path: string) => {
    if (window.location.pathname !== path) { // 현재 경로와 다를 때만 이동
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  // --- 현재 경로에 따라 렌더링할 페이지 컴포넌트 결정 ---
  let PageContentComponent;
  switch (currentPath) {
    case '/login':
      PageContentComponent = <LoginPage navigate={navigate} />; // navigate prop 전달
      break;
    case '/signup':
      PageContentComponent = <SignupPage navigate={navigate} />; // navigate prop 전달
      break;
    default:
      // 정의되지 않은 경로일 경우 로그인 페이지로 리다이렉트
      // 또는 404 페이지를 렌더링할 수 있습니다. 여기서는 로그인 페이지로 이동합니다.
      PageContentComponent = (
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            페이지를 찾을 수 없습니다 (404)
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            요청하신 페이지를 찾을 수 없습니다. 로그인 페이지로 이동합니다.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
          >
            로그인 페이지로 이동
          </button>
        </div>
      );
      break;
  }

  return (
    // 전체 애플리케이션 컨테이너: flexbox를 사용하여 세로로 정렬합니다.
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
      {/* 1. 헤더 컴포넌트 (항상 상단에 표시) */}
      <Header navigate={navigate} onSidebarToggle={handleOpenSidebar} /> {/* navigate와 onSidebarToggle prop 전달 */}

      {/* 2. 사이드바와 메인 콘텐츠 영역을 담는 컨테이너 */}
      <div className="flex flex-grow">
        {/* 2.1. 햄버거 메뉴 아이콘 (사이드바 토글용) */}
        {/* 이 div는 Header 컴포넌트 안으로 이동했습니다. */}
        {/* <div
          className="fixed top-[72px] left-4 z-50 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          onMouseEnter={handleOpenSidebar}
        >
          <svg
            className="size-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div> */}

        {/* 2.2. 사이드바 컴포넌트 */}
        <Sidebar
          isOpen={isSidebarOpen}
          onMouseLeave={handleCloseSidebar}
          navigate={navigate} // navigate prop 전달
        />

        {/* 2.3. 메인 콘텐츠 영역 */}
        <main
          className={`flex-grow flex flex-col items-center p-8 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {PageContentComponent}
        </main>
      </div>

      {/* 3. 푸터 컴포넌트 (항상 하단에 표시) */}
      <Footer />
    </div>
  );
}

export default App;
