import './css/style.css';
import { sketch } from 'p5js-wrapper';
import { testObjects } from './data/wikiverse_test_objects.json';
import { CartesianTools } from './util/cartesian_tools';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;

function calculateRadiusOffsetCoordinates(coordinates) {
  return [
    coordinates[X] * 200,
    coordinates[Y] * 200,
    coordinates[Z] * 200
  ]
}

sketch.setup = () => {
  createCanvas((windowWidth - 650), (windowHeight - 300), WEBGL);
}

sketch.draw = () => {
  background(51);
  orbitControl();

  let coordinates = testObjects["teapot"];
  // marks the center of the universe


  for (const nodeCord of coordinates) {
    // draws spheres at each node
    let [x1, y1, z1] = calculateRadiusOffsetCoordinates(nodeCord);
    push();
    translate(x1, y1, z1);
    if (nodeCord[X] === 0 && nodeCord[Y] === 0 && nodeCord[Z] === 0) {
      stroke('red');
    }
    sphere(10);
    pop();
  }

  for (const nextNodeIter of coordinates) {
    let [x1, y1, z1] = calculateRadiusOffsetCoordinates(nextNodeIter);
    // draws lines between nodes of a certain distance from each other
    coordinates.forEach((nodeCord) => {
      if (nextNodeIter !== nodeCord) {
        let [x2, y2, z2] = calculateRadiusOffsetCoordinates(nodeCord);
        let distance = dist(x1, y1, z1, x2, y2, z2);
        if (distance < 125) {
          strokeWeight(1);
          line(x1, y1, z1, x2, y2, z2);
        }
      }
    });
  }

}

