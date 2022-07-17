namespace FarmSimulator {
  export const CANVAS_WIDTH: number = 700;
  export const CANVAS_HEIGHT: number = CANVAS_WIDTH;
  export const NUMBER_ROWS: number = 7;
  export const NUMBER_COLUMNS: number = NUMBER_ROWS;
  export const CELL_SIZE: number = CANVAS_WIDTH / NUMBER_COLUMNS;

  export let wallet: Wallet = new Wallet(100);
  export let table: HTMLTableElement;
  export let inventory: Inventory;
  export let selectedCell: Cell;
  export let selectedSeedling: string;
  export let cells: Cell[][] = [];
  export let market: Market;
  export let crc2: CanvasRenderingContext2D;

  let canvas: HTMLCanvasElement;
  let selectedAction: string;
  let cashDisplay: HTMLElement;
  let pests: Pest[] = [];

  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
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

  function configureCanvas(): void {
    canvas = document.querySelector("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }

  function configureContext2D(): void {
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.lineWidth = 2;
    crc2.font = "12px Arial";
  }

  function initializeCells(): void {
    for (let row = 0; row < NUMBER_ROWS; row++) {
      let entireRow: Cell[] = [];
      for (let column = 0; column < NUMBER_COLUMNS; column++) {
        entireRow.push(new Cell(new Position(row, column)));
      }
      cells.push(entireRow);
    }
  }

  function initializeInventory(): void {
    inventory = new Inventory();
  }

  function initializeMarket(): void {
    market = new Market();
    market.simulatePrices();
  }

  function initializeTable(): void {
    table = document.querySelector("table");
  }

  function initializeCashDisplay(): void {
    cashDisplay = document.querySelector("#wallet");
  }

  function addEventListenersToCanvas(): void {
    canvas.addEventListener("mousedown", getClickedCell);
    canvas.addEventListener("mousedown", farm);
  }

  function getClickedCell(_event: MouseEvent): void {
    let domRect: DOMRect = crc2.canvas.getBoundingClientRect();
    let column: number = Math.floor(
      (((_event.clientX - domRect.left) / domRect.width) * crc2.canvas.width) /
        CELL_SIZE
    );
    let row: number = Math.floor(
      (((_event.clientY - domRect.top) / domRect.height) * crc2.canvas.height) /
        CELL_SIZE
    );

    try {
      selectedCell = cells[column][row];
    } catch (error) {
      //console.log(error);
    }
  }

  function farm(_event: MouseEvent): void {
    if (selectedAction == "plant") {
      selectedCell.plantSeedling();
    } else if (selectedAction == "water") {
      selectedCell.water();
    } else if (selectedAction == "fertilize") {
      selectedCell.fertilize();
    } else if (selectedAction == "harvest") {
      selectedCell.harvest();
    }
  }

  function addEventListenerToActionSelector(): void {
    let options: HTMLElement = document.querySelector("#action-options");
    options.addEventListener("change", getSelectedAction);
  }

  function getSelectedAction(_event: Event): void {
    selectedAction = (<HTMLInputElement>_event.target).value;
  }

  function addEventListenerToSeedlingSelector(): void {
    let options: HTMLElement = document.querySelector("#seedling-options");
    options.addEventListener("change", getSelectedSeedling);
  }

  function getSelectedSeedling(_event: Event): void {
    selectedSeedling = (<HTMLInputElement>_event.target).value;
  }

  function addEventListenersToBuyButtons(): void {
    let vegetables: string[] = [
      "red-cabbage",
      "corn",
      "carrot",
      "tomato",
      "onion",
    ];

    for (let vegetable of vegetables) {
      let button: HTMLElement = document.querySelector(
        `button#buy-${vegetable}`
      );
      button.addEventListener("click", buySeedling);
    }

    let button: HTMLElement = document.querySelector("button#buy-fertilizer");
    button.addEventListener("click", buyFertilizer);

    button = document.querySelector("button#buy-pesticide");
    button.addEventListener("click", buyPesticide);
  }

  function buySeedling(_event: Event): void {
    let selectedSeedling: string = (<HTMLInputElement>_event.target).value;
    market.buySeedling(selectedSeedling);
  }

  function buyFertilizer(_event: Event): void {
    market.buyFertilizer();
  }

  function buyPesticide(_event: Event): void {
    market.buyPesticide();
  }

  function addEventListenerToSprayPesticide(): void {
    canvas.addEventListener("mousedown", sprayPesticide);
  }

  function sprayPesticide(_event: MouseEvent): void {
    if (
      selectedAction != "pest-control" ||
      inventory.getPesticideCount() == 0
    ) {
      return;
    }
    inventory.getPesticide();

    let domRect: DOMRect = crc2.canvas.getBoundingClientRect();
    let sprayXY: Vector = new Vector(
      _event.clientX - domRect.left,
      _event.clientY - domRect.top
    );

    let copyP: Pest[] = pests.slice(); // Copies array
    for (let i = 0; i < copyP.length; i++) {
      let pestXY: Vector = new Vector(
        copyP[i].positionXY.x,
        copyP[i].positionXY.y
      );
      let distance: number = getDistanceBetween2Vectors(sprayXY, pestXY);
      if (isHit(distance, copyP[i].radius)) {
        let sprayedPest: Pest[] = pests.splice(i, 1); // Removes i-th element, kills pests
        try {
          sprayedPest[0].attackedCell.vegetable.hasPest = false;
        } catch (error) {
          // Pest killed before vegetable attacked
        }
      } else {
        crc2.strokeStyle = "black";
      }
    }
  }

  function getDistanceBetween2Vectors(
    _posXY1: Vector,
    _posXY2: Vector
  ): number {
    return (
      ((_posXY1.x - _posXY2.x) ** 2 + (_posXY1.y - _posXY2.y) ** 2) ** (1 / 2)
    );
  }

  function isHit(_distance: number, _radius: number): boolean {
    return _radius >= _distance ? true : false;
  }

  function createPests(): void {
    if (pests.length > 4) {
      return;
    }
    let numberPests: number = getRandomInt(1, 3);
    for (let i: number = 0; i < numberPests; i++) {
      let pest: Pest = new Pest(
        new Vector(20, 20),
        new Vector(getRandomInt(1, 5), getRandomInt(1, 5)),
        20
      );
      pests.push(pest);
    }
  }

  export function getRandomInt(_min: number, _max: number): number {
    let min: number = Math.ceil(_min);
    let max: number = Math.floor(_max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function simulateMarket(): void {
    market.simulatePrices();
  }

  function simulateAndAnimateFarm(): void {
    requestAnimationFrame(simulateAndAnimateFarm);
    crc2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Simulate vegetables
    for (let row = 0; row < NUMBER_ROWS; row++) {
      for (let column = 0; column < NUMBER_COLUMNS; column++) {
        if (!cells[column][row].isEmpty()) {
          let cell = cells[column][row];
          cell.vegetable.grow(cell);
          cell.draw();
        }
      }
    }

    // Simulate pests
    for (let i: number = 0; i < pests.length; i++) {
      let pest: Pest = pests[i];
      pest.draw();
      pestLandsOnVegetable();
      if (pest.isOnVegetable) {
        continue;
      }
      pest.update();
      let pos: Position = getPositionToVector(pest.positionXY);
    }

    refreshTable();
    refreshCashDisplay();
  }

  function pestLandsOnVegetable(): void {
    for (let row = 0; row < NUMBER_ROWS; row++) {
      for (let column = 0; column < NUMBER_COLUMNS; column++) {
        let cell: Cell = cells[column][row];
        let cellXY: Vector = cell.positionXY;

        if (cell.vegetable == undefined) {
          continue;
        }

        for (let pest of pests) {
          let distance: number = getDistanceBetween2Vectors(
            cellXY,
            pest.positionXY
          );
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

  function getPositionToVector(_vector: Vector): Position {
    let domRect: DOMRect = crc2.canvas.getBoundingClientRect();
    let column: number = Math.floor(
      (((_vector.x - domRect.left) / domRect.width) * crc2.canvas.width) /
        CELL_SIZE
    );
    let row: number = Math.floor(
      (((_vector.y - domRect.top) / domRect.height) * crc2.canvas.height) /
        CELL_SIZE
    );
    return new Position(column, row);
  }

  function refreshTable(): void {
    let row: number = 2;
    for (let seedlingName in market.buyPricesSeedlings) {
      // Refresh seedling buy prices
      table.rows[row].cells[1].innerHTML = String(
        market.buyPricesSeedlings[seedlingName].current
      );
      // Refresh seedling inventory
      table.rows[row].cells[2].innerHTML = String(
        inventory.getSeedlingsCount(seedlingName)
      );
      // Refresh seedling sell prices
      table.rows[row].cells[3].innerHTML = String(
        market.sellPricesVegetables[seedlingName].current
      );
      row += 1;
    }

    // Refresh fertilizer buy price
    table.rows[row].cells[1].innerHTML = String(
      market.buyPriceFertilizer["fertilizer"].current
    );
    // Refresh fertilizer inventory
    table.rows[row].cells[2].innerHTML = String(inventory.getFertilizerCount());
    row += 1;

    // Refresh pesticide buy price
    table.rows[row].cells[1].innerHTML = String(
      market.buyPricePesticide["pesticide"].current
    );
    // Refresh pesticide inventory
    table.rows[row].cells[2].innerHTML = String(inventory.getPesticideCount());
  }

  function refreshCashDisplay(): void {
    cashDisplay.innerHTML = `Cash: ${wallet.cash}`;
  }
}
