var FarmSimulator;
(function (FarmSimulator) {
    FarmSimulator.CANVAS_WIDTH = 700;
    FarmSimulator.CANVAS_HEIGHT = FarmSimulator.CANVAS_WIDTH;
    FarmSimulator.NUMBER_ROWS = 7;
    FarmSimulator.NUMBER_COLUMNS = FarmSimulator.NUMBER_ROWS;
    FarmSimulator.CELL_SIZE = FarmSimulator.CANVAS_WIDTH / FarmSimulator.NUMBER_COLUMNS;
    FarmSimulator.wallet = new FarmSimulator.Wallet(100);
    FarmSimulator.cells = [];
    let canvas;
    let selectedAction;
    let cashDisplay;
    let pests = [];
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        configureCanvas();
        configureContext2D();
        initializeCells();
        initializeInventory();
        initializeMarket();
        initializeTable();
        initializeCashDisplay();
        addEventListenersToCanvas();
        addEventListenerToActionSelector();
        addEventListenerToSeedlingSelector();
        addEventListenersToBuyButtons();
        addEventListenerToSprayPesticide();
        window.setInterval(createPests, 2000);
        window.setInterval(simulateMarket, 5000);
        simulateAndAnimateFarm();
    }
    function configureCanvas() {
        canvas = document.querySelector("canvas");
        canvas.width = FarmSimulator.CANVAS_WIDTH;
        canvas.height = FarmSimulator.CANVAS_HEIGHT;
    }
    function configureContext2D() {
        FarmSimulator.crc2 = canvas.getContext("2d");
        FarmSimulator.crc2.lineWidth = 2;
        FarmSimulator.crc2.font = "12px Arial";
    }
    function initializeCells() {
        for (let row = 0; row < FarmSimulator.NUMBER_ROWS; row++) {
            let entireRow = [];
            for (let column = 0; column < FarmSimulator.NUMBER_COLUMNS; column++) {
                entireRow.push(new FarmSimulator.Cell(new FarmSimulator.Position(row, column)));
            }
            FarmSimulator.cells.push(entireRow);
        }
    }
    function initializeInventory() {
        FarmSimulator.inventory = new FarmSimulator.Inventory();
    }
    function initializeMarket() {
        FarmSimulator.market = new FarmSimulator.Market();
        FarmSimulator.market.simulatePrices();
    }
    function initializeTable() {
        FarmSimulator.table = document.querySelector("table");
    }
    function initializeCashDisplay() {
        cashDisplay = document.querySelector("#wallet");
    }
    function addEventListenersToCanvas() {
        canvas.addEventListener("mousedown", getClickedCell);
        canvas.addEventListener("mousedown", farm);
    }
    function getClickedCell(_event) {
        let domRect = FarmSimulator.crc2.canvas.getBoundingClientRect();
        let column = Math.floor((((_event.clientX - domRect.left) / domRect.width) * FarmSimulator.crc2.canvas.width) /
            FarmSimulator.CELL_SIZE);
        let row = Math.floor((((_event.clientY - domRect.top) / domRect.height) * FarmSimulator.crc2.canvas.height) /
            FarmSimulator.CELL_SIZE);
        try {
            FarmSimulator.selectedCell = FarmSimulator.cells[column][row];
        }
        catch (error) {
            //console.log(error);
        }
    }
    function farm(_event) {
        if (selectedAction == "plant") {
            FarmSimulator.selectedCell.plantSeedling();
        }
        else if (selectedAction == "water") {
            FarmSimulator.selectedCell.water();
        }
        else if (selectedAction == "fertilize") {
            FarmSimulator.selectedCell.fertilize();
        }
        else if (selectedAction == "harvest") {
            FarmSimulator.selectedCell.harvest();
        }
    }
    function addEventListenerToActionSelector() {
        let options = document.querySelector("#action-options");
        options.addEventListener("change", getSelectedAction);
    }
    function getSelectedAction(_event) {
        selectedAction = _event.target.value;
    }
    function addEventListenerToSeedlingSelector() {
        let options = document.querySelector("#seedling-options");
        options.addEventListener("change", getSelectedSeedling);
    }
    function getSelectedSeedling(_event) {
        FarmSimulator.selectedSeedling = _event.target.value;
    }
    function addEventListenersToBuyButtons() {
        let vegetables = [
            "red-cabbage",
            "corn",
            "carrot",
            "tomato",
            "onion",
        ];
        for (let vegetable of vegetables) {
            let button = document.querySelector(`button#buy-${vegetable}`);
            button.addEventListener("click", buySeedling);
        }
        let button = document.querySelector("button#buy-fertilizer");
        button.addEventListener("click", buyFertilizer);
        button = document.querySelector("button#buy-pesticide");
        button.addEventListener("click", buyPesticide);
    }
    function buySeedling(_event) {
        let selectedSeedling = _event.target.value;
        FarmSimulator.market.buySeedling(selectedSeedling);
    }
    function buyFertilizer(_event) {
        FarmSimulator.market.buyFertilizer();
    }
    function buyPesticide(_event) {
        FarmSimulator.market.buyPesticide();
    }
    function addEventListenerToSprayPesticide() {
        canvas.addEventListener("mousedown", sprayPesticide);
    }
    function sprayPesticide(_event) {
        if (selectedAction != "pest-control" ||
            FarmSimulator.inventory.getPesticideCount() == 0) {
            return;
        }
        FarmSimulator.inventory.getPesticide();
        let domRect = FarmSimulator.crc2.canvas.getBoundingClientRect();
        let sprayXY = new FarmSimulator.Vector(_event.clientX - domRect.left, _event.clientY - domRect.top);
        let copyP = pests.slice(); // Copies array
        for (let i = 0; i < copyP.length; i++) {
            let pestXY = new FarmSimulator.Vector(copyP[i].positionXY.x, copyP[i].positionXY.y);
            let distance = getDistanceBetween2Vectors(sprayXY, pestXY);
            if (isHit(distance, copyP[i].radius)) {
                let sprayedPest = pests.splice(i, 1); // Removes i-th element, kills pests
                try {
                    sprayedPest[0].attackedCell.vegetable.hasPest = false;
                }
                catch (error) {
                    // Pest killed before vegetable attacked
                }
            }
            else {
                FarmSimulator.crc2.strokeStyle = "black";
            }
        }
    }
    function getDistanceBetween2Vectors(_posXY1, _posXY2) {
        return (((_posXY1.x - _posXY2.x) ** 2 + (_posXY1.y - _posXY2.y) ** 2) ** (1 / 2));
    }
    function isHit(_distance, _radius) {
        return _radius >= _distance ? true : false;
    }
    function createPests() {
        if (pests.length > 4) {
            return;
        }
        let numberPests = getRandomInt(1, 3);
        for (let i = 0; i < numberPests; i++) {
            let pest = new FarmSimulator.Pest(new FarmSimulator.Vector(20, 20), new FarmSimulator.Vector(getRandomInt(1, 5), getRandomInt(1, 5)), 20);
            pests.push(pest);
        }
    }
    function getRandomInt(_min, _max) {
        let min = Math.ceil(_min);
        let max = Math.floor(_max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    FarmSimulator.getRandomInt = getRandomInt;
    function simulateMarket() {
        FarmSimulator.market.simulatePrices();
    }
    function simulateAndAnimateFarm() {
        requestAnimationFrame(simulateAndAnimateFarm);
        FarmSimulator.crc2.clearRect(0, 0, FarmSimulator.CANVAS_WIDTH, FarmSimulator.CANVAS_HEIGHT);
        // Simulate vegetables
        for (let row = 0; row < FarmSimulator.NUMBER_ROWS; row++) {
            for (let column = 0; column < FarmSimulator.NUMBER_COLUMNS; column++) {
                if (!FarmSimulator.cells[column][row].isEmpty()) {
                    let cell = FarmSimulator.cells[column][row];
                    cell.vegetable.grow(cell);
                    cell.draw();
                }
            }
        }
        // Simulate pests
        for (let i = 0; i < pests.length; i++) {
            let pest = pests[i];
            pest.draw();
            pestLandsOnVegetable();
            if (pest.isOnVegetable) {
                continue;
            }
            pest.update();
            let pos = getPositionToVector(pest.positionXY);
        }
        refreshTable();
        refreshCashDisplay();
    }
    function pestLandsOnVegetable() {
        for (let row = 0; row < FarmSimulator.NUMBER_ROWS; row++) {
            for (let column = 0; column < FarmSimulator.NUMBER_COLUMNS; column++) {
                let cell = FarmSimulator.cells[column][row];
                let cellXY = cell.positionXY;
                if (cell.vegetable == undefined) {
                    continue;
                }
                for (let pest of pests) {
                    let distance = getDistanceBetween2Vectors(cellXY, pest.positionXY);
                    if (isHit(distance, pest.radius) && !cell.vegetable.hasPest) {
                        pest.isOnVegetable = true;
                        pest.attackedCell = cell;
                        cell.attackingPest = pest;
                        cell.vegetable.hasPest = true;
                    }
                }
            }
        }
    }
    function getPositionToVector(_vector) {
        let domRect = FarmSimulator.crc2.canvas.getBoundingClientRect();
        let column = Math.floor((((_vector.x - domRect.left) / domRect.width) * FarmSimulator.crc2.canvas.width) /
            FarmSimulator.CELL_SIZE);
        let row = Math.floor((((_vector.y - domRect.top) / domRect.height) * FarmSimulator.crc2.canvas.height) /
            FarmSimulator.CELL_SIZE);
        return new FarmSimulator.Position(column, row);
    }
    function refreshTable() {
        let row = 2;
        for (let seedlingName in FarmSimulator.market.buyPricesSeedlings) {
            // Refresh seedling buy prices
            FarmSimulator.table.rows[row].cells[1].innerHTML = String(FarmSimulator.market.buyPricesSeedlings[seedlingName].current);
            // Refresh seedling inventory
            FarmSimulator.table.rows[row].cells[2].innerHTML = String(FarmSimulator.inventory.getSeedlingsCount(seedlingName));
            // Refresh seedling sell prices
            FarmSimulator.table.rows[row].cells[3].innerHTML = String(FarmSimulator.market.sellPricesVegetables[seedlingName].current);
            row += 1;
        }
        // Refresh fertilizer buy price
        FarmSimulator.table.rows[row].cells[1].innerHTML = String(FarmSimulator.market.buyPriceFertilizer["fertilizer"].current);
        // Refresh fertilizer inventory
        FarmSimulator.table.rows[row].cells[2].innerHTML = String(FarmSimulator.inventory.getFertilizerCount());
        row += 1;
        // Refresh pesticide buy price
        FarmSimulator.table.rows[row].cells[1].innerHTML = String(FarmSimulator.market.buyPricePesticide["pesticide"].current);
        // Refresh pesticide inventory
        FarmSimulator.table.rows[row].cells[2].innerHTML = String(FarmSimulator.inventory.getPesticideCount());
    }
    function refreshCashDisplay() {
        cashDisplay.innerHTML = `Cash: ${FarmSimulator.wallet.cash}`;
    }
})(FarmSimulator || (FarmSimulator = {}));
//# sourceMappingURL=Main.js.map