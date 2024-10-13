import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import './assets/styles/main.scss';
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/board-game-buddy">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);