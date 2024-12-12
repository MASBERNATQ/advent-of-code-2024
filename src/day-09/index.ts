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
    let list: string[][] = [];

    this.input.forEach((value, index) => {
      const isEven = index % 2 === 0;
      const identifier = isEven ? String(index / 2) : EMPTY_VALUE;

      if (!value) return;

      list.push(Array.from<string>({ length: value }).fill(identifier));
    });

    block: for (let i = list.length - 1; i >= 0; i--) {
      const element = [...list[i]];

      if (element[0] === EMPTY_VALUE) continue;

      for (let j = 0; j < i; j++) {
        const emptyElement = [...list[j]];

        if (emptyElement[0] !== EMPTY_VALUE || emptyElement.length < element.length) {
          continue;
        }

        if (emptyElement.length === element.length) {
          list[j] = [...list[i]];
          list[i].fill(EMPTY_VALUE);
        } else {
          list[i].fill(EMPTY_VALUE);
          list.splice(j, 1, element, list[j].splice(list[i].length));
          i++;
        }

        continue block;
      }
    }

    return list
      .flat()
      .reduce(
        (prev, current, index) => (current !== EMPTY_VALUE ? prev + Number(current) * index : prev),
        0
      );
  }
}

// Result.
const input = Utils.readInput();
const day9 = new Day9(input);

console.log(day9.partOne());
console.log(day9.partTwo());
