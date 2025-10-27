import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square component
 * Props:
 * - value: 'X' | 'O' | null
 * - isWinning: boolean
 * - onClick: () => void
 */
export default function Square({ value, isWinning, onClick }) {
  const classes = ['square'];
  if (isWinning) classes.push('square-winning');

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
    >
      {value}
    </button>
  );
}
