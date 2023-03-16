import { DateTime } from "luxon";

/**
 * Person
 *
 * @class Person
 */
export class Person {
  constructor(
    private firstName: string,
    private middleNames: string[],
    private lastName: string,
    private birthdate: DateTime
  ) {}

  /**
   * Format the person's full name.
   */
  get fullName(): string {
    return [this.firstName, ...this.middleNames, this.lastName].join(" ");
  }

  /**
   * Get the person's birthday.
   * If the person's birthday is the 29th of February then on a non-leap year
   * celebrate it on the 28th of February.
   */
  birthday(current: DateTime): boolean {
    const day =
      !current.isInLeapYear &&
      this.birthdate.day === 29 &&
      this.birthdate.month === 2
        ? 28
        : this.birthdate.day;

    return current.day === day && current.month === this.birthdate.month;
  }
}
