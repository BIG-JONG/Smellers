import { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'flowbite'

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

import SearchResultsPage from './pages/SearchResultsPage';
import UserSearchResultsPage from './pages/UserSearchPage'; // 유저 검색 결과 페이지를 추가했습니다.
import Faq from './components/Faq';
import ScrollTop from './components/ScrollTop';

function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  return (
    <div className="flex flex-col  min-h-screen">
      <Header
        navigate={handleNavigate}
      />
        <ScrollTop/>
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
          <Route path="/faq" element={<Faq />} />
          
          <Route path="/search" element={<SearchResultsPage />} />
          
          <Route path="/search/user" element={<UserSearchResultsPage />} />
        </Routes>
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