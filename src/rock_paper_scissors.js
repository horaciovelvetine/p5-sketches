import '../css/style.css';
import { sketch } from 'p5js-wrapper';

// CANVAS SIZE
const WIDTH = 640;
const HEIGHT = 320;

// EMOJI SPECIFIC CONSTANTS
const ENT_SIZE = 20; //==> base int used to calculate and scale carious ents
const NUM_EMOJIS = 15; //==> number of emoji's to be rendered
const SPEED = 2.5; //==> used to scale the velocity of the emoji's
const COLLISION_DELAY = 18; //==> used to prevent emoji's from colliding too often

// GRID
const GRID_SIZE = NUM_EMOJIS * 5;
const GRID_WIDTH = Math.ceil(WIDTH / GRID_SIZE);
const GRID_HEIGHT = Math.ceil(HEIGHT / GRID_SIZE);
const GRID = new Array(GRID_WIDTH * GRID_HEIGHT).fill(() => []);


const OUTCOMES = {
  '📝🪨': '📝',
  '📝✂️': '✂️',
  '🪨✂️': '🪨',
  '🪨📝': '📝',
  '✂️📝': '✂️',
  '✂️🪨': '🪨',
};


class Emoji {

  constructor(x, y) {
    this.emoji = this.getRandEmoji();
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D().mult(SPEED);
    this.radius = (ENT_SIZE * 0.68);
    this.mass = ENT_SIZE * 0.1;
    this.updatesSinceLastCollision = 0;
  }

  draw() {
    textSize(ENT_SIZE * 1.44);
    text(this.emoji, this.position.x, this.position.y);
  }

  getRandEmoji() {
    const emojis = ["🪨", "📝", "✂️"]
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  update() {
    this.position.add(this.velocity);
    if (this.updatesSinceLastCollision > 0) {
      this.updatesSinceLastCollision--;
    }
  }

  getGridCoordinates() {
    const xInd = Math.floor(this.position.x / GRID_SIZE);
    const yInd = Math.floor(this.position.y / GRID_SIZE);
    return { xInd, yInd }
  }

  playRPS(other) {
    if (this.emoji === other.emoji) return;

    const handsIn = this.emoji + other.emoji;
    const outcome = OUTCOMES[handsIn];

    if (!outcome) {
      console.log('invalid hands in', handsIn)
      return
    }

    if (outcome === this.emoji) {
      other.emoji = this.emoji
    } else {
      this.emoji = other.emoji
    }

  }

  clamp() {
    // ensures emojis stay within the canvas
    const clampedX = Math.max(this.radius, Math.min(WIDTH - this.radius, this.position.x));
    const clampedY = Math.max(this.radius, Math.min(HEIGHT - this.radius, this.position.y));
    return { clampedX, clampedY }
  }


  checkBoundaries() {
    const { clampedX, clampedY } = this.clamp()

    if (clampedX !== this.position.x) {
      this.velocity.x *= -1;
    }
    this.position.x = clampedX;

    if (clampedY !== this.position.y) {
      this.velocity.y *= -1;
    }
    this.position.y = clampedY;

  }

  checkCollision(other) {
    if (this.updatesSinceLastCollision > 0 || other.updatesSinceLastCollision > 0) return;
    // Get distances between the balls components
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // Calculate magnitude of the vector separating the balls
    let distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    let minDistance = this.radius + other.radius;

    if (distanceVectMag < minDistance) {
      // initiate collision
      // correct to prevent Emoji's sticking on contact
      let distanceCorrection = (minDistance - distanceVectMag) / 1500.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // plays rock paper scissors
      this.playRPS(other);

      // begins trig calculations
      // get angle of distanceVect
      let theta = distanceVect.heading();
      // precalculate trig values
      let sine = sin(theta);
      let cosine = cos(theta);

      /* bTemp will hold rotated ball this.positions. You 
       just need to worry about bTemp[1] this.position*/
      let bTemp = [new p5.Vector(), new p5.Vector()];

      /* this ball's this.position is relative to the other
       so you can use the vector between them (bVect) as the 
       reference point in the rotation expressions.
       bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      let vTemp = [new p5.Vector(), new p5.Vector()];

      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate 
       the final this.velocity along the x-axis. */
      let vFinal = [new p5.Vector(), new p5.Vector()];

      // final rotated this.velocity for b[0]
      vFinal[0].x =
        ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) /
        (this.mass + other.mass);
      vFinal[0].y = vTemp[0].y;

      // final rotated this.velocity for b[0]
      vFinal[1].x =
        ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) /
        (this.mass + other.mass);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* Rotate ball this.positions and velocities back
        Reverse signs in trig expressions to rotate 
        in the opposite direction */
      // rotate balls
      let bFinal = [new p5.Vector(), new p5.Vector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // update balls to screen this.position
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;

      this.position.add(bFinal[0]);

      // update velocities
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;

      // prevent collision from repeating on subsequent frames
      this.updatesSinceLastCollision = COLLISION_DELAY;
      other.updatesSinceLastCollision = COLLISION_DELAY;
    }
  }

}

function updateGrid() {
  for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
    GRID[i] = [];
  }
  for (const emoji of emojis) {
    const { xInd, yInd } = emoji.getGridCoordinates();
    GRID[yInd * GRID_WIDTH + xInd].push(emoji);
  }
}

function checkGridCollisions() {
  for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
    const xInd = i % GRID_WIDTH;
    const yInd = Math.floor(i / GRID_WIDTH);
    const curCell = GRID[i];

    // check collisions within the cell
    for (let j = 0; j < curCell.length; j++) {
      const emoji = curCell[j];
      for (let k = j + 1; k < curCell.length; k++) {
        const neighbor = curCell[k];
        emoji.checkCollision(neighbor);
      }

      // check collisions with adjacent cells
      for (const offsetIndX of [-1, 0, 1]) {
        for (const offsetIndY of [-1, 0, 1]) {
          if (offsetIndX == 0 && offsetIndY == 0) continue;
          const neighborAtX = xInd + offsetIndX;
          const neighborAtY = yInd + offsetIndY;

          //skips checking out of bounds cells
          if (neighborAtX < 0 || neighborAtX >= GRID_WIDTH) continue;
          if (neighborAtY < 0 || neighborAtY >= GRID_HEIGHT) continue;
          const neighborEmojis = GRID[neighborAtY * GRID_WIDTH + neighborAtX];
          for (const neighborEmoji of neighborEmojis) {
            emoji.checkCollision(neighborEmoji);
          }
        }
      }
    }
  }
}

function checkForWinner(emojis) {
  const winnerWinnerChickenDinner = emojis[0].emoji
  for (let i = 1; i < emojis.length; i++) {
    if (emojis[i].emoji != winnerWinnerChickenDinner) return false;
  }
  return true;
}

let emojis = [];

sketch.setup = () => {
  // called once at top of sketch to setup canvas and some initial set once variables
  createCanvas(WIDTH, HEIGHT);
  noStroke();
  textAlign(CENTER, CENTER);
  for (let i = 0; i < NUM_EMOJIS; i++) {
    emojis.push(new Emoji(random(WIDTH), random(HEIGHT)));
  }
}

sketch.draw = () => {
  background("black");
  for (const emoji of emojis) {
    emoji.update();
    emoji.draw();
    emoji.checkBoundaries();
  }
  updateGrid();
  checkGridCollisions();
  if (checkForWinner(emojis)) {
    textSize(ENT_SIZE);
    fill("yellow");
    textSize(ENT_SIZE * 2)
    text(emojis[0].emoji, WIDTH / 2 - (15 * ENT_SIZE), HEIGHT / 2);
    text(emojis[0].emoji, WIDTH / 2 + (15 * ENT_SIZE), HEIGHT / 2);
    text("Winner Winner Chicken Dinner.", WIDTH / 2, HEIGHT / 2);
  }

}