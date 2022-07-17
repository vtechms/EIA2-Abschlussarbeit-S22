namespace FarmSimulator {
  export class Vegetable {
    name: string;
    color: string;
    neededWater: number;
    neededFertilizer: number;
    neededGrowthTime: number;
    actualGrowthTime: number = 1;
    hasPest: boolean = false;

    constructor(
      _name: string,
      _color: string,
      _neededWater: number,
      _neededFertilizer: number,
      _neededGrowthTime: number
    ) {
      this.name = _name;
      this.color = _color;
      this.neededWater = _neededWater;
      this.neededFertilizer = _neededFertilizer;
      this.neededGrowthTime = _neededGrowthTime;
    }

    isReadyForHarvest(): boolean {
      return this.actualGrowthTime >= this.neededGrowthTime ? true : false;
    }

    grow(_cell: Cell): void {
      let consume: number = 0.001;
      if (
        _cell.availableWater > consume &&
        _cell.availableFertilizer > consume
      ) {
        _cell.availableWater -= consume;
        _cell.availableFertilizer -= consume;
        this.actualGrowthTime += 0.005;
      } else {
        this.actualGrowthTime -= 0.0001;
      }

      if (this.hasPest) {
        this.actualGrowthTime -= 0.001;
      }

      if (
        _cell.availableWater > 10 ||
        _cell.availableFertilizer > 10 ||
        this.actualGrowthTime < 0 ||
        this.actualGrowthTime >= this.neededGrowthTime * 2
      ) {
        this.die(_cell);
      }
    }

    die(_cell: Cell): void {
      _cell.clearCell();
    }

    draw(_positionXY: Vector): void {
      let growth: number =
        this.actualGrowthTime / this.neededGrowthTime <= 0.9
          ? this.actualGrowthTime / this.neededGrowthTime
          : 0.9;

      crc2.fillStyle = this.color;
      crc2.fillRect(
        _positionXY.x,
        _positionXY.y,
        CELL_SIZE * growth,
        CELL_SIZE * growth
      );

      crc2.fillStyle = "black";
      crc2.fillText(
        `Growth ${this.actualGrowthTime.toFixed(1)} / ${this.neededGrowthTime}`,
        _positionXY.x,
        _positionXY.y + CELL_SIZE * 0.6
      );
    }
  }
}
