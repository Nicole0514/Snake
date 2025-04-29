const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreEl = document.getElementById("score");
const eatSound = document.getElementById("eatSound");
const crashSound = document.getElementById("crashSound");

let box = 20; // 每格大小（後續可調）
let snake = [];
let food = {};
let direction = "RIGHT";
let score = 0;
let gameInterval = null;
let speed = 150;
let paused = false;

// 畫布大小跟隨視窗
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 產生食物
function spawnFood() {
  const cols = Math.floor(canvas.width / box);
  const rows = Math.floor(canvas.height / box);
  return {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
  };
}

function resetGameState() {
  snake = [{ x: box * 5, y: box * 5 }];
  direction = "RIGHT";
  food = spawnFood();
  score = 0;
  speed = 150;
  paused = false;
  scoreEl.textContent = "分數：0";
}

function drawGame() {
  if (paused) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 畫蛇
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? "#0f0" : "#3f3";
    ctx.fillRect(s.x, s.y, box, box);
  });

  // 畫食物
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);

  // 移動
  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // 撞牆或撞到自己
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    crashSound.play();
    screenShake();
    clearInterval(gameInterval);
    pauseBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    return;
  }

  snake.unshift(head);

  // 吃到食物
  if (head.x === food.x && head.y === food.y) {
    eatSound.play();
    score++;
    scoreEl.textContent = "分數：" + score;
    food = spawnFood();

    // 加速
    if (speed > 50) {
      speed -= 5;
      clearInterval(gameInterval);
      gameInterval = setInterval(drawGame, speed);
    }
  } else {
    snake.pop();
  }
}

function screenShake() {
  document.body.style.transition = "0.1s";
  document.body.style.transform = "translate(5px, 5px)";
  setTimeout(() => {
    document.body.style.transform = "translate(-5px, -5px)";
  }, 100);
  setTimeout(() => {
    document.body.style.transform = "translate(0, 0)";
  }, 200);
}

function startGame() {
  resetGameState();
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  gameInterval = setInterval(drawGame, speed);
}

function restartGame() {
  clearInterval(gameInterval);
  startGame();
}

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶️ 繼續" : "⏸️ 暫停";
}

function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// 監聽事件
document.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", togglePause);

// 防止方向鍵捲動畫面
window.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
});
