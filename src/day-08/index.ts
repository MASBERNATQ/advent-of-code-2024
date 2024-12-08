import Utils from "../utils";

type Position = {
  x: number;
  y: number;
};

class Day8 {
  private input;
  private list;

  constructor(input: string) {
    this.input = this.parseInput(input);
    this.list = this.buildList();
  }

  private parseInput(input: string) {
    return input.split("\n").map((row) => row.split(""));
  }

  private buildList() {
    const list: Record<string, Position[]> = {};

    this.input.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        if (element === ".") return;

        if (!list.hasOwnProperty(element)) {
          list[element] = [];
        }

        list[element].push({ x: colIndex, y: rowIndex });
      });
    });

    return list;
  }

  private isInBounds(position: Position): boolean {
    const rows = this.input.length;
    const cols = this.input[0].length;

    return position.x >= 0 && position.x < rows && position.y >= 0 && position.y < cols;
  }

  public partOne() {
    const antipodes = new Set();

    Object.entries(this.list).forEach(([_, values]) => {
      values.forEach(({ x: x1, y: y1 }) => {
        values.forEach(({ x: x2, y: y2 }) => {
          if (x1 === x2 && y1 === y2) return;

          const diff: Position = { x: x1 - x2, y: y1 - y2 };
          const antipodePosition: Position = { x: x1 + diff.x, y: y1 + diff.y };

          if (this.isInBounds(antipodePosition)) {
            antipodes.add(JSON.stringify(antipodePosition));
          }
        });
      });
    });

    return antipodes.size;
  }

  public partTwo() {
    const antipodes = new Set();

    Object.entries(this.list).forEach(([_, values]) => {
      values.forEach(({ x: x1, y: y1 }) => {
        values.forEach(({ x: x2, y: y2 }) => {
          if (x1 === x2 && y1 === y2) return;

          const diff: Position = { x: x2 - x1, y: y2 - y1 };
          let index = 1;

          while (true) {
            const antipodePosition: Position = {
              x: x1 + diff.x * index,
              y: y1 + diff.y * index,
            };

            if (!this.isInBounds(antipodePosition)) {
              break;
            }

            antipodes.add(JSON.stringify(antipodePosition));
            index++;
          }
        });
      });
    });

    return antipodes.size;
  }
}

// Result.
const input = Utils.readInput();
const day8 = new Day8(input);

console.log(day8.partOne());
console.log(day8.partTwo());
