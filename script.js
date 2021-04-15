import {createBoard,markTile , TILE_STATUS,revealTile,checkGameWin,checkGameLose} from './minesweeper.js';

const boardSize=10;
const noOfTiles=10;
const grid=(createBoard(boardSize,noOfTiles));
console.log(grid)
const boardElement=document.querySelector('.board');
let mineLeft=document.querySelector('[data-mine-count]')
const messageText=document.querySelector('.subtext');

grid.forEach((row)=>{
  row.forEach(elm=>{
    boardElement.append(elm.element);
    elm.element.addEventListener('click',()=>{
      revealTile(grid,elm);
      checkGameEnd(grid);
    })
    elm.element.addEventListener('contextmenu',e=>{
      console.log("double")
      e.preventDefault();
      markTile(elm);
      listOfMinesLeft();
    })
  })
 
})
function checkGameEnd(board){
  const win=checkGameWin(board);
  const lose=checkGameLose(board);
  
  if(win || lose)
  {
    boardElement.addEventListener('click',stopProp,{capture:true})
    boardElement.addEventListener('contextmenu',stopProp,{capture:true});
  }
  if(win)
  {
    messageText.textContent="You Won!";
  }
  if(lose)
  {
    messageText.textContent="You lost";
    board.forEach(row=>{
      row.forEach(elm=>{
        if(elm.status===TILE_STATUS.MARKED)
          elm.setStatus=TILE_STATUS.MINE;
        if(elm.mine)
        {
          revealTile(board,elm)
        }
      })
    })
  }
}

function stopProp(e){
  e.stopImmediatePropagation()
}

function listOfMinesLeft(){
  const markedTilesCount=grid.reduce((count,row)=>{
      return (count + row.filter(elm=>elm.status===TILE_STATUS.MARKED).length)
  },0)

  mineLeft.textContent=noOfTiles-markedTilesCount;
}
boardElement.style.setProperty("--size",boardSize);
mineLeft.textContent=noOfTiles;
