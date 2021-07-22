import StockServiceProjection from "../getProjection.js";
import StockServiceLastQuota from "../getLastQuota.js";

import HistoryMock from "../../../mock/gethistoricalQuota.json";
import lastQuotaMock from "../../../mock/getLastQuota.json";

describe("StockServiceProjection", () => {
  const timeHistoricalSeriesSucess = jest.fn().mockImplementation(() => {
    return { data: HistoryMock.sucess, status: 200 };
  });
  const timeHistoricalSeriesNotFound = jest.fn().mockImplementation(() => {
    return { data: HistoryMock.notFound, status: 404 };
  });

  test("should be a valid projection", async () => {
    const stcokServiceLastQuota = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.succes,
          status: 200,
        })),
      },
    });
    const service = new StockServiceProjection({
      request: {
        getLastQuota: (...args) => stcokServiceLastQuota.getLastQuota(...args),
        get: () => timeHistoricalSeriesSucess(),
      },
    });

    const response = await service.getProjections({
      stockName: "IBM",
      annount: 20,
      date: "2021-04-12",
    });

    expect(response.capitalGains).toBe(2636.2);
    expect(response.purchasedAt).toBe("2021-04-12");
  });
  test("should be a valid projection with another ammount", async () => {
    const stcokServiceLastQuota = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.succes,
          status: 200,
        })),
      },
    });
    const service = new StockServiceProjection({
      request: {
        getLastQuota: (...args) => stcokServiceLastQuota.getLastQuota(...args),
        get: () => timeHistoricalSeriesSucess(),
      },
    });

    const response = await service.getProjections({
      stockName: "IBM",
      annount: 2,
      date: "2021-04-12",
    });

    expect(response.capitalGains).toBe(263.62);
    expect(response.purchasedAt).toBe("2021-04-12");
  });
  test("should be a not found quota", async () => {
    const stcokServiceLastQuota = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.fail,
          status: 404,
        })),
      },
    });
    const service = new StockServiceProjection({
      request: {
        getLastQuota: (...args) => stcokServiceLastQuota.getLastQuota(...args),
        get: () => timeHistoricalSeriesSucess(),
      },
    });
    await expect(
      service.getProjections({
        stockName: "ITAU",
        annount: 20,
        date: "2021-04-12",
      })
    ).rejects.toThrowError("stock ITAU not found");
  });
  test("should be a not found hostory", async () => {
    const stcokServiceLastQuota = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.succes,
          status: 200,
        })),
      },
    });
    const service = new StockServiceProjection({
      request: {
        getLastQuota: (...args) => stcokServiceLastQuota.getLastQuota(...args),
        get: () => timeHistoricalSeriesNotFound(),
      },
    });
    await expect(
      service.getProjections({
        stockName: "ITAU",
        annount: 20,
        date: "2021-04-12",
      })
    ).rejects.toThrowError("stock history not found");
  });
});
