import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">July 2024 - Dec 2025</span>
            <h3 className="timeline-role">Software Development Engineer I (SDE I)</h3>
            <h4 className="timeline-company">Pearl Org. - Dehradun, UK</h4>
            
            <div className="timeline-content">
              <div className="responsibility-group">
                <div className="responsibility-title">Backend Development</div>
                <ul className="responsibility-list">
                  <li>Spearhead the development of scalable backend applications using Java, Spring Boot, Hibernate.</li>
                  <li>Collaborate with global clients to translate business needs into robust technical solutions, reducing project turnaround time by 30%.</li>
                  <li>Optimize database performance by implementing efficient indexing, query optimization, and caching.</li>
                </ul>
              </div>

              <div className="responsibility-group">
                <div className="responsibility-title">API Development</div>
                <ul className="responsibility-list">
                  <li>Design and implement RESTful APIs for payment processing and hotel booking systems, improving response times by 40%.</li>
                  <li>Build a society management solution covering modules for rent, bills, parking, and Employee Management.</li>
                  <li>Integrate authentication mechanisms via OAuth, JWT, and Spring Security for secure API access.</li>
                </ul>
              </div>

              <div className="responsibility-group">
                <div className="responsibility-title">Application Deployment & DevOps</div>
                <ul className="responsibility-list">
                  <li>Deploy and manage applications on Linux-based servers using Nginx, Apache, and AWS (EC2, S3, LightSail), maintaining 95% uptime.</li>
                  <li>Implement Docker-based containerization, improving deployment efficiency by 50%.</li>
                  <li>Use Nginx built-in load balancing services and Amazon Amplify for deployments.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
