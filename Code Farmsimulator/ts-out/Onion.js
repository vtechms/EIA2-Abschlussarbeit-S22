var FarmSimulator;
(function (FarmSimulator) {
    class Onion extends FarmSimulator.Vegetable {
        constructor() {
            super("onion", "#F2F2F2", 4, 4, 4);
        }
    }
    FarmSimulator.Onion = Onion;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Onion.js.map