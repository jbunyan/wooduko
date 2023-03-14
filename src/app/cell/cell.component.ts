import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnChanges {

  @Input()
  filled: boolean = false;

  @Input()
  display: boolean = true;


  filledClass: string = ""
  displayClass: string = ""

  constructor() {
    this.filledClass = this.filled ? 'cell-filled' : 'cell-clear'
    this.displayClass = this.display ? 'cell-visible' : 'cell-hidden'
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filledClass = this.filled ? 'cell-filled' : 'cell-clear'      
    this.displayClass = this.display ? 'cell-visible' : 'cell-hidden'
  }

}
