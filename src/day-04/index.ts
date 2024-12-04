import Utils from "../utils";

class Day4 {
  private input: string[][];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string): string[][] {
    const matrice: string[][] = [];

    input.split("\n").forEach((line) => matrice.push(line.split("")));

    return matrice;
  }

  public partOne() {
    let total = 0;

    const nbOfRows = this.input.length;
    const nbOfColumns = this.input[0].length;

    const columns = Array.from({ length: nbOfColumns }, (): string[] => []);
    const diagonalesUpLeft = Array.from({ length: nbOfRows + nbOfColumns - 1 }, (): string[] => []);
    const diagonalesUpRight = Array.from(
      { length: nbOfRows + nbOfColumns - 1 },
      (): string[] => []
    );

    for (let row = 0; row < nbOfRows; row++) {
      for (let col = 0; col < nbOfColumns; col++) {
        columns[col].push(this.input[row][col]);
        diagonalesUpLeft[row + col].push(this.input[row][col]);
        diagonalesUpRight[col - row + nbOfRows - 1].push(this.input[row][col]);
      }
    }

    [...diagonalesUpLeft, ...diagonalesUpRight, ...columns, ...this.input].forEach((lines) => {
      total += [...lines.join("").matchAll(/(?=(XMAS|SAMX))/g)].length;
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    const nbOfRows = this.input.length;
    const nbOfColumns = this.input[0].length;

    for (let row = 1; row < nbOfRows - 1; row++) {
      for (let col = 1; col < nbOfColumns - 1; col++) {
        if (this.input[row][col] !== "A") continue;

        const upLeft = this.input[row - 1][col - 1];
        const upRight = this.input[row - 1][col + 1];
        const downLeft = this.input[row + 1][col - 1];
        const downRight = this.input[row + 1][col + 1];

        if (
          ((downRight === "M" && upLeft === "S") || (downRight === "S" && upLeft === "M")) &&
          ((downLeft === "M" && upRight === "S") || (downLeft === "S" && upRight === "M"))
        ) {
          total++;
        }
      }
    }

    return total;
  }
}

// Result.
(async () => {
  await Utils.fetchInput();

  const input = Utils.readInput();
  const day4 = new Day4(input);

  console.log(day4.partOne());
  console.log(day4.partTwo());
})();
