import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/styles/main.scss';
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);