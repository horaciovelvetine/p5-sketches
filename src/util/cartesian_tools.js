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
    data.forEach(nodeData => {
      // create all primary nodes which have data available for topLinks
      let topNode = new Node(nodeData.url, nodeData.topLinksTo);
      ALL_NODES.push(topNode);
    })

    ALL_NODES.forEach(node => {
      // create new nodes for each topLinked Node, these will have no topLink data themselves by default
      node.topLinksTo.forEach(link => {
        let nodeExistsAlready = ALL_NODES.find(existingNode => existingNode.url === link);
        if (!nodeExistsAlready) {
          let linkedNode = new Node(link, [], [node.id]);
          ALL_NODES.push(linkedNode);
        } else {
          nodeExistsAlready.topLinkedBy.push(node.id);
        }
      })
    })

    ALL_NODES.forEach(node => {
      // add references to the actual node objects to each node's topLink arrays
      node.topLinksTo = node.topLinksTo.map(link => {
        return ALL_NODES.find(node => node.url === link)
      })
      node.topLinkedBy = node.topLinkedBy.map(link => {
        return ALL_NODES.find(node => node.id === link)
      })
    })
  }

  calculateAllNodeCords() {
    ALL_NODES.forEach((node, i) => {
      if (i === 0) node.setCoordinates(0, 0, 0);

      //! CHECKS FOR LINKED NODES WITH EXISTING COORDINATES
      let linkedWithCords = [];

      node.topLinkedBy.forEach(linkedNode => {
        if (linkedNode.x !== null || linkedNode.y !== null || linkedNode.z !== null) {
          linkedWithCords.push(linkedNode);
        }
      })

      node.topLinksTo.forEach(linkedNode => {
        if (linkedNode.x !== null || linkedNode.y !== null || linkedNode.z !== null) {
          linkedWithCords.push(linkedNode);
        }
      });

      if (linkedWithCords.length > 0) {


        let linkCounts = [];
        linkedWithCords.forEach(linkedNode => {
          if (!linkCounts.find(link => link.id === linkedNode.id)) {
            linkCounts.push({ count: 1, id: linkedNode.id })
          } else if (linkCounts.find(link => link.id === linkedNode.id)) {
            linkCounts.find(link => link.id === linkedNode.id).count += 1;
          } else {
            console.log('could not find or count link in linkCounts array')
          }
        });


        linkCounts.forEach(link => {
          let radian = (Math.PI * 2) / link.count;
          let relatedNode = ALL_NODES.find(node => node.id === link.id);
          let radius = 200 / link.count;
          
          
          debugger;

        });
      }

    });

    console.log(ALL_NODES);
  }

}

class Node {
  constructor(url, topLinks = [], topLinkedBy = []) {
    this.id = ALL_NODES.length + 1;
    this.x = null;
    this.y = null;
    this.z = null;
    this.url = url;
    this.name = this.getNameFromUrl(url);
    this.topLinksTo = topLinks;
    this.topLinkedBy = topLinkedBy;

  }

  getNameFromUrl(url) {
    // gets the name attribute from the end of a typical wiki url
    let titleString = url.match(/[^/]*$/)[0]
    return titleString;
  }

  setCoordinates(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    let xMult = this.x * 110;
    let yMult = this.y * 110;

    strokeWeight(15);
    stroke('white');
    point(xMult, yMult);
  }

}
