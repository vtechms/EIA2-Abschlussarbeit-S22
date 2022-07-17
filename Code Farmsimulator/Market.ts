namespace FarmSimulator {
  export class Market {
    buyPricesSeedlings: {
      redCabbage: {
        current: number;
        min: number;
        max: number;
      };
      corn: {
        current: number;
        min: number;
        max: number;
      };
      carrot: {
        current: number;
        min: number;
        max: number;
      };
      tomato: {
        current: number;
        min: number;
        max: number;
      };
      onion: {
        current: number;
        min: number;
        max: number;
      };
    };

    sellPricesVegetables: {
      redCabbage: {
        current: number;
        min: number;
        max: number;
      };
      corn: {
        current: number;
        min: number;
        max: number;
      };
      carrot: {
        current: number;
        min: number;
        max: number;
      };
      tomato: {
        current: number;
        min: number;
        max: number;
      };
      onion: {
        current: number;
        min: number;
        max: number;
      };
    };

    buyPriceFertilizer: {
      fertilizer: {
        current: number;
        min: number;
        max: number;
      };
    };

    buyPricePesticide: {
      pesticide: {
        current: number;
        min: number;
        max: number;
      };
    };

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

    buySeedling(_selectedSeedling: string): void {
      let price: number = this.buyPricesSeedlings[_selectedSeedling].current;
      if (wallet.removeCash(price)) {
        inventory.addSeedling(_selectedSeedling);
      }
    }

    buyFertilizer(): void {
      let price: number = this.buyPriceFertilizer["fertilizer"].current;
      if (wallet.removeCash(price)) {
        inventory.addFertilizer();
      }
    }

    buyPesticide(): void {
      let price: number = this.buyPricePesticide["pesticide"].current;
      if (wallet.removeCash(price)) {
        inventory.addPesticide();
      }
    }

    sellVegetable(_selectedVegetable: string): void {
      let price: number = this.sellPricesVegetables[_selectedVegetable].current;
      wallet.addCash(price);
    }

    simulatePrices(): void {
      for (let item in this.buyPricesSeedlings) {
        let min: number = this.buyPricesSeedlings[item].min;
        let max: number = this.buyPricesSeedlings[item].max;
        this.buyPricesSeedlings[item].current = getRandomInt(min, max + 1);
      }

      for (let item in this.buyPriceFertilizer) {
        let min: number = this.buyPriceFertilizer[item].min;
        let max: number = this.buyPriceFertilizer[item].max;
        this.buyPriceFertilizer[item].current = getRandomInt(min, max + 1);
      }

      for (let item in this.buyPricePesticide) {
        let min: number = this.buyPricePesticide[item].min;
        let max: number = this.buyPricePesticide[item].max;
        this.buyPricePesticide[item].current = getRandomInt(min, max + 1);
      }

      for (let item in this.sellPricesVegetables) {
        let min: number = this.sellPricesVegetables[item].min;
        let max: number = this.sellPricesVegetables[item].max;
        this.sellPricesVegetables[item].current = getRandomInt(min, max + 1);
      }
    }
  }
}
