var FarmSimulator;
(function (FarmSimulator) {
    class RedCabbage extends FarmSimulator.Vegetable {
        constructor() {
            super("redCabbage", "#BF45AB", 5, 5, 5);
        }
    }
    FarmSimulator.RedCabbage = RedCabbage;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=RedCabbage.js.map