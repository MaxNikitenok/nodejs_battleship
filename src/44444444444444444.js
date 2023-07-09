// const MM =
//   [
//     [ 2, 8, 4, 1 ],
//     [ 4, 2, 0, 9 ],
//     [ 1, 7, 5, 4 ]
//   ]

// // 2. Вывести матрицу в цикле
// let str = '';

// for (let i=0; i<3; i++)
// {
//   str+='\n'
//   for (let j=0; j<4; j++) {
    
//     str += MM[i][j]
//   if(i===2&&j===3) {
//     str+='\n'
//   }
//   }
    
// }

// console.log(str)
// щщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщщ

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
  


const c = [
   {
    position: { x: 0, y: 0 },
    direction: true,
    type: 'large',
    length: 3
  },
  // {
  //   position: { x: 0, y: 0},
  //   direction: false,
  //   type: 'large',
  //   length: 1
  // }
]

const infoFull=[]
const infoArea=[]


const f = (c) => {
  
  
  
  c.forEach(o => {
    if(o.direction) {
      for (let j = 0; j<o.length; j++) {
       m[o.position.y+j][o.position.x] = 1;
      infoFull.push({x: o.position.x, y: o.position.y+j})
        if(j===0&&o.length===1){
          infoArea.push(
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
          infoArea.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j-1},
            {x: o.position.x, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j-1},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        if(j===o.length-1&&j!==0){
          infoArea.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x-1, y: o.position.y+j+1},
            {x: o.position.x, y: o.position.y+j+1},
            {x: o.position.x+1, y: o.position.y+j+1},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        if(j!==0&&j!==o.length-1){
          infoArea.push(
            {x: o.position.x-1, y: o.position.y+j},
            {x: o.position.x+1, y: o.position.y+j}            
          )
        }
        
      }
    } else if (!o.direction)
    {
      for (let j = 0; j<o.length; j++) {
      m[o.position.y][o.position.x+j] = 1;
      infoFull.push({x: o.position.x+j, y: o.position.y})
        if(j===0&&o.length===1){
          infoArea.push(
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
          infoArea.push(
            {x: o.position.x+j, y: o.position.y+1},
            {x: o.position.x+j-1, y: o.position.y+1},
            {x: o.position.x+j-1, y: o.position.y},
            {x: o.position.x+j-1, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y-1},       
          )
        }
        if(j===o.length-1&&j!==0){
          infoArea.push(
            {x: o.position.x+j, y: o.position.y+1},
            {x: o.position.x+j+1, y: o.position.y+1},
            {x: o.position.x+j+1, y: o.position.y},
            {x: o.position.x+j+1, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y-1},             
          )
        }
        if(j!==0&&j!==o.length-1){
          infoArea.push(
            {x: o.position.x+j, y: o.position.y-1},
            {x: o.position.x+j, y: o.position.y+1}            
          )
        }
      }
    }
     
  })
  
  const area = infoArea.filter(coord=>{
    return coord.x>=0&&coord.y>=0
  })
  return (area)
}




console.log(m, infoFull, 'infoArea',  f(c))
// 000000000000000000000000000000000000000000000000000000


// function cLog() {
//   let str = '';    
//   for (let i = 0; i<=10; i++) {
//     str += [0,11].includes(i) ? '\n   ' + '0  1  2  3  4  5  6  7  8  9' + '\n' : `${i-1}  ` + Array(10).fill('0',0,10).join('  ') + '\n';    
//   }
//   return str; 
// }

// console.log(cLog(10));

