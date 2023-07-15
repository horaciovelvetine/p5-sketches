import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { data } from './data/wikid_it_myself.json'
import { CartesianTools } from './util/cartesian_tools';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;
export const sensitivityX = 1;
export const sensitivityY = 1;
export const sensitivityZ = 0.1;
const SCALE = 100;

// to enable baby steps...
const IS_3D = false;

sketch.setup = function () {
  if (IS_3D) createCanvas((windowWidth - 200), (windowHeight - 150), WEBGL);
  else 
  createCanvas((windowWidth - 200), (windowHeight - 150));
  
}

let cartBeforeTheHorse = new CartesianTools(Window.windowWidth - 200, IS_3D);
let allNodes = cartBeforeTheHorse.ingestWikiTestData(data);

sketch.draw = function () {
  background(51);
  // center all items on the canvas
  if (IS_3D) {
    cartBeforeTheHorse.draw3DAxis();
    orbitControl();
  } else {
    translate(width / 2, height / 2, 0);
    cartBeforeTheHorse.draw2DAxis();
  }



}