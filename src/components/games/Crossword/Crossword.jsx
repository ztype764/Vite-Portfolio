import React, { useState, useEffect, useRef } from 'react';
import {
  Puzzle, CheckCircle2, RotateCcw, Lightbulb, Eye,
  Sparkles, Award, HelpCircle, ArrowRight, Volume2, VolumeX, Shuffle
} from 'lucide-react';
import { generateCustomCrossword } from '../../../data/crosswordGenerator';
import './Crossword.css';

// Web Audio Synthesizer for Crossword
class CrosswordAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playKeyPress() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) { }
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25];
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const startTime = this.ctx.currentTime + i * 0.09;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) { }
  }
}

const audio = new CrosswordAudio();

const Crossword = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(() => generateCustomCrossword(10));
  const N = currentPuzzle.gridSize;

  // Grid Maps
  const [solutionMap, setSolutionMap] = useState({});
  const [cellNumberMap, setCellNumberMap] = useState({});
  const [playableCells, setPlayableCells] = useState(new Set());

  // User Inputs & Verification State
  const [userInputs, setUserInputs] = useState({});
  const [cellStatus, setCellStatus] = useState({}); // 'correct' | 'incorrect' | 'revealed'

  // Navigation
  const [activeCell, setActiveCell] = useState(null); // { r, c }
  const [direction, setDirection] = useState('ACROSS'); // 'ACROSS' | 'DOWN'

  // Progress & Stats
  const [score, setScore] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState('');

  const containerRef = useRef(null);
  const clueRefs = useRef({});
  const lastScrolledWordIdRef = useRef(null);

  // Generate a brand new custom crossword from all 3 topics
  const handleGenerateNewPuzzle = () => {
    const newPuzzle = generateCustomCrossword(10);
    setCurrentPuzzle(newPuzzle);
  };

  // Initialize board state whenever currentPuzzle changes
  useEffect(() => {
    const sol = {};
    const nums = {};
    const playable = new Set();
    const initInputs = {};

    currentPuzzle.words.forEach(w => {
      const { row, col, answer, direction, number } = w;
      nums[`${row}-${col}`] = number;

      for (let i = 0; i < answer.length; i++) {
        const r = direction === 'ACROSS' ? row : row + i;
        const c = direction === 'ACROSS' ? col + i : col;
        const key = `${r}-${c}`;
        sol[key] = answer[i].toUpperCase();
        playable.add(key);
        initInputs[key] = '';
      }
    });

    setSolutionMap(sol);
    setCellNumberMap(nums);
    setPlayableCells(playable);
    setUserInputs(initInputs);
    setCellStatus({});
    setIsSolved(false);
    setScore(0);
    setMessage('');
    lastScrolledWordIdRef.current = null;

    // Default focus first word
    const firstWord = currentPuzzle.words[0];
    if (firstWord) {
      setActiveCell({ r: firstWord.row, c: firstWord.col });
      setDirection(firstWord.direction);
    }
  }, [currentPuzzle]);

  // Scroll active clue into view only when the active word changes
  useEffect(() => {
    const activeWord = getActiveWord();
    if (activeWord && activeWord.id !== lastScrolledWordIdRef.current) {
      lastScrolledWordIdRef.current = activeWord.id;
      if (clueRefs.current[activeWord.id]) {
        clueRefs.current[activeWord.id].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeCell, direction]);

  // Helper: Get cells belonging to a word
  const getWordCells = (word) => {
    const cells = [];
    for (let i = 0; i < word.answer.length; i++) {
      const r = word.direction === 'ACROSS' ? word.row : word.row + i;
      const c = word.direction === 'ACROSS' ? word.col + i : word.col;
      cells.push({ r, c, key: `${r}-${c}` });
    }
    return cells;
  };

  // Helper: Check if cell belongs to a word
  const isCellInWord = (r, c, word) => {
    return getWordCells(word).some(cell => cell.r === r && cell.c === c);
  };

  // Helper: Get currently active word object
  const getActiveWord = () => {
    if (!activeCell) return null;

    let word = currentPuzzle.words.find(
      w => w.direction === direction && isCellInWord(activeCell.r, activeCell.c, w)
    );

    if (!word) {
      word = currentPuzzle.words.find(
        w => w.direction !== direction && isCellInWord(activeCell.r, activeCell.c, w)
      );
    }

    return word;
  };

  // Cell selection & direction toggle
  const handleCellClick = (r, c) => {
    const key = `${r}-${c}`;
    if (!playableCells.has(key)) return;

    if (activeCell && activeCell.r === r && activeCell.c === c) {
      setDirection(prev => (prev === 'ACROSS' ? 'DOWN' : 'ACROSS'));
    } else {
      setActiveCell({ r, c });
      const hasAcross = currentPuzzle.words.some(w => w.direction === 'ACROSS' && isCellInWord(r, c, w));
      const hasDown = currentPuzzle.words.some(w => w.direction === 'DOWN' && isCellInWord(r, c, w));

      if (direction === 'ACROSS' && !hasAcross && hasDown) {
        setDirection('DOWN');
      } else if (direction === 'DOWN' && !hasDown && hasAcross) {
        setDirection('ACROSS');
      }
    }

    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  // Move focus along active word or next word
  const advanceToNextCell = () => {
    const word = getActiveWord();
    if (!word || !activeCell) return;

    const cells = getWordCells(word);
    const currIdx = cells.findIndex(cell => cell.r === activeCell.r && cell.c === activeCell.c);

    if (currIdx >= 0 && currIdx < cells.length - 1) {
      const nextCell = cells[currIdx + 1];
      setActiveCell({ r: nextCell.r, c: nextCell.c });
    } else {
      const wordList = currentPuzzle.words;
      const currentWordIdx = wordList.findIndex(w => w.id === word.id);
      const nextWord = wordList[(currentWordIdx + 1) % wordList.length];
      if (nextWord) {
        setActiveCell({ r: nextWord.row, c: nextWord.col });
        setDirection(nextWord.direction);
      }
    }
  };

  // Move focus backwards on backspace
  const retreatToPrevCell = () => {
    const word = getActiveWord();
    if (!word || !activeCell) return;

    const cells = getWordCells(word);
    const currIdx = cells.findIndex(cell => cell.r === activeCell.r && cell.c === activeCell.c);

    if (currIdx > 0) {
      const prevCell = cells[currIdx - 1];
      setActiveCell({ r: prevCell.r, c: prevCell.c });
      setUserInputs(prev => ({ ...prev, [`${prevCell.r}-${prevCell.c}`]: '' }));
    }
  };

  // Virtual Keyboard Handler for Mobile/Touch
  const handleVirtualKey = (key) => {
    if (!activeCell) return;
    handleKeyDown({ key, preventDefault: () => { } });
  };

  // Keyboard handler on container
  const handleKeyDown = (e) => {
    if (!activeCell) return;
    const { r, c } = activeCell;
    const key = e.key;

    if (key === 'ArrowRight') {
      e.preventDefault();
      setDirection('ACROSS');
      if (playableCells.has(`${r}-${c + 1}`)) setActiveCell({ r, c: c + 1 });
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      setDirection('ACROSS');
      if (playableCells.has(`${r}-${c - 1}`)) setActiveCell({ r, c: c - 1 });
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      setDirection('DOWN');
      if (playableCells.has(`${r + 1}-${c}`)) setActiveCell({ r: r + 1, c });
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      setDirection('DOWN');
      if (playableCells.has(`${r - 1}-${c}`)) setActiveCell({ r: r - 1, c });
    } else if (key === 'Backspace') {
      e.preventDefault();
      const currentKey = `${r}-${c}`;
      if (userInputs[currentKey]) {
        setUserInputs(prev => ({ ...prev, [currentKey]: '' }));
        setCellStatus(prev => ({ ...prev, [currentKey]: undefined }));
      } else {
        retreatToPrevCell();
      }
    } else if (key === 'Tab' || key === 'Enter') {
      e.preventDefault();
      advanceToNextCell();
    } else if (/^[a-zA-Z]$/.test(key)) {
      e.preventDefault();
      const letter = key.toUpperCase();
      const currentKey = `${r}-${c}`;

      const nextInputs = { ...userInputs, [currentKey]: letter };
      setUserInputs(nextInputs);
      audio.playKeyPress();

      const allFilled = Array.from(playableCells).every(k => !!nextInputs[k]);

      if (allFilled) {
        const statusMap = {};
        let correct = 0;
        const total = playableCells.size;

        playableCells.forEach(k => {
          const inp = nextInputs[k];
          const sol = solutionMap[k];
          if (inp === sol) {
            statusMap[k] = 'correct';
            correct++;
          } else {
            statusMap[k] = 'incorrect';
          }
        });

        setCellStatus(statusMap);
        const calculatedScore = Math.round((correct / total) * 100);
        setScore(calculatedScore);

        if (correct === total) {
          setIsSolved(true);
          setMessage('🎉 Outstanding! You know me better than the 99% of visitors!');
          audio.playVictory();
        } else {
          setMessage(`Crossword filled! Incorrect letters are shown in red. You can continue editing or click Check Answers.`);
        }
      } else {
        setCellStatus(prev => ({ ...prev, [currentKey]: undefined }));
      }

      advanceToNextCell();
    }
  };

  // Handle clue click in sidebar
  const handleClueClick = (word) => {
    setActiveCell({ r: word.row, c: word.col });
    setDirection(word.direction);
    if (containerRef.current) containerRef.current.focus();
  };

  // Check answers
  const handleCheck = () => {
    const statusMap = {};
    let correct = 0;
    const total = playableCells.size;

    playableCells.forEach(key => {
      const input = userInputs[key];
      const sol = solutionMap[key];

      if (input === sol) {
        statusMap[key] = 'correct';
        correct++;
      } else if (input && input !== sol) {
        statusMap[key] = 'incorrect';
      }
    });

    setCellStatus(statusMap);
    const calculatedScore = Math.round((correct / total) * 100);
    setScore(calculatedScore);

    if (correct === total) {
      setIsSolved(true);
      setMessage('🎉 Brilliant! You solved the entire crossword!');
      audio.playVictory();
    } else {
      setMessage(`Checked! ${correct}/${total} letters correct (${calculatedScore}%).`);
    }
  };

  // Hint: reveal current cell letter
  const handleRevealCell = () => {
    if (!activeCell) return;
    const key = `${activeCell.r}-${activeCell.c}`;
    const sol = solutionMap[key];
    if (sol) {
      setUserInputs(prev => ({ ...prev, [key]: sol }));
      setCellStatus(prev => ({ ...prev, [key]: 'revealed' }));
    }
  };

  // Reveal entire puzzle
  const handleRevealAll = () => {
    const newInputs = {};
    const newStatus = {};
    playableCells.forEach(key => {
      newInputs[key] = solutionMap[key];
      newStatus[key] = 'revealed';
    });
    setUserInputs(newInputs);
    setCellStatus(newStatus);
    setIsSolved(true);
    setScore(100);
    setMessage('Puzzle revealed!');
    audio.playVictory();
  };

  // Reset board
  const handleReset = () => {
    const newInputs = {};
    playableCells.forEach(key => {
      newInputs[key] = '';
    });
    setUserInputs(newInputs);
    setCellStatus({});
    setIsSolved(false);
    setScore(0);
    setMessage('Board reset. Take your best shot!');
  };

  const activeWord = getActiveWord();

  return (
    <section id="crossword" className="crossword-section section">
      <div className="container">

        {/* Title */}
        <div className="section-header">
          <div className="section-title-wrapper">
            <Puzzle className="section-title-icon" size={32} />
            <h2 className="section-title">Interactive Skills Crossword</h2>
          </div>
          <p className="section-subtitle">
            First-person clues straight from Me! Let's see how much do you know about me.
          </p>
        </div>

        {/* Dynamic Generator Action Bar */}
        <div className="puzzle-generator-bar">
          <button className="btn-generator-new" onClick={handleGenerateNewPuzzle}>
            <Shuffle size={18} />
            <span>Generate New Mixed Crossword</span>
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="puzzle-status-bar">
          <div className="status-info">
            <span className="current-topic-tag">{currentPuzzle.title}</span>
            {score > 0 && <span className="score-badge">🏆 Score: {score}%</span>}
          </div>

          <div className="action-buttons-group">
            <button className="btn-action check-btn" onClick={handleCheck}>
              <CheckCircle2 size={16} />
              <span>Check Answers</span>
            </button>
            <button className="btn-action hint-btn" onClick={handleRevealCell}>
              <Lightbulb size={16} />
              <span>Reveal Letter</span>
            </button>
            <button className="btn-action reveal-btn" onClick={handleRevealAll}>
              <Eye size={16} />
              <span>Reveal All</span>
            </button>
            <button className="btn-action reset-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {message && (
          <div className={`feedback-banner ${isSolved ? 'success' : 'info'}`}>
            <span>{message}</span>
          </div>
        )}

        {/* Active Clue Bar Header */}
        {activeWord && (
          <div className="active-clue-bar">
            <span className="active-clue-label">
              {activeWord.number} {activeWord.direction}:
            </span>
            <span className="active-clue-text">"{activeWord.clue}"</span>
          </div>
        )}

        {/* Main Workspace */}
        <div
          className="crossword-workspace"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={handleKeyDown}
        >

          {/* Board Container */}
          <div className="grid-container">
            <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
              {Array.from({ length: N }).map((_, r) =>
                Array.from({ length: N }).map((_, c) => {
                  const key = `${r}-${c}`;
                  const isPlayable = playableCells.has(key);
                  const number = cellNumberMap[key];
                  const val = userInputs[key] || '';
                  const status = cellStatus[key];

                  const isSelected = activeCell?.r === r && activeCell?.c === c;
                  const isWordActive = activeWord && isCellInWord(r, c, activeWord);
                  const isSameLine = activeCell && (r === activeCell.r || c === activeCell.c);

                  if (!isPlayable) {
                    return <div key={key} className="crossword-cell cell-black"></div>;
                  }

                  let cellClass = 'crossword-cell cell-white';
                  if (isSameLine) cellClass += ' cell-line';
                  if (isWordActive) cellClass += ' cell-word-active';
                  if (isSelected) cellClass += ' cell-active';

                  if (status === 'correct') cellClass += ' cell-correct';
                  if (status === 'incorrect') cellClass += ' cell-incorrect';
                  if (status === 'revealed') cellClass += ' cell-revealed';

                  return (
                    <div
                      key={key}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {number && <span className="cell-number">{number}</span>}
                      <span className="cell-val">{val}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* On-Screen Mobile Virtual Keypad */}
            <div className="crossword-virtual-keypad">
              <div className="keypad-row">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                  <button key={k} className="vk-btn" type="button" onClick={() => handleVirtualKey(k)}>{k}</button>
                ))}
              </div>
              <div className="keypad-row">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(k => (
                  <button key={k} className="vk-btn" type="button" onClick={() => handleVirtualKey(k)}>{k}</button>
                ))}
              </div>
              <div className="keypad-row">
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(k => (
                  <button key={k} className="vk-btn" type="button" onClick={() => handleVirtualKey(k)}>{k}</button>
                ))}
                <button className="vk-btn vk-backspace" type="button" onClick={() => handleVirtualKey('Backspace')}>⌫</button>
              </div>
            </div>
          </div>

          {/* Clues Sidebar */}
          <div className="clues-sidebar">

            {/* Across Clues */}
            <div className="clues-column">
              <h3 className="clues-header">Across</h3>
              <div className="clues-list">
                {currentPuzzle.words
                  .filter(w => w.direction === 'ACROSS')
                  .map(w => {
                    const isActive = activeWord?.id === w.id;

                    return (
                      <div
                        key={w.id}
                        ref={el => (clueRefs.current[w.id] = el)}
                        className={`clue-item ${isActive ? 'active-clue' : ''}`}
                        onClick={() => handleClueClick(w)}
                      >
                        <span className="clue-number">{w.number}.</span>
                        <div className="clue-body">
                          <p className="clue-text">"{w.clue}"</p>
                          <span className="clue-tag">{w.category} • ({w.answer.length} letters)</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Down Clues */}
            <div className="clues-column">
              <h3 className="clues-header">Down</h3>
              <div className="clues-list">
                {currentPuzzle.words
                  .filter(w => w.direction === 'DOWN')
                  .map(w => {
                    const isActive = activeWord?.id === w.id;

                    return (
                      <div
                        key={w.id}
                        ref={el => (clueRefs.current[w.id] = el)}
                        className={`clue-item ${isActive ? 'active-clue' : ''}`}
                        onClick={() => handleClueClick(w)}
                      >
                        <span className="clue-number">{w.number}.</span>
                        <div className="clue-body">
                          <p className="clue-text">"{w.clue}"</p>
                          <span className="clue-tag">{w.category} • ({w.answer.length} letters)</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Crossword;
