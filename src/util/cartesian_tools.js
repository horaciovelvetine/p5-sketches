import { X, Y, Z } from '../cartesian_grid_point_plotting';

export const ALL_NODES = [];

export class CartesianTools {

  constructor(width, IS_3D) {
    this.radius = width * 0.7;
    this.IS_3D = IS_3D;
    // this is an abstract class used to establish
    // magic numbers imposed by the limitations of 
    // working in 3D space inside the browser
  }

  calculateRadiusOffsetCoordinates(coordinates) {
    return [
      coordinates[X] * this.radius,
      coordinates[Y] * this.radius,
      coordinates[Z] * this.radius
    ]
  }

  axisCords3D() {
    //returns an array of lines to be drawn in the sketch.draw() function
    return [
      [-1000, 0, 0, 1000, 0, 0],
      [0, -1000, 0, 0, 1000, 0],
      [0, 0, -1000, 0, 0, 1000]
    ]
  }

  axisCords2D() {
    //returns an array of lines to be drawn in the sketch.draw() function
    return [
      [-1000, 0, 1000, 0],
      [0, -1000, 0, 1000],
    ]
  }

  markCenter() {
    stroke('black');
    strokeWeight(this.IS_3D ? 15 : 10);
    point(0, 0, 0);
  }

  draw3DAxis() {
    // draw the axes
    this.axisCords3D().forEach((cords, i) => {
      this.setAxisStrokeColor(i);
      strokeWeight(1);
      line(...cords);
    });
    this.markCenter();
  }

  draw2DAxis() {
    // draw the axes
    this.axisCords2D().forEach((cords, i) => {
      this.setAxisStrokeColor(i);
      strokeWeight(1);
      line(...cords);
    });
    this.markCenter();
  }

  setAxisStrokeColor(i) {
    // set axis colors
    if (i === 0) stroke('red'); // x axis
    if (i === 1) stroke('green'); // y axis
    if (i === 2) stroke('blue'); // z axis
  }

  ingestWikiTestData(data) {
    // data is an array of node objects
    this.createNodesFromWikiData(data);
    this.calculateAllNodeCords();
    return ALL_NODES;
  }

  createNodesFromWikiData(data) {
    // data is an array of node objects as JSON;
    let nodes = [];
    data.forEach(nodeData => {
      // create all primary nodes which have data available for topLinks
      let topNode = new Node(nodeData.url, nodeData.topLinks);
      nodes.push(topNode);
      ALL_NODES.push(topNode);

    })

    nodes.forEach(node => {
      // create new nodes for each topLinked Node, these will have no topLink data by default
      node.topLinks.forEach(link => {
        let nodeExistsAlready = nodes.find(existingNode => existingNode.url === link);
        if (!nodeExistsAlready) {
          let linkedNode = new Node(link);
          nodes.push(linkedNode)
          ALL_NODES.push(linkedNode);
        }
      })
    })
  }

  calculateAllNodeCords() {
    ALL_NODES.forEach(node => {
      this.calculateNodeCords(node);
    });
  }

  calculateNodeCords(node) {
    console.log(node);
  }

}

class Node {
  constructor(url, topLinks = []) {
    this.id = ALL_NODES.length + 1;
    this.x = null;
    this.y = null;
    this.z = null;
    this.url = url;
    this.name = this.getNameFromUrl(url);
    this.topLinks = topLinks;
    this.coordHistory = [];
  }

  getNameFromUrl(url) {
    // gets the name attribute from the end of a typical wiki url
    let titleString = url.match(/[^/]*$/)[0]
    return titleString;
  }

}
