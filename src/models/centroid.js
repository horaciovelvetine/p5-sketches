import kmeans from '../module/kmeans.js';

export class Centroid {
  constructor(relatedNodes) {
    
    this.relatedNodes = relatedNodes;
    this.weightedAverage = this.findUsingWeightedAverage(relatedNodes);
    // this.kMeans = this.findUsingKmeans(DATASET);
  }


  findUsingWeightedAverage(relatedNodes) {
    let x_cords = pointsArray.map(datPoint => {
      return datPoint.cords[X];
    })

    let y_cords = pointsArray.map(datPoint => {
      return datPoint.cords[Y];
    })

    let weights = pointsArray.map(datPoint => {
      return (1 / datPoint.cords[W]);
    })

      ;
    let x = this.weightedAverage(x_cords, weights);
    let y = this.weightedAverage(y_cords, weights);

    let actualDistances = pointsArray.map(datPoint => {
      return {
        name: datPoint.name,
        distance: this.getDistanceBetweenPoints(datPoint, { cords: [x, y] })
      }
    });

    let delta = (pointsArray.reduce((acc, datPoint) => {
      let actual = actualDistances.filter((dat) => dat.name === datPoint.name)[0].distance;
      let intended = datPoint.cords[W];
      return acc + Math.abs(actual - intended);
    }, 0) / pointsArray.length).toFixed(2);



    return {
      name: 'WeightedAverage',
      cords: [x, y, delta],
      color: 'white',
      actualDistances: actualDistances,
    };
  }

  weightedAverage(values, weights) {
    // values and weights are arrays of the same length (x || y, w)
    let sum = 0;
    let weightSum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += values[i] * weights[i];
      weightSum += weights[i];
    }
    return (sum / weightSum).toFixed(2);
  }

  getDistanceBetweenPoints(pointA, pointB) {
    // get distance between two points on cartesian plane
    let x1 = pointA.cords[X];
    let y1 = pointA.cords[Y];
    let x2 = pointB.cords[X];
    let y2 = pointB.cords[Y];
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)).toFixed(2);

  }

  findUsingKmeans(DATASET) {
    // this kMeans will always be used to find the centroid of a kDepth 1 dataset. 
    let kDepth = 2;
    let results = kmeans(DATASET, kDepth);
    console.log(results);

    let actualDistances = DATASET.map(dat => {
      return {
        name: dat.name,
        distance: this.getDistanceBetweenPoints(dat, { cords: [results.centroids[0][X], results.centroids[0][Y]] })
      }
    })

    let delta = (DATASET.reduce((acc, datPoint) => {
      let actual = actualDistances.filter((dat) => dat.name === datPoint.name)[0].distance;
      let intended = datPoint.cords[W];
      return acc + Math.abs(actual - intended);
    }, 0) / DATASET.length).toFixed(2);

    let x = results.centroids[0][X].toFixed(2);
    let y = results.centroids[0][Y].toFixed(2);

    return {
      name: 'Kmeans',
      cords: [x, y, delta],
      color: 'cyan',
      actualDistances: actualDistances,

    }
  }


}