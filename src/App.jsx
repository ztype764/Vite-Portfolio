import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero/Hero';
import Stats from './components/sections/Stats/Stats';
import About from './components/sections/About/About';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import Experience from './components/sections/Experience/Experience';
import Contact from './components/sections/Contact/Contact';
import GamesHub from './components/games/GamesHub';

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

      {/* Floating Game Trigger Button & Dedicated Arcade View */}
      <GamesHub />
    </>
  );
}

export default App;
