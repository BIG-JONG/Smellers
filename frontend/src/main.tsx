import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.tsx가 동일 폴더(src)에 있으므로 './App'이 맞습니다.
import './index.css'; // index.css도 동일 폴더(src)에 있으므로 './index.css'가 맞습니다.

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <App /> {/* 메인 애플리케이션 컴포넌트를 렌더링합니다. */}
  </React.StrictMode>,
);