import { parseLastStockResponse } from "../stock";
import { succes } from "../mock/getLastQuota.json";
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
});
