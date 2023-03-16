import { cli } from "./cli";

describe("cli", () => {
  it("throws if the file doesn't exist", () => {
    process.argv = ["_", "_", "./missing"];
    expect(cli).toThrow("No such file ./missing");
  });
});
