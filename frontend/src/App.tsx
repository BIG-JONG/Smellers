import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 1. 필요한 공통 컴포넌트들을 import 합니다.
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

// 2. 각 페이지 컴포넌트들을 import 합니다.
import LoginPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';


// 임시 메인 페이지 컴포넌트 (백지 현상 방지용)
const TempHomePage = () => (
  <div className="text-center py-20 text-xl text-gray-700">
    <p>환영합니다! 이곳은 메인 페이지입니다.</p>
    <p>사이드바 토글 버튼은 좌측 상단에 있습니다.</p>
  </div>
);


// AppContent 컴포넌트를 Router로 감싸기 위해 별도로 정의
function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        navigate={handleNavigate}
      />

      {/* Layout은 이제 자체적으로 사이드바 상태를 관리합니다. */}
      <Layout>
        <Routes>
          <Route path="/" element={<TempHomePage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 다른 페이지들도 필요에 따라 Route를 추가합니다. */}
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