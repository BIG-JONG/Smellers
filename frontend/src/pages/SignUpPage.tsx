import React from 'react';
import SignUpForm from '@/components/signupForm'; // SignUpForm 임포트 (대소문자 확인)

interface SignUpPageProps {
  // App.tsx에서 전달받을 페이지 이동 함수 (라우팅을 위해 필요)
  navigate: (path: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ navigate }) => {
  // 회원가입 성공 시 실행될 함수
  const handleSignUpSuccess = () => {
    // 회원가입 성공 시 로그인 페이지로 이동
    navigate('/login'); // navigate prop을 사용하여 페이지 이동
    console.log('회원가입 성공! 로그인 페이지로 이동합니다.');
  };

  // 로그인 페이지로 이동하는 함수
  const handleNavigateToLogin = () => {
    navigate('/login'); // navigate prop을 사용하여 페이지 이동
    console.log('로그인 페이지로 이동합니다.');
  };

  return (
    // SignUpForm 컴포넌트를 중앙에 배치하기 위한 컨테이너입니다.
    // 이 페이지는 App.tsx의 <main> 태그 안에 렌더링될 것이므로,
    // 여기서 flex-grow나 min-h-screen을 직접 사용하기보다는,
    // SignUpForm 자체가 적절한 크기와 중앙 정렬을 가지도록 합니다.
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      {/* SignUpForm 컴포넌트를 렌더링하고, 필요한 prop들을 전달합니다. */}
      <SignUpForm
        onSignUpSuccess={handleSignUpSuccess}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </div>
  );
};

export default SignUpPage;
