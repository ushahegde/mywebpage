const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(30,30); // Scale to 30px blocks
var mPause = false;
const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function createMatrix(w, h) {
  const matrix = [];
  while (h--) matrix.push(new Array(w).fill(0));
  return matrix;
}
/************/
function randomNumber() {
  return Math.floor(Math.random() * 9) + 1; // 1 to 5
}
/************/
function createPiece(type) {
  switch (type) {
    case 'T':
      return [
        [0, 0, 0],
        [randomNumber(), randomNumber(), randomNumber()],
        [0, 0, 0], /*changed from 0 r 0*/
      ];
    case 'O':
      return [
        [randomNumber(), randomNumber()],
        [randomNumber(), randomNumber()],
      ];
    case 'L':
      return [
        [0, randomNumber(), 0],
        [0, randomNumber(), 0],
        [0, 0,0],/*randomNumber(), randomNumber()],*/
      ];
    case 'J':
      return [
        [0, randomNumber(), 0],[0,0,0],[0,0,0]];
      /*  [0, randomNumber(), 0],
        [randomNumber(), randomNumber(), 0],
      ];*/
    case 'I':
      return [
        [0, randomNumber(), 0, 0],
        [0, randomNumber(), 0, 0],
        [0, randomNumber(), 0, 0],
        [0, randomNumber(), 0, 0],
      ];
   /* case 'S':
      return [
        [0, randomNumber(), randomNumber()],
        [randomNumber(), randomNumber(), 0],
        [0, 0, 0],
      ];
    case 'Z':
      return [
        [randomNumber(), randomNumber(), 0],
        [0, randomNumber(), randomNumber()],
        [0, 0, 0],
      ];*/
  }
}
/******/
var isBlinking = false;
function drawMatrix(matrix, offset) {
 if(mPause)
    return;
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
     
        const isBlinkingBlock = isBlinking && blinkingBlocks.some(([bx, by]) => bx === x + offset.x && by === y + offset.y);

// Draw cell border
context.strokeStyle = "white";
context.lineWidth = 0.1;


//context.strokeRect(x + offset.x, y + offset.y, 1, 1);
 const col = isBlinkingBlock?"red":colors[value];
      draw3DBlock(context, x+offset.x, y+offset.y, 1, col);
//draw3DBlock(context,x,y,offset,colors[value]);

// Fill color: red if blinking
context.fillStyle = isBlinkingBlock ? 'red' : colors[value];
//context.fillRect(x + offset.x, y + offset.y, 1, 1);

// Draw the number
context.fillStyle = isBlinkingBlock?'red':'white';
context.font = isBlinkingBlock?'0.9px Arial':'0.8px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText(value, x + offset.x + 0.5, y + offset.y + 0.7);

      } else{
          // Draw cell border
        context.strokeStyle = "#999";
        context.lineWidth = 0.005;
        context.strokeRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}
/**********
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.strokeStyle= "white";
        context.lineWidth=0.1;
        context.strokeRect(x + offset.x, y + offset.y, 1, 1);
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}
*/
function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (
        m[y][x] !== 0 &&
        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}
/*********/
function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    
    merge(arena, player);
    
    check3SumToTen(); // ✅ Check adjacent sums 3 adjacent cesll
    checkSumToTen();
    //arenaSweep();
    playerReset();
  }
  dropCounter = 0;
}
/*********
function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
  }
  dropCounter = 0;
}
*/
function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerRotate(dir) {
  rotate(player.matrix, dir);
  if (collide(arena, player)) {
    rotate(player.matrix, -dir);
  }
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}
var mScore =0;
function arenaSweep() {
  outer: for (let y = arena.length - 1; y >= 0; y--) {
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] === 0) continue outer;
    }
    // Visual effect: highlight row before clearing
    flashRow(y);

    // Clear row after short delay
    setTimeout(() => {
      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      y++;
    }, 1000);

   if(y>0){
   	mScore+=100;
   	showScore();
   }
  }
}

function playerReset() {
  const pieces = 'TJLOI';
  player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
  player.pos.y = 0;
  player.pos.x = Math.floor((arena[0].length - player.matrix[0].length) / 2);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    showDialog('Game Over'+" <br><br>Your score is "+mScore);
    mPause = true;
  }
}
var TETRIS_BACKGROUND = '#dfdfdf';
function draw() {
  context.fillStyle = TETRIS_BACKGROUND;  
  context.fillRect(0, 0, canvas.width, canvas.height);
   

  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let shouldDraw = true;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  if(!mPause){
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  
  }
  if(shouldDraw)
     requestAnimationFrame(update);
}

function flashRow(rowIndex) {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      arena[rowIndex].fill(i % 2 === 0 ? 0 : 8); // 8 = white flash color
    },  50*i);
  }
}

function showScore(){
   var scoreLabel = document.getElementById("score");
    console.log("mscore is"+mScore);
   scoreLabel.innerHTML = mScore;
}
/*********/
function checkSumToTen() {
  const directions = [
    [0, 1],  // down
    [1, 0],  // right
    [0, -1], // up
    [-1, 0], // left
  ];

  const toClear = [];
  const alreadyMarked = new Set(); // To prevent duplicate clearing

  for (let y = 0; y < arena.length; y++) {
    for (let x = 0; x < arena[y].length; x++) {
      const val = arena[y][x];
      if (val === 0) continue;

      const key = `${x},${y}`;
      if (alreadyMarked.has(key)) continue;

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const neighborKey = `${nx},${ny}`;

        if (
          ny >= 0 &&
          ny < arena.length &&
          nx >= 0 &&
          nx < arena[0].length &&
          arena[ny][nx] !== 0 &&
          val + arena[ny][nx] === 10 &&
          !alreadyMarked.has(neighborKey)
        ) {
          // First valid match — mark both
          toClear.push([x, y]);
          toClear.push([nx, ny]);

          playSound();
          alreadyMarked.add(key);
          alreadyMarked.add(neighborKey);
          break; // Stop after first match for this cell
        }
      }
    }
  }

  if (toClear.length === 0) return;


  blinkingBlocks = toClear;
  isBlinking = true;

  let blinkDuration = 300;
  setTimeout(() => {
    toClear.forEach(([x, y]) => {
      arena[y][x] = 0;
    });

    isBlinking = false;
    blinkingBlocks = [];
    console.log("to clear length is"+toClear.length);
    mScore += toClear.length * 100;
    showScore();
  }, blinkDuration * 2);
}
/*******************/
function check3SumToTen() {
  const toClear = [];
  const alreadyMarked = new Set();

  const width = arena[0].length;
  const height = arena.length;

  // Helper to mark cells
  const markCells = (cells) => {
    for (const [x, y] of cells) {
      alreadyMarked.add(`${x},${y}`);
      toClear.push([x, y]);
      playSound();
    }
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      if (arena[y][x] === 0 || alreadyMarked.has(key)) continue;

      const val = arena[y][x];

      // Check horizontal triplet
      if (x + 2 < width) {
        const vals = [
          arena[y][x],
          arena[y][x + 1],
          arena[y][x + 2]
        ];
        const keys = [
          `${x},${y}`,
          `${x + 1},${y}`,
          `${x + 2},${y}`
        ];
        if (vals.every(v => v !== 0) &&
            keys.every(k => !alreadyMarked.has(k)) &&
            vals.reduce((a, b) => a + b, 0) === 10) {
          markCells([
            [x, y],
            [x + 1, y],
            [x + 2, y]
          ]);
          
          continue; // Skip other checks for this cell
        }
      }

      // Check vertical triplet
      if (y + 2 < height) {
        const vals = [
          arena[y][x],
          arena[y + 1][x],
          arena[y + 2][x]
        ];
        const keys = [
          `${x},${y}`,
          `${x},${y + 1}`,
          `${x},${y + 2}`
        ];
        if (vals.every(v => v !== 0) &&
            keys.every(k => !alreadyMarked.has(k)) &&
            vals.reduce((a, b) => a + b, 0) === 10) {
          markCells([
            [x, y],
            [x, y + 1],
            [x, y + 2]
          ]);
          // No `continue` here — it's okay if a vertical match happens after no horizontal
        }
      }
    }
  }

  if (toClear.length === 0) return;

  blinkingBlocks = toClear;
  isBlinking = true;

  let blinkDuration = 300;
  setTimeout(() => {
    toClear.forEach(([x, y]) => {
      arena[y][x] = 0;
    });

    isBlinking = false;
    blinkingBlocks = [];

    mScore += toClear.length * 100;
    showScore();
  }, blinkDuration * 2);
}

/******************/
function pauseGame(){
   mPause = true;
}
/******************/
function startGame(){
  var btn = document.getElementById("startbtn");
   if(mPause){
      mPause = false;
       btn.innerHTML = '&#9208;';
   } else{
       mPause = true;
       btn.innerHTML = '&#9658;';
   }
}
/*********/
var SND_FILE = "tetrisPoint.mp3";
function playSound(){
   let snd = new Audio(SND_FILE);
   console.log("snd is"+snd);
   snd.play();
}
/**********************/
function draw3DBlock(ctx, x, y, size, color) {
  // Base fill
  if(color=="red"){
      ctx.fillStyle="white";
  }else{
  ctx.fillStyle = color;
  }
  
  ctx.fillRect(x, y, 0.95, 0.95);

  // 3D effect: highlight and shadow colors
  const highlight = "#ffffff80"; // semi-transparent white
  const shadow = "#00000040";    // semi-transparent black

  ctx.lineWidth = 0.2;
  // Draw top and left highlight
  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.lineTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.strokeStyle = highlight;
  ctx.stroke();

  // Draw bottom and right shadow
  ctx.beginPath();
  ctx.moveTo(x + size, y);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x, y + size);
  ctx.strokeStyle = shadow;
  ctx.stroke();
  // Optional: outline for separation
 // ctx.strokeStyle = "#ffffff20"; // subtle border
  //ctx.strokeRect(x, y, 1, 1);
}
/***********/
function showDialog(msg){
   dialogmsg = document.getElementById("dialogmsg");
   dialogmsg.innerHTML = msg;//+" <br><br>Your score is "+mScore;
   dialog.showModal();
}
/**********/
const colors = [
  null,
  'rebeccapurple',
  'royalblue',
  'darkgreen',
  'magenta',
  'tomato',
  'maroon',
  'steelblue',
  'orange','green'
];

const arena = createMatrix(10, 16);

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
};

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') playerMove(-1);
  else if (event.key === 'ArrowRight') playerMove(1);
  else if (event.key === 'ArrowDown') playerDrop();
  else if (event.key === 'q') playerRotate(-1);
  else if (event.key === 'w') playerRotate(1);
});

// Add event listener for page visibility changes. Stop animation when hidden
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    shouldDraw = false; 
  } else { 
    shouldDraw = true;
    update();
  }
});
const dialog = document.querySelector("dialog"); 
const closeButton = document.querySelector("dialog button");

 

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
playerReset();
update();

function showHelp(){
    var str = "If adjacent cells add to 10, they merge and you score.<br> If the cells touch the upper border of grid, game will be over.";
    showDialog(str);  
}
