import { cli } from "./cli";

describe("cli", () => {
  it("throws if the file doesn't exist", () => {
    process.argv = ["_", "_", "_"];
    expect(cli).toThrow("ENOENT: no such file or directory");
  });
});
