import React, { useCallback, useState } from 'react'; // useState 임포트
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 1. 필요한 공통 컴포넌트들을 import 합니다.
import Header from './components/Header';
import Layout from './components/Layout'; // Layout 컴포넌트
import Footer from './components/Footer';

// 2. 각 페이지 컴포넌트들을 import 합니다.
import LoginPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import UserInfoUpdatePage from './pages/UserInfoUpdatePage'; // 개인정보 수정
import MyPerfumeListPage from './pages/MyPerfumeListPage'; // 마이페이지 (내가 등록한 향수 목록)
import PostPerfumePage from './pages/PostPerfumePage'; // 향수 등록
import UserPerfumeListPage from './pages/UserPerfumeListPage'; // 게시판 (전체 사람들이 올린 글)
import FollowListPage from './pages/FollowListPage'; // 팔로잉 리스트
import PerfumeDetailPage from './pages/PerfumeDetailPage'; // PerfumeDetailPage 임포트

import MainPage from './pages/MainPage'; // 메인 페이지 

// AppContent 컴포넌트를 Router로 감싸기 위해 별도로 정의
function AppContent() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 열림/닫힘 상태

  // 사이드바 토글 함수
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  // 사이드바 닫기 함수 (마우스 이탈 시 사용)
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    closeSidebar(); // 페이지 이동 시 사이드바 닫기
  }, [navigate, closeSidebar]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header는 항상 상단에 고정 */}
      {/* Header에 사이드바 토글 함수를 전달합니다. */}
      <Header
        navigate={handleNavigate}
        toggleSidebar={toggleSidebar}
      />
      {/* Layout 컴포넌트 내부에서 Sidebar를 렌더링하고 isOpen 상태를 관리해야 합니다. */}
      {/* Layout 컴포넌트에서 isSidebarOpen과 onSidebarMouseLeave를 prop으로 받도록 정의되어 있어야 합니다. */}
      <Layout isSidebarOpen={isSidebarOpen} onSidebarMouseLeave={closeSidebar}>
        <Routes>
          {/* 임시 메인 페이지 대신 실제 메인 페이지 컴포넌트를 렌더링합니다. */}
          <Route path="/" element={<MainPage />} /> {/* <TempHomePage /> 대신 <MainPage /> 사용 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 페이지들의 Route를 추가합니다. */}
          <Route path="/mypage/info-update" element={<UserInfoUpdatePage />} /> {/* 개인정보 수정 */}
          <Route path="/mypage/perfumes" element={<MyPerfumeListPage />} /> {/* 마이페이지 (내가 등록한 향수 목록) */}
          <Route path="/perfume/create" element={<PostPerfumePage />} /> {/* 향수 등록 */}
          <Route path="/perfumes" element={<UserPerfumeListPage />} /> {/* 게시판 (전체 사람들이 올린 글) */}
          <Route path="/follow" element={<FollowListPage />} /> {/* 팔로잉 리스트 */}

          {/* PerfumeDetailPage 라우트를 추가합니다. */}
          <Route path="/perfumes/:id" element={<PerfumeDetailPage />} />
        </Routes>
      </Layout>

      {/* Footer는 모든 페이지에 공통으로 나타나도록 Routes 바깥에 배치 */}
      <Footer className="mt-auto" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
