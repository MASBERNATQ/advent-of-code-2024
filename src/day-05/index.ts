import Utils from "../utils";

class Day5 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    const [firstSection, secondSection] = input.split("\n\n");

    return {
      rules: firstSection.split("\n").map((line) => line.split("|").map(Number)),
      lists: secondSection.split("\n").map((line) => line.split(",").map(Number)),
    };
  }

  private isListOrdered(list: number[]): boolean {
    return list.every(
      (value, index, array) =>
        index === 0 ||
        this.input.rules.find(
          ([preceding, following]) => preceding === array[index - 1] && following === value
        )
    );
  }

  private calculateMiddleValue(list: number[]): number {
    return list.at(Math.floor(list.length / 2)) ?? 0;
  }

  private canAddItem(item: number, remainingItems: number[]): boolean {
    return !remainingItems.some((remainingItem) =>
      this.input.rules.some(
        ([preceding, following]) => preceding === remainingItem && following === item
      )
    );
  }

  public partOne() {
    let total = 0;

    this.input.lists.forEach((list) => {
      if (!this.isListOrdered(list)) return;
      total += this.calculateMiddleValue(list);
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    this.input.lists.forEach((list) => {
      if (this.isListOrdered(list)) return;

      const remainingItems = [...list];
      const orderedItems: number[] = [];

      while (remainingItems.length) {
        remainingItems.forEach((remainingItem, index) => {
          if (this.canAddItem(remainingItem, remainingItems)) {
            orderedItems.push(remainingItem);
            remainingItems.splice(index, 1);
          }
        });
      }

      total += this.calculateMiddleValue(orderedItems);
    });

    return total;
  }
}

// Result.
const input = Utils.readInput();
const day5 = new Day5(input);

console.log(day5.partOne());
console.log(day5.partTwo());
