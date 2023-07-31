import { scaleNumbers } from "../util/scale_numbers";


class Node {
  constructor(name) {
    this.name = name;
    this.x = null;
    this.y = null;
    this.z = null;
    this.color = 'black';

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

  drawLabel() {}
  
  labelText() {
    return this.name + ': (' + this.x + ', ' + this.y + ', ' + this.z + ')'
  }
}