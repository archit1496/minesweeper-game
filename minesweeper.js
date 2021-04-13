const TILE_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKEDL: "marked",
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
