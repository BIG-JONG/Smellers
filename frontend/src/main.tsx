// frontend/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import PostForm from '../src/components/PostForm';
import './index.css';



const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <React.StrictMode>
    <PostForm />
  </React.StrictMode>,
);