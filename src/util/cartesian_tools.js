import { X, Y, Z } from '../cartesian_grid_point_plotting';

export const NODES = [];

export class CartesianTools {

  constructor(width) {
    this.radius = width * 0.7;
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

  ingestData(data) {
    // data is an array of node objects
    data.forEach(nodeData => {
      let newNode = new Node(nodeData.url, nodeData.topLinks);
      NODES.push(newNode);

      newNode.topLinks.forEach(link => {
        let existingNode = NODES.find(node => node.url === link);
        if (!existingNode) {
          // creates a new NODE with a link/name and no related linkedLinks
          NODES.push(new Node(link));
        }
      })

    });

    console.log(NODES)
  }


}

class Node {
  constructor(url, topLinks = []) {
    this.id = NODES.length + 1;
    this.x = null;
    this.y = null;
    this.url = url;
    this.name = this.getNameFromUrl(url);
    this.topLinks = topLinks;
    this.coordHistory = [];
  }

  getNameFromUrl(url) {
    let titleString = url.match(/[^/]*$/)[0]
    // gets the name attribute from the end of a typical wiki url
    return titleString;
  }

}
