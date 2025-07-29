import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 전역 스타일시트 (Tailwind CSS 설정 포함) 임포트
import App from './App'; // 우리의 메인 애플리케이션 컴포넌트 임포트

// HTML 파일의 'root' ID를 가진 요소를 찾아 React 앱을 마운트할 컨테이너로 지정
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// root 컨테이너에 App 컴포넌트를 렌더링
root.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트가 여기서 DOM에 렌더링됩니다. */}
  </React.StrictMode>
);
