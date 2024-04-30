import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import yargs from "yargs/yargs";

/**
 * Invoke the CLI and retrieve the contents of a register file. Checks if the
 * file exists.
 *
 * @function cli
 */
export const cli = (): string => {
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

  if (!fs.existsSync(argv.path)) {
    throw Error(`No such file ${argv.path}`);
  }

  return fs.readFileSync(path.resolve(process.cwd(), argv.path), "utf8");
};
