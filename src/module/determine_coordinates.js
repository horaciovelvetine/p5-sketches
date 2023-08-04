import kmeans from './kmeans';
import { Node } from '../models/node';
import { weightedMeanAverage } from './weighted_mean_average';
import { delta } from './delta';
import { Centroid } from '../models/centroid';

export function determineCoordinates(node, relatedNodes) {
  let wMAResults = weightedMeanAverage(relatedNodes);
  let kResults = kMeansAdapter(relatedNodes, 1);

  return new Centroid(wMAResults, kResults, relatedNodes);
}

function kMeansAdapter(dataset, kDepth) {
  let prep = dataset.map(node => {
    return node.getCoordinates();
  })
  let results = kmeans(prep, kDepth);

  let cords = results.centroids[0];
  let kMeansResults = new Node(`kMeans (k=${kDepth})`, cords, 'white');
  // uses s value as a measure of how well the results fit the dataset
  kMeansResults.s = delta(dataset, kMeansResults);
  kMeansResults.setCoordinates(...cords)
  console.log('kMeans results', results);

  return kMeansResults;

}