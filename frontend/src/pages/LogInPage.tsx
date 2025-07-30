import React from 'react';
import LoginForm from '../components/LoginForm'; // LoginForm 컴포넌트 경로

/**
 * 로그인 페이지 컴포넌트
 * 이 페이지는 이제 핵심 로그인 폼만 렌더링하며,
 * Header, Layout (사이드바 포함), Footer는 App.tsx와 같은 상위 컴포넌트에서 관리됩니다.
 */
const LoginPage: React.FC = () => {
  // 사이드바 열림/닫힘 상태는 이제 App.tsx와 같은 상위 컴포넌트에서 관리합니다.
  // 따라서 LoginPage에서는 isSidebarOpen 상태를 제거합니다.

  return (
    // 이 div는 LoginForm을 중앙에 배치하는 역할을 합니다.
    // App.tsx의 <main> 태그 안에 렌더링될 것이므로,
    // flex-grow나 min-h-screen 같은 전체 레이아웃 속성은 App.tsx에서 담당합니다.
    <div className="flex items-center justify-center w-full min-h-full">
      {/* 로그인 폼을 감싸는 흰색 바탕 박스의 크기를 max-w-4xl로 유지합니다. */}
      {/* 이 div는 LoginForm의 시각적인 컨테이너 역할을 합니다. */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
