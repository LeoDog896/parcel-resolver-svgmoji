const { getSpecifierInformation } = require("../specifierParser");

test("adds 1 + 2 to equal 3", () => {
  const info = getSpecifierInformation("twemoji/🍔.svg");
  expect(info?.mojiType).toBe("twemoji");
  expect(info?.emoji).toBe("🍔");
});
