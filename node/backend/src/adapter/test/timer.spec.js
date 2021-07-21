import { verifyDateInInterval } from "../timer.js";

describe("verifyDateInInterval", () => {
  test("should be a date in interval", () => {
    expect(
      verifyDateInInterval({
        finalDate: new Date("2021-07-22"),
        initialDate: new Date("2021-07-19"),
        target: "2021-07-21",
      })
    ).toBe(true);
  });
  test("should be a string only in interval", () => {
    expect(
      verifyDateInInterval({
        finalDate: "2021-07-22",
        initialDate: "2021-07-19",
        target: "2021-07-21",
      })
    ).toBe(true);
  });
  test("should be not a date in interval", () => {
    expect(
      verifyDateInInterval({
        finalDate: new Date("2021-07-22"),
        initialDate: new Date("2021-07-19"),
        target: "2021-08-21",
      })
    ).toBe(false);
  });
});
