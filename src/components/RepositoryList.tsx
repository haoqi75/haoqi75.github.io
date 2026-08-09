// src/components/RepositoryList.tsx
import React from 'react';
import type { Repository } from '../types';

interface Props {
  repos: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repos }) => {
  if (repos.length === 0) return <p className="no-repos">No repositories found.</p>;

  return (
    <div className="repo-list">
      {repos.slice(0, 10).map((repo) => (
        <div key={repo.id} className="repo-card">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <h3>{repo.name}</h3>
          </a>
          {repo.description && <p>{repo.description}</p>}
          <div className="repo-meta">
            {repo.language && <span className="language">{repo.language}</span>}
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;