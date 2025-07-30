import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-full pt-0">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;