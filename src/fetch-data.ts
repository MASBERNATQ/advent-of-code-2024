import Utils from "./utils";

(async () => {
  const index = process.env.npm_config_index?.replace(/^0/, "") ?? "";

  await Utils.fetchInput(index);
})();
