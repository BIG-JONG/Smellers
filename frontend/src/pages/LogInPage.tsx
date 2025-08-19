import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout shortPage bottomPadding={152} >
      <div className="flex flex-col items-center w-full pt-0">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;