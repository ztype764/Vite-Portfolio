import React from 'react';
import { Server, Database, Cloud, Code } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="category-title"><Code size={24} /> Languages & Frameworks</h3>
            <div className="skill-list">
              <span className="skill-badge">Java</span>
              <span className="skill-badge">SQL</span>
              <span className="skill-badge">Spring Boot</span>
              <span className="skill-badge">Hibernate</span>
              <span className="skill-badge">JPA</span>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title"><Database size={24} /> Databases & APIs</h3>
            <div className="skill-list">
              <span className="skill-badge">MySQL</span>
              <span className="skill-badge">PostgreSQL</span>
              <span className="skill-badge">RESTful APIs</span>
              <span className="skill-badge">OAuth</span>
              <span className="skill-badge">JWT</span>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title"><Cloud size={24} /> DevOps & Cloud</h3>
            <div className="skill-list">
              <span className="skill-badge">Docker</span>
              <span className="skill-badge">AWS (EC2, S3)</span>
              <span className="skill-badge">Nginx</span>
              <span className="skill-badge">CI/CD</span>
              <span className="skill-badge">GitHub Actions</span>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title"><Server size={24} /> Version Control Ops</h3>
            <div className="skill-list">
              <span className="skill-badge">Git</span>
              <span className="skill-badge">Linux</span>
              <span className="skill-badge">Apache</span>
              <span className="skill-badge">Load Balancing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
