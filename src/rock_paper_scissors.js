import '../css/style.css';
import { sketch } from 'p5js-wrapper';

const ENT_SIZE = 25;
const WIDTH = 1280;
const HEIGHT = 720;
const GRID_SIZE = 10000;
const GRID_WIDTH = Math.ceil(WIDTH / GRID_SIZE);
const GRID_HEIGHT = Math.ceil(HEIGHT / GRID_SIZE);
const GRID = new Array(GRID_WIDTH * GRID_HEIGHT).fill(() => []);
const NUM_EMOJIS = 18;
const SPEED = 1.5;
const EMOJI_RADIUS_SCALE = 0.68;

class Emoji {

  constructor(x, y) {
    this.emoji = this.getRandEmoji();
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D().mult(SPEED); //==> 3 is a magic number 
    this.radius = (ENT_SIZE * EMOJI_RADIUS_SCALE);
    this.mass = ENT_SIZE * 0.1; //==> 0.1 is a magic number
  }

  draw() {
    textSize(ENT_SIZE);
    text(this.emoji, this.position.x, this.position.y);
  }

  getRandEmoji() {
    const emojis = ["🪨", "📝", "✂️"]
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  update() {
    this.position.add(this.velocity);
  }

  getGridCoordinates() {
    const xInd = Math.floor(this.position.x / GRID_SIZE);
    const yInd = Math.floor(this.position.y / GRID_SIZE);
    return { xInd, yInd }
  }


  checkBoundaries() {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }

  }

  checkCollision(other) {
    // Get distances between the balls components
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // Calculate magnitude of the vector separating the balls
    let distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    let minDistance = this.radius + other.radius;

    if (distanceVectMag < minDistance) {
      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

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
    }
  }

}

function updateGrid() {
  for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
    GRID[i] = [];
  }
  for (const emoji of emojiEnts) {
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

let emojiEnts = [];

sketch.setup = () => {
  // called once at top of sketch to setup canvas and some initial set once variables
  createCanvas(WIDTH, HEIGHT);
  noStroke();
  textAlign(CENTER, CENTER);
  for (let i = 0; i < NUM_EMOJIS; i++) {
    emojiEnts.push(new Emoji(random(WIDTH), random(HEIGHT)));
  }
}

sketch.draw = () => {
  background("black");
  for (const emoji of emojiEnts) {
    emoji.update();
    emoji.draw();
    emoji.checkBoundaries();

  }
  updateGrid();
  checkGridCollisions();
}


/* 

TODO: 

- Prevent emojis from getting stuck in each other by implementing some sort of protection on random() calls
- Add emoji collision mechanics for switching sprites

*/


