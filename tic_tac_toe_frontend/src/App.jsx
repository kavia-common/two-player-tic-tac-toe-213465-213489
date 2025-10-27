import React, { useMemo, useState } from 'react';
import Board from './components/Board.jsx';

/**
 * PUBLIC_INTERFACE
 * App
 * This is the main component for the two-player Tic Tac Toe game. It manages:
 * - Board state (9 squares)
 * - Current player (X/O)
 * - Win/draw detection
 * - Reset functionality
 * Returns a centered layout with a player indicator, 3x3 board, and a reset button.
 */
export default function App() {
  // Board is an array of 9 cells: 'X' | 'O' | null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const nextPlayer = xIsNext ? 'X' : 'O';
  const gameOver = Boolean(winner) || isBoardFull;

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    /** Handle a move when a square is clicked. */
    if (board[index] !== null || winner) return; // ignore if occupied or game over
    const next = board.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    /** Reset the game to the initial state. */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const statusText = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? 'Draw!'
    : `Current Player: ${nextPlayer}`;

  return (
    <div className="app">
      <div className="game-card" role="region" aria-label="Tic Tac Toe game">
        <h1 className="title">Tic Tac Toe</h1>
        <div
          className={`status ${winner ? 'status--win' : isBoardFull ? 'status--draw' : ''}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </div>

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          disabled={Boolean(winner)}
        />

        <button
          className="reset-btn"
          type="button"
          onClick={resetGame}
          aria-label="Reset game and start over as X"
        >
          Reset Game
        </button>

        <footer className="footer" aria-hidden="true">
          Two players. Take turns to get three in a row.
        </footer>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determine if there is a winner on the board by checking all rows, columns, and diagonals.
 * @param {Array<string|null>} sqs - Array of 9 cells with 'X' | 'O' | null
 * @returns {'X'|'O'|null} - The winner symbol or null if no winner
 */
export function calculateWinner(sqs) {
  const lines = [
    // rows
    [0,1,2], [3,4,5], [6,7,8],
    // cols
    [0,3,6], [1,4,7], [2,5,8],
    // diags
    [0,4,8], [2,4,6],
  ];
  for (const [a, b, c] of lines) {
    if (sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]) {
      return sqs[a];
    }
  }
  return null;
}
