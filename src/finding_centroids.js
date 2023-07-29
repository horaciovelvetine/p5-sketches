import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { DisplayTools } from './util/display_tools';
import { Centroid } from './module/centroid.js';

let DISPLAY = null;
let CENTROID = null;


let POINTS_A = [
  { name: 'A', cords: [2, 2, 10], color: 'orange' },
  { name: 'B', cords: [14, 6, 5], color: 'orange' },
  { name: 'C', cords: [11, 13, 3], color: 'orange' },
  { name: 'D', cords: [8, 15, 2], color: 'orange' },
  { name: 'E', cords: [2, 15, 3], color: 'orange' },
  { name: 'O', cords: [5, 7, 4], color: 'orange' },
]

sketch.setup = function () {
  DISPLAY = new DisplayTools(false);
  CENTROID = new Centroid();
  background(51);
}

sketch.draw = function () {
  DISPLAY.drawUI();

  POINTS_A.forEach((dat) => {
    DISPLAY.draw2DPoint(dat);
    DISPLAY.drawStrengthRadius(dat);
  });

  let weightedAverageCentroidPoint = CENTROID.findUsingWeightedAverage(POINTS_A);
  DISPLAY.draw2DPoint(weightedAverageCentroidPoint);
  


}