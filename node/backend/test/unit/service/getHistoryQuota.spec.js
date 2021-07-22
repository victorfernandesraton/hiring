import StockServiceHistoryQuote from "../../../src/services/stock/getHistoryQuote.js";

import getHistoryMock from "../../../src/mock/gethistoricalQuota.json";

describe("StockServiceHistoryQuote", () => {
  const validRequest = {
    get: jest.fn().mockImplementation(() => ({
      data: getHistoryMock.sucess,
      status: 200,
    })),
  };
  const notFoundRequest = {
    get: jest.fn().mockImplementation(() => ({
      data: getHistoryMock.notFound,
      status: 200,
    })),
  };
  test("shoud be a valid historic", async () => {
    const service = new StockServiceHistoryQuote({
      request: validRequest,
    });

    const result = await service.getHistoryQuote({
      stockName: "IBM",
      from: "2017-04-04",
      to: "2017-04-05",
    });

    expect(result.name).toBe("IBM");
    expect(result.prices).toHaveLength(2);
    expect(result.prices[0].closing).toBe(172.88);
  });
  test("shoud be a valid historic when data is after tham limit", async () => {
    const service = new StockServiceHistoryQuote({
      request: validRequest,
    });

    const result = await service.getHistoryQuote({
      stockName: "IBM",
      from: "2021-07-19",
      to: "2021-07-22",
    });

    expect(result.name).toBe("IBM");
    expect(result.prices).toHaveLength(2);
    expect(result.prices[0].opening).toBe(143.0);
  });
  test("shoud be not historical because stock is not found", async () => {
    const service = new StockServiceHistoryQuote({
      request: notFoundRequest,
    });

    await expect(
      service.getHistoryQuote({
        stockName: "IBM",
        from: "2021-07-19",
        to: "2021-07-22",
      })
    ).rejects.toThrowError("stock not found");
  });
});
