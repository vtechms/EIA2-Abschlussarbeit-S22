namespace FarmSimulator {
  export class Pest {
    positionXY: Vector;
    velocityXY: Vector;
    radius: number;
    isOnVegetable: boolean;
    attackedCell: Cell;
    constructor(_positionXY: Vector, _velocityXY: Vector, _radius: number) {
      this.positionXY = _positionXY;
      this.velocityXY = _velocityXY;
      this.radius = _radius;
    }

    draw(): void {
      crc2.beginPath();
      crc2.arc(
        this.positionXY.x,
        this.positionXY.y,
        this.radius,
        Math.PI * 2,
        360,
        false
      );
      crc2.stroke();
    }

    update(): void {
      if (
        this.positionXY.x + this.radius > CANVAS_WIDTH ||
        this.positionXY.x - this.radius < 0
      ) {
        this.velocityXY.x = -this.velocityXY.x;
      }

      if (
        this.positionXY.y + this.radius > CANVAS_HEIGHT ||
        this.positionXY.y - this.radius < 0
      ) {
        this.velocityXY.y = -this.velocityXY.y;
      }

      this.positionXY.x += this.velocityXY.x;
      this.positionXY.y += this.velocityXY.y;
    }
  }
}
