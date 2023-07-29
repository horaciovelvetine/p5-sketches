
const DEV = {
  // For 16" Macbook Pro
  SCALE: 19,
  WIDTH: 1500,
  HEIGHT: 800,
}


export class DisplayTools {
  constructor(IS_3D) {
    //attributes
    this.IS_3D = IS_3D;

    // configuration methods run once
    this.setupCanvas();
  }

  setupCanvas() {
    if (this.IS_3D) {
      createCanvas(1500, 800, WEBGL);
    } else {
      createCanvas(1500, 800);
    }
  }

  drawUI() {
    // offset points to the center of the canvas
    // reverse y axis so y > 0 is up
    translate(width / 2, height / 2);
    scale(1, -1);
    this.drawAxes();
  }

  markCenterPoint() {
    stroke('black');
    strokeWeight(15);
    point(0, 0, 0);
  }

  setAxisStrokeColor(i) {
    // set axis colors
    if (i === 0) stroke('red'); // x axis
    if (i === 1) stroke('green'); // y axis
    if (i === 2) stroke('blue'); // z axis
  }

  drawAxes() {
    this.getAxisCoordinates().forEach((cords, i) => {
      if ((i === 2) && !this.IS_3D) return;
      this.setAxisStrokeColor(i);
      strokeWeight(1);
      line(...cords);
    });
    this.markCenterPoint();
  }

  getAxisCoordinates() {
    return (
      this.IS_3D ? [
        [-1000, 0, 0, 1000, 0, 0],
        [0, -1000, 0, 0, 1000, 0],
        [0, 0, -1000, 0, 0, 1000]
      ] :
        [
          [-1000, 0, 1000, 0],
          [0, -1000, 0, 1000]
        ]
    )
  }

  draw2DPoint(dataPoint) {
    //19 is a magic number to scale it to my display size
    let x = dataPoint.cords[0] * 19;
    let y = dataPoint.cords[1] * 19;
    stroke(dataPoint.color);
    strokeWeight(10);
    point(x, y);
  }

  drawStrengthRadius(dataPoint) {
    let radius = dataPoint.cords[2] * 19;
    let x = dataPoint.cords[0] * 19;
    let y = dataPoint.cords[1] * 19;
    stroke(dataPoint.color);

    // draw a circle indicating the intedned outer bounds
    noFill();
    strokeWeight(0.25);
    ellipse(x, y, radius * 2, radius * 2);
  }

}