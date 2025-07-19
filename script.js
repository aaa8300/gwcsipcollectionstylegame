//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let gameStarted = false;
let font;
let backgroundImg, fallingObjectImg, catcherImg;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/starsbackground.jpeg");
  catcherImg = loadImage("assets/trashbinimage.png");

  fallingObjectImg = loadImage("assets/trashimage.png");
  font = loadFont('assets/Audiowide-Regular.ttf');
}

/* SETUP RUNS ONCE */
function setup() {
  textFont(font);
  createCanvas(400, 400);


  catcherImg.resize(120, 0);
  fallingObjectImg.resize(50, 0);


  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 380, "k");
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0);
  fallingObject.rotationLock = true;
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224, 224, 224);

  image(backgroundImg, 0, 0);

  if (!gameStarted) {
    // Move sprites off screen
    catcher.x = -100;
    fallingObject.x = -100;
    fallingObject.y = -100;

    textAlign(CENTER);
    fill("#FFFFFF");
    textSize(20);

    // Game Title
    textSize(32);
    text("Space Cleanup", width / 2, height / 2 - 100);

    // Mission Briefing
    textSize(14);
    text("Massive debris detected in low orbit.\nAuto-bin engaged.", width / 2, height / 2 - 40);

    // Controls & Instructions
    textSize(12);
    fill(200);
    text("Use <-  -> to intercept   |   Catch falling trash.\nDon’t let space junk reach Earth!", width / 2, height / 2 + 20);

    // Start Prompt
    textSize(18);
    fill(200, 255, 200);
    text("Click to Begin Mission", width / 2, height / 2 + 80);


    return;
  }


  // if fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    score--;
  }

  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  }
  else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  }
  else {
    catcher.vel.x = 0;
  }

  // stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  }
  else if (catcher.x > 350) {
    catcher.x = 350;
  }


  // if fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score++;

    // Increase catcher size a little
    catcherImg.resize(120, 0);
  }

  // draw score to screen
  textAlign(LEFT, BASELINE);
  fill(0, 128, 128);
  textSize(20);
  text("Score: " + score, 20, 30);

  // allSprites.debug = mouse.pressing();


  // Lose condition
  if (score < 0) {
    youLose();
  }

  // Win condition
  if (score > 9) {
    youWin();
  }

}



function restart() {
  score = 0;
  catcher.x = 200;
  catcher.y = 380;
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.vel.y = random(1, 5);
  fallingObject.direction = "down";
  gameStarted = false;
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;

    // Move catcher and falling object to starting positions
    catcher.x = 200;
    catcher.y = 380;
    fallingObject.x = random(width);
    fallingObject.y = 0;
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
  }
}

function youLose() {
  // Move sprites off screen
  catcher.x = -100;
  fallingObject.x = -100;
  fallingObject.y = -100;

  // Show "You Lose" message
  // fill(255, 0, 0);

  fill(255, 0, 0, 150);
  rect(0, 0, width, height);
  fill(255);

  textSize(15);
  text("Too Much Trash Escaped! \nClick to Retry Mission", 120, 200);
  textAlign(CENTER, CENTER);
  // Restart if mouse is pressed
  if (mouseIsPressed) {
    restart();
  }

}


function youWin() {
  catcher.x = -100;
  fallingObject.x = -100;
  fallingObject.y = -100;

  // fill(0, 200, 0);

  fill(0, 255, 0, 150);
  rect(0, 0, width, height);
  fill(255);

  textSize(15);
  text("Mission Complete! \nClick to Launch Again", 120, 200);
  textAlign(CENTER, CENTER);

  // Restart if mouse is pressed
  if (mouseIsPressed) {
    restart();
  }

}

