import kmeans from '../module/kmeans.js';
import { scaleNumbers } from "../util/scale_numbers";
export class Centroid {
  constructor(weightedAvgNode, kMeansNode, relatedNodes) {

    this.weightedAvgNode = weightedAvgNode;
    this.kMeansNode = kMeansNode;
    this.relatedNodes = relatedNodes;
    this.name = 'centroid';
    this.color = 'green';
    this.x = null;
    this.y = null;
    this.z = null;
    this.s = null;
  }


  drawPotentialCentroidVisuals() {

    this.relatedNodes.forEach(node => {
      node.draw();
      this.connectCentroidsToRelatedNode(node);
    })
    this.weightedAvgNode.draw();
    this.kMeansNode.draw();

    this.drawPotentialInfoLabels(this.weightedAvgNode, 0);
    this.drawPotentialInfoLabels(this.kMeansNode, 20);
  }

  drawPotentialInfoLabels(potentialCentroidNode, yOffset) {
    let [x, y, z, s] = potentialCentroidNode.getCoordinates();
    fill(potentialCentroidNode.color);
    stroke(potentialCentroidNode.color);
    strokeWeight(0.1);
    textSize(12);
    text(potentialCentroidNode.labelText(x.toFixed(2), y.toFixed(2), s.toFixed(7)), 145, 370 + yOffset);
  }

  connectCentroidsToRelatedNode(node) {
    let [x1, y1, z1] = scaleNumbers(...node.getCoordinates());
    let [x2, y2, z2] = scaleNumbers(...this.weightedAvgNode.getCoordinates());
    let [x3, y3, z3] = scaleNumbers(...this.kMeansNode.getCoordinates());

    strokeWeight(0.2);
    stroke(this.weightedAvgNode.color);
    line(x1, y1, x2, y2);
    stroke(this.kMeansNode.color);
    line(x1, y1, x3, y3);
  }




}