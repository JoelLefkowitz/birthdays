import { Person } from "../models/Person";

/**
 * Format a report of birthday names.
 *
 * @function report
 */
export const report = (people: Person[]): string =>
  people.length > 0
    ? people.map((person, i) => `${i + 1}: ${person.fullName}`).join("\n")
    : "No birthdays today";
