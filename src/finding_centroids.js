import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { DisplayTools } from './util/display_tools';
import { Centroid } from './module/centroid.js';

let DISPLAY = null;
let CENTROID = null;

const DEV = {
  // For 16" Macbook Pro
  SCALE: 19,
  WIDTH: 1500,
  HEIGHT: 800,
}

let scaledRandom = () => {
  if (Math.random() > 0.5) {
    return (Math.random() * DEV.SCALE * -1).toFixed(2);
  }
  return (Math.random() * DEV.SCALE).toFixed(2);
}

let randomPoint = () => {
  return [scaledRandom(), scaledRandom(), Math.abs(scaledRandom())];
}


let POINTS_A = [
  { name: 'A', cords: randomPoint(), color: 'orange' },
  { name: 'B', cords: randomPoint(), color: 'orange' },
  { name: 'C', cords: randomPoint(), color: 'orange' },
  { name: 'D', cords: randomPoint(), color: 'orange' },
  { name: 'E', cords: randomPoint(), color: 'orange' },
  { name: 'F', cords: randomPoint(), color: 'orange' },
  { name: 'G', cords: randomPoint(), color: 'orange' },
  { name: 'H', cords: randomPoint(), color: 'orange' },
  { name: 'I', cords: randomPoint(), color: 'orange' },
]

sketch.setup = function () {
  DISPLAY = new DisplayTools(false);
  CENTROID = new Centroid(POINTS_A);
}

sketch.draw = function () {
  DISPLAY.drawUI();
  DISPLAY.drawCentroid(CENTROID.weightedAverage);
  DISPLAY.drawCentroid(CENTROID.kMeans);

  POINTS_A.forEach((dat) => {
    DISPLAY.draw2DPoint(dat);
    DISPLAY.drawStrengthRadius(dat);
    DISPLAY.drawDistanceToCentroid(dat, CENTROID.weightedAverage, 30);
    DISPLAY.drawDistanceToCentroid(dat, CENTROID.kMeans, 45);
  });

}