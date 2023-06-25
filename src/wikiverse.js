import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { data } from "./data/WikidItMyself.json"

class Node {
  // represents a single wiki article
  constructor(x, y, z, url) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.url = url;
    this.relatedNodes = [];
  }
}



//! P5JS SKETCH STARTS HERE =======================================
sketch.setup = function () {
  createCanvas((windowWidth - 650), (windowHeight - 300), WEBGL);
}

sketch.draw = function () {
  background(51);
  orbitControl();
  normalMaterial();

  let radius = width;

  translate(0, 0, -600);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 1.1,
        cos(2 * a) * radius * sin(b)
      );
      if (j % 2 === 0) {
        cone(30, 30);
      } else {
        box(30, 30, 30);
      }
      pop();
    }
  }
}