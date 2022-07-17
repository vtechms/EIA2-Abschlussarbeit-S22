namespace FarmSimulator {
  export class Cell {
    positionCR: Position;
    positionXY: Vector;
    vegetable: Vegetable;
    availableWater: number = 0;
    availableFertilizer: number = 0;
    attackingPest: Pest;

    constructor(_positionCR: Position) {
      this.positionCR = _positionCR;
      this.positionXY = new Vector(
        _positionCR.column * CELL_SIZE + 5,
        _positionCR.row * CELL_SIZE + 5
      );
    }

    plantSeedling(): void {
      if (
        inventory.getSeedlingsCount(selectedSeedling) > 0 &&
        selectedCell.isEmpty()
      ) {
        this.vegetable = inventory.getSeedling(selectedSeedling);
      }
    }

    isEmpty(): boolean {
      return this.vegetable == null;
    }

    water(): void {
      if (!selectedCell.isEmpty()) {
        this.availableWater += 1;
      }
    }

    fertilize(): void {
      if (inventory.getFertilizerCount() > 0 && !selectedCell.isEmpty()) {
        this.availableFertilizer += inventory.getFertilizer();
      }
    }

    harvest(): void {
      if (!selectedCell.isEmpty() && this.vegetable.isReadyForHarvest()) {
        market.sellVegetable(this.vegetable.name);
        this.clearCell();
      }
    }

    clearCell(): void {
      this.vegetable = null;
      this.availableWater = 0;
      this.availableFertilizer = 0;
      try {
        this.attackingPest.isOnVegetable = false;
        this.attackingPest = null;
      } catch (error) {}
    }

    draw(): void {
      if (this.vegetable == null) {
        return;
      }
      this.vegetable.draw(this.positionXY);

      crc2.fillStyle = "#0487D9";
      crc2.fillText(
        `Water ${this.availableWater.toFixed(1)}`,
        this.positionXY.x,
        this.positionXY.y + CELL_SIZE * 0.7
      );
      crc2.fillStyle = "#A6774E";
      crc2.fillText(
        `Fertilizer ${this.availableFertilizer.toFixed(1)}`,
        this.positionXY.x,
        this.positionXY.y + CELL_SIZE * 0.8
      );
    }
  }
}
