import Utils from "../utils";

class Day3 {
  private input;

  constructor(input: string) {
    this.input = input;
  }

  public partOne() {
    let total = 0;

    const regex = new RegExp(/mul\((?<numbers>\d{1,3},\d{1,3})\)/, "gm");
    const match = this.input.match(regex);

    match?.forEach((value) => {
      const numbers = value.replace(regex, "$<numbers>").split(",").map(Number);
      total += numbers.reduce((prev, curr) => prev * curr);
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    const regex = new RegExp(/do\(\)|don't\(\)|mul\((?<numbers>\d{1,3},\d{1,3})\)/, "gm");
    const match = this.input.match(regex);

    let isEnabled = true;

    match?.forEach((value) => {
      if (value === "do()") isEnabled = true;
      else if (value === "don't()") isEnabled = false;
      else if (isEnabled) {
        const numbers = value.replace(regex, "$<numbers>").split(",").map(Number);
        total += numbers.reduce(Math.imul);
      }
    });

    return total;
  }
}

// Result.
(async () => {
  await Utils.fetchInput(3);

  const input = Utils.readInput();
  const day3 = new Day3(input);

  console.log(day3.partOne());
  console.log(day3.partTwo());
})();
