import StockServiceLastQuota from "../getLastQuota.js";
import lastQuotaMock from "../../../mock/getLastQuota.json";
describe("StockServiceLastQuota", () => {
  test("shoud be a valid last quota", async () => {
    const service = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.succes,
          status: 200,
        })),
      },
    });
    const response = await service.getLastQuota("IBM");
    expect(response).toHaveProperty("name", "IBM");
  });
  test("shoud be not found a valid last quota", async () => {
    const service = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.fail,
          status: 404,
        })),
      },
    });
    await expect(service.getLastQuota("undefinedstock")).rejects.toThrowError(
      "stock undefinedstock not found"
    );
  });
  test("shoud be not revived a valid stock name", async () => {
    const service = new StockServiceLastQuota({
      request: {
        get: jest.fn().mockImplementation(() => ({
          data: lastQuotaMock.fail,
          status: 404,
        })),
      },
    });
    await expect(service.getLastQuota()).rejects.toThrowError(
      "stock undefined not found"
    );
  });
});
