import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import resumeFile from '../Resume.pdf';
import profilePic from './IMG_20231024_141921_509.jpg';
import './Hero.css';

const roles = [
  "Backend Developer",
  "DevOps Specialist",
  "IoT Developer",
  "Fullstack Developer"
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    const fadeInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFading(false);
      }, 500); // Wait for the fade out to finish before changing text
    }, 3000); // Cycle every 3 seconds

    return () => clearInterval(fadeInterval);
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="greeting">Hi, I'm Ali Umar and I am a</span>
            <h1 className={`headline role-text ${isFading ? 'fade-out' : 'fade-in'}`}>
              {roles[currentRoleIndex]}
            </h1>
            <p className="description">
              Skilled developer with a deep understanding of Java, Spring Boot, Backend development,
              and API architecture. Translating business needs into robust technical solutions.
            </p>
            
            <div className="hero-actions">
              <a href="#experience" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                View Experience <ArrowRight size={18} />
              </a>
              <a href={resumeFile} className="btn-secondary" download="Ali_Umar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download CV <Download size={18} />
              </a>
            </div>

            <div className="tech-stack">
              <span className="tech-title">Tech Stack</span>
              <div className="tech-icons">
                <span className="tech-badge">Java</span>
                <span className="tech-badge">Spring Boot</span>
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">AWS</span>
                <span className="tech-badge">PostgreSQL</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image-container">
            <img src={profilePic} alt="Ali Umar" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
