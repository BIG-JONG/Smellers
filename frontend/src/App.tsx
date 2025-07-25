import React, { useState } from 'react';

// 공통 레이아웃 컴포넌트 임포트
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar'; // Sidebar (소문자 b)로 임포트

// 테스트할 복합 컴포넌트 임포트
import PerfumeListSection from '@/components/PerfumeListSection';

function App() {
  // PerfumeListSection에 전달할 임시 향수 데이터
  const [perfumes, setPerfumes] = useState([
    {
      id: 'p1',
      image: 'https://img.vogue.co.kr/vogue/2024/12/style_67618e13dd977-1050x1400.jpg',
      productName: '퍼퓸 이브닝글로우',
      price: '130,000',
      ingredient: ['로즈', '라즈베리', '머스크'],
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 'p2',
      image: 'https://placehold.co/300x400/FFDDC1/000000?text=Citrus+Dream',
      productName: '시트러스 드림',
      price: '95,000',
      ingredient: ['레몬', '베르가못', '샌달우드'],
      rating: 3.8,
      reviews: 80,
    },
    {
      id: 'p3',
      image: 'https://placehold.co/300x400/C1FFDD/000000?text=Woody+Forest',
      productName: '우디 포레스트',
      price: '150,000',
      ingredient: ['시더우드', '베티버', '앰버'],
      rating: 4.2,
      reviews: 150,
    },
    {
      id: 'p4',
      image: 'https://placehold.co/300x400/D1C1FF/000000?text=Floral+Blossom',
      productName: '플로럴 블라썸',
      price: '110,000',
      ingredient: ['자스민', '튜베로즈', '바닐라'],
      rating: 4.7,
      reviews: 200,
    },
    {
      id: 'p5',
      image: 'https://placehold.co/300x400/FFC1D1/000000?text=Ocean+Breeze',
      productName: '오션 브리즈',
      price: '80,000',
      ingredient: ['바다내음', '민트', '머스크'],
      rating: 3.9,
      reviews: 90,
    },
    {
      id: 'p6',
      image: 'https://placehold.co/300x400/C1D1FF/000000?text=Spicy+Night',
      productName: '스파이시 나이트',
      price: '140,000',
      ingredient: ['시나몬', '정향', '가죽'],
      rating: 4.1,
      reviews: 110,
    },
    {
      id: 'p7',
      image: 'https://placehold.co/300x400/D1FFC1/000000?text=Green+Garden',
      productName: '그린 가든',
      price: '100,000',
      ingredient: ['풀잎', '장미', '이끼'],
      rating: 4.0,
      reviews: 70,
    },
    {
      id: 'p8',
      image: 'https://placehold.co/300x400/FFC1C1/000000?text=Musk+Mystery',
      productName: '머스크 미스터리',
      price: '160,000',
      ingredient: ['화이트 머스크', '앰버', '샌달우드'],
      rating: 4.9,
      reviews: 250,
    },
  ]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 3; // 'totalPages' 대신 'totalPage'로 통일 (Pagination 컴포넌트와 일치)

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    console.log(`페이지 ${page}로 이동합니다.`);
    setCurrentPage(page);
  };

  // 향수 카드 클릭 핸들러
  const handlePerfumeClick = (perfumeId: string) => {
    console.log(`향수 ID: ${perfumeId} 클릭! 상세 페이지로 이동할 예정입니다.`);
  };

  // --- 사이드바 상태 관리 ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 열기 (햄버거 아이콘에 마우스 진입 시)
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  // 사이드바 닫기 (사이드바 영역에서 마우스 이탈 시)
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
      {/* 1. 헤더 컴포넌트 */}
      <Header />

      {/* 2. 사이드바와 메인 콘텐츠를 담는 컨테이너 */}
      <div className="flex flex-grow">
        {/* 2.1. 햄버거 메뉴 아이콘 - 마우스 진입 시 사이드바 열기 */}
        <div
          className="fixed top-[72px] left-4 z-50 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          onMouseEnter={handleOpenSidebar}
        >
          {/* 햄버거 아이콘 (SVG) */}
          <svg
            className="size-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        {/* 2.2. 사이드바 컴포넌트 - isSidebarOpen 상태에 따라 열리고, 마우스 이탈 시 닫힘 */}
        <Sidebar
          isOpen={isSidebarOpen}
          onMouseLeave={handleCloseSidebar}
        />

        {/* 2.3. 메인 콘텐츠 영역 - PerfumeListSection 테스트 */}
        <main className="flex-grow flex flex-col items-center p-8 space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            PerfumeListSection 단독 테스트 페이지
          </h1>

          {/* PerfumeListSection 컴포넌트 렌더링 */}
          <PerfumeListSection
            title="최신 향수 기록"
            perfumes={perfumes}
            currentPage={currentPage}
            totalPage={totalPage} // <-- 'totalPages' 대신 'totalPage'로 전달
            onPageChange={handlePageChange}
            onPerfumeClick={handlePerfumeClick}
          />

        </main>
      </div>
      {/* 푸터 컴포넌트 (선택 사항) */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
