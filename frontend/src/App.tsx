import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 1. 필요한 공통 컴포넌트들을 import 합니다.
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

// 2. 각 페이지 컴포넌트들을 import 합니다.
import LoginPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import UserInfoUpdatePage from './pages/UserInfoUpdatePage';
import MyPerfumeListPage from './pages/MyPerfumeListPage';
import PostPerfumePage from './pages/PostPerfumePage';
import UserPerfumeListPage from './pages/UserPerfumeListPage';
import FollowListPage from './pages/FollowListPage';
import PerfumeDetailPage from './pages/PerfumeDetailPage';
import MainPage from './pages/MainPage';
import PerfumeListPage from './pages/PerfumeListPage';

// AppContent 컴포넌트를 Router로 감싸기 위해 별도로 정의
function AppContent() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <Header
        navigate={handleNavigate}
        toggleSidebar={toggleSidebar}
      />
      <Layout isSidebarOpen={isSidebarOpen} onSidebarMouseLeave={closeSidebar}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage/info-update" element={<UserInfoUpdatePage />} />
          <Route path="/mypage/perfumes" element={<MyPerfumeListPage />} />
          <Route path="/perfume/create" element={<PostPerfumePage />} />
          <Route path="/perfumes" element={<PerfumeListPage />} />
          <Route path="/follow" element={<FollowListPage />} />
          <Route path="/perfumes/:id" element={<PerfumeDetailPage />} />
          
          <Route path="/user/:nickname" element={<UserPerfumeListPage />} />
        </Routes>
      </Layout>
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