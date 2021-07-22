import {
  verifyDateInInterval,
  gerProximityDate,
} from "../../../src/adapter/timer.js";

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

  describe("gerProximityDate", () => {
    test("shoud be proximity date", () => {
      expect(
        gerProximityDate({
          target: "2020-02-01",
          dates: [
            new Date(2021, 1, 1),
            new Date(Date.now()),
            new Date(2020, 11, 25),
          ],
        })
      ).toBe(2);
    });
    test("shoud be date in is on array", () => {
      expect(
        gerProximityDate({
          target: "2020-02-01",
          dates: [
            new Date(2020, 2, 1),
            new Date(2021, 1, 1),
            new Date(Date.now()),
          ],
        })
      ).toBe(0);
    });
  });
});
