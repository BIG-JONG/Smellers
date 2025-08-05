import { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 1. 필요한 공통 컴포넌트들 import
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

// 2. 각 페이지 컴포넌트들 import
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

// 3. 새로 만든 검색 결과 페이지 import
import SearchResultsPage from './pages/SearchResultsPage'; 
import Faq from './components/Faq';

// AppContent 컴포넌트를 Router로 감싸기 위해 별도로 정의
function AppContent() {
  const navigate = useNavigate();

  // Header에서 navigate만 사용
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  // Header는 자체적으로 사이드바 상태를 관리
  const toggleSidebar = useCallback(() => {
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 이제 Header에 navigate 함수만 전달합니다. */}
      <Header
        navigate={handleNavigate}
        toggleSidebar={toggleSidebar}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/mypage/info-update" element={<UserInfoUpdatePage />} />
          <Route path="/mypage/perfumes" element={<MyPerfumeListPage />} />
          
          <Route path="/perfume/create" element={<PostPerfumePage />} />
          <Route path="/perfume/edit/:id" element={<PostPerfumePage />} />
          
          <Route path="/perfumes" element={<PerfumeListPage />} />
          <Route path="/follow" element={<FollowListPage />} />
          <Route path="/perfumes/:id" element={<PerfumeDetailPage />} />

          <Route path="/user/:nickname" element={<UserPerfumeListPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/faq" element={<Faq />} />
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