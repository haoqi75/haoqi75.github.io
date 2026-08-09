// src/components/GithubProfile.tsx
import React, { useState, useEffect } from 'react';
import type { User, Repository } from '../types';
import RepositoryList from './RepositoryList';
import { customContentHTML } from '../customContent';

const GITHUB_USERNAME = 'haoqi75';

const GithubProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 新增：用于数字动画的显示状态
  const [displayStats, setDisplayStats] = useState({ repos: 0, followers: 0, following: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) {
          if (userRes.status === 404) throw new Error('User not found');
          throw new Error(`GitHub API error: ${userRes.status}`);
        }
        const userData: User = await userRes.json();
        setUser(userData);

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
        );
        if (!reposRes.ok) throw new Error('Failed to fetch repositories');
        const reposData: Repository[] = await reposRes.json();
        setRepos(reposData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 当 user 数据更新时，触发展示数字从 0 到目标值的过渡
  useEffect(() => {
    if (user) {
      requestAnimationFrame(() => {
        setDisplayStats({
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        });
      });
    }
  }, [user]);

  return (
    <div className="github-profile">
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        user && (
          <div className="profile-content">
            <div className="user-header">
              <div className="avatar-wrapper">
                <img src={user.avatar_url} alt={user.login} className="avatar" />
                <div className="avatar-ring"></div>
              </div>
              <div className="user-info">
                <h1>{user.name || user.login}</h1>
                <p className="login">@{user.login}</p>
                {user.bio && <p className="bio">{user.bio}</p>}
                <div className="stats">
                  <span>📦 <span className="stat-number">{displayStats.repos}</span> repos (仓库)</span>
                  <span>👥 <span className="stat-number">{displayStats.followers}</span> followers (关注者)</span>
                  <span>👤 <span className="stat-number">{displayStats.following}</span> following (关注)</span>
                </div>
                <div className="links">
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  {user.blog && (
                    <a href={user.blog} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  )}
                  {user.twitter_username && (
                    <a
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="custom-content-section">
              <h2>📝 关于我</h2>
              <div
                className="custom-content-preview"
                dangerouslySetInnerHTML={{ __html: customContentHTML }}
              />
            </div>

            <h2>📂 近期仓库</h2>
            <RepositoryList repos={repos} />
          </div>
        )
      )}
    </div>
  );
};

export default GithubProfile;