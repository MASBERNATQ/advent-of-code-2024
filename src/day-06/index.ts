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

const OBTACLE_SYMBOLS = ["#", "O"];
const EMPTY_SYMBOL = ".";

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
      throw new Error("The target was not found.");
    }

    return position;
  }

  private stringifyValue(position: Position, directionSymbol?: DirectionSymbol): string {
    return JSON.stringify({ ...position, d: directionSymbol });
  }

  private getVisitedPositions() {
    let isBlocked = false;

    const visitedPositions: Set<string> = new Set();
    const visitedPositionsWithDirection: Set<string> = new Set();

    // Target's starting position.
    let targetPosition = this.findTargetPosition();
    let targetSymbol = this.input[targetPosition.y][targetPosition.x] as DirectionSymbol;

    // Add the starting position.
    visitedPositions.add(this.stringifyValue(targetPosition));
    visitedPositionsWithDirection.add(this.stringifyValue(targetPosition, targetSymbol));

    while (true) {
      const targetDirection = DIRECTION[targetSymbol];
      const nextPosition = {
        x: targetPosition.x + targetDirection.dx,
        y: targetPosition.y + targetDirection.dy,
      };

      // If the target goes out of bounds.
      if (!this.isInBounds(nextPosition)) {
        break;
      }

      // If the target loops.
      if (visitedPositionsWithDirection.has(this.stringifyValue(nextPosition, targetSymbol))) {
        isBlocked = true;
        break;
      }

      // If the next position have no obtacles.
      if (!OBTACLE_SYMBOLS.includes(this.input[nextPosition.y][nextPosition.x])) {
        targetPosition = nextPosition;

        // Add the next position.
        visitedPositions.add(this.stringifyValue(targetPosition));
        visitedPositionsWithDirection.add(this.stringifyValue(targetPosition, targetSymbol));
      } else {
        targetSymbol = NEXT_DIRECTION[targetSymbol];
      }
    }

    return {
      isBlocked,
      positions: Array.from(visitedPositions).map((visitedPosition) =>
        JSON.parse(visitedPosition)
      ) as Position[],
    };
  }

  public partOne() {
    return this.getVisitedPositions().positions.length;
  }

  public partTwo() {
    let blockingPositions = 0;
    const initialVisitedPositions = this.getVisitedPositions().positions;

    initialVisitedPositions.forEach((visitedPosition, index) => {
      // Skip the target's starting position.
      if (index === 0) return;

      // Add obstacle.
      this.input[visitedPosition.y][visitedPosition.x] = OBTACLE_SYMBOLS[1];

      // If the obstacle blocks the target's path.
      if (this.getVisitedPositions().isBlocked) {
        blockingPositions++;
      }

      // Remove obstacle.
      this.input[visitedPosition.y][visitedPosition.x] = EMPTY_SYMBOL;
    });

    return blockingPositions;
  }
}

// Result.
const input = Utils.readInput();
const day6 = new Day6(input);

console.log(day6.partOne());
console.log(day6.partTwo());
