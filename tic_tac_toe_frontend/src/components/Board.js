import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component
 * Renders a 3x3 grid of Square components.
 * Props:
 * - squares: string[] length 9 containing 'X' | 'O' | null
 * - winningLine: number[] | null indices of the winning cells
 * - onSquareClick: (index: number) => void
 */
export default function Board({ squares, winningLine, onSquareClick }) {
  const isWinning = (idx) => Array.isArray(winningLine) && winningLine.includes(idx);

  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          isWinning={isWinning(idx)}
          onClick={() => onSquareClick(idx)}
        />
      ))}
    </div>
  );
}
