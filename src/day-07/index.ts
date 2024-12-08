import Utils from "../utils";

enum OperatorSymbol {
  PLUS = "+",
  MULTIPLY = "*",
  CONCAT = "||",
}

const OPERATORS_SYMBOLS = [OperatorSymbol.PLUS, OperatorSymbol.MULTIPLY];
const OPERATORS_SYMBOLS_EXTENDED = [
  OperatorSymbol.PLUS,
  OperatorSymbol.MULTIPLY,
  OperatorSymbol.CONCAT,
];

class Day7 {
  private input;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  private parseInput(input: string) {
    return input.split("\n").map((row) => {
      const [result, numbers] = row.split(":").map((value) => value.trim());

      return { result: Number(result), numbers: numbers.split(" ").map(Number) };
    });
  }

  private calculateOperations(numbers: number[], operators: string[]): number {
    return numbers.reduce((result, number, index) => {
      switch (operators[index - 1]) {
        case OperatorSymbol.CONCAT:
          return Number(`${result}${number}`);
        default:
          return eval(`${result}${operators[index - 1]}${number}`);
      }
    });
  }

  public partOne() {
    let total = 0;

    this.input.forEach(({ result, numbers }) => {
      let isValid = false;
      const numberOfcombinaisons = Math.pow(OPERATORS_SYMBOLS.length, numbers.length - 1);

      for (let index = 0; index < numberOfcombinaisons; index++) {
        let combinaisons = [];
        let newIndex = index;

        // Get all possible combinaisons operations.
        for (let numberIndex = 0; numberIndex < numbers.length - 1; numberIndex++) {
          combinaisons.push(OPERATORS_SYMBOLS[newIndex % OPERATORS_SYMBOLS.length]);
          newIndex = Math.floor(newIndex / OPERATORS_SYMBOLS.length);
        }

        // Check equations with the specific combinaisons.
        if (this.calculateOperations(numbers, combinaisons) === result) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        total += result;
      }
    });

    return total;
  }

  public partTwo() {
    let total = 0;

    this.input.forEach(({ result, numbers }) => {
      let isValid = false;
      const numberOfcombinaisons = Math.pow(OPERATORS_SYMBOLS_EXTENDED.length, numbers.length - 1);

      for (let index = 0; index < numberOfcombinaisons; index++) {
        let combinaisons = [];
        let newIndex = index;

        // Get all possible combinaisons operations.
        for (let numberIndex = 0; numberIndex < numbers.length - 1; numberIndex++) {
          combinaisons.push(
            OPERATORS_SYMBOLS_EXTENDED[newIndex % OPERATORS_SYMBOLS_EXTENDED.length]
          );
          newIndex = Math.floor(newIndex / OPERATORS_SYMBOLS_EXTENDED.length);
        }

        // Check equations with the specific combinaisons.
        if (this.calculateOperations(numbers, combinaisons) === result) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        total += result;
      }
    });

    return total;
  }
}

// Result.
const input = Utils.readInput();
const day7 = new Day7(input);

console.log(day7.partOne());
console.log(day7.partTwo());
