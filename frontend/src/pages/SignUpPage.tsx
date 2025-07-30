import React from 'react';
import Layout from '@/components/Layout';
import SignupForm from '@/components/SignupForm';

const SignUpPage: React.FC = () => {
  const handleSignupSuccess = (navigateFunction: (path: string) => void) => {
    navigateFunction('/login');
    console.log('회원가입 성공! 로그인 페이지로 이동합니다.');
  };

  const handleNavigateToLogin = (navigateFunction: (path: string) => void) => {
    navigateFunction('/login');
    console.log('로그인 페이지로 이동합니다.');
  };

  return (
    <Layout>
      <div className="">
        <SignupForm
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={handleNavigateToLogin}
        />
      </div>
    </Layout>
  );
};

export default SignUpPage;