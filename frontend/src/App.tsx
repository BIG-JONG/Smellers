// frontend/src/App.tsx
// 이 파일은 React 애플리케이션의 메인 컴포넌트이며,
// 웹사이트의 공통 레이아웃(Header, Sidebar, Footer)을 구성하고
// 경로에 따라 다른 페이지 컴포넌트를 렌더링합니다.

import React, { useState, useEffect } from 'react';

// 공통 레이아웃 컴포넌트 임포트
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
// Footer 컴포넌트의 코드가 제공되지 않았으므로, 임시로 간단한 Footer를 가정합니다.
// 실제 Footer 컴포넌트가 있다면 해당 파일을 임포트하고 사용하세요.
// import Footer from '@/components/Footer';

// 페이지 컴포넌트 임포트
import LoginPage from '@/pages/LogInPage';
// 향후 다른 페이지 컴포넌트들을 여기에 임포트할 수 있습니다.
// import PublicPerfumeListPage from '@/pages/PublicPerfumeListPage';
// import MyPage from '@/pages/MyPage';

function App() {
  // --- 사이드바 열림/닫힘 상태 관리 ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 열기 핸들러 (햄버거 아이콘에 마우스 진입 시)
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  // 사이드바 닫기 핸들러 (사이드바 영역에서 마우스 이탈 시)
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // --- 기본적인 페이지 라우팅 상태 관리 ---
  // 현재 URL 경로를 상태로 관리하여 페이지 컴포넌트 렌더링을 제어합니다.
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // URL이 변경될 때마다 currentPath 상태를 업데이트합니다.
  // 실제 애플리케이션에서는 react-router-dom과 같은 라우팅 라이브러리를 사용합니다.
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
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // --- 현재 경로에 따라 렌더링할 페이지 컴포넌트 결정 ---
  let PageContentComponent;
  switch (currentPath) {
    case '/login':
      PageContentComponent = <LoginPage navigate={navigate} />;
      break;
    // 향후 다른 경로에 대한 페이지 컴포넌트를 추가할 수 있습니다.
    // case '/':
    //   PageContentComponent = <PublicPerfumeListPage navigate={navigate} />;
    //   break;
    // case '/mypage':
    //   PageContentComponent = <MyPage navigate={navigate} />;
    //   break;
    default:
      // 기본적으로 보여줄 내용 (예: 메인 페이지 또는 임시 테스트 콘텐츠)
      PageContentComponent = (
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            환영합니다, AromaBase입니다!
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            이곳은 메인 콘텐츠 영역입니다.
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
      <Header />

      {/* 2. 사이드바와 메인 콘텐츠 영역을 담는 컨테이너 */}
      <div className="flex flex-grow">
        {/* 2.1. 햄버거 메뉴 아이콘 (사이드바 토글용) */}
        {/* 마우스 진입 시 사이드바를 열고, 마우스 이탈 시 사이드바가 닫히도록 Sidebar 컴포넌트에서 처리합니다. */}
        <div
          className="fixed top-[72px] left-4 z-50 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          onMouseEnter={handleOpenSidebar} // 마우스 진입 시 사이드바 열기
        >
          {/* 햄버거 아이콘 (SVG) */}
          <svg
            className="size-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        {/* 2.2. 사이드바 컴포넌트 */}
        {/* isSidebarOpen 상태에 따라 열리고 닫히며, onMouseLeave로 닫힙니다. */}
        <Sidebar
          isOpen={isSidebarOpen} // 사이드바 열림 상태 전달
          onMouseLeave={handleCloseSidebar} // 사이드바 영역에서 마우스 이탈 시 닫기
        />

        {/* 2.3. 메인 콘텐츠 영역 */}
        {/* 사이드바가 열리면 메인 콘텐츠가 밀려나도록 마진을 동적으로 적용합니다. */}
        <main
          className={`flex-grow flex flex-col items-center p-8 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {PageContentComponent} {/* 현재 경로에 해당하는 페이지 컴포넌트가 렌더링됩니다. */}
        </main>
      </div>

      {/* 3. 푸터 컴포넌트 (항상 하단에 표시) */}
      {/* 실제 Footer 컴포넌트가 있다면 여기에 임포트하여 사용하세요. */}
      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; 2025 AromaBase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
