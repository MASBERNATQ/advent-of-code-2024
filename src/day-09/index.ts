import Utils from "../utils";

const EMPTY_VALUE = ".";

class Day9 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    return input.split("").map(Number);
  }

  public partOne() {
    const list: string[] = [];

    this.input.forEach((value, index) => {
      const isEven = index % 2 === 0;
      const identifier = isEven ? String(index / 2) : EMPTY_VALUE;

      list.push(...Array.from<string>({ length: value }).fill(identifier));
    });

    while (true) {
      const emptyIndex = list.findIndex((value) => value === EMPTY_VALUE);
      const numberIndex = list.findLastIndex((value) => value !== EMPTY_VALUE);

      if (emptyIndex === -1) break;

      list[emptyIndex] = list[numberIndex];
      list.splice(numberIndex, 1);
    }

    return list.reduce((prev, current, index) => prev + Number(current) * index, 0);
  }

  public partTwo() {
    let total = 0;

    return total;
  }
}

// Result.
const input = Utils.readInput();
const day9 = new Day9(input);

console.log(day9.partOne());
console.log(day9.partTwo());
