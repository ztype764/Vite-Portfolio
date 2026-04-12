import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Set default theme to dark
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (!currentTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </main>
      <Contact />
    </>
  );
}

export default App;
