// Original game created by Daniel Shiffman http://codingtra.in
// AI created by Brayden Cloud
// Class is exported (eslint flag)
/* exported Bird */

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -10;
    this.velocity = 0;

    this.icon = birdSprite;
    this.width = 34;
    this.height = 34;

    // AI
    // inputs: distance from next pipe, current y position, y position of each pipe, current direction (5 total)
    // hidden: two layers of 10 (chosen randomly)
    // output: probability of jumping and probability of not jumping
    this.ai = new NeuralNetwork([4, 10, 2]);
    // how fit this bird is
    this.score = 1;
    this.fitness = 0;
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  up() {
    this.velocity = this.lift;
  }

  update(pipes) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }

    // make a decision for the bird
    // get the inputs
    let pipeDistance = pipes[0].x - this.x;
    let closestPipe = pipes[0];
    for (let pipe of pipes) {
      if (pipe.x - this.x < pipeDistance) {
        pipeDistance = pipe.x - this.x;
        closestPipe = pipe;
      }
    }
    pipeDistance = pipeDistance / 800;
    let topPipeY = closestPipe.top / 600; // canvas height
    let bottomPipeY = closestPipe.bottom / 600;
    let yPos = this.y / 600;
    let vel = this.velocity / 600;
    let decision = this.ai.feedforward([pipeDistance, yPos, topPipeY, bottomPipeY]);
    if (decision[0] > decision[1]) {
      this.up();
    }
  }
}