import { birthdays } from "./services/birthdays";
import { cli } from "./services/cli";
import { validateRegister } from "./services/validation";

/**
 * Invoke the CLI, filter a register of people to find whose birthdays are today
 * and log the results.
 */
export const main = () => {
  const file = cli();
  const register = validateRegister(JSON.parse(file));
  const people = birthdays(register);

  console.log(
    people.length > 0
      ? people.map((person, i) => `${i + 1}: ${person.fullName}`).join("\n")
      : "No birthdays today",
  );
};
