import Utils from "../utils";

class Day11 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    return input.split(" ").map(Number);
  }

  private solveStone(stone: number): number[] {
    if (stone === 0) return [1];

    const stoneString = String(stone);
    if (stoneString.length % 2 === 0) {
      const half = stoneString.length / 2;

      return [
        Number(stoneString.slice(0, half)),
        Number(stoneString.slice(half, stoneString.length)),
      ];
    }

    return [stone * 2024];
  }

  public partOne() {
    let stones: number[] = [...this.input];

    for (let index = 0; index < 25; index++) {
      stones = stones.flatMap(this.solveStone);
    }

    return stones.length;
  }

  public partTwo() {}
}

// Result.
const input = Utils.readInput();
const day11 = new Day11(input);

console.log(day11.partOne());
console.log(day11.partTwo());
