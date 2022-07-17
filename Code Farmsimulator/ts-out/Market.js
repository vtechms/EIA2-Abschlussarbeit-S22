var FarmSimulator;
(function (FarmSimulator) {
    class Market {
        constructor() {
            this.buyPricesSeedlings = {
                redCabbage: {
                    current: 1,
                    min: parseInt(localStorage.getItem("purchase-redCabbage-min")),
                    max: parseInt(localStorage.getItem("purchase-redCabbage-max")),
                },
                corn: {
                    current: 2,
                    min: parseInt(localStorage.getItem("purchase-corn-min")),
                    max: parseInt(localStorage.getItem("purchase-corn-max")),
                },
                carrot: {
                    current: 3,
                    min: parseInt(localStorage.getItem("purchase-carrot-min")),
                    max: parseInt(localStorage.getItem("purchase-carrot-max")),
                },
                tomato: {
                    current: 4,
                    min: parseInt(localStorage.getItem("purchase-tomato-min")),
                    max: parseInt(localStorage.getItem("purchase-tomato-max")),
                },
                onion: {
                    current: 5,
                    min: parseInt(localStorage.getItem("purchase-onion-min")),
                    max: parseInt(localStorage.getItem("purchase-onion-max")),
                },
            };
            this.sellPricesVegetables = {
                redCabbage: {
                    current: 10,
                    min: parseInt(localStorage.getItem("sell-redCabbage-min")),
                    max: parseInt(localStorage.getItem("sell-redCabbage-max")),
                },
                corn: {
                    current: 20,
                    min: parseInt(localStorage.getItem("sell-corn-min")),
                    max: parseInt(localStorage.getItem("sell-corn-max")),
                },
                carrot: {
                    current: 30,
                    min: parseInt(localStorage.getItem("sell-carrot-min")),
                    max: parseInt(localStorage.getItem("sell-carrot-max")),
                },
                tomato: {
                    current: 40,
                    min: parseInt(localStorage.getItem("sell-tomato-min")),
                    max: parseInt(localStorage.getItem("sell-tomato-max")),
                },
                onion: {
                    current: 50,
                    min: parseInt(localStorage.getItem("sell-onion-min")),
                    max: parseInt(localStorage.getItem("sell-onion-max")),
                },
            };
            this.buyPriceFertilizer = {
                fertilizer: {
                    current: 2,
                    min: parseInt(localStorage.getItem("purchase-fertilizer-min")),
                    max: parseInt(localStorage.getItem("purchase-fertilizer-max")),
                },
            };
            this.buyPricePesticide = {
                pesticide: {
                    current: 2,
                    min: parseInt(localStorage.getItem("purchase-pesticide-min")),
                    max: parseInt(localStorage.getItem("purchase-pesticide-max")),
                },
            };
        }
        buySeedling(_selectedSeedling) {
            let price = this.buyPricesSeedlings[_selectedSeedling].current;
            if (FarmSimulator.wallet.removeCash(price)) {
                FarmSimulator.inventory.addSeedling(_selectedSeedling);
            }
        }
        buyFertilizer() {
            let price = this.buyPriceFertilizer["fertilizer"].current;
            if (FarmSimulator.wallet.removeCash(price)) {
                FarmSimulator.inventory.addFertilizer();
            }
        }
        buyPesticide() {
            let price = this.buyPricePesticide["pesticide"].current;
            if (FarmSimulator.wallet.removeCash(price)) {
                FarmSimulator.inventory.addPesticide();
            }
        }
        sellVegetable(_selectedVegetable) {
            let price = this.sellPricesVegetables[_selectedVegetable].current;
            FarmSimulator.wallet.addCash(price);
        }
        simulatePrices() {
            for (let item in this.buyPricesSeedlings) {
                let min = this.buyPricesSeedlings[item].min;
                let max = this.buyPricesSeedlings[item].max;
                this.buyPricesSeedlings[item].current = FarmSimulator.getRandomInt(min, max + 1);
            }
            for (let item in this.buyPriceFertilizer) {
                let min = this.buyPriceFertilizer[item].min;
                let max = this.buyPriceFertilizer[item].max;
                this.buyPriceFertilizer[item].current = FarmSimulator.getRandomInt(min, max + 1);
            }
            for (let item in this.buyPricePesticide) {
                let min = this.buyPricePesticide[item].min;
                let max = this.buyPricePesticide[item].max;
                this.buyPricePesticide[item].current = FarmSimulator.getRandomInt(min, max + 1);
            }
            for (let item in this.sellPricesVegetables) {
                let min = this.sellPricesVegetables[item].min;
                let max = this.sellPricesVegetables[item].max;
                this.sellPricesVegetables[item].current = FarmSimulator.getRandomInt(min, max + 1);
            }
        }
    }
    FarmSimulator.Market = Market;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Market.js.map