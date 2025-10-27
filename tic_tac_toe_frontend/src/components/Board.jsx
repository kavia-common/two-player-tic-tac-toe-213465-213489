import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Board
 * Presentational component that renders a 3x3 grid of squares.
 * Props:
 * - board: array of 9 entries ('X' | 'O' | null)
 * - onSquareClick: function(index) to handle clicks
 * - disabled: boolean to disable further moves (e.g., after win)
 */
export default function Board({ board, onSquareClick, disabled }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          disabled={disabled || val !== null}
          index={idx}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Square
 * Button-like square in the board grid.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: click handler
 * - disabled: disable interaction if true
 * - index: number (0-8) to help build aria-labels
 */
export function Square({ value, onClick, disabled, index }) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return (
    <button
      type="button"
      className={`square ${value ? 'square--filled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      role="gridcell"
      aria-label={`Row ${row}, Column ${col}${value ? `, ${value}` : ''}`}
    >
      <span className={`mark ${value === 'X' ? 'mark--x' : value === 'O' ? 'mark--o' : ''}`}>
        {value}
      </span>
    </button>
  );
}
