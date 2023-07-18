class Node {
  constructor(url) {
    this.ID = 0;
    this.url = url;
    this.x = null;
    this.y = null;
    this.z = null;
  }

  getTitle() {
    return this.url.match(/[^/]*$/)[0];
  }

  setCoordinates(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    let xMult = this.x * 110;
    let yMult = this.y * 110;

    strokeWeight(15);
    stroke('white');
    point(xMult, yMult);
  }
}