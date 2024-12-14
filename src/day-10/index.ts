import Utils from "../utils";

type Position = {
  x: number;
  y: number;
};

const DIRECTION = {
  BOTTOM: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
  TOP: { dx: 0, dy: -1 },
};

const STEP = 1;

class Day10 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    return input.split("\n").map((row) => row.split("").map(Number));
  }

  private isInBounds(position: Position): boolean {
    const rows = this.input.length;
    const cols = this.input[0].length;

    return position.x >= 0 && position.x < rows && position.y >= 0 && position.y < cols;
  }

  public partOne() {
    let total = 0;

    this.input.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item !== 0) return;

        const queue: Position[] = [{ x: colIndex, y: rowIndex }];
        const seen: Set<string> = new Set();

        while (queue.length) {
          const position = queue.pop() as Position;
          const current = this.input[position.y][position.x];

          if (seen.has(JSON.stringify(position))) continue;
          seen.add(JSON.stringify(position));

          if (current === 9) total += 1;

          Object.values(DIRECTION).forEach((direction) => {
            const nextPosition: Position = {
              x: position.x + direction.dx,
              y: position.y + direction.dy,
            };

            if (
              this.isInBounds(nextPosition) &&
              current + STEP === this.input[nextPosition.y][nextPosition.x]
            ) {
              queue.push(nextPosition);
            }
          });
        }
      });
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    return total;
  }
}

// Result.
const input = Utils.readInput();
const day10 = new Day10(input);

console.log(day10.partOne());
console.log(day10.partTwo());
