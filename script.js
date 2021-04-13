import {createBoard} from './minesweeper.js';

const boardSize=10;
const noOfTiles=2;
const grid=(createBoard(boardSize,noOfTiles));
console.log(grid)
const board=document.querySelector('.board');
let mineLeft=document.querySelector('[data-mine-count]')

grid.forEach((row)=>{
  row.forEach(elm=>{
    board.append(elm.element);
    elm.element.addEventListener('click',()=>{

    })
    elm.element.addEventListener('contextmenu',e=>{
      e.preventDefault();
    })
  })
 
})
board.style.setProperty("--size",boardSize);
mineLeft.textContent=noOfTiles;
