// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './index.css'; // 전역 CSS 임포트는 유지
=======
// import App from './App';
import './index.css';
import PostForm from './components/PostForm';
>>>>>>> ac7335835e3b0d473cd901dea106ea7b69758df2

// ⭐️ 단독 테스트하고 싶은 컴포넌트와 필요한 인터페이스를 임포트합니다.
// 경로가 정확한지 다시 한번 확인해주세요: components 폴더 안에 PerfumeDetailSection이 있습니다.
import PerfumeDetailSection, { PerfumeDetailData } from './components/PerfumeDetailSection';

// 테스트를 위한 목업 데이터를 여기에 직접 정의합니다.
// (PerfumeDetailSection에 필요한 데이터)
const mockPerfumeDetail: PerfumeDetailData = {
  id: 'perfume-detail-001',
  imageUrl: 'https://img.vogue.co.kr/vogue/2024/12/style_67618e13dd977-1050x1400.jpg',
  name: '블랑 쉬폰 오 드 퍼퓸',
  brand: '딥 디크',
  price: 133000,
  topNotes: ['레몬', '베르가못', '핑크 페퍼'],
  middleNotes: ['장미', '재스민', '네롤리'],
  baseNotes: ['샌달우드', '머스크', '바닐라'],
  emotionTags: ['우아한', '차분한', '고급스러운'],
  customTags: ['데일리', '가을향수', '선물용'],
  rating: 4.7,
  description: '맑고 투명한 쉬폰처럼 부드럽게 감싸는 플로럴 머스크 향수입니다. 섬세한 꽃잎과 포근한 머스크가 조화롭게 어우러져 은은하면서도 깊이 있는 잔향을 남깁니다.',
};

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* ⭐️ LoginPage 대신 PerfumeDetailSection을 직접 렌더링합니다. */}
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* 단독 테스트임을 알리는 간단한 제목 */}
      <h1 style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: '#333' }}>
        PerfumeDetailSection 단독 테스트 모드
      </h1>
      <PerfumeDetailSection perfume={mockPerfumeDetail} />
    </div>
=======
    {/* <App /> */}
    <PostForm/>
>>>>>>> ac7335835e3b0d473cd901dea106ea7b69758df2
  </React.StrictMode>,
);