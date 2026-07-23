import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, Sparkles, Volume2, VolumeX, Lightbulb, 
  Trash2, Undo, CheckCircle2, Award, Play 
} from 'lucide-react';
import './Sudoku.css';

// --- Claymation Web Audio Synthesizer ---
class ClayAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playSquish() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.quadraticRampToValueAtTime(550, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playTriumph() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        const startTime = this.ctx.currentTime + idx * 0.1;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch (e) {}
  }
}

// Global audio synthesizer instance
const clayAudio = new ClayAudioSynthesizer();

// --- Sudoku Board Generator Engine ---
const buildEmptyGrid = (size) => Array.from({ length: size }, () => new Array(size).fill(0));
const copyGrid = (grid) => grid.map(row => [...row]);

const isSafeCell = (grid, row, col, num) => {
  const size = grid.length;
  for (let i = 0; i < size; i++) {
    if (grid[row][i] === num && i !== col) return false;
    if (grid[i][col] === num && i !== row) return false;
  }

  let boxRows = 3, boxCols = 3;
  if (size === 6) { boxRows = 2; boxCols = 3; }
  else if (size === 4) { boxRows = 2; boxCols = 2; }

  const startRow = row - (row % boxRows);
  const startCol = col - (col % boxCols);

  for (let i = 0; i < boxRows; i++) {
    for (let j = 0; j < boxCols; j++) {
      const r = startRow + i;
      const c = startCol + j;
      if (grid[r][c] === num && (r !== row || c !== col)) return false;
    }
  }
  return true;
};

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const fillGrid = (grid, size) => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        const nums = shuffleArray(Array.from({ length: size }, (_, i) => i + 1));
        for (const num of nums) {
          if (isSafeCell(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid, size)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateSudokuPuzzle = (size = 9, difficulty = 'easy') => {
  const solution = buildEmptyGrid(size);
  fillGrid(solution, size);

  const puzzle = copyGrid(solution);
  let removeCount = size === 9 ? 38 : size === 6 ? 14 : 6;
  if (difficulty === 'medium') removeCount += 6;
  if (difficulty === 'hard') removeCount += 10;

  let count = removeCount;
  while (count > 0) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      count--;
    }
  }

  return { puzzle, solution };
};

const Sudoku = () => {
  const [boardSize, setBoardSize] = useState(9); // 9x9 or 6x6
  const [difficulty, setDifficulty] = useState('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // State grids
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [userGrid, setUserGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null); // { r, c }
  
  // Game metrics (no strict limit, unlimited guesses)
  const [guessCount, setGuessCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [undoStack, setUndoStack] = useState([]);

  useEffect(() => {
    startNewGame(boardSize, difficulty);
  }, [boardSize, difficulty]);

  const startNewGame = (size = boardSize, diff = difficulty) => {
    const { puzzle, solution } = generateSudokuPuzzle(size, diff);
    setSolutionGrid(solution);
    setInitialGrid(copyGrid(puzzle));
    setUserGrid(copyGrid(puzzle));
    setSelectedCell(null);
    setGuessCount(0);
    setIsCompleted(false);
    setUndoStack([]);
  };

  const handleCellClick = (r, c) => {
    setSelectedCell({ r, c });
    clayAudio.playPop();
  };

  const handleNumberInput = (num) => {
    if (!selectedCell || isCompleted) return;
    const { r, c } = selectedCell;

    // Fixed initial clue cell cannot be edited
    if (initialGrid[r][c] !== 0) return;

    const currentVal = userGrid[r][c];
    if (currentVal === num) return; // same number

    // Record undo step
    setUndoStack(prev => [...prev, { r, c, val: currentVal }]);

    const newGrid = copyGrid(userGrid);
    newGrid[r][c] = num;
    setUserGrid(newGrid);

    setGuessCount(prev => prev + 1);

    if (num === solutionGrid[r][c]) {
      clayAudio.playPop();
    } else {
      clayAudio.playSquish();
    }

    // Check completion
    checkPuzzleCompletion(newGrid);
  };

  const handleErase = () => {
    if (!selectedCell || isCompleted) return;
    const { r, c } = selectedCell;

    if (initialGrid[r][c] !== 0) return;
    const currentVal = userGrid[r][c];
    if (currentVal === 0) return;

    setUndoStack(prev => [...prev, { r, c, val: currentVal }]);
    const newGrid = copyGrid(userGrid);
    newGrid[r][c] = 0;
    setUserGrid(newGrid);
    clayAudio.playSquish();
  };

  const handleUndo = () => {
    if (undoStack.length === 0 || isCompleted) return;
    const lastStep = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));

    const newGrid = copyGrid(userGrid);
    newGrid[lastStep.r][lastStep.c] = lastStep.val;
    setUserGrid(newGrid);
    setSelectedCell({ r: lastStep.r, c: lastStep.c });
    clayAudio.playSquish();
  };

  const handleHint = () => {
    if (!selectedCell || isCompleted) return;
    const { r, c } = selectedCell;

    if (initialGrid[r][c] !== 0 || userGrid[r][c] === solutionGrid[r][c]) return;

    const correctVal = solutionGrid[r][c];
    handleNumberInput(correctVal);
  };

  const checkPuzzleCompletion = (grid) => {
    const size = grid.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][r] === 0 || grid[r][c] !== solutionGrid[r][c]) {
          return;
        }
      }
    }

    setIsCompleted(true);
    clayAudio.playTriumph();
  };

  const toggleSound = () => {
    clayAudio.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const isHighlighted = (r, c) => {
    if (!selectedCell) return false;
    const { r: sr, c: sc } = selectedCell;

    if (r === sr || c === sc) return true;

    // Box highlight
    let boxRows = 3, boxCols = 3;
    if (boardSize === 6) { boxRows = 2; boxCols = 3; }
    const startRow = sr - (sr % boxRows);
    const startCol = sc - (sc % boxCols);

    return r >= startRow && r < startRow + boxRows && c >= startCol && c < startCol + boxCols;
  };

  const isSameNumber = (r, c) => {
    if (!selectedCell) return false;
    const selectedVal = userGrid[selectedCell.r][selectedCell.c];
    return selectedVal !== 0 && userGrid[r][c] === selectedVal;
  };

  return (
    <section id="sudoku" className="sudoku-section section">
      <div className="container">
        
        {/* Header & Title */}
        <div className="sudoku-header">
          <div className="clay-title-box">
            <span className="clay-emoji">🎨</span>
            <h2 className="clay-title">Claymation <span>Sudoku</span></h2>
          </div>
          <p className="clay-subtitle">
            A squishy, relaxed 3D claymorphic puzzle — no time limit or guess limit!
          </p>
        </div>

        {/* Controls Bar */}
        <div className="clay-controls-bar">
          <div className="clay-mode-tabs">
            <button 
              className={`clay-tab ${boardSize === 9 ? 'active' : ''}`}
              onClick={() => setBoardSize(9)}
            >
              9x9 Standard
            </button>
            <button 
              className={`clay-tab ${boardSize === 6 ? 'active' : ''}`}
              onClick={() => setBoardSize(6)}
            >
              6x6 Quick
            </button>
          </div>

          <div className="clay-info-badges">
            <span className="clay-badge moves-badge">
              ✏️ Attempts: <strong>{guessCount}</strong>
            </span>
            <button className="clay-icon-btn" onClick={toggleSound} title="Toggle Sound">
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>

        {/* Victory Celebration Banner */}
        {isCompleted && (
          <div className="clay-victory-banner">
            <Award size={32} className="trophy-icon" />
            <div>
              <h3>Fantastic Clay Masterpiece!</h3>
              <p>You completed the puzzle in {guessCount} moves with zero pressure.</p>
            </div>
            <button className="clay-btn primary-clay" onClick={() => startNewGame()}>
              Play Again
            </button>
          </div>
        )}

        {/* Main Clay Board & Keypad */}
        <div className="clay-workspace">
          
          {/* Sudoku Grid */}
          <div className="clay-board-outer">
            <div 
              className={`clay-sudoku-grid grid-${boardSize}`}
              style={{
                gridTemplateColumns: `repeat(${boardSize}, 1fr)`
              }}
            >
              {userGrid.map((row, r) =>
                row.map((val, c) => {
                  const isInitial = initialGrid[r][c] !== 0;
                  const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                  const inSameLine = isHighlighted(r, c);
                  const sameNum = isSameNumber(r, c);
                  const isWrong = val !== 0 && !isInitial && val !== solutionGrid[r][c];

                  let cellClass = 'clay-cell';
                  if (isInitial) cellClass += ' cell-initial';
                  if (isSelected) cellClass += ' cell-selected';
                  else if (sameNum) cellClass += ' cell-same-num';
                  else if (inSameLine) cellClass += ' cell-line';

                  if (isWrong) cellClass += ' cell-wrong';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {val !== 0 ? val : ''}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Keypad & Action Toolbar */}
          <div className="clay-keypad-panel">
            
            <div className="clay-toolbar">
              <button 
                className="clay-action-btn"
                onClick={handleUndo}
                disabled={undoStack.length === 0}
                title="Undo Move"
              >
                <Undo size={18} />
                <span>Undo</span>
              </button>

              <button 
                className="clay-action-btn"
                onClick={handleErase}
                title="Erase Number"
              >
                <Trash2 size={18} />
                <span>Erase</span>
              </button>

              <button 
                className="clay-action-btn"
                onClick={handleHint}
                title="Get Hint"
              >
                <Lightbulb size={18} />
                <span>Hint</span>
              </button>

              <button 
                className="clay-action-btn reset-action"
                onClick={() => startNewGame()}
                title="New Game"
              >
                <RotateCcw size={18} />
                <span>New</span>
              </button>
            </div>

            {/* Number Keypad */}
            <div className="clay-number-keypad">
              {Array.from({ length: boardSize }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className="clay-num-btn"
                  onClick={() => handleNumberInput(num)}
                >
                  {num}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Sudoku;
