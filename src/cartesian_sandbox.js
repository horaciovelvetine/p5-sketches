import './css/style.css';
import { sketch } from 'p5js-wrapper';
import { DisplayTools } from './util/display_tools';
import { Wikiverse } from './module/wikiverse/wikiverse';

export const X = 0; // index values for relevant coordinate
export const Y = 1; // axis in the array 
export const Z = 2;

// to enable baby steps...
// in 2D there is currently no way to move the camera
// for now this will mean constraining the mapping of points to the canvas size
const IS_3D = false;

let display = null; 
let wikiverse = null;

sketch.setup = function () {
  display = new DisplayTools(IS_3D);
  wikiverse = new Wikiverse();
  background(51);
}

sketch.draw = function () {
  display.drawUI();
}