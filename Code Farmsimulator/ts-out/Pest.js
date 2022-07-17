var FarmSimulator;
(function (FarmSimulator) {
    class Pest {
        constructor(_positionXY, _velocityXY, _radius) {
            this.positionXY = _positionXY;
            this.velocityXY = _velocityXY;
            this.radius = _radius;
        }
        draw() {
            FarmSimulator.crc2.beginPath();
            FarmSimulator.crc2.arc(this.positionXY.x, this.positionXY.y, this.radius, Math.PI * 2, 360, false);
            FarmSimulator.crc2.stroke();
        }
        update() {
            if (this.positionXY.x + this.radius > FarmSimulator.CANVAS_WIDTH ||
                this.positionXY.x - this.radius < 0) {
                this.velocityXY.x = -this.velocityXY.x;
            }
            if (this.positionXY.y + this.radius > FarmSimulator.CANVAS_HEIGHT ||
                this.positionXY.y - this.radius < 0) {
                this.velocityXY.y = -this.velocityXY.y;
            }
            this.positionXY.x += this.velocityXY.x;
            this.positionXY.y += this.velocityXY.y;
        }
    }
    FarmSimulator.Pest = Pest;
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Pest.js.map