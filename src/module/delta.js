import { findDistanceBetween } from "../util/find_distance_between";

export function delta(relatedNodes, weightedAvgResultsNode) {
  // the average distance between a node and related nodes

  let actualDistances = relatedNodes.map(node => {
    return findDistanceBetween(node, weightedAvgResultsNode);
  });

  let sum = actualDistances.reduce((acc, curr) => {
    return acc + curr;
  });

  return(sum / actualDistances.length);
}