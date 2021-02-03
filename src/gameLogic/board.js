import { moveError } from './moveError.js'

export function Board() {
  this.grid = Board.makeGrid();
}

Board.marks = ['x', 'o'];

Board.makeGrid = function() {
  // returns a grid
  const grid = [];

  for (let i = 0; i < 3; i++) {
    grid.push([]);
    for (let j = 0; j < 3; j++) {
      grid[i].push(null);
    }
  }

  return grid;
}

Board.isValidPos = function(pos) {
  // given a position,
  // returns true if the position is a valid position (i.e. on the board)
  // else, returns false
  return (0 <= pos[0]) &&
  (pos[0] < 3) &&
  (0 <= pos[1]) &&
  (pos[1] < 3);
}

Board.prototype.isEmptyPos = function(pos) {
  // given a pos,
  // returns true if pos is valid and available
  // else false
  if (!Board.isValidPos(pos)) {
    throw new MoveError('Is not valid position!');
  }

  return (this.grid[pos[0]][pos[1]] === null);
}

Board.prototype.isFull = function() {
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      if (this.isEmptyPos([rowIdx, colIdx])) {
        return false;
      }
    }
  }

  return true;
}

Board.prototype.isOver = function() {
  // returns true if grid is over (winner or full); else, false
  if (this.winner() != null) {
    return true;
  } else {
    return this.isFull();
  }
}

Board.prototype.placeMark = function(pos, mark){
  // adds the given mark to the board's grid at the given position
  if (!this.isEmptyPos(pos)) {
    // ? I don't think I'll ever get in here
    // ? because of the way the click listener is set up
    throw new MoveError('Invalid position!');
  }

  this.grid[pos[0]][pos[1]] = mark;
}

Board.prototype.print = function() {
  // for terminal version of game
}

Board.prototype.winner = function() {
  // returns the winner if there is one; else, null
  const posSeqs = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  for (let i = 0; i < posSeqs.length; i++) {
    const winner = this.winnerHelper(posSeqs[i]);
    if (winner != null) {
      return winner;
    }
  }

  return null;
}

Board.prototype.getWinningPosSeq = function() {
  // returns the winner if there is one; else, null
  const posSeqs = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  for (let i = 0; i < posSeqs.length; i++) {
    if (this.winnerHelper(posSeqs[i])) {
      return posSeqs[i];
    }
  }
}

Board.prototype.winnerHelper = function(posSeq) {
  // given a collection of 3 positions, representing a row, column, or diagonal,
  // returns either the winner, or null, if the gien collection does not
  // produce a winner
  for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
    const targetMark = Board.marks[markIdx];
    let winner = true;
    for (let posIdx = 0; posIdx < 3; posIdx++) {
      const pos = posSeq[posIdx];
      const mark = this.grid[pos[0]][pos[1]];

      if (mark != targetMark) {
        winner = false;
      }
    }

    if (winner) {
      return targetMark;
    }
  }

  return null;
}