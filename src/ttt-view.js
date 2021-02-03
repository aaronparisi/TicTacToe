// * this is replacing terminal rendering stuff
import { fitText } from './fittext.js'
import { Game } from './gameLogic/game.js';

export function View(game) {
  this.game = game;
  this.$gridEl = $('.grid');
  this.$resetButton = $('button');

  this.reset();
}

View.prototype.reset = function() {
  this.setupBoard();
  this.bindEvents();
}

View.prototype.setupBoard = function() {
  $('html').removeClass('nobody-won');
  this.$gridEl.html("");  // just empty the entire board
  this.$resetButton.attr('disabled', true);
  
  for (let i=0; i<9; i++) {
    let $square = $('<div></div>');
    $square.addClass('square active')
      .attr('id', i+1)
      .data('pos', [Math.floor(i/3), i%3])
      .html('<span></span>');
    
    this.$gridEl.append($square);
    window.fitText( $square, 2.5 );
  }
}

View.prototype.bindEvents = function() {
  this.$gridEl.on({
    mouseenter: function(event) {
      $(event.currentTarget).toggleClass('hover-square');
    },
    mouseleave: function(event) {
      $(event.currentTarget).toggleClass('hover-square');
    }
  }, '.active')

  this.$gridEl.on('click', '.active', event => {
    this.makeMove($(event.currentTarget));
  })

  this.$resetButton.on('click', () => {
    this.$gridEl.off('click mouseenter mouseleave');
    this.game = new Game();
    this.reset();
  })
}

View.prototype.makeMove = function($square) {
  this.$resetButton.attr('disabled', false);
  $square.toggleClass('hover-square').removeClass('active');

  let curVal = this.game.playMove($square.data('pos'))
  $square.children().first().html(curVal);

  if (this.game.isOver()) {
    this.endGame();
  }
}

View.prototype.endGame = function() {
  this.$gridEl.off('click mouseenter mouseleave');

  if (this.game.board.isFull()) {
    console.log('nobody won')
    $('html').addClass('nobody-won');
  } else {
    let winningPosSeq = this.game.getWinningSquares();
    let $winningSquares = $('.square').filter((_, el) => {
      return myIncludes(winningPosSeq, $(el).data('pos'));
    })
  
    $winningSquares.toggleClass('hover-square');
  }
}

function myIncludes(arr, el) {
  return arr.some(subArr => {
    return (el[0]===subArr[0] && el[1]===subArr[1])
  })
}