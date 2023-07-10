import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { data } from './data/wikid_it_myself.json'
import { CartesianTools } from './util/cartesian_tools';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;

sketch.setup = function () {
  createCanvas((windowWidth - 200), (windowHeight - 150), WEBGL);
}

let cartBeforeTheHorse = new CartesianTools(Window.windowWidth - 200);
let test = cartBeforeTheHorse.ingestData(data);

sketch.draw = function () {
  background(51);
  orbitControl();


  // marks the center of the universe
  stroke('black');
  strokeWeight(25);
  point(0, 0, 0);
  point(100, 100, 100);

  // ------------------------ \\//
  // How about we start here: \\//
  // ------------------------ \\//
}