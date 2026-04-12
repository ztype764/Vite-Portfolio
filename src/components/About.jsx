import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I am a skilled <strong>Backend Engineer</strong> with a deep understanding of Java, Spring Boot,
              and API development. I also possess a foundational understanding of front-end development,
              allowing me to work effectively across the stack when needed.
            </p>
            <p>
              My goal is to secure a challenging software engineering role where I can apply my
              expertise in building scalable backend systems, optimizing database performance,
              and contributing to high-impact projects.
            </p>
          </div>
          
          <div className="about-details">
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <span className="detail-value">Ali Umar</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">aliumar764@gmail.com</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">+91-7300567667</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Education</span>
              <span className="detail-value">B.Tech, IIMT College of Engineering (2020-2024)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
