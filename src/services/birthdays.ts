import { DateTime } from "luxon";
import { Person } from "../models/Person";
import { validatePerson } from "./validation";

/**
 * Parse rows of a register of people and filter those whose birthday is today.
 *
 * @function birthdays
 */
export const birthdays = (register: string[][]): Person[] => {
  const current = DateTime.now();
  return register
    .map((row) => new Person(...validatePerson(row)))
    .filter((person) => person.birthday(current));
};
