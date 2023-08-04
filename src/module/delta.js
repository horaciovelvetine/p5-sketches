import { findDistanceBetween } from "../util/find_distance_between";

export function delta(relatedNodes, weightedAvgResultsNode) {
  // average variance between actual distances and calculated distances
  // for a potential centroid node and its related nodes
  // used to calculate the best performing centroid node

  let actualDistances = relatedNodes.map(node => {
    return findDistanceBetween(node, weightedAvgResultsNode);
  });

  let sum = actualDistances.reduce((acc, curr) => {
    return acc + curr;
  });

  return(sum / actualDistances.length);
}