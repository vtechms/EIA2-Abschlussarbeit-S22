var FarmSimulator;
(function (FarmSimulator) {
    class Wallet {
        constructor(_cash) {
            this.cash = _cash;
        }
        addCash(_cash) {
            this.cash += _cash;
        }
        removeCash(_price) {
            if (this.cash - _price < 0) {
                return false;
            }
            this.cash -= _price;
            return true;
        }
    }
    FarmSimulator.Wallet = Wallet;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Wallet.js.map