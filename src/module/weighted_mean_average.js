import { Node } from '../models/node.js';
import { delta } from './delta.js';
function weightedMeanAverage(dataset) {
  // dataset will be an array of Nodes ==> './node.js
  let xCords = dataset.map(node => {
    return node.x;
  })

  let yCords = dataset.map(node => {
    return node.y;
  })

  let zCords = dataset.map(node => {
    return node.z;
  })

  let strengths = dataset.map(node => {
    return node.s;
  })


  let x = calc(xCords, strengths);
  let y = calc(yCords, strengths);
  let z = calc(zCords, strengths);

  let weightedStrengthsNode = new Node('weightedStrengths', [x, y, z], 'red');
  // uses s value as a measure of how well the results fit the dataset
  weightedStrengthsNode.s = delta(dataset, weightedStrengthsNode);

  return weightedStrengthsNode;
}

function calc(cords, strengths) {
  let sum = 0;
  let weightSum = 0;
  for (let i = 0; i < cords.length; i++) {
    sum += cords[i] * strengths[i];
    weightSum += Number(strengths[i]);
  }
  return (sum / weightSum);
}


export default weightedMeanAverage;