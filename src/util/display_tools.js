
const DEV = {
  // For 16" Macbook Pro
  SCALE: 19,
  WIDTH: 1500,
  HEIGHT: 800,
}

const X = 0;
const Y = 1;
const W = 2;


export class DisplayTools {
  constructor(IS_3D) {
    //attributes
    this.IS_3D = IS_3D;

    // configuration methods run once
    this.setupCanvas();
  }

  setupCanvas() {
    if (this.IS_3D) {
      createCanvas(DEV.WIDTH, DEV.HEIGHT, WEBGL);
    } else {
      createCanvas(DEV.WIDTH, DEV.HEIGHT);
    }
    background(51);
  }

  drawUI() {
    // offset points to the center of the canvas
    // reverse y axis so y > 0 is up
    translate(width / 2, height / 2);
    // scale(1, -1);
    this.drawAxes();
  }

  markCenterPoint() {
    stroke('black');
    strokeWeight(5);
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
    strokeWeight(0.25);
    fill(dataPoint.color);
    text(this.pointLabelString(dataPoint), x + 15, y + 15);
  }

  pointLabelString(dataPoint) {
    return dataPoint.name + ': (' + dataPoint.cords[0] + ', ' + dataPoint.cords[1] + ', ' + dataPoint.cords[2] + ')'
  }

  drawStrengthRadius(dataPoint) {
    let radius = dataPoint.cords[2] * 19;
    let x = dataPoint.cords[X] * 19;
    let y = dataPoint.cords[Y] * 19;
    stroke(dataPoint.color);

    // draw a circle indicating the intedned outer bounds
    noFill();
    strokeWeight(0.25);
    ellipse(x, y, radius * 2, radius * 2);
  }

  drawCentroid(centroid) {
    let x = centroid.cords[X] * 19;
    let y = centroid.cords[Y] * 19;
    stroke(centroid.color);
    fill(centroid.color);
    strokeWeight(10);
    point(x, y);
    strokeWeight(0.25);
    text(this.pointLabelString(centroid), x + 15, y + 15);
  }

  drawDistanceBetweenPoints(pointA, pointB, distance) {
    let x1 = pointA.cords[X] * 19;
    let y1 = pointA.cords[Y] * 19;
    let x2 = pointB.cords[X] * 19;
    let y2 = pointB.cords[Y] * 19;
    stroke('black');
    strokeWeight(0.25);
    line(x1, y1, x2, y2);
    text(pointA.cords[W], x1 + 15, y1 + 15);
    text(distance.toFixed(2), (x1 + x2) / 2, (y1 + y2) / 2);
  }

  drawDistanceToCentroid(point, centroid, yOffset) {
    let x1 = point.cords[X] * 19;
    let y1 = point.cords[Y] * 19;
    let x2 = centroid.cords[X] * 19;
    let y2 = centroid.cords[Y] * 19;
    let dist = centroid.actualDistances.filter((dat) => dat.name === point.name)[0].distance;
    stroke(centroid.color);
    fill(centroid.color);
    strokeWeight(0.4);
    line(x1, y1, x2, y2);
    text(dist, x1 + 15, y1 + yOffset);
  };

  buildPointInfoString() {
    let str = '';
    str += `Point: ${this.name}\n`;
    str += `X: ${this.cords[X]}\n`;
    str += `Y: ${this.cords[Y]}\n`;
    str += `W: ${this.cords[W]}\n`;
    return str;
  }

}