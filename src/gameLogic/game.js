import { Board } from './board.js'
import { moveError } from './moveError.js'  // necessary??

export function Game() {
  this.board = new Board();
  this.currentPlayer = Board.marks[0];
}

Game.prototype.isOver = function() {
  return this.board.isOver();
}

Game.prototype.getWinningSquares = function() {
  return this.board.getWinningPosSeq();

}

Game.prototype.playMove = function(pos) {
  let ret = this.currentPlayer;

  this.board.placeMark(pos, ret);
  this.swapTurn();

  return ret;  // we need this value for the view
}

Game.prototype.swapTurn = function() {
  if (this.currentPlayer === Board.marks[0]) {
    this.currentPlayer = Board.marks[1];
  } else {
    this.currentPlayer = Board.marks[0];
  }
}

Game.prototype.winner = function() {
  return this.board.winner();
}