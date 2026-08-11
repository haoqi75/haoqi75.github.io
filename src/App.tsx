// src/App.tsx
import React, { useState, useEffect } from 'react';
import type { User } from './types';
import UserInfo from './components/UserInfo';
import { customContentHTML } from './customContent';
import userData from './data/user.json';
import { useTheme } from './hooks/useTheme';
import './index.css';
import './animation.css';

import { CustomHead } from './customHead';
import { CustomBody } from './customBody';

const App: React.FC = () => {
  const [user] = useState<User>(userData as User);
  const [displayStats, setDisplayStats] = useState({ repos: 0, followers: 0, following: 0 });
  const { theme, handleThemeChange } = useTheme();

  // 数字动画效果
  useEffect(() => {
    requestAnimationFrame(() => {
      setDisplayStats({
        repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      });
    });
  }, [user]);

  return (
    <>
    {/* 自定义头部（实际注入到 <head> 中） */}
    <CustomHead />
    
    <div className="app">
      <header>
        <h1>🏠 我的主页面</h1>
        {/* 主题切换按钮组 */}
        <div className="theme-switcher">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            ☀️ 亮色
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            🌙 暗色
          </button>
          <button
            className={`theme-btn ${theme === 'auto' ? 'active' : ''}`}
            onClick={() => handleThemeChange('auto')}
          >
            🔄 自动
          </button>
          <a href="/repo.html" className="theme-btn">📂 查看所有仓库</a>
        </div>
      </header>
      <main>
        <div className="profile-content">
          <UserInfo user={user} displayStats={displayStats} />
          
          <div className="custom-content-section">
          <h2>📝 自定义内容</h2>
            <div className="custom-content-preview" dangerouslySetInnerHTML={{ __html: customContentHTML }} />
          </div>
        </div>
      </main>
      <footer style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.05)', marginTop: '20px' }}>
        <p>数据由 <a href="https://github.com" target="_blank">GitHub</a> 获取, AI创建, 最后更新: {new Date().toLocaleDateString()}</p>
        <p>使用 <a href="https://github.com/haoqi75/haoqi75.github.io" target="_blank">haoqi75.github.io</a>, 由 ❤ by <a href="https://github.com/haoqi75" target="_blank">haoqi75</a>创建.</p>
      </footer>
    </div>
    {/* 自定义底部（通过 Portal 挂载到 document.body 末尾） */}
    <CustomBody />
    </>
  );
};

export default App;