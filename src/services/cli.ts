import { hideBin } from "yargs/helpers";
import { validateRegister } from "./validation";
import fs from "fs";
import path from "path";
import yargs from "yargs/yargs";

/**
 * Invoke the CLI and retrieve the contents of a register file.
 *
 * @function cli
 */
export const cli = () => {
  const argv = yargs(hideBin(process.argv))
    .command(
      "$0 <path>",
      "Find whose birthdays are today from a register of people.",
    )
    .positional("path", {
      type: "string",
      demandOption: true,
      describe: "Path to the register",
    })
    .parseSync();

  return validateRegister(
    JSON.parse(fs.readFileSync(path.resolve(process.cwd(), argv.path), "utf8")),
  );
};
