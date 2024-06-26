import { DateTime } from "luxon";
import { Person } from "../models/Person";
import { report } from "./messages";

const date = (str: string): DateTime => DateTime.fromFormat(str, "yyyy/MM/dd");

describe("report", () => {
  it("formats an empty response", () => {
    expect(report([])).toBe("No birthdays today");
  });

  it("formats a list of names", () => {
    expect(
      report([
        new Person("John", [], "Doe", date("1982/10/08")),
        new Person("Bruce", [], "Wayne", date("1965/01/30")),
      ]),
    ).toBe("1: John Doe\n2: Bruce Wayne");
  });
});
