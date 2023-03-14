import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ShapeSpec } from '../shape.service';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit, OnChanges {

  @Input()
  shape: ShapeSpec = { dimension: [0,0], filled: [], score: 0, hidden: false, canBePlaced: true }

  @Input()
  id: number = 0;

  @Output() dropEvent = new EventEmitter<any>();

  public xValues: number[] = []
  public yValues: number[] = []
  public startX: number = 0;
  public startY: number = 0;
  public hiddenClass: string = ""

  constructor() {
  }

  ngOnInit() {
    this.xValues = Array.from(Array(this.shape.dimension[0]),(x,i)=>i); // [0,1,2,3,4]
    this.yValues = Array.from(Array(this.shape.dimension[1]),(x,i)=>i); // [0,1,2,3,4]  
  }

  ngOnChanges() {
    this.hiddenClass = this.shape.hidden ? "shape-hidden" : ""
  }

  start(event: any) {
    console.log(event)
    this.startX = event.event.clientX - 35;
    this.startX = this.startX - (Math.floor(this.startX/150) * 150);
    this.startY = event.event.clientY - 400;
  }

  drop(event: any) {
    console.log(event)
    
    console.log(`drop event! x: ${event.distance.x}, y: ${event.distance.y}, startX: ${this.startX}`)
    let dropCell: [number,number] = this.getDropCell(event.dropPoint.x, event.dropPoint.y)
    if ( dropCell[0] >= 0 && dropCell[0] < 10 && dropCell[1] >= 0 && dropCell[1] < 10 ) {
      console.log({"cell":dropCell,"index":this.id,"shape":this.shape})
      this.dropEvent.emit({"cell":dropCell,"index":this.id,"shape":this.shape})
    }
    event.source._dragRef.reset();
  }

  getDropCell(dropX: number, dropY: number): [number,number] {
    let y = Math.round((dropY - this.startY - 125)/25)
    let x = Math.round((dropX - this.startX - 35)/25)
    return [x,y]
  }


}
