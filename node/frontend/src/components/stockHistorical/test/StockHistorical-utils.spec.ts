import { parseDataToHistoricalChart } from "../StockHistorical-utils";

import getStockHistoricalMock from "../../../../mocks/historicaldata.json";

describe("StockHistorical-utils", () => {
  describe("parseDataToHistoricalChart", () => {
    test("Shoud be a valid parse with 2 positions", () => {
      const respose = parseDataToHistoricalChart(getStockHistoricalMock);
      expect(respose.data).toContainEqual({
        x: "2021-07-02",
        y: 140.02,
      });
    });
  });
});
