import StockServiceCompareQuota from "../getCompareStocks";
import lastQuotaMock from "../../../mock/getLastQuota.json";
import StockServiceLastQuota from "../getLastQuota";

describe("StockServiceCompareQuota", () => {
  const quotaTSCDF = {
    "Global Quote": {
      "01. symbol": "TSCDF",
      "02. open": "3.0500",
      "03. high": "3.0500",
      "04. low": "3.0500",
      "05. price": "3.0500",
      "06. volume": "2358",
      "07. latest trading day": "2021-07-21",
      "08. previous close": "2.9900",
      "09. change": "0.0600",
      "10. change percent": "2.0067%",
    },
  };

  const sucessResult = {
    IBM: lastQuotaMock.succes,
    TSCDF: quotaTSCDF,
  };
  const getLastQuotaResponse = jest
    .fn()
    .mockImplementation((url, { params }) => {
      return {
        status: 200,
        data: sucessResult?.[params?.symbol] || lastQuotaMock.fail,
      };
    });
  const getHistoryQuoteService = new StockServiceLastQuota({
    request: {
      get: (...args) => getLastQuotaResponse(...args),
    },
  });
  test("should be a compare stocks", async () => {
    const service = new StockServiceCompareQuota({
      request: getHistoryQuoteService,
    });
    const response = await service.getCompareStocks({
      stockList: ["TSCDF", "IBM"],
    });

    expect(response.prices).toHaveLength(2);
  });

  test("should be not find one stock", async () => {
    const service = new StockServiceCompareQuota({
      request: getHistoryQuoteService,
    });

    await expect(
      service.getCompareStocks({
        stockList: ["ITAU", "NUBANK"],
      })
    ).rejects.toThrowError("stocks not found");
  });
});
