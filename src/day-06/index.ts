import Utils from "../utils";

type Position = {
  x: number;
  y: number;
};

enum DirectionSymbol {
  TOP = "^",
  BOTTOM = "v",
  LEFT = "<",
  RIGHT = ">",
}

const DIRECTION = {
  [DirectionSymbol.BOTTOM]: { dx: 0, dy: 1 },
  [DirectionSymbol.LEFT]: { dx: -1, dy: 0 },
  [DirectionSymbol.RIGHT]: { dx: 1, dy: 0 },
  [DirectionSymbol.TOP]: { dx: 0, dy: -1 },
};

const NEXT_DIRECTION = {
  [DirectionSymbol.TOP]: DirectionSymbol.RIGHT,
  [DirectionSymbol.RIGHT]: DirectionSymbol.BOTTOM,
  [DirectionSymbol.BOTTOM]: DirectionSymbol.LEFT,
  [DirectionSymbol.LEFT]: DirectionSymbol.TOP,
};

const OBSTACLE = "#";

class Day6 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string): string[][] {
    return input.split("\n").map((line) => line.split(""));
  }

  private isInBounds(position: Position): boolean {
    const rows = this.input.length;
    const cols = this.input[0].length;

    return position.x >= 0 && position.x < rows && position.y >= 0 && position.y < cols;
  }

  private findTargetPosition(): Position {
    let position: Position | null = null;

    for (let rowIndex = 0; rowIndex < this.input.length; rowIndex++) {
      const row = this.input[rowIndex];
      const colIndex = row.findIndex((element) =>
        Object.values(DirectionSymbol as unknown as string).includes(element)
      );

      if (colIndex !== -1) {
        position = { x: colIndex, y: rowIndex };
        break;
      }
    }

    if (!position) {
      throw new Error("The target was not found");
    }

    return position;
  }

  public partOne() {
    const visitedPositions: Set<string> = new Set();

    // Target's starting position.
    let targetPosition = this.findTargetPosition();
    let targetSymbol = this.input[targetPosition.y][targetPosition.x] as DirectionSymbol;
    visitedPositions.add(JSON.stringify(targetPosition));

    while (true) {
      const targetDirection = DIRECTION[targetSymbol];
      const nextPosition = {
        x: targetPosition.x + targetDirection.dx,
        y: targetPosition.y + targetDirection.dy,
      };

      if (
        this.isInBounds(nextPosition) &&
        this.input[nextPosition.y][nextPosition.x] !== OBSTACLE
      ) {
        targetPosition = nextPosition;
        visitedPositions.add(JSON.stringify(targetPosition));
      } else {
        targetSymbol = NEXT_DIRECTION[targetSymbol];
      }

      if (!this.isInBounds(nextPosition)) {
        break;
      }
    }

    return visitedPositions.size;
  }

  public partTwo() {
    let total = 0;

    return total;
  }
}

// Result.
(async () => {
  // await Utils.fetchInput();

  const input = Utils.readInput();
  const day6 = new Day6(input);

  console.log(day6.partOne());
  console.log(day6.partTwo());
})();
