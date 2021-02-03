import { View } from './ttt-view.js';
import { Game } from './gameLogic/game.js';
import { fitText } from './fittext.js'

$(() => {
  // Your code here
  let myGame = new Game();
  new View(myGame);
});
