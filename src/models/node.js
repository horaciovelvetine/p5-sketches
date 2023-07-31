import { scaleNumbers } from "../util/scale_numbers";
import { X, Y, Z } from "../module/constants";

export class Node {
  constructor(name, cords, color) {
    this.name = name;
    this.x = cords[X];
    this.y = cords[Y];
    this.z = cords[Z];
    this.color = color;
  }

  setCoordinates(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    strokeWeight(10);
    stroke(this.color);
    let [x, y, z] = scaleNumbers(this.x, this.y, this.z);
    point(x, y, z);
  }

  drawLabel() { }

  labelText() {
    return this.name + ': (' + this.x + ', ' + this.y + ', ' + this.z + ')'
  }
}