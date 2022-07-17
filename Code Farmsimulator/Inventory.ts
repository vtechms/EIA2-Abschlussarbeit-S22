namespace FarmSimulator {
  export class Inventory {
    redCabbage: RedCabbage[] = [];
    corn: Corn[] = [];
    carrot: Carrot[] = [];
    tomato: Tomato[] = [];
    onion: Onion[] = [];

    fertilizer: number = 0;
    pesticide: number = 0;

    addSeedling(selectedSeedling: string): void {
      switch (selectedSeedling) {
        case "redCabbage":
          this.redCabbage.push(new RedCabbage());
          break;
        case "corn":
          this.corn.push(new Corn());
          break;
        case "carrot":
          this.carrot.push(new Carrot());
          break;
        case "tomato":
          this.tomato.push(new Tomato());
          break;
        case "onion":
          this.onion.push(new Onion());
          break;
      }
    }

    getSeedling(selectedSeedling: string): Vegetable {
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

    getSeedlingsCount(selectedSeedling: string): number {
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

    addFertilizer(): void {
      this.fertilizer += 1;
    }

    getFertilizer(): number {
      if (this.fertilizer > 0) {
        this.fertilizer -= 1;
        return 1;
      } else {
        return 0;
      }
    }

    getFertilizerCount(): number {
      return this.fertilizer;
    }

    addPesticide(): void {
      this.pesticide += 1;
    }

    getPesticide(): number {
      if (this.pesticide > 0) {
        this.pesticide -= 1;
        return 1;
      } else {
        return 0;
      }
    }

    getPesticideCount(): number {
      return this.pesticide;
    }
  }
}
