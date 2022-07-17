var FarmSimulator;
(function (FarmSimulator) {
    class Cell {
        constructor(_positionCR) {
            this.availableWater = 0;
            this.availableFertilizer = 0;
            this.positionCR = _positionCR;
            this.positionXY = new FarmSimulator.Vector(_positionCR.column * FarmSimulator.CELL_SIZE + 5, _positionCR.row * FarmSimulator.CELL_SIZE + 5);
        }
        plantSeedling() {
            if (FarmSimulator.inventory.getSeedlingsCount(FarmSimulator.selectedSeedling) > 0 &&
                FarmSimulator.selectedCell.isEmpty()) {
                this.vegetable = FarmSimulator.inventory.getSeedling(FarmSimulator.selectedSeedling);
            }
        }
        isEmpty() {
            return this.vegetable == null;
        }
        water() {
            if (!FarmSimulator.selectedCell.isEmpty()) {
                this.availableWater += 1;
            }
        }
        fertilize() {
            if (FarmSimulator.inventory.getFertilizerCount() > 0 && !FarmSimulator.selectedCell.isEmpty()) {
                this.availableFertilizer += FarmSimulator.inventory.getFertilizer();
            }
        }
        harvest() {
            if (!FarmSimulator.selectedCell.isEmpty() && this.vegetable.isReadyForHarvest()) {
                FarmSimulator.market.sellVegetable(this.vegetable.name);
                this.clearCell();
            }
        }
        clearCell() {
            this.vegetable = null;
            this.availableWater = 0;
            this.availableFertilizer = 0;
            try {
                this.attackingPest.isOnVegetable = false;
                this.attackingPest = null;
            }
            catch (error) { }
        }
        draw() {
            if (this.vegetable == null) {
                return;
            }
            this.vegetable.draw(this.positionXY);
            FarmSimulator.crc2.fillStyle = "#0487D9";
            FarmSimulator.crc2.fillText(`Water ${this.availableWater.toFixed(1)}`, this.positionXY.x, this.positionXY.y + FarmSimulator.CELL_SIZE * 0.7);
            FarmSimulator.crc2.fillStyle = "#A6774E";
            FarmSimulator.crc2.fillText(`Fertilizer ${this.availableFertilizer.toFixed(1)}`, this.positionXY.x, this.positionXY.y + FarmSimulator.CELL_SIZE * 0.8);
        }
    }
    FarmSimulator.Cell = Cell;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Cell.js.map