// Original game created by Daniel Shiffman http://codingtra.in
// AI created by Brayden Cloud

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */
var shouldPrint = true;
var birdCount = 500;
var birds = [];
var savedBirds = [];
var bestBird = undefined;
var highestFitness = 0;

var fileBird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;


function preload() {
  pipeBodySprite = loadImage('graphics/pipe_body.png');
  pipePeakSprite = loadImage('graphics/pipe_body.png');
  birdSprite = loadImage('graphics/train.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);

  birds = [];
  savedBirds = [];
  for (let i = 0; i < birdCount; i++) {
    birds.push(new Bird());
  }

  reset();
}

function draw() {
  if (birds.length <= 0 && fileBird === undefined) return;
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  let shouldUpScore = false;
  // update the file bird
  if (fileBird) {
    fileBird.update(pipes);
    fileBird.show();
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (fileBird && pipes[i].pass(fileBird)) {
      fileBird.score += 1;
      shouldUpScore = true;
    }
    if (fileBird && pipes[i].hits(fileBird)) {
      fileBird = undefined;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // loop through birds
  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].update(pipes);
    birds[i].show();

    for (let j = 0; j < pipes.length; j++) {
      if (pipes[j].pass(birds[i])) {
        shouldUpScore = true;
        birds[i].score += 1;
      }

      if (pipes[j].hits(birds[i])) {
        savedBirds.push(birds.splice(i, 1)[0]);
        break;
      }
    }
  }

  if (shouldUpScore) {
    score += 1;
  }

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  // rebread the population
  if (birds.length <= 0 && fileBird === undefined) {
    noLoop();
    evolve();
  }
  shouldPrint = false;
}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  pipes.push(new Pipe());

  fileBird = new Bird();
  // bestAI comes from a file bestBird.js which is an object containing the configuration for the highest trained bird with this algorithm.
  fileBird.ai = new NeuralNetwork(bestAI);

  gameoverFrame = frameCount - 1;
  loop();
}

function evolve() {
  // get the cumulative score of the birds
  let totalScore = savedBirds.reduce((total, bird) => total + bird.score, 0);
  savedBirds.map(bird => {
    const fitness = bird.fitness = bird.score / totalScore;
    if (bird.score > highestFitness) {
      highestFitness = bird.score;
      bestBird = bird;
    }
    return fitness;
  });
  // pick a bird randomly for each member of the population
  for (let i = 0; i < birdCount; i++) {
    let randomBird = pickElement(savedBirds);
    randomBird = Object.assign( Object.create( Object.getPrototypeOf(randomBird)), randomBird);
    randomBird.ai.mutate(0.2);
    birds.push(randomBird);
  }
  savedBirds = [];
  reset();
}

function pickElement(data) {
  var winner = Math.random();
  var threshold = 0;
  for (let i = 0; i < data.length; i++) {
    threshold += data[i].fitness;
    if (threshold >= winner) {
      return data[i];
    }
  }
}
