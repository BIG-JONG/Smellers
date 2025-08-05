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

// 3. 검색 결과 페이지들 import
import SearchResultsPage from './pages/SearchResultsPage';
import UserSearchResultsPage from './pages/UserSearchPage'; // 유저 검색 결과 페이지를 추가했습니다.

// AppContent 컴포넌트를 Router로 감싸기 위해 별도로 정의
function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header에 navigate 함수만 전달하고, toggleSidebar는 제거했습니다. */}
      <Header
        navigate={handleNavigate}
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
          
          {/* 향수 검색 페이지 라우트 */}
          <Route path="/search" element={<SearchResultsPage />} />
          
          {/* 유저 검색 페이지 라우트 - 이 부분을 추가했습니다. */}
          <Route path="/search/user" element={<UserSearchResultsPage />} />
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