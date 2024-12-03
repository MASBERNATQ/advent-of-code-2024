import Utils from "../utils";

class Day2 {
  private input;

  constructor(input: string) {
    this.input = input.split("\n");
  }

  private isSorted(list: number[]) {
    return (
      list.every((value, index, array) => index === 0 || value > array[index - 1]) ||
      list.every((value, index, array) => index === 0 || value < array[index - 1])
    );
  }

  private isGoodDistance(list: number[]) {
    return list.every((value, index, array) => {
      if (index === 0) return true;

      const distance = Math.abs(value - array[index - 1]);
      return distance >= 1 && distance <= 3;
    });
  }

  public partOne() {
    let total = 0;

    this.input.forEach((line) => {
      const numbers = line.split(" ").map(Number);

      const isSorted = this.isSorted(numbers);
      const isGoodDistance = this.isGoodDistance(numbers);

      if (isSorted && isGoodDistance) total++;
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    this.input.forEach((line) => {
      const numbers = line.split(" ").map(Number);

      for (let index = -1; index < numbers.length; index++) {
        const newNumbers = [...numbers];
        if (index !== -1) newNumbers.splice(index, 1);

        const isSorted = this.isSorted(newNumbers);
        const isGoodDistance = this.isGoodDistance(newNumbers);

        if (isSorted && isGoodDistance) {
          total++;
          break;
        }
      }
    });

    return total;
  }
}

// Result.
(async () => {
  await Utils.fetchInput(2);

  const input = Utils.readInput();
  const day2 = new Day2(input);

  console.log(day2.partOne());
  console.log(day2.partTwo());
})();
