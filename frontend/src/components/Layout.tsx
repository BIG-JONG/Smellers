// Layout.tsx
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Layout({ children, isSidebarOpen, setIsSidebarOpen }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex">
      {/* 사이드바 */}
      <Sidebar
        isOpen={isSidebarOpen}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none`}
      />

      {/* 햄버거 메뉴 */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-700 bg-white hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-inset focus:ring-black"
        aria-label="Toggle sidebar"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 메인 콘텐츠 */}
      <main className="flex justify-center px-4 w-full max-w-5xl mx-auto mt-28 pt-1 mb-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
