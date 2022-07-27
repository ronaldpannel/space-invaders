const gameBoard = document.getElementById("gameWrapper");
let myCanvas;
let spaceship;
let invader;
let startButton;
let gameTimer;
let winMessage;
let loseMessage;
let lowestTime;
let bestScore = 0;
let timeCounter = 0;
let dataStore;
let dataGet;
let particles = [];
let invaders = [];
let shootingStars = [];
let invaderImg;
let rocketImg;
let bgImage;
let laserSound;
let explosionSound;
function preload() {
  invaderImg = loadImage("invader.png");
  rocketImg = loadImage("rocket.png");
  bgImage = loadImage("bg2.jpg");
  laserSound = loadSound("laser1.wav");
  explosionSound = loadSound("explosion.mp3");
}

function setup() {
  myCanvas = createCanvas(600, 400);
  myCanvas.parent("gameWrapper");
  explosionSound.playMode("restart");
  dataGet = getItem("score");
  lowestTime = select("#highestScore");
  lowestTime.html(dataGet);

  spaceship = new Spaceship();
  particle = new Particle(300, 300);
  for (let i = 0; i < 10; i++) {
    shootingStars.push(new ShootingStar(650, random(-30, 200), random(2, 4)));
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      invaders.push(new Invader(i * 60 + 50, j * 35 + 50));
    }
  }
  gameTimer = select("#score");
  function timeIt() {
    timeCounter++;
    gameTimer.html(timeCounter);
  }
  sTimeOut = setInterval(timeIt, 1000);

  startButton = createButton("Restart Game");
  startButton.class("startBtn");
  startButton.parent("gameWrapper");
}

function draw() {
  background(bgImage);
  //noLoop()
  spaceship.show();
  spaceship.move();

  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].show();
    shootingStars[i].update();
    shootingStars[i].edges();
  }

  let edge = false;
  for (let i = 0; i < invaders.length; i++) {
    if (
      invaders[i].x + invaders[i].r > width ||
      invaders[i].x - invaders[i].r < 0
    ) {
      edge = true;
    }
  }
  if (edge) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].move();

    for (let j = 0; j < invaders.length; j++) {
      if (particles[i].hits(invaders[j])) {
        invaders[(i, j)].remove();
        particles[i].remove();
        explosionSound.play();
      }
    }
  }
  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i].toDelete) {
      invaders.splice(i, 1);
    }
    if (invaders.length == 0) {
      winMessage = select("#winMessage");
      winMessage.html("You Have Saved the World");
      clearTimeout(sTimeOut);
      console.log(timeCounter);
      console.log(bestScore);
      dataStore = storeItem("score", timeCounter);
    }
  }
  for (let i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();
    invaders[i].gameOver();

    if (invaders[i].gameOver()) {
      loseMessage = select("#loseMessage");
      loseMessage.html("The Earth Has Been Invaded");
      clearTimeout(sTimeOut);
      noLoop();
    }
  }
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].toDelete) {
      particles.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (key != 32) {
    spaceship.setDir(0);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    particles.push(new Particle(spaceship.x, height - 30));
    laserSound.play();
  }
  if (keyCode === RIGHT_ARROW) {
    spaceship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    spaceship.setDir(-1);
  }
}
