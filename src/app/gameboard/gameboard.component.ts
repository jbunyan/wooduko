import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent {

  @Input()
  public board: boolean[][] = []

  private dimension: number = 10;

  public rows: number[] = [];
  public columns: number[] = [];

  constructor() {
    for ( let i=0; i<this.dimension; i++) {
      this.rows[i] = i
      this.columns[i] = i
    }

  }

}
