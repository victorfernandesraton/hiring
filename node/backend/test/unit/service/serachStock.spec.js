import SearchStockService from "../../../src/services/stock/searchStock";
import GetSeachMock from "../../../src/mock/getSerachStock.json";
describe("SearchStockService", () => {
  const successResponse = jest.fn().mockImplementation(async (stock_name) => {
    return Promise.resolve({ data: GetSeachMock.sucess, status: 200 });
  });
  const notFoundResponse = jest.fn().mockImplementation(async (stock_name) => {
    return Promise.resolve({ data: GetSeachMock.notFound, status: 200 });
  });
  const errorResponse = jest.fn().mockImplementation(async (stock_name) => {
    return Promise.resolve({ data: GetSeachMock.error, status: 200 });
  });
  test("should be an valid search", async () => {
    const service = new SearchStockService({
      request: {
        get: (stock_name) => successResponse(stock_name),
      },
    });

    const result = await service.findStockByname("IBM");

    expect(result.data).toHaveLength(10);
  });

  test("shoud be not found nothing", async () => {
    const service = new SearchStockService({
      request: {
        get: (stock_name) => notFoundResponse(stock_name),
      },
    });

    const result = await service.findStockByname("hkdbceb");
    expect(result.data).toHaveLength(0);
  });
  test("shoud be an server error", async () => {
    const service = new SearchStockService({
      request: {
        get: (stock_name) => errorResponse(stock_name),
      },
    });
    await expect(service.findStockByname("")).rejects.toThrowError(
      "stocks not match for any value"
    );
  });
});
