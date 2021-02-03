import { Game } from './game.js';
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let g = new Game();
g.run(reader, completion);

function completion() {
  reader.question("Play again? y or n: ", restartGame => {
    if (restartGame === "y") {
      g = new Game();
      g.run(reader, completion);
    } else {
      reader.close();
    }
  });
};

// * I think this is only used for the terminal game, notice
// * src/index.js doesn't include anything from it