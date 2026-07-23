import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <section className="stats-section section" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">1.5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">10+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">1</div>
            <div className="stat-label">Industry Certification</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
