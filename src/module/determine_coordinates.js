import kmeans from './kmeans';
import { Node } from '../models/node';
import { K } from './constants';
import { weightedAverage } from './weighted_average';
import { delta } from './delta';
import { Centroid } from '../models/centroid';

export function determineCoordinates(node, relatedNodes) {
  let weightedAverageResults = weightedAverage(relatedNodes);
  let kMeansResults = kMeansAdapter(relatedNodes);

  return new Centroid(weightedAverageResults, kMeansResults, relatedNodes);
}

function kMeansAdapter(dataset) {
  let prep = dataset.map(node => {
    return node.getCoordinates();
  })

  let results = kmeans(prep, K).centroids[0];
  let kMeansResults = new Node(`kMeans (k=${K})`, results, 'white');
  kMeansResults.s = delta(dataset, kMeansResults);
  kMeansResults.setCoordinates(...results)

  return kMeansResults;
}