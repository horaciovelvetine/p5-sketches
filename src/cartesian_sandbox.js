import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { data } from './data/wikid_it_myself.json'
import { CartesianTools } from './util/cartesian_tools';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;

// to enable baby steps...
// in 2D there is currently no way to move the camera
// for now this will mean constraining the mapping of points to the canvas size
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
  if (IS_3D) {
    cartBeforeTheHorse.draw3DAxis();
    orbitControl();
  } else {
    // center all items on the 2D canvas
    translate(width / 2, height / 2, 0);
    cartBeforeTheHorse.draw2DAxis();
  }



}