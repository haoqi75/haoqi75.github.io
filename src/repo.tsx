// src/repo.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import RepoPage from './RepoPage';
import './index.css';
import './animation.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepoPage />
  </React.StrictMode>
);