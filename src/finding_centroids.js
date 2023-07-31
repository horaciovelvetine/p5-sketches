import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { DisplayTools } from './util/display_tools';
import { randomCartCords } from './util/random_cart_cords';
import { Node } from './models/node';
import { determineCoordinates } from './module/determine_coordinates';

let display = null;
let indecisiveNode = null;
let relatedNodes = null;
let centroid = null;


sketch.setup = function () {
  display = new DisplayTools(false);
  indecisiveNode = new Node('Indecisive', [null, null, null], 'orange');
  relatedNodes = [
  new Node('A', randomCartCords(-1,1), 'orange'),
  new Node('B', randomCartCords(-1,1), 'orange'),
  new Node('C', randomCartCords(-1,1), 'orange'),
  new Node('D', randomCartCords(-1,1), 'orange'),
  new Node('E', randomCartCords(-1,1), 'orange'),
  new Node('F', randomCartCords(-1,1), 'orange'),
  ]
  centroid = determineCoordinates(indecisiveNode, relatedNodes);

}

sketch.draw = function () {
  display.drawUI();
  centroid.drawPotentialCentroidVisuals();
}