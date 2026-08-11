// src/components/UserInfo.tsx
import React from 'react';
import type { User } from '../types';

interface Props {
  user: User;
  displayStats: { repos: number; followers: number; following: number };
}

const UserInfo: React.FC<Props> = ({ user, displayStats }) => {
  return (
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
          <span>📦 <span className="stat-number">{displayStats.repos}</span> repos</span>
          <span>👥 <span className="stat-number">{displayStats.followers}</span> followers</span>
          <span>👤 <span className="stat-number">{displayStats.following}</span> following</span>
        </div>
        <div className="links">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">GitHub</a>
          {user.blog && <a href={user.blog} target="_blank" rel="noopener noreferrer">Website</a>}
          {user.twitter_username && (
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;