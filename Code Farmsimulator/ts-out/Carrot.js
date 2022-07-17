var FarmSimulator;
(function (FarmSimulator) {
    class Carrot extends FarmSimulator.Vegetable {
        constructor() {
            super("carrot", "#F2921D", 2, 2, 2);
        }
    }
    FarmSimulator.Carrot = Carrot;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Carrot.js.map