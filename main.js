"use strict";

class Player {
    constructor(name) {
        this.name = name;
        this.symbol = "";
    }
    pickSymbol(symbol) {
        this.symbol = symbol;
    }
}

class Game {
    constructor() {
        this.board = [0,0,0, 0,0,0, 0,0,0];
            //   0, 1, 2,
            //   3, 4, 5,
            //   6, 7, 8,
    }

    place(x, symbol) {
        this.board[x]= symbol;
    }

    win(){
        if ((this.board[0] === this.board[1] && this.board[0] === this.board[2] && this.board[0] != 0) || // start horizontal
            (this.board[3] === this.board[4] && this.board[3] === this.board[5] && this.board[3] != 0) ||
            (this.board[6] === this.board[7] && this.board[6] === this.board[8] && this.board[6] != 0) ||

            (this.board[0] === this.board[3] && this.board[0] === this.board[6] && this.board[0] != 0) || // start vertical
            (this.board[1] === this.board[4] && this.board[1] === this.board[7] && this.board[1] != 0) ||
            (this.board[2] === this.board[6] && this.board[2] === this.board[8] && this.board[2] != 0) ||

            (this.board[0] === this.board[4] && this.board[0] === this.board[8] && this.board[0] != 0) || // start diagonal
            (this.board[6] === this.board[4] && this.board[6] === this.board[2] && this.board[6] != 0)) {
            return 'win'
        } else if {
            return 'draw'
        }
    }
}

/* */
function versuch() {
    const tryGame = new Game();
    tryGame.place(0, "a");
    tryGame.place(1, "b");
    tryGame.place(2, "c");
    console.log(tryGame.board);
    console.log(tryGame.win);
}
versuch();

