var FarmSimulator;
(function (FarmSimulator) {
    class Corn extends FarmSimulator.Vegetable {
        constructor() {
            super("corn", "#F2C029", 3, 3, 3);
        }
    }
    FarmSimulator.Corn = Corn;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Corn.js.map