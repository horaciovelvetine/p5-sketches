export class Centroid {
  constructor() {
    // TBD
  }


  findUsingWeightedAverage(pointsArray) {
    // pointsArray is an array of objects with the following structure:
    // {name: 'A', cords: [x, y, w], color: 'null'}
    // where x,y represent the coordinates of the point
    // and w represents the weight of the point in relation to the centroid
    let x_cords = pointsArray.map(datPoint => {
      return datPoint.cords[0];
    })

    let y_cords = pointsArray.map(datPoint => {
      return datPoint.cords[1];
    })

    let weights = pointsArray.map(datPoint => {
      return (1/datPoint.cords[2]);
    })

    let x = this.weightedAverage(x_cords, weights);
    let y = this.weightedAverage(y_cords, weights);
    return {
      name: 'WeightedAverage',
      cords: [x, y],
      color: 'white'
    };
  }
  
  weightedAverage(values, weights) {
    let sum = 0;
    let weightSum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += values[i] * weights[i];
      weightSum += weights[i];
    }
    return sum / weightSum;
  }
}