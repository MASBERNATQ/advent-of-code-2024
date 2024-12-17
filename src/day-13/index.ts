import Utils from "../utils";

class Day13 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    return input.split("\n\n").map((block) => block.match(/\d+/g)?.map(Number) ?? []);
  }

  public partOne() {
    let total = 0;

    this.input.forEach(([ax, ay, bx, by, x, y]) => {
      let minScore = Infinity;

      for (let a = 1; a <= 100; a++) {
        for (let b = 1; b <= 100; b++) {
          if (a * ax + b * bx === x && a * ay + b * by === y) {
            minScore = Math.min(minScore, a * 3 + b);
          }
        }
      }

      if (minScore !== Infinity) total += minScore;
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
const day13 = new Day13(input);

console.log(day13.partOne());
console.log(day13.partTwo());
