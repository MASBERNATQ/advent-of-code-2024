import Utils from "../utils";

class Day1 {
  private data: [number[], number[]];

  constructor(input: string) {
    this.data = this.parseInput(input);
  }

  public partOne(): number {
    const [firstList, secondList] = this.data;

    const firstListSorted = firstList.sort();
    const secondListSorted = secondList.sort();

    let totalDistance = 0;

    firstListSorted.forEach((firstItem, index) => {
      totalDistance += Math.abs(firstItem - secondListSorted[index]);
    });

    return totalDistance;
  }

  public partTwo(): number {
    const [firstList, secondList] = this.data;

    let similarityCode = 0;

    firstList.forEach((firstItem) => {
      const count = secondList.filter((secondItem) => firstItem === secondItem).length;

      similarityCode += firstItem * count;
    });

    return similarityCode;
  }

  private parseInput(input: string): [number[], number[]] {
    const firstList: number[] = [];
    const secondList: number[] = [];

    const lines = input.split("\n");

    lines.forEach((line) => {
      const [firstItem, secondItem] = line.split(/\s+/).map(Number);

      firstList.push(firstItem);
      secondList.push(secondItem);
    });

    return [firstList, secondList];
  }
}

// Result.
(async () => {
  const input = await Utils.readInput("1");
  const day1 = new Day1(input);

  console.log(day1.partOne());
  console.log(day1.partTwo());
})();
