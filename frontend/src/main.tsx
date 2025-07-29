// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 메인 애플리케이션 컴포넌트 임포트 (가정)
import './index.css'; // 전역 CSS 임포트는 유지

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App /> {/* 메인 애플리케이션 컴포넌트를 렌더링합니다. */}
  </React.StrictMode>,
);