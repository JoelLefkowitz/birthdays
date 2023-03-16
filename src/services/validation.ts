import { array, string } from "superstruct";

import { DateTime } from "luxon";
import { Person } from "../models/Person";

const Register = array(array(string()));

/**
 * Validate a register is an array of array of strings.
 *
 * @function validateRegister
 */
export const validateRegister = (register: unknown): string[][] => {
  const [error, validated] = Register.validate(register);

  if (error) {
    throw error;
  }

  return validated;
};

/**
 * Validate and parse an array containing the birthday, first, middle and last
 * names for a person.
 *
 * @function validatePerson
 */
export const validatePerson = (
  row: string[]
): ConstructorParameters<typeof Person> => {
  const [lastName] = row;

  const firstName = row[row.length - 2];
  const datestamp = row[row.length - 1];

  const missing = (field: string) =>
    Error(`At row [${row.join(", ")}] missing field: ${field}`);

  if (!lastName) {
    throw missing("last name");
  }

  if (!firstName) {
    throw missing("first name");
  }

  if (!datestamp) {
    throw missing("birthdate");
  }

  const birthdate = DateTime.fromFormat(datestamp, "yy/MM/dd");
  const { invalidExplanation } = birthdate;

  if (invalidExplanation) {
    throw Error(`At row [${row.join(", ")}] ${invalidExplanation}`);
  }

  const middleNames =
    row.length > 3 ? row.slice(1, row.length - 2).reverse() : [];

  return [firstName, middleNames, lastName, birthdate];
};
