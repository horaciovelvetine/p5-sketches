import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { testObjects } from './data/wikiverse_test_objects.json';

const X = 0; // based on coordinate system
const Y = 1;
const Z = 2;

sketch.setup = function () {
  createCanvas((windowWidth - 650), (windowHeight - 300), WEBGL);
}

sketch.draw = function () {
  background(51);
  orbitControl();
  normalMaterial();
  let radius = width * 0.5;

  let coordinates = testObjects["teapot"];
  // marks the center of the universe
  torus(30, 5);
  

  for (const nodeCord of coordinates) {
    push();
    translate(nodeCord[X] * radius, nodeCord[Y] * radius, nodeCord[Z] * radius);
    sphere(10, 10, 10);
    pop();
  }

  for (const nextNodeIter of coordinates) {

    coordinates.forEach((nodeCord) => {
      if (nextNodeIter !== nodeCord) {
        let distance = dist(nextNodeIter[X] * radius, nextNodeIter[Y] * radius, nextNodeIter[Z] * radius, nodeCord[X] * radius, nodeCord[Y] * radius, nodeCord[Z] * radius);
        if (distance < 350) {
          stroke(255);
          line(nextNodeIter[X] * radius, nextNodeIter[Y] * radius, nextNodeIter[Z] * radius, nodeCord[X] * radius, nodeCord[Y] * radius, nodeCord[Z] * radius);
        }
      }
    });
  }


}