import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, Star, GitFork, ExternalLink, Globe, Server, 
  ShieldCheck, FileText, Mail, Database, Cpu, CheckCircle2, 
  ChevronLeft, ChevronRight, X, Maximize2 
} from 'lucide-react';
import { featuredProjects } from '../../../data/featuredProjectsData';
import './Projects.css';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active image index for each featured project card
  const [activeImageIndices, setActiveImageIndices] = useState({
    ucf: 0,
    petcare: 0
  });

  // Lightbox modal state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  const githubUsername = 'ztype764';
  const ignoredRepos = ['ztype764', 'Bad_example', 'Portfoli0', 'acadlogs'];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();

        const filteredRepos = data.filter(
          repo => !repo.fork && !ignoredRepos.includes(repo.name)
        );

        setRepos(filteredRepos.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [githubUsername]);

  const handleNextImage = (projectId, totalImages) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }));
  };

  const handlePrevImage = (projectId, totalImages) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalImages) % totalImages
    }));
  };

  const openLightbox = (images, index, title) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      title
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const prevLightboxImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const nextLightboxImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        
        {/* Featured Production Applications */}
        <div className="section-header">
          <h2 className="section-title">Featured Live Projects</h2>
          <p className="section-subtitle">Full-stack production platforms, enterprise backend services, and web applications</p>
        </div>

        <div className="featured-projects-list">
          {featuredProjects.map(project => {
            const currentImgIdx = activeImageIndices[project.id] || 0;
            const currentImg = project.images[currentImgIdx];

            return (
              <div key={project.id} className="featured-card">
                {/* Media Gallery / Preview Column */}
                <div className="featured-media-container">
                  <div className="media-viewport">
                    <img 
                      src={currentImg.src} 
                      alt={currentImg.caption} 
                      className="featured-image"
                      onClick={() => openLightbox(project.images, currentImgIdx, project.title)}
                    />
                    
                    <button 
                      className="zoom-btn"
                      onClick={() => openLightbox(project.images, currentImgIdx, project.title)}
                      aria-label="Enlarge Screenshot"
                      title="Enlarge Screenshot"
                    >
                      <Maximize2 size={18} />
                    </button>

                    {project.images.length > 1 && (
                      <>
                        <button 
                          className="nav-arrow nav-prev"
                          onClick={() => handlePrevImage(project.id, project.images.length)}
                          aria-label="Previous Image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          className="nav-arrow nav-next"
                          onClick={() => handleNextImage(project.id, project.images.length)}
                          aria-label="Next Image"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="image-caption">
                    <span>{currentImg.caption}</span>
                  </div>

                  {/* Thumbnail Row */}
                  {project.images.length > 1 && (
                    <div className="thumbnail-strip">
                      {project.images.map((img, idx) => (
                        <button
                          key={idx}
                          className={`thumbnail-btn ${idx === currentImgIdx ? 'active' : ''}`}
                          onClick={() => setActiveImageIndices(prev => ({ ...prev, [project.id]: idx }))}
                        >
                          <img src={img.src} alt={`Thumbnail ${idx + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technical Information Column */}
                <div className="featured-info-container">
                  <div className="featured-badge-row">
                    <span className="status-pill live-pill">
                      <span className="pulse-dot"></span>
                      {project.status}
                    </span>
                    <span className="category-pill">{project.category}</span>
                  </div>

                  <h3 className="featured-title">
                    {project.title}
                  </h3>

                  <p className="featured-description">{project.description}</p>

                  <div className="highlights-section">
                    <h4 className="highlights-heading">Key Architectural Highlights:</h4>
                    <ul className="highlights-list">
                      {project.highlights.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tech-tags-wrapper">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tech-badge">{tag}</span>
                    ))}
                  </div>

                  <div className="featured-actions">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn primary-btn live-link-btn"
                    >
                      <Globe size={18} />
                      <span>Visit Live Site ({project.domain})</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Open Source Repositories Section */}
        <div className="open-source-header">
          <h3 className="sub-section-title">Open Source Repositories</h3>
          <p className="section-subtitle">Recent public code repositories synced from GitHub</p>
        </div>

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

      {/* Fullscreen Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-title">{lightbox.title}</span>
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>
            
            <div className="lightbox-body">
              <img 
                src={lightbox.images[lightbox.currentIndex]?.src} 
                alt={lightbox.images[lightbox.currentIndex]?.caption} 
                className="lightbox-img"
              />

              {lightbox.images.length > 1 && (
                <>
                  <button className="lightbox-arrow lightbox-prev" onClick={prevLightboxImage}>
                    <ChevronLeft size={32} />
                  </button>
                  <button className="lightbox-arrow lightbox-next" onClick={nextLightboxImage}>
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-footer">
              <span className="lightbox-caption">
                {lightbox.images[lightbox.currentIndex]?.caption}
              </span>
              <span className="lightbox-counter">
                {lightbox.currentIndex + 1} / {lightbox.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

