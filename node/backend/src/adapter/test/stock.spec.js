import { parseLastStockResponse, parseHistoricalStockResponse } from "../stock";
import { succes } from "../mock/getLastQuota.json";
import historicalData from "../mock/gethistoricalQuota.json";
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
    test("shoud be response tock history", () => {
      const data = parseHistoricalStockResponse({
        stockName: "IBM",
        result: historicalData.sucess,
      });
      expect(data).toHaveProperty("name", "IBM");
      expect(data).toHaveProperty("prices");
      expect(data.prices).toContainEqual({
        opening: 95.75,
        low: 94.37,
        high: 96.69,
        closing: 95.66,
        pricedAt: "2021-06-01T00:00:00.000Z",
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
});
