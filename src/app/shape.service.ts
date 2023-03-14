import { Injectable } from '@angular/core';

export interface ShapeSpec {
  dimension: [number,number];
  filled: boolean[][];
  score: number;
  hidden: boolean;
  canBePlaced: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
   
  shapeLibrary: ShapeSpec[] = [
    {
      // single cell
      dimension: [1,1],
      filled: [[true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x2 block
      dimension: [2,2],
      filled: [[true,true],[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x2
      // **
      // *
      dimension: [2,2],
      filled: [[true,true],[true,false]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x2 block
      // **
      //  *
      dimension: [2,2],
      filled: [[true,false],[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x2 block
      // *
      // **
      dimension: [2,2],
      filled: [[true,true],[false,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x2 block
      //  *
      // **
      dimension: [2,2],
      filled: [[false,true],[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 3x2 block
      // ***
      //  *
      dimension: [3,2],
      filled: [[true,false],[true,true],[true,false]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 3x2 block
      //  *
      // ***
      dimension: [3,2],
      filled: [[false,true],[true,true],[false,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x3 block
      // *
      // **
      // *
      dimension: [2,3],
      filled: [[true,true,true],[false,true,false]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x3 block
      //  *
      // **
      //  *
      dimension: [2,3],
      filled: [[false,true,false],[true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 3x3 block
      dimension: [3,3],
      filled: [[true,true,true],[true,true,true],[true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 2x1 slab
      dimension: [2,1],
      filled: [[true],[true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 3x1 slab
      dimension: [3,1],
      filled: [[true],[true],[true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 4x1 slab
      dimension: [4,1],
      filled: [[true],[true],[true],[true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 5x1 slab
      dimension: [5,1],
      filled: [[true],[true],[true],[true],[true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 1x2 column
      dimension: [1,2],
      filled: [[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 1x3 column
      dimension: [1,3],
      filled: [[true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 1x4 column
      dimension: [1,4],
      filled: [[true,true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // 1x5 column
      dimension: [1,5],
      filled: [[true,true,true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // **
      // *
      // *
      dimension: [2,3],
      filled: [[true,true,true],[true,false,false]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // **
      //  *
      //  *
      dimension: [2,3],
      filled: [[true,false,false],[true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // *
      // *
      // **
      dimension: [2,3],
      filled: [[true,true,true],[false,false,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      //  *
      //  *
      // **
      dimension: [2,3],
      filled: [[false,false,true],[true,true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // ***
      //   *
      dimension: [3,2],
      filled: [[true,false],[true,false],[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // ***
      // *
      dimension: [3,2],
      filled: [[true,true],[true,false],[true,false]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      //   *
      // ***
      dimension: [3,2],
      filled: [[false,true],[false,true],[true,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    },
    {
      // *
      // ***
      dimension: [3,2],
      filled: [[true,true],[false,true],[false,true]],
      score: 1,
      hidden: false,
      canBePlaced: true
    }
  ]
  
  generateShape(): ShapeSpec {
    let index = Math.floor(Math.random() * (this.shapeLibrary.length - 1))
    return JSON.parse(JSON.stringify(this.shapeLibrary[index]))
  }
  
}
