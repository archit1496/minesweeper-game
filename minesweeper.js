export const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardsize, noOfMines) {
  const board = [];

  const minePosition = getMinePosition(boardsize, noOfMines);
  console.log(minePosition)
  for (let x = 0; x < boardsize; x++) {
    let row = [];
    for (let y = 0; y < boardsize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUS.HIDDEN;
      let tile = {
        element,
        x,
        y,
        mine:minePosition.some(elm=>positionMatch(elm,{x,y})),
        get status() {
          return this.element.dataset.status;
        },
        set setStatus(value) {
          this.element.dataset.status = value;
        },
      };
      // const board=document.querySelector('.board');
      // board.append(element);
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}


export function markTile(tile){
  if(tile.status!==TILE_STATUS.HIDDEN && tile.status!==TILE_STATUS.MARKED)
  {
      return 
  }
  if(tile.status ===TILE_STATUS.MARKED){
      tile.setStatus=TILE_STATUS.HIDDEN;
  }
  else{
      tile.setStatus=TILE_STATUS.MARKED;
  }
}

export function revealTile(board,tile){
    console.log(tile.x,tile.y)
    if(tile.status!==TILE_STATUS.HIDDEN )
    {
        return; 
    }
    if(tile.mine)
    {
        tile.setStatus=TILE_STATUS.MINE;
        return;
    }
    tile.setStatus=TILE_STATUS.NUMBER;
    const adjacentTile=countAdjacentTile(board,tile);
    const mines=adjacentTile.filter(elm=>elm.mine);
    if(mines.length==0)
    {
        adjacentTile.forEach(revealTile.bind(null,board))
    }
    else{
        tile.element.innerText=mines.length;
    }
}
function getMinePosition(boardSize, noOfMines) {
  const position = [];
  while (position.length < noOfMines) {
    const Position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!position.some((p) => positionMatch(p, Position))) {
      position.push(Position);
    }
  }
  return position;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size) {
    return Math.floor(Math.random()* size);
}

function countAdjacentTile(board,{x,y}){
   const tile=[];
   for(let xOffset=-1;xOffset<=1;xOffset++)
   {
       for(let yOffset=-1;yOffset<=1;yOffset++)
       {
           const validTile=board[x+xOffset]?.[y+yOffset]
           if(validTile)
           {
               tile.push(validTile);
           }
       }
   }

   return tile;
}

export function checkGameWin(board){
    return board.every((row)=>{
         return row.every((elm)=>{
             return (elm.status===TILE_STATUS.NUMBER || (elm.mine && (elm.status===TILE_STATUS.HIDDEN || elm.status===TILE_STATUS.MARKED)))    
         })
    })
}

export function checkGameLose(board){

  let mineCount=0;
  board.forEach((row)=>{
     row.forEach((elm)=>{
         if(elm.status===TILE_STATUS.MINE)
         {
            mineCount++;
         }
     
     });
  })
  if(mineCount>0)
   return true;
  else
   return false;
}