import { Component } from '@angular/core';

class Player {
  state: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const winStates = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  player1 = new Player('Bibi');
  player2 = new Player('Ganz');
  moveCounter = 0;
  currnetPlayer = this.player1;
  board = [null, null, null, null, null, null, null, null, null];

  move(index: number, player: Player) {
    if (this.player1.state[index] === 0 && this.player2.state[index] === 0) {
      player.state[index] = 1;
      this.moveCounter++;
      this.board[index] = this.currnetPlayer === this.player1 ? 'x' : 'o';
      if (this.moveCounter > 4) {
        this.checkWin(this.currnetPlayer);
      }
      this.currnetPlayer = this.switchCurrentPlayer();
    } else {
      alert("can't move");
    }
  }

  switchCurrentPlayer() {
    return this.currnetPlayer === this.player1 ? this.player2 : this.player1;
  }

  checkWin(player: Player) {
    winStates.map((state) => {
      const res = state.map((currElement, index) => {
        return player.state[index] * currElement;
      });
      if (state.toString().includes(res.toString())) {
        this.endGame();
      }
    });
  }

  endGame() {
    alert(this.currnetPlayer.name + ' Win');
    this.player1 = new Player('Bibi');
    this.player2 = new Player('Ganz');
    this.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;
  }
}
