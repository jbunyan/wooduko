import { Component } from '@angular/core';
import { ShapeService, ShapeSpec } from './shape.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'woodoku2';

  public score: number = 0;

  public gameBoard: boolean[][] = [];
  public rows: number[] = [];
  public columns: number[] = [];

  private dimension: number = 10;
  private numberOfShapes: number = 3;

  public shapes: ShapeSpec[] = [];

  public gameOver: boolean = false;

  public bestScore: number = 0;

  constructor(
    public shapeService: ShapeService
  ) {

    let bs = localStorage.getItem("best-score");

    if (bs != null) {
      let bestScore: number = parseInt(bs)
      this.bestScore = bestScore
    } else {
      localStorage.setItem("best-score","0")
    }

    for ( let i=0; i<this.dimension; i++) {
      this.rows[i] = i
      this.columns[i] = i
    }

    this.newGame()

  }

  newGame() {

    this.gameOver = false;

    // clear score
    this.score = 0;

    // clear game board 
    for ( let i=0; i<this.dimension; i++) {
      this.gameBoard[i] = []
      for ( let j=0; j<this.dimension; j++) {
        this.gameBoard[i][j]= false;
      }
    }

    //reset shapes
    this.resetShapes()

    this.checkShapes()


  }

  resetShapes() {
    this.shapes = []
    for (let i=0; i<this.numberOfShapes; i++) {
      this.shapes.push(this.shapeService.generateShape())
    }
  }

  shapeDropped(event:{cell:number[],index:number,shape:number}) {
    if ( event.cell[0] >= 0 && event.cell[1] >= 0) {

      // can the shape be placed?

      let shape = this.shapes[event.index]

      let allClear: boolean = this.placementCheck(shape,event.cell[0],event.cell[1])

      if (allClear) {
        for(let x=0; x<shape.dimension[0]; x++) {
          for(let y=0; y<shape.dimension[1]; y++) {
            if (shape.filled[x][y]) {
              this.gameBoard[event.cell[0] + x][event.cell[1] + y] = true
            }
          }
        }
        this.shapes[event.index] = JSON.parse(JSON.stringify(this.shapes[event.index]))
        this.shapes[event.index].hidden = true

        let allPlaced = true;

        this.shapes.forEach(s => {
          if (s.hidden == false) allPlaced = false
        })

        this.clearCompletedRowsAndColumns()

        if (allPlaced) this.resetShapes()

        this.checkShapes()

      }


    }

  }

  clearCompletedRowsAndColumns() {
    // need to check rows and columns before clearing in case they intersect

    let completeRows: number[] = []
    let rowComplete: boolean = true;
    for (let r=0; r<this.dimension; r++) {
      rowComplete = true
      for (let c=0; c<this.dimension; c++) {
        if ( !this.gameBoard[r][c] ) rowComplete = false
      }
      if (rowComplete) completeRows.push(r)
    }

    let completeColumns: number[] = []
    let columnComplete: boolean = true;
    for (let c=0; c<this.dimension; c++) {
      columnComplete = true
      for (let r=0; r<this.dimension; r++) {
        if ( !this.gameBoard[r][c] ) columnComplete = false
      }
      if (columnComplete) completeColumns.push(c)
    }

    // now clear them!

    let doubleUp: number = (completeColumns.length > 0 && completeRows.length > 0) ? 2 : 1;

    completeRows.forEach( r => {
      for (let c=0; c<this.dimension; c++) {
        this.gameBoard[r][c] = false
      }
      this.score = this.score + (doubleUp * 20)
    })

    completeColumns.forEach( c => {
      for (let r=0; r<this.dimension; r++) {
        this.gameBoard[r][c] = false
      }
      this.score = this.score + (doubleUp * 20)
    })
  }

  checkShapes() {
    let gameOver = true
    this.shapes.forEach(s => {
      if (!s.hidden && this.canBePlaced(s)) {
        s.canBePlaced = true
        gameOver = false
      }
      else s.canBePlaced = false
    })

    if ( gameOver && this.score > this.bestScore ) {
      this.bestScore = this.score
      localStorage.setItem("best-score", this.score.toString());
    }

    this.gameOver = gameOver

  }

  canBePlaced(shape: ShapeSpec):boolean {
    for (let cellX=0; cellX<(11-shape.dimension[0]); cellX++) {
      for (let cellY=0; cellY<(11-shape.dimension[1]); cellY++) {
        let allClear:boolean = true
        for(let x=0; x<shape.dimension[0]; x++) {
          for(let y=0; y<shape.dimension[1]; y++) {
            if (shape.filled[x][y] && this.gameBoard[cellX + x][cellY + y]) {
              allClear = false
            }
          }
        }
        if (allClear) return true        
      }
    }
    return false
  }

  placementCheck(shape:ShapeSpec,cellX:number,cellY:number):boolean {
    let allClear = true
    for(let x=0; x<shape.dimension[0]; x++) {
      for(let y=0; y<shape.dimension[1]; y++) {
        if (shape.filled[x][y] && this.gameBoard[cellX + x][cellY + y]) {
          allClear = false
        }
        if ((cellX + x) > 9) allClear = false
        if ((cellY + y) > 9) allClear = false
      }
    }    
    return allClear
  }



}
