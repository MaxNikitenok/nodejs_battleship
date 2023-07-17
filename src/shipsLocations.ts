import { IShips } from "./types";

export const locationsParser = (ships: IShips) => {
  
  const m = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];

  ships.firedShots = [];

  ships.ships.forEach((o: {
    position: {
      x: number;
      y: number;
    };
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge';
      shipPositions: {
        x: number;
        y: number;
      }[];
      freeAreaPositions: {
        x: number;
        y: number;
      }[];
      hits: {
        x: number;
        y: number;
      }[];
  }) => {

      o.shipPositions = [],
      o.freeAreaPositions = [],
      o.hits = o.shipPositions;

    if(o.direction) {
      for (let j = 0; j<o.length; j++) {
       m[o.position.y+j][o.position.x] = 1;
      o.shipPositions.push({x: o.position.x, y: o.position.y+j})
        if(j===0&&o.length===1){
          o.freeAreaPositions.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j-1},
            {x: o.position.x, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j+1},
            {x: o.position.x, y: o.position.y+j+1},
            {x: o.position.x+1, y: o.position.y+j+1},
          )
        }
        if(j===0&&o.length!==1){
          o.freeAreaPositions.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j-1},
            {x: o.position.x, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        if(j===o.length-1&&j!==0){
          o.freeAreaPositions.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j+1},
            {x: o.position.x, y: o.position.y+j+1},
            {x: o.position.x+1, y: o.position.y+j+1},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        if(j!==0&&j!==o.length-1){
          o.freeAreaPositions.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        
      }
    } else if (!o.direction)
    {
      for (let j = 0; j<o.length; j++) {
      m[o.position.y][o.position.x+j] = 1;
      o.shipPositions.push({x: o.position.x+j, y: o.position.y})
        if(j===0&&o.length===1){
          o.freeAreaPositions.push(
            {x: o.position.x+j-1, y: o.position.y},
            {x: o.position.x+j-1, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y-1},
            {x: o.position.x+j+1, y: o.position.y-1},
            {x: o.position.x+j+1, y: o.position.y},
            {x: o.position.x+j-1, y: o.position.y+1},
            {x: o.position.x+j, y: o.position.y+1},
            {x: o.position.x+j+1, y: o.position.y+1},
          )
        }
        if(j===0&&o.length!==1){
          o.freeAreaPositions.push(
            {x: o.position.x+j, y: o.position.y+1},
            {x: o.position.x+j-1, y: o.position.y+1},
            {x: o.position.x+j-1, y: o.position.y},
            {x: o.position.x+j-1, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y-1},       
          )
        }
        if(j===o.length-1&&j!==0){
          o.freeAreaPositions.push(
            {x: o.position.x+j, y: o.position.y+1},
            {x: o.position.x+j+1, y: o.position.y+1},
            {x: o.position.x+j+1, y: o.position.y},
            {x: o.position.x+j+1, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y-1},             
          )
        }
        if(j!==0&&j!==o.length-1){
          o.freeAreaPositions.push(
            {x: o.position.x+j, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y+1}            
          )
        }
      }
    }
     
  o.freeAreaPositions = o.freeAreaPositions.filter((coord: { x: number; y: number; })=>{
    return coord.x>=0&&coord.y>=0
  })
  })
  
  return (ships)
}