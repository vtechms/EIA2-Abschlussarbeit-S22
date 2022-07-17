var FarmSimulator;
(function (FarmSimulator) {
    class Inventory {
        constructor() {
            this.redCabbage = [];
            this.corn = [];
            this.carrot = [];
            this.tomato = [];
            this.onion = [];
            this.fertilizer = 0;
            this.pesticide = 0;
        }
        addSeedling(selectedSeedling) {
            switch (selectedSeedling) {
                case "redCabbage":
                    this.redCabbage.push(new FarmSimulator.RedCabbage());
                    break;
                case "corn":
                    this.corn.push(new FarmSimulator.Corn());
                    break;
                case "carrot":
                    this.carrot.push(new FarmSimulator.Carrot());
                    break;
                case "tomato":
                    this.tomato.push(new FarmSimulator.Tomato());
                    break;
                case "onion":
                    this.onion.push(new FarmSimulator.Onion());
                    break;
            }
        }
        getSeedling(selectedSeedling) {
            switch (selectedSeedling) {
                case "redCabbage":
                    return this.redCabbage.pop();
                case "corn":
                    return this.corn.pop();
                case "carrot":
                    return this.carrot.pop();
                case "tomato":
                    return this.tomato.pop();
                case "onion":
                    return this.onion.pop();
            }
        }
        getSeedlingsCount(selectedSeedling) {
            switch (selectedSeedling) {
                case "redCabbage":
                    return this.redCabbage.length;
                case "corn":
                    return this.corn.length;
                case "carrot":
                    return this.carrot.length;
                case "tomato":
                    return this.tomato.length;
                    break;
                case "onion":
                    return this.onion.length;
            }
        }
        addFertilizer() {
            this.fertilizer += 1;
        }
        getFertilizer() {
            if (this.fertilizer > 0) {
                this.fertilizer -= 1;
                return 1;
            }
            else {
                return 0;
            }
        }
        getFertilizerCount() {
            return this.fertilizer;
        }
        addPesticide() {
            this.pesticide += 1;
        }
        getPesticide() {
            if (this.pesticide > 0) {
                this.pesticide -= 1;
                return 1;
            }
            else {
                return 0;
            }
        }
        getPesticideCount() {
            return this.pesticide;
        }
    }
    FarmSimulator.Inventory = Inventory;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Inventory.js.map