import { X, Y, Z } from '../cartesian_grid_point_plotting';

export class CartesianTools {

  constructor(width) {
    this.radius = width * 0.7;
    // this is an abstract class used to establish
    // magic numbers imposed by the limitations of 
    // working in 3D space inside the browser
  }



  calculateRadiusOffsetCoordinates(coordinates) {
    return [
      coordinates[X] * this.radius,
      coordinates[Y] * this.radius,
      coordinates[Z] * this.radius
    ]
  }
}