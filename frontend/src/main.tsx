import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import Button from './components/Button.js';
import Textarea from './components/Textarea';
import Dropdown from './components/Dropdown';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Button/>
    <br/>
    <Textarea/>
    <Dropdown/>
  </React.StrictMode>,
);