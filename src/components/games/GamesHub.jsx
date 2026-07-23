import React, { useState, useEffect } from 'react';
import { Gamepad2, X, ArrowLeft, Puzzle, Palette, Sparkles } from 'lucide-react';
import Crossword from './Crossword/Crossword';
import Sudoku from './Sudoku/Sudoku';
import './GamesHub.css';

const GamesHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState('crossword'); // 'crossword' | 'sudoku'

  // Disable body scrolling when Games Hub is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openHub = (game = 'crossword') => {
    setActiveGame(game);
    setIsOpen(true);
  };

  const closeHub = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-left on Desktop, Bottom-right on Mobile) */}
      <button
        className="floating-game-btn"
        onClick={() => openHub('crossword')}
        aria-label="Arcade Games"
      >
        <div className="btn-icon-wrapper">
          <Gamepad2 size={24} className="gamepad-icon" />
        </div>
      </button>

      {/* Dedicated Viewport Overlay for Games Page */}
      {isOpen && (
        <div className="games-hub-overlay">
          {/* Top Bar Header */}
          <header className="games-hub-header">
            <div className="container header-content">

              <button className="back-portfolio-btn" onClick={closeHub}>
                <ArrowLeft size={18} />
                <span>Back to Portfolio</span>
              </button>

              <div className="hub-title-container">
                <Gamepad2 size={22} className="title-icon" />
                <h1 className="hub-title">Arcade & Skill Games</h1>
              </div>

              {/* Game Selector Tabs */}
              <div className="game-selector-tabs">
                <button
                  className={`game-tab-btn ${activeGame === 'crossword' ? 'active' : ''}`}
                  onClick={() => setActiveGame('crossword')}
                >
                  <Puzzle size={16} />
                  <span>Skills Crossword</span>
                </button>

                <button
                  className={`game-tab-btn ${activeGame === 'sudoku' ? 'active' : ''}`}
                  onClick={() => setActiveGame('sudoku')}
                >
                  <Palette size={16} />
                  <span>Claymation Sudoku</span>
                </button>
              </div>

              <button className="close-hub-btn" onClick={closeHub} aria-label="Close Games">
                <X size={24} />
              </button>

            </div>
          </header>

          {/* Main Games Body Container */}
          <main className="games-hub-body">
            {activeGame === 'crossword' && <Crossword />}
            {activeGame === 'sudoku' && <Sudoku />}
          </main>
        </div>
      )}
    </>
  );
};

export default GamesHub;
