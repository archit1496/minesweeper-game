import {createBoard,markTile , TILE_STATUS,revealTile} from './minesweeper.js';

const boardSize=10;
const noOfTiles=10;
const grid=(createBoard(boardSize,noOfTiles));
console.log(grid)
const board=document.querySelector('.board');
let mineLeft=document.querySelector('[data-mine-count]')

grid.forEach((row)=>{
  row.forEach(elm=>{
    board.append(elm.element);
    elm.element.addEventListener('click',()=>{
      revealTile(elm);
    })
    elm.element.addEventListener('contextmenu',e=>{
      console.log("double")
      e.preventDefault();
      markTile(elm);
      listOfMinesLeft();
    })
  })
 
})

function listOfMinesLeft(){
  const markedTilesCount=grid.reduce((count,row)=>{
      return (count + row.filter(elm=>elm.status===TILE_STATUS.MARKED).length)
  },0)

  mineLeft.textContent=noOfTiles-markedTilesCount;
}
board.style.setProperty("--size",boardSize);
mineLeft.textContent=noOfTiles;
