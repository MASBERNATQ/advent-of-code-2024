import axios, { AxiosRequestConfig } from "axios";
import "dotenv/config";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

const INPUT_PATH = path.join(__dirname, "input.txt");

class Utils {
  /**
   * Get the input data on adventofcode website and write it to the input file.
   */
  public static async fetchInput(day: number): Promise<void> {
    const url = `https://adventofcode.com/2024/day/${day}/input`;
    const options: AxiosRequestConfig = {
      headers: { Cookie: `session=${process.env.SESSION_KEY}` },
    };

    return await axios
      .get<string>(url, options)
      .then(({ data }) => writeFileSync(INPUT_PATH, data));
  }

  /**
   * Read input file.
   */
  public static readInput(): string {
    const data = readFileSync(INPUT_PATH, { encoding: "utf-8" }).toString();

    return this.parseInput(data);
  }

  /**
   * Parse the input data.
   */
  private static parseInput(input: string): string {
    return input.trim();
  }
}

export default Utils;
