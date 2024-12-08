import axios, { AxiosRequestConfig } from "axios";
import "dotenv/config";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

const INPUT_PATH = path.join(__dirname, "input.txt");

class Utils {
  /**
   * Get the input data on adventofcode website and write it to the input file.
   */
  public static async fetchInput(index: string): Promise<void> {
    const url = `https://adventofcode.com/2024/day/${index}/input`;
    const options: AxiosRequestConfig = {
      headers: { Cookie: `session=${process.env.SESSION_KEY}` },
    };

    return await axios
      .get<string>(url, options)
      .then(({ data }) => writeFileSync(INPUT_PATH, data))
      .catch(() => {
        throw new Error("An error occured while retrieving the input data.");
      });
  }

  /**
   * Read input file.
   */
  public static readInput(): string {
    const data = readFileSync(INPUT_PATH, { encoding: "utf-8" }).toString();

    return data.trim();
  }
}

export default Utils;
