"use strict";

/* class-functions */

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.turn = false;
    this.hasWon = false;
  }
}

class Game {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    //   0, 1, 2,
    //   3, 4, 5,
    //   6, 7, 8,
    this.winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
  }

  createPlayers(player1, player2) {
    this.p1 = new Player(player1, "X");
    this.p2 = new Player(player2, "O");
    this.round = 0;
  }
  /**/
  place(x, symbol) {
    this.board[x] = symbol;
  }

  win() {
    this.winningConditions.forEach((condition) => {
      if (
        this.board[condition[0]] === this.p1.symbol &&
        this.board[condition[1]] === this.p1.symbol &&
        this.board[condition[2]] === this.p1.symbol
      ) {
        this.p1.hasWon = true;
      }
      if (
        this.board[condition[0]] === this.p2.symbol &&
        this.board[condition[1]] === this.p2.symbol &&
        this.board[condition[2]] === this.p2.symbol
      ) {
        this.p2.hasWon = true;
      }
    });
  }
}

/* functions */

function gameDisplay() {
  const board = document.querySelector(".board");
  const players = document.querySelector(".players");
  board.classList.remove("hidden");
  players.classList.add("hidden");
}

function winner(name) {
  let whoWon = document.querySelector(".title");
  let reset = document.querySelector("#restBtn");
  const board = document.querySelector(".board");
  board.classList.add("hidden");
  reset.classList.remove("hidden");
  whoWon.textContent = `${name} has won!`;
}

function draw(text) {
  let reset = document.querySelector("#restBtn");
  const board = document.querySelector(".board");
  board.classList.add("hidden");
  reset.classList.remove("hidden");
  text.textContent = "It`s a draw!";
}

function names(name1, name2) {
  let player1 = document.querySelector(".p1");
  let player2 = document.querySelector(".p2");
  player1.textContent = name1;
  player2.textContent = name2;
}

function removeHandler(div) {
  div.removeEventListener("click", clickPlace);
}

function restart() {
  location.reload();
}

/* init function */

(function init() {
  const tryGame = new Game();
  const box = document.querySelectorAll(".box");
  let warning = document.querySelector(".title");

  document.querySelector("#strBtn").addEventListener("click", () => {
    const playerOne = document.querySelector("#player1").value;
    const playerTwo = document.querySelector("#player2").value;

    if (playerOne === "" || playerTwo === "") {
      warning.textContent = "Please enter the players names!";
    } else {
      warning.textContent = "Tic-Tac-Toe";
      tryGame.createPlayers(playerOne, playerTwo);
      names(playerOne, playerTwo);
      gameDisplay();
    }
  });
  console.log(box, typeof box);

  box.forEach((element) => {
    element.addEventListener("click", clickPlace);
  });
  //
  function clickPlace(e) {
    let currentTarget = e.target;
    let currentIndex = currentTarget.dataset.num;

    if (currentTarget.matches(".box")) {
      if (tryGame.round % 2 === 0) {
        tryGame.place(+currentIndex, tryGame.p1.symbol);
        currentTarget.textContent = tryGame.p1.symbol;
      } else {
        tryGame.place(+currentIndex, tryGame.p2.symbol);
        currentTarget.textContent = tryGame.p2.symbol;
      }
      tryGame.round++;
      tryGame.win();
      if (tryGame.p1.hasWon) winner(tryGame.p1.name);
      if (tryGame.p2.hasWon) winner(tryGame.p2.name);
      if (
        tryGame.p1.hasWon === false &&
        tryGame.p2.hasWon === false &&
        tryGame.round === 9
      ) {
        draw(warning);
      }
    }
    removeHandler(currentTarget);
  }

  document.querySelector("#restBtn").addEventListener("click", restart);
})();
