var FarmSimulator;
(function (FarmSimulator) {
    class Vegetable {
        constructor(_name, _color, _neededWater, _neededFertilizer, _neededGrowthTime) {
            this.actualGrowthTime = 1;
            this.hasPest = false;
            this.name = _name;
            this.color = _color;
            this.neededWater = _neededWater;
            this.neededFertilizer = _neededFertilizer;
            this.neededGrowthTime = _neededGrowthTime;
        }
        isReadyForHarvest() {
            return this.actualGrowthTime >= this.neededGrowthTime ? true : false;
        }
        grow(_cell) {
            let consume = 0.001;
            if (_cell.availableWater > consume &&
                _cell.availableFertilizer > consume) {
                _cell.availableWater -= consume;
                _cell.availableFertilizer -= consume;
                this.actualGrowthTime += 0.005;
            }
            else {
                this.actualGrowthTime -= 0.0001;
            }
            if (this.hasPest) {
                this.actualGrowthTime -= 0.001;
            }
            if (_cell.availableWater > 10 ||
                _cell.availableFertilizer > 10 ||
                this.actualGrowthTime < 0 ||
                this.actualGrowthTime >= this.neededGrowthTime * 2) {
                this.die(_cell);
            }
        }
        die(_cell) {
            _cell.clearCell();
        }
        draw(_positionXY) {
            let growth = this.actualGrowthTime / this.neededGrowthTime <= 0.9
                ? this.actualGrowthTime / this.neededGrowthTime
                : 0.9;
            FarmSimulator.crc2.fillStyle = this.color;
            FarmSimulator.crc2.fillRect(_positionXY.x, _positionXY.y, FarmSimulator.CELL_SIZE * growth, FarmSimulator.CELL_SIZE * growth);
            FarmSimulator.crc2.fillStyle = "black";
            FarmSimulator.crc2.fillText(`Growth ${this.actualGrowthTime.toFixed(1)} / ${this.neededGrowthTime}`, _positionXY.x, _positionXY.y + FarmSimulator.CELL_SIZE * 0.6);
        }
    }
    FarmSimulator.Vegetable = Vegetable;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Vegetable.js.map