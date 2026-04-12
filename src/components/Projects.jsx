import React, { useState, useEffect } from 'react';
import { FolderGit2, Star, GitFork, ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using your specific GitHub username
  const githubUsername = 'ztype764';

  // Repositories to exclude from the portfolio
  const ignoredRepos = ['ztype764', 'Bad_example', 'Portfoli0', 'acadlogs'];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();

        // Filter out forked repositories and any ignored repositories
        const filteredRepos = data.filter(
          repo => !repo.fork && !ignoredRepos.includes(repo.name)
        );

        setRepos(filteredRepos.slice(0, 6)); // Ensure we get top recent original repos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [githubUsername]);

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <h2 className="section-title">Open Source Projects</h2>

        {loading && <div className="loading">Loading projects from GitHub...</div>}
        {error && <div className="error-message">Unable to load projects from GitHub: {error}</div>}

        {!loading && !error && (
          <div className="projects-grid">
            {repos.map(repo => (
              <div key={repo.id} className="project-card">
                <div className="project-header">
                  <FolderGit2 size={32} className="project-icon" />
                  <div className="project-links">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-title">
                  {repo.name}
                </a>
                <p className="project-description">
                  {repo.description || 'No description provided for this repository.'}
                </p>
                <div className="project-footer">
                  <div className="project-language">
                    <span className="language-dot"></span>
                    {repo.language || 'Code'}
                  </div>
                  <div className="project-stats">
                    <span className="stat"><Star size={16} /> {repo.stargazers_count}</span>
                    <span className="stat"><GitFork size={16} /> {repo.forks_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
