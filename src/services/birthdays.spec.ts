import { DateTime } from "luxon";
import { Person } from "../models/Person";
import { birthdays } from "./birthdays";

const date = (str: string): DateTime => DateTime.fromFormat(str, "yyyy/MM/dd");

describe("birthdays", () => {
  const now = jest
    .spyOn(DateTime, "now")
    .mockImplementation(() => date("1965/01/30"));

  afterAll(() => {
    now.mockRestore();
  });

  it("parses the rows of a register of people and filters those whose birthday is today", () => {
    expect(
      birthdays([
        ["Doe", "John", "1982/10/08"],
        ["Wayne", "Bruce", "1965/01/30"],
        ["Gaga", "Lady", "1986/03/28"],
        ["Curry", "Mark", "1988/02/29"],
      ]),
    ).toEqual([new Person("Bruce", [], "Wayne", date("1965/01/30"))]);
  });
});
