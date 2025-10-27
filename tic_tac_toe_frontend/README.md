# Tic Tac Toe Frontend

Two-player Tic Tac Toe built with React. No backend or external services required.

## Run locally
- Install: `npm install`
- Start dev server: `npm start`
- Open http://localhost:3000

## Features
- Centered responsive 3x3 board
- Current player indicator (X starts)
- Click to place X/O on empty squares
- Win detection (rows, columns, diagonals) with highlighted winning line
- Draw detection when board is full
- Status messages: "Player X's turn", "Player O's turn", "X wins!", "It's a draw"
- Reset Game button (X starts)
- Move counter and session score tally (X wins, O wins, draws)
- Light theme styling matching: primary #3b82f6, success #06b6d4, background #f9fafb, surface #ffffff, text #111827

## Files of interest
- `src/App.js` — Game container and winner helper
- `src/components/Board.js` — 3x3 grid
- `src/components/Square.js` — cell square
- `src/styles.css` — minimal styling
