import { birthdays } from "./services/birthdays";
import { cli } from "./services/cli";
import { report } from "./services/messages";

const register = cli();
console.log(report(birthdays(register)));
