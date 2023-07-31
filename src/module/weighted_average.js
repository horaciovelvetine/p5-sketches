import { X, Y, Z, W } from './constants.js';

export function weightedAverage(dataset) {
  
  let x_cords = dataset.map(datPoint => {
    return datPoint.cords[X];
  });

  let y_cords = dataset.map(datPoint => {
    return datPoint.cords[Y];
  });

  let weights = dataset.map(datPoint => {
    return (1 / datPoint.cords[2]);
  });

  let x = getWeightedAverage(x_cords, weights);
  let y = getWeightedAverage(y_cords, weights);

  return {
    name: 'WeightedAverage',
    cords: [x, y],
    color: 'white',
  };
}