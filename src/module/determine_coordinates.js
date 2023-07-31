import kmeans from './kmeans';
import { Node } from '../models/node';
import { weightedAverage } from './weighted_average';
import { delta } from './delta';
import { Centroid } from '../models/centroid';

export function determineCoordinates(node, relatedNodes) {
  let wAResults = weightedAverage(relatedNodes);
  let kResults = kMeansAdapter(relatedNodes, 1);

  return new Centroid(wAResults, kResults, relatedNodes);
}

function kMeansAdapter(dataset, kDepth) {
  let prep = dataset.map(node => {
    return node.getCoordinates();
  })
  let results = kmeans(prep, kDepth);

  let cords = results.centroids[0];
  let kMeansResults = new Node(`kMeans (k=${kDepth})`, cords, 'white');
  kMeansResults.s = delta(dataset, kMeansResults);
  kMeansResults.setCoordinates(...cords)
  console.log('kMeans results', results);

  return kMeansResults;

}