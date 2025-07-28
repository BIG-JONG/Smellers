// PageLayout.tsx
import { useState } from 'react';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

function PageLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <Layout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        {/* form 추가 영역 */}
        <LoginForm />
      </Layout>
      <Footer
        className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      />
    </>
  );
}

export default PageLayout;
