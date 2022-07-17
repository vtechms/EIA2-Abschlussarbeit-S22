namespace FarmSimulator {
  export class Wallet {
    cash: number;

    constructor(_cash: number) {
      this.cash = _cash;
    }

    addCash(_cash: number): void {
      this.cash += _cash;
    }

    removeCash(_price: number): boolean {
      if (this.cash - _price < 0) {
        return false;
      }
      this.cash -= _price;
      return true;
    }
  }
}
