import Utils from "../utils";

class Day1 {
  private lists: [number[], number[]];

  constructor(input: string[]) {
    this.lists = this.parseInput(input);
  }

  public partOne(): number {
    const [firstList, secondList] = this.lists;

    const firstListSorted = firstList.sort();
    const secondListSorted = secondList.sort();

    let totalDistance = 0;

    firstListSorted.forEach((firstItem, index) => {
      totalDistance += Math.abs(firstItem - secondListSorted[index]);
    });

    return totalDistance;
  }

  public partTwo(): number {
    const [firstList, secondList] = this.lists;

    let similarityCode = 0;

    firstList.forEach((firstItem) => {
      const count = secondList.filter((secondItem) => firstItem === secondItem).length;

      similarityCode += firstItem * count;
    });

    return similarityCode;
  }

  private parseInput(input: string[]): [number[], number[]] {
    const firstList: number[] = [];
    const secondList: number[] = [];

    input.forEach((line) => {
      const [firstItem, secondItem] = line.split(/\s+/).map(Number);

      firstList.push(firstItem);
      secondList.push(secondItem);
    });

    return [firstList, secondList];
  }
}

// Result.
(async () => {
  await Utils.fetchInput(1);

  const input = Utils.readInput();
  const day1 = new Day1(input);

  console.log(day1.partOne());
  console.log(day1.partTwo());
})();
