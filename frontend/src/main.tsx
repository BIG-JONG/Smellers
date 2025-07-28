import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';
import PostForm from './components/PostForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <PostForm/>
  </React.StrictMode>,
);