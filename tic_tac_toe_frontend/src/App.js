import React, { useMemo, useState } from 'react';
import './styles.css';
import Board from './components/Board';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * PUBLIC_INTERFACE
   * Game container: manages game state, scoring and status display.
   * - Tracks squares (array of 9), xIsNext, gameOver, winningLine
   * - Provides handlers to Board for square clicks and reset
   * - Displays status, move count, and session scores
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Calculate winner and winning line
  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winner && moveCount === 9;

  // Derive status message
  const status = winner
    ? `${winner} wins!`
    : isDraw
    ? "It's a draw"
    : `Player ${xIsNext ? 'X' : 'O'}'s turn`;

  // Handle square click
  const handleSquareClick = (index) => {
    if (squares[index] || winner) return; // ignore if filled or game over
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveCount((c) => c + 1);
  };

  // When game ends, update score once
  const gameOver = Boolean(winner) || isDraw;
  useMemo(() => {
    // Memo used to run once when terminal condition appears
    if (winner) {
      setScores((s) => ({ ...s, [winner]: s[winner] + 1 }));
    } else if (isDraw) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoveCount(0);
  };

  return (
    <div className="ttt-app" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <main className="container">
        <h1 className="title">Tic Tac Toe</h1>

        <section className="statusBar" aria-live="polite">
          <div className="status">
            <span className={`badge ${winner ? 'badge-win' : isDraw ? 'badge-draw' : 'badge-turn'}`}>
              {status}
            </span>
          </div>
          <div className="meta">
            <span className="metaItem">Moves: <strong>{moveCount}</strong></span>
            <span className="divider" />
            <span className="metaItem">X Wins: <strong>{scores.X}</strong></span>
            <span className="metaItem">O Wins: <strong>{scores.O}</strong></span>
            <span className="metaItem">Draws: <strong>{scores.draws}</strong></span>
          </div>
        </section>

        <Board
          squares={squares}
          winningLine={line}
          onSquareClick={handleSquareClick}
        />

        <div className="actions">
          <button className="btn" onClick={resetGame} aria-label="Reset game and start with X">
            Reset Game
          </button>
        </div>

        <footer className="footer">
          <small>Player X starts. Click an empty square to place your mark.</small>
        </footer>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determines if there is a winner in the given 3x3 board (as a 9-element array).
 * Returns an object: { winner: 'X' | 'O' | null, line: number[] | null }
 * - winner: the symbol that won, or null if no winner
 * - line: indices of the winning line for highlighting, or null
 */
export function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
