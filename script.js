var inputdir = { x: 0, y: 0 };
var foodaudio = new Audio("food.mp3");
var gameover = new Audio("gameover.mp3");
var move = new Audio("move.mp3");
var music = new Audio("music.mp3");
var prevtime = 0;
var speed = 10;
var snakearr = [{ x: 13, y: 15 }];
var food = { x: 6, y: 7 };
var board = document.querySelector(".board");
var score = 0;
var scorebox = document.querySelector(".scorebox");

//fps aur screen dynamic banane ke liye
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - prevtime) / 1000 < 1 / speed) {
    return;
  }
  prevtime = ctime;
  gameengine();
}

window.requestAnimationFrame(main);

function collapse(snakearr) {
  if (
    snakearr[0].x >= 18 ||
    snakearr[0].x < 0 ||
    snakearr[0].y >= 18 ||
    snakearr[0].y < 0
  ) {
    return true;
  }
  for (var i = 1; i < snakearr.length; i++) {
    if (snakearr[0].x === snakearr[i].x && snakearr[0].y === snakearr[i].y) {
      return true;
    }
  }
  return false;
}

function gameengine() {
  //IF COLLAPSE
  if (collapse(snakearr)) {
    scorebox.innerHTML = "Score : 0";
    gameover.play();
    music.pause();
    inputdir = { x: 0, y: 0 };
    alert("Your game is over,Press any key to restart!");
    music.play();
    score = 0;
    snakearr = [{ x: 13, y: 15 }];
  }
  //if snake has founded the food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodaudio.play();
    score += 1;
    scorebox.innerHTML = "Score :" + score;
    snakearr.unshift({
      x: snakearr[0].x + inputdir.x,
      y: snakearr[0].y + inputdir.y,
    });
    var a = 2;
    var b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //MOVING SNAKE
  for (var i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputdir.x;
  snakearr[0].y += inputdir.y;

  //CREATING SNAKE AND FOOD DIV IN BOARD
  board.innerHTML = "";
  snakearr.forEach(function (e, index) {
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeelement.classList.add("head");
    } else {
      snakeelement.classList.add("snakebody");
    }
    board.appendChild(snakeelement);
  });
  //DISPLAY FOOD
  foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);
}

window.addEventListener("keydown", function (event) {
  inputdir = { x: 0, y: 1 };
  move.play();
  switch (event.key) {
    case "ArrowDown":
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    case "ArrowUp":
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      break;
    case "ArrowLeft":
      inputdir.x = -1;
      inputdir.y = 0;
      break;
  }
});
