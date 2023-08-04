import { scaleNumbers } from "../util/scale_numbers";
import { X, Y, Z, S } from "../module/constants";

export class Node {
  constructor(name, cords, color) {
    this.name = name;
    this.x = cords[X];
    this.y = cords[Y];
    this.z = cords[Z];
    this.s = cords[S]; // temp value represents relationship strength between two nodes, used in calculating a position for related nodes
    this.color = color;
  }

  setCoordinates(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getCoordinates() {
    return [Number(this.x), Number(this.y), Number(this.z), Number(this.s)];
  }

  draw() {
    strokeWeight(10);
    stroke(this.color);
    fill(this.color);
    let [x, y, z] = scaleNumbers(this.x, this.y, this.z);
    point(x, y, z);
    strokeWeight(0.1);
  }

  drawStrengthRadius() {
    // draws circle around node to represent intended strength of relationship
    let radius = scaleNumbers(this.s)[0];
    let [x, y, z] = scaleNumbers(this.x, this.y, this.z);
    stroke(this.color);
    strokeWeight(0.2);
    noFill();
    ellipse(x, y, radius, radius);
  }

  labelText(x, y, z) {
    return this.name + ': (' + x + ', ' + y + ', ' + z + ')'
  }
}