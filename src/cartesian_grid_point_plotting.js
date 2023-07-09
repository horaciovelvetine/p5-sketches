import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { testObjects } from './data/wikiverse_test_objects.json';
import { CartesianTools } from './util/cartesian_tools';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;

sketch.setup = function () {
  createCanvas((windowWidth - 650), (windowHeight - 300), WEBGL);
}

sketch.draw = function () {
  background(51);
  orbitControl();
  normalMaterial();
  let grid = new CartesianTools(width);

  let coordinates = testObjects["teapot"];
  // marks the center of the universe
  torus(30, 5);


  for (const nodeCord of coordinates) {
    let [x1, y1, z1] = grid.calculateRadiusOffsetCoordinates(nodeCord);
    push();
    translate(x1, y1, z1);
    sphere(10, 10, 10);
    pop();
  }

  for (const nextNodeIter of coordinates) {
    let [x1, y1, z1] = grid.calculateRadiusOffsetCoordinates(nextNodeIter);

    coordinates.forEach((nodeCord) => {
      if (nextNodeIter !== nodeCord) {
        let [x2, y2, z2] = grid.calculateRadiusOffsetCoordinates(nodeCord);
        let distance = dist(x1, y1, z1, x2, y2, z2);
        if (distance < 700) {
          stroke(255);
          line(x1, y1, z1, x2, y2, z2);
        }
      }
    });
  }


}