// https://adventofcode.com/2024/day/1.

import fs from "node:fs";
import path from "node:path";

class Day1 {
  private lists: [number[], number[]];

  constructor(input: string) {
    this.lists = this.readInput(input);
  }

  public findTotalDistance(): number {
    const [firstList, secondList] = this.lists;

    const firstListSorted = firstList.sort();
    const secondListSorted = secondList.sort();

    let totalDistance = 0;

    firstListSorted.forEach((firstItem, index) => {
      totalDistance += Math.abs(firstItem - secondListSorted[index]);
    });

    return totalDistance;
  }

  public findSimilarityScore(): number {
    const [firstList, secondList] = this.lists;

    let similarityCode = 0;

    firstList.forEach((firstItem) => {
      const count = secondList.filter((secondItem) => firstItem === secondItem).length;
      similarityCode += firstItem * count;
    });

    return similarityCode;
  }

  private readInput(input: string): [number[], number[]] {
    const firstList: number[] = [];
    const secondList: number[] = [];

    const lines = input.split("\n");

    lines.forEach((line) => {
      const [num1, num2] = line.split(/\s+/).map(Number);

      firstList.push(num1);
      secondList.push(num2);
    });

    return [firstList, secondList];
  }
}

// Result.
const input = fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" }).toString();
const day1 = new Day1(input);

console.log(day1.findTotalDistance());
console.log(day1.findSimilarityScore());
