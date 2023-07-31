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
  new Node('G', randomCartCords(-1,1), 'orange'),
  new Node('H', randomCartCords(-1,1), 'orange'),
  new Node('I', randomCartCords(-1,1), 'orange'),
  new Node('J', randomCartCords(-1,1), 'orange'),
  new Node('K', randomCartCords(-1,1), 'orange'),
  new Node('L', randomCartCords(-1,1), 'orange'),
  new Node('M', randomCartCords(-1,1), 'orange'),
  new Node('N', randomCartCords(-1,1), 'orange'),
  new Node('O', randomCartCords(-1,1), 'orange'),
  new Node('P', randomCartCords(-1,1), 'orange'),
  new Node('Q', randomCartCords(-1,1), 'orange'),
  new Node('R', randomCartCords(-1,1), 'orange'),
  new Node('S', randomCartCords(-1,1), 'orange'),
  new Node('U', randomCartCords(-1,1), 'orange'),
  new Node('V', randomCartCords(-1,1), 'orange'),
  new Node('W', randomCartCords(-1,1), 'orange'),
  new Node('X', randomCartCords(-1,1), 'orange'),
  new Node('Y', randomCartCords(-1,1), 'orange'),
  new Node('Z', randomCartCords(-1,1), 'orange'),
  ]
  centroid = determineCoordinates(indecisiveNode, relatedNodes);

}

sketch.draw = function () {
  display.drawUI();
  centroid.drawPotentialCentroidVisuals();
}