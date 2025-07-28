import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import LoginPage from './pages/PageLayout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <LoginPage/>
    {/* <PostForm/> */}
  </React.StrictMode>,
);