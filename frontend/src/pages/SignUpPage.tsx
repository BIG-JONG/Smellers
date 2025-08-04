import React from 'react';
import Layout from '@/components/Layout';
import SignupForm from '@/components/signupForm';

const SignUpPage: React.FC = () => {
  return (
    <Layout>
      <div className="">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignUpPage;
