import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <a href="#" className="logo">
          Ali<span>.</span>Umar
        </a>
        
        <nav className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="#contact" className="btn-primary d-none-sm">Hire Me</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
