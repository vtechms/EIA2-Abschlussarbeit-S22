namespace FarmSimulator {
  export class Position {
    row: number;
    column: number;

    constructor(_column: number, _row: number) {
      this.column = _column;
      this.row = _row;
    }
  }
}
