import { DateTime } from "luxon";
import { Person } from "./Person";

const date = (str: string): DateTime => DateTime.fromFormat(str, "yyyy/MM/dd");

describe("Person.fullName", () => {
  it("formats the person's full name", () => {
    const bruce = new Person(
      "Bruce",
      ["Steve", "Harvey"],
      "Wayne",
      date("1965/01/30"),
    );

    expect(bruce.fullName).toBe("Bruce Steve Harvey Wayne");
  });
});

describe("Person.birthday", () => {
  it("checks if the person's birthday is on a given date", () => {
    const person = new Person("", [], "", date("2000/01/01"));
    expect(person.birthday(date("2000/01/01"))).toBe(true);
    expect(person.birthday(date("2001/01/01"))).toBe(true);
    expect(person.birthday(date("2001/01/02"))).toBe(false);
  });

  it("celebrates 'leap birthdays' on the 28th of February on a non-leap year", () => {
    const person = new Person("", [], "", date("2000/02/29"));
    expect(person.birthday(date("2001/02/28"))).toBe(true);
    expect(person.birthday(date("2002/02/28"))).toBe(true);
    expect(person.birthday(date("2003/02/28"))).toBe(true);

    expect(person.birthday(date("2004/02/28"))).toBe(false);
    expect(person.birthday(date("2004/02/29"))).toBe(true);
  });
});
