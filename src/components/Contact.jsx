import React from 'react';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <p className="contact-description">
            I am currently looking for a challenging backend engineering role. My inbox is always open. Whether you have a question or just want to say hi, I will try my best to get back to you!
          </p>
          <a href="mailto:aliumar764@gmail.com" className="btn-primary contact-btn">
            <Mail size={20} /> Say Hello
          </a>
        </div>

        <footer className="footer">
          <div className="social-links">
            <a href="https://github.com/ztype764" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/aliumarz" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="tel:+917300567667" className="social-link" aria-label="Phone">
              <Phone size={24} />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Ali Umar. Built with React & Vite.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
