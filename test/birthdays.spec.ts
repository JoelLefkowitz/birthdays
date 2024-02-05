import { DateTime } from "luxon";
import { defineFeature, loadFeature } from "jest-cucumber";
import { main } from "../src/main";
import path from "path";

const fixtures = path.join(__dirname, "fixtures");

const feature = loadFeature(path.join(__dirname, "birthdays.feature"));

defineFeature(feature, (test) => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});

  const now = jest
    .spyOn(DateTime, "now")
    .mockImplementation(
      () => DateTime.fromFormat("2000/01/30", "yyyy/MM/dd") as DateTime<true>,
    );

  afterEach(() => {
    process.argv = [];
  });

  afterAll(() => {
    log.mockRestore();
    now.mockRestore();
  });

  test("Filtering a list of people to find whose birthdays are today", ({
    given,
    when,
    then,
  }) => {
    given("I have a register of people", () => {
      process.argv = ["_", "_", path.resolve(fixtures, "register.json")];
    });

    when("I filter the register to find whose birthdays are today", () => {
      main();
    });

    then("I should get a numbered list of each person's full name", () => {
      expect(log).toBeCalledWith("1: Bruce Wayne");
    });
  });

  test("Filtering a list of people when nobody has a birthday today", ({
    given,
    when,
    then,
  }) => {
    given("I have a an empty register", () => {
      process.argv = ["_", "_", path.resolve(fixtures, "empty.json")];
    });

    when("I filter the register to find whose birthdays are today", () => {
      main();
    });

    then("I should get a message saying nobody has a birthday today", () => {
      expect(log).toBeCalledWith("No birthdays today");
    });
  });
});
