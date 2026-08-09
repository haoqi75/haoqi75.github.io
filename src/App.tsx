// src/App.tsx
import React, { useState, useEffect } from 'react';
import GithubProfile from './components/GithubProfile';
import './index.css';

type ThemeMode = 'light' | 'dark' | 'auto';

const App: React.FC = () => {
  // 从 localStorage 读取保存的主题，默认为 'auto'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    return saved || 'auto';
  });

  // 实际应用的主题（'light' 或 'dark'），由当前系统主题和用户选择共同决定
  const [appliedTheme, setAppliedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 检测系统主题
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

    // 更新实际应用的主题
    const updateAppliedTheme = () => {
      if (theme === 'auto') {
        setAppliedTheme(getSystemTheme());
      } else {
        setAppliedTheme(theme);
      }
    };

    updateAppliedTheme();

    // 监听系统主题变化（只在 auto 模式下需要更新）
    const handleSystemChange = () => {
      if (theme === 'auto') {
        setAppliedTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  // 将实际主题应用到 document 的 data-theme 属性
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appliedTheme);
  }, [appliedTheme]);

  // 切换主题并保存
  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
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
        </div>
      </header>
      <main>
        <GithubProfile />
      </main>
      <footer>
        <p>Data provided by <a href="https://github.com" target="_blank">GitHub</a></p>
      </footer>
    </div>
  );
};

export default App;