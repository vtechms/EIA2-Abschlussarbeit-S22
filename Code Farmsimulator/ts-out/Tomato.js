var FarmSimulator;
(function (FarmSimulator) {
    class Tomato extends FarmSimulator.Vegetable {
        constructor() {
            super("tomato", "#F24130", 6, 6, 6);
        }
    }
    FarmSimulator.Tomato = Tomato;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Tomato.js.map