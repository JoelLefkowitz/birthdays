import { validatePerson, validateRegister } from "./validation";

import { DateTime } from "luxon";

describe("validateRegister", () => {
  it("returns the register if it's valid", () => {
    const valid = [["Wayne", "Bruce", "1965/01/30"]];
    expect(validateRegister(valid)).toEqual(valid);
  });

  it("throws if the register is not a string[][]", () => {
    expect(() => validateRegister("")).toThrow();
    expect(() => validateRegister({})).toThrow();
    expect(() => validateRegister([1, 2, 3])).toThrow();
    expect(() => validateRegister([[1, 2, 3]])).toThrow();
    expect(() => validateRegister([["a", "b"], "c"])).toThrow();
  });
});

describe("validatePerson", () => {
  it("parses the first name, last name and birthdate", () => {
    const [firstName, _, lastName, birthdate] = validatePerson([
      "Wayne",
      "Bruce",
      "1965/01/30",
    ]);

    expect(firstName).toBe("Bruce");
    expect(lastName).toBe("Wayne");
    expect(birthdate).toEqual(DateTime.fromFormat("1965/01/30", "yyyy/MM/dd"));
  });

  it("accepts multiple middle names", () => {
    const [_, middleNames] = validatePerson([
      "Wayne",
      "Blain",
      "Dwayne",
      "Bruce",
      "1965/01/30",
    ]);

    expect(middleNames).toEqual(["Dwayne", "Blain"]);
  });

  it("throws if the last name is missing", () => {
    expect(() => validatePerson([])).toThrow();
  });

  it("throws if the first name is missing", () => {
    expect(() => validatePerson(["Wayne"])).toThrow();
  });

  it("throws if the birthdate is missing", () => {
    expect(() => validatePerson(["Wayne", "Bruce"])).toThrow();
  });

  it("throws if the birthdate doesn't match the format yyyy/MM/dd", () => {
    expect(() => validatePerson([])).toThrow();
  });
});
