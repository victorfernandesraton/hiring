import {
  parseLastStockResponse,
  parseHistoricalStockResponse,
  parseProjectionFromDay,
} from "../../../src/adapter/stock.js";
import { succes } from "../../../src/mock/getLastQuota.json";
import historicalData from "../../../src/mock/gethistoricalQuota.json";
describe("Stock adapters", () => {
  describe("parseLastStockResponse", () => {
    test("should be response stock value", () => {
      const result = parseLastStockResponse({
        stockName: "IBM",
        result: { data: succes },
      });

      expect(result).toHaveProperty("name", "IBM");
      expect(result).toHaveProperty("lastPrice", 2.78);
      expect(result).toHaveProperty("priceAt", "2021-07-16T00:00:00.000Z");
    });
    test("should be not recived price numeric", () => {
      expect(
        parseLastStockResponse({
          stockName: "IBM",
          result: {
            data: {
              "Global Quote": {
                ...succes["Global Quote"],
                "05. price": null,
              },
            },
          },
        })
      ).toHaveProperty("lastPrice", 0);
    });
  });

  describe("parseHistoricalStockResponse", () => {
    test("shoud be response stock history", () => {
      const data = parseHistoricalStockResponse({
        stockName: "IBM",
        result: historicalData.sucess["Time Series (Daily)"],
        finalDate: "2021-07-22",
        initialDate: "2021-07-15",
      });

      expect(data).toHaveProperty("name", "IBM");
      expect(data).toHaveProperty("prices");
      expect(data.prices).toContainEqual({
        opening: 141.0,
        low: 138.59,
        high: 141.0,
        closing: 138.9,
        pricedAt: "2021-07-16",
      });
    });
    test("shoud be not stock history", () => {
      const data = parseHistoricalStockResponse({
        stockName: "IBM",
        result: historicalData.notFound,
      });
      expect(data).toHaveProperty("name", "IBM");
      expect(data).toHaveProperty("prices");
      expect(data.prices).toHaveLength(0);
    });
  });

  describe("parseProjectionFromDay", () => {
    test("shoud be a price at day", () => {
      expect(
        parseProjectionFromDay({
          date: "2021-07-14",
          historical: historicalData.sucess["Time Series (Daily)"],
        })
      ).toEqual({
        priceAtDate: 139.82,
        purchasedAt: "2021-07-14",
      });
    });
    test("shoud be a price at proximity day", () => {
      expect(
        parseProjectionFromDay({
          date: "2021-07-18",
          historical: historicalData.sucess["Time Series (Daily)"],
        })
      ).toEqual({
        priceAtDate: 137.92,
        purchasedAt: "2021-07-19",
      });
    });
  });
});
