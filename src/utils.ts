import axios, { AxiosRequestConfig } from "axios";

import "dotenv/config";

class Utils {
  /**
   * Read the input data on adventofcode website.
   */
  public static async readInput(day: string): Promise<string> {
    const url = `https://adventofcode.com/2024/day/${day}/input`;
    const options: AxiosRequestConfig = {
      headers: { Cookie: `session=${process.env.SESSION_KEY}` },
    };

    return await axios.get<string>(url, options).then(({ data }) => data.trim());
  }
}

export default Utils;
