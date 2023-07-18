

export class DisplayTools {
  constructor(IS_3D) {
    //attributes
    this.IS_3D = IS_3D;

    // configuration methods run once
    this.setupCanvas();
  }

  setupCanvas() {
    if (this.IS_3D) {
      createCanvas((windowWidth - 200), (windowHeight - 150), WEBGL);
    } else {
      createCanvas((windowWidth - 200), (windowHeight - 150));
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

  drawAxes(){
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

}