import '../css/style.css';
import { sketch } from 'p5js-wrapper';

const ENT_SIZE = 25;
const WIDTH = 640;
const HEIGHT = 360;

class EmojiEnt {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = this.getRandEmoji();
  }

  draw() {
    textSize(ENT_SIZE);
    text(this.emoji, this.x, this.y);
  }

  getRandEmoji() {
    const emojis = ["🪨", "📝", "✂️"]
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

}

let emojiEnts = [
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
  new EmojiEnt(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)),
];


sketch.setup = function () {
  // called once at top of sketch to setup canvas and some initial set once variables
  createCanvas(WIDTH, HEIGHT);
  noStroke();
  textAlign(sketch.CENTER, sketch.CENTER);
}

sketch.draw = function () {
  // called at framerate essentially over and over
  background("black");
  //=> should constantly iterate over the 
  //=> list of emoji ents and draw them and update them all 
  for (const emoji of emojiEnts) {
    emoji.draw();
  }

}

