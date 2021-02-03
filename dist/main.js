/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fittext.js":
/*!************************!*\
  !*** ./src/fittext.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/*!\t\n* FitText.js 1.0 jQuery free version\n*\n* Copyright 2011, Dave Rupert http://daverupert.com \n* Released under the WTFPL license \n* http://sam.zoy.org/wtfpl/\n* Modified by Slawomir Kolodziej http://slawekk.info\n*\n* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)\n*/\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function(){\n\n  var addEvent = function (el, type, fn) {\n    if (el.addEventListener)\n      el.addEventListener(type, fn, false);\n\t\telse\n\t\t\tel.attachEvent('on'+type, fn);\n  };\n  \n  var extend = function(obj,ext){\n    for(var key in ext)\n      if(ext.hasOwnProperty(key))\n        obj[key] = ext[key];\n    return obj;\n  };\n\n  window.fitText = function (el, kompressor, options) {\n\n    var settings = extend({\n      'minFontSize' : -1/0,\n      'maxFontSize' : 1/0\n    },options);\n\n    var fit = function (el) {\n      var compressor = kompressor || 1;\n\n      var resizer = function () {\n       // they had the numerator set to ~el.clientWidth~ and I'm not sure why\n       var numerator = Math.min(el.parentNode.offsetWidth, el.parentNode.offsetHeight)\n        el.style.fontSize = Math.max(Math.min(numerator / (compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';\n        el.style.lineHeight = el.parentNode.offsetHeight*.25 + 'px';\n      };\n\n      // Call once to set.\n      resizer();\n\n      // Bind events\n      // If you have any js library which support Events, replace this part\n      // and remove addEvent function (or use original jQuery version)\n      addEvent(window, 'resize', resizer);\n      addEvent(window, 'orientationchange', resizer);\n    };\n\n    if (el.length)\n      for(var i=0; i<el.length; i++)\n        fit(el[i]);\n    else\n      fit(el);\n\n    // return set of elements\n    return el;\n  };\n})());\n\n//# sourceURL=webpack://TicTacToe/./src/fittext.js?");

/***/ }),

/***/ "./src/gameLogic/board.js":
/*!********************************!*\
  !*** ./src/gameLogic/board.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => /* binding */ Board\n/* harmony export */ });\n/* harmony import */ var _moveError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveError.js */ \"./src/gameLogic/moveError.js\");\n\n\nfunction Board() {\n  this.grid = Board.makeGrid();\n}\n\nBoard.marks = ['x', 'o'];\n\nBoard.makeGrid = function() {\n  // returns a grid\n  const grid = [];\n\n  for (let i = 0; i < 3; i++) {\n    grid.push([]);\n    for (let j = 0; j < 3; j++) {\n      grid[i].push(null);\n    }\n  }\n\n  return grid;\n}\n\nBoard.isValidPos = function(pos) {\n  // given a position,\n  // returns true if the position is a valid position (i.e. on the board)\n  // else, returns false\n  return (0 <= pos[0]) &&\n  (pos[0] < 3) &&\n  (0 <= pos[1]) &&\n  (pos[1] < 3);\n}\n\nBoard.prototype.isEmptyPos = function(pos) {\n  // given a pos,\n  // returns true if pos is valid and available\n  // else false\n  if (!Board.isValidPos(pos)) {\n    throw new MoveError('Is not valid position!');\n  }\n\n  return (this.grid[pos[0]][pos[1]] === null);\n}\n\nBoard.prototype.isFull = function() {\n  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n    for (let colIdx = 0; colIdx < 3; colIdx++) {\n      if (this.isEmptyPos([rowIdx, colIdx])) {\n        return false;\n      }\n    }\n  }\n\n  return true;\n}\n\nBoard.prototype.isOver = function() {\n  // returns true if grid is over (winner or full); else, false\n  if (this.winner() != null) {\n    return true;\n  } else {\n    return this.isFull();\n  }\n}\n\nBoard.prototype.placeMark = function(pos, mark){\n  // adds the given mark to the board's grid at the given position\n  if (!this.isEmptyPos(pos)) {\n    // ? I don't think I'll ever get in here\n    // ? because of the way the click listener is set up\n    throw new MoveError('Invalid position!');\n  }\n\n  this.grid[pos[0]][pos[1]] = mark;\n}\n\nBoard.prototype.print = function() {\n  // for terminal version of game\n}\n\nBoard.prototype.winner = function() {\n  // returns the winner if there is one; else, null\n  const posSeqs = [\n    // horizontals\n    [[0, 0], [0, 1], [0, 2]],\n    [[1, 0], [1, 1], [1, 2]],\n    [[2, 0], [2, 1], [2, 2]],\n    // verticals\n    [[0, 0], [1, 0], [2, 0]],\n    [[0, 1], [1, 1], [2, 1]],\n    [[0, 2], [1, 2], [2, 2]],\n    // diagonals\n    [[0, 0], [1, 1], [2, 2]],\n    [[2, 0], [1, 1], [0, 2]]\n  ];\n\n  for (let i = 0; i < posSeqs.length; i++) {\n    const winner = this.winnerHelper(posSeqs[i]);\n    if (winner != null) {\n      return winner;\n    }\n  }\n\n  return null;\n}\n\nBoard.prototype.getWinningPosSeq = function() {\n  // returns the winner if there is one; else, null\n  const posSeqs = [\n    // horizontals\n    [[0, 0], [0, 1], [0, 2]],\n    [[1, 0], [1, 1], [1, 2]],\n    [[2, 0], [2, 1], [2, 2]],\n    // verticals\n    [[0, 0], [1, 0], [2, 0]],\n    [[0, 1], [1, 1], [2, 1]],\n    [[0, 2], [1, 2], [2, 2]],\n    // diagonals\n    [[0, 0], [1, 1], [2, 2]],\n    [[2, 0], [1, 1], [0, 2]]\n  ];\n\n  for (let i = 0; i < posSeqs.length; i++) {\n    if (this.winnerHelper(posSeqs[i])) {\n      return posSeqs[i];\n    }\n  }\n}\n\nBoard.prototype.winnerHelper = function(posSeq) {\n  // given a collection of 3 positions, representing a row, column, or diagonal,\n  // returns either the winner, or null, if the gien collection does not\n  // produce a winner\n  for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n    const targetMark = Board.marks[markIdx];\n    let winner = true;\n    for (let posIdx = 0; posIdx < 3; posIdx++) {\n      const pos = posSeq[posIdx];\n      const mark = this.grid[pos[0]][pos[1]];\n\n      if (mark != targetMark) {\n        winner = false;\n      }\n    }\n\n    if (winner) {\n      return targetMark;\n    }\n  }\n\n  return null;\n}\n\n//# sourceURL=webpack://TicTacToe/./src/gameLogic/board.js?");

/***/ }),

/***/ "./src/gameLogic/game.js":
/*!*******************************!*\
  !*** ./src/gameLogic/game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ \"./src/gameLogic/board.js\");\n/* harmony import */ var _moveError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moveError.js */ \"./src/gameLogic/moveError.js\");\n\n  // necessary??\n\nfunction Game() {\n  this.board = new _board_js__WEBPACK_IMPORTED_MODULE_0__.Board();\n  this.currentPlayer = _board_js__WEBPACK_IMPORTED_MODULE_0__.Board.marks[0];\n}\n\nGame.prototype.isOver = function() {\n  return this.board.isOver();\n}\n\nGame.prototype.getWinningSquares = function() {\n  return this.board.getWinningPosSeq();\n\n}\n\nGame.prototype.playMove = function(pos) {\n  let ret = this.currentPlayer;\n\n  this.board.placeMark(pos, ret);\n  this.swapTurn();\n\n  return ret;  // we need this value for the view\n}\n\nGame.prototype.swapTurn = function() {\n  if (this.currentPlayer === _board_js__WEBPACK_IMPORTED_MODULE_0__.Board.marks[0]) {\n    this.currentPlayer = _board_js__WEBPACK_IMPORTED_MODULE_0__.Board.marks[1];\n  } else {\n    this.currentPlayer = _board_js__WEBPACK_IMPORTED_MODULE_0__.Board.marks[0];\n  }\n}\n\nGame.prototype.winner = function() {\n  return this.board.winner();\n}\n\n//# sourceURL=webpack://TicTacToe/./src/gameLogic/game.js?");

/***/ }),

/***/ "./src/gameLogic/moveError.js":
/*!************************************!*\
  !*** ./src/gameLogic/moveError.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"moveError\": () => /* binding */ moveError\n/* harmony export */ });\nfunction moveError(msg) {\n  this.msg = msg;\n}\n\n//# sourceURL=webpack://TicTacToe/./src/gameLogic/moveError.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ttt_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ttt-view.js */ \"./src/ttt-view.js\");\n/* harmony import */ var _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic/game.js */ \"./src/gameLogic/game.js\");\n/* harmony import */ var _fittext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fittext.js */ \"./src/fittext.js\");\n\n\n\n\n$(() => {\n  // Your code here\n  let myGame = new _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__.Game();\n  new _ttt_view_js__WEBPACK_IMPORTED_MODULE_0__.View(myGame);\n});\n\n\n//# sourceURL=webpack://TicTacToe/./src/index.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"View\": () => /* binding */ View\n/* harmony export */ });\n/* harmony import */ var _fittext_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fittext.js */ \"./src/fittext.js\");\n/* harmony import */ var _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic/game.js */ \"./src/gameLogic/game.js\");\n// * this is replacing terminal rendering stuff\n\n\n\nfunction View(game) {\n  this.game = game;\n  this.$gridEl = $('.grid');\n  this.$resetButton = $('button');\n\n  this.reset();\n}\n\nView.prototype.reset = function() {\n  this.setupBoard();\n  this.bindEvents();\n}\n\nView.prototype.setupBoard = function() {\n  $('html').removeClass('nobody-won');\n  this.$gridEl.html(\"\");  // just empty the entire board\n  this.$resetButton.attr('disabled', true);\n  \n  for (let i=0; i<9; i++) {\n    let $square = $('<div></div>');\n    $square.addClass('square active')\n      .attr('id', i+1)\n      .data('pos', [Math.floor(i/3), i%3])\n      .html('<span></span>');\n    \n    this.$gridEl.append($square);\n    window.fitText( $square, 2.5 );\n  }\n}\n\nView.prototype.bindEvents = function() {\n  this.$gridEl.on({\n    mouseenter: function(event) {\n      $(event.currentTarget).toggleClass('hover-square');\n    },\n    mouseleave: function(event) {\n      $(event.currentTarget).toggleClass('hover-square');\n    }\n  }, '.active')\n\n  this.$gridEl.on('click', '.active', event => {\n    this.makeMove($(event.currentTarget));\n  })\n\n  this.$resetButton.on('click', () => {\n    this.$gridEl.off('click mouseenter mouseleave');\n    this.game = new _gameLogic_game_js__WEBPACK_IMPORTED_MODULE_1__.Game();\n    this.reset();\n  })\n}\n\nView.prototype.makeMove = function($square) {\n  this.$resetButton.attr('disabled', false);\n  $square.toggleClass('hover-square').removeClass('active');\n\n  let curVal = this.game.playMove($square.data('pos'))\n  $square.children().first().html(curVal);\n\n  if (this.game.isOver()) {\n    this.endGame();\n  }\n}\n\nView.prototype.endGame = function() {\n  this.$gridEl.off('click mouseenter mouseleave');\n\n  if (this.game.board.isFull()) {\n    console.log('nobody won')\n    $('html').addClass('nobody-won');\n  } else {\n    let winningPosSeq = this.game.getWinningSquares();\n    let $winningSquares = $('.square').filter((_, el) => {\n      return myIncludes(winningPosSeq, $(el).data('pos'));\n    })\n  \n    $winningSquares.toggleClass('hover-square');\n  }\n}\n\nfunction myIncludes(arr, el) {\n  return arr.some(subArr => {\n    return (el[0]===subArr[0] && el[1]===subArr[1])\n  })\n}\n\n//# sourceURL=webpack://TicTacToe/./src/ttt-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;