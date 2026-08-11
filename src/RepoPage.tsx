// src/RepoPage.tsx
import React, { useState, useEffect } from 'react';
import RepositoryList from './components/RepositoryList';
import type { Repository } from './types';
import { useTheme } from './hooks/useTheme';
import './index.css';
import './animation.css';

const GITHUB_USERNAME = 'haoqi75';

const RepoPage: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, handleThemeChange } = useTheme();

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`);
        if (!res.ok) {
          if (res.status === 403) throw new Error('API rate limit exceeded. Please try again later.');
          throw new Error(`GitHub API error: ${res.status}`);
        }
        const data: Repository[] = await res.json();
        setRepos(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>📂 我的仓库</h1>
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
          <a href="/" className="theme-btn">🏠 回到主页</a>
        </div>
      </header>
      <main>
        <div className="profile-content">
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loading">加载仓库中...</div>
          ) : (
            <>
              <h2>全部仓库（共 {repos.length} 个）</h2>
              <RepositoryList repos={repos} />
            </>
          )}
        </div>
      </main>
      <footer>
        <p>数据实时来自 GitHub API · 当前时间: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default RepoPage;