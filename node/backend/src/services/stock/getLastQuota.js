import StockService from "./stockService.js";
import { parseLastStockResponse } from "../../adapter/stock.js";
import { ApplicationError } from "../../adapter/error.js";

class StockServiceLastQuota extends StockService {
  async getLastQuota(stockName) {
    try {
      const result = await this.request.get(`/query`, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: stockName,
        },
      });

      if (!result?.data?.["Global Quote"]?.["05. price"]) {
        throw new ApplicationError(`stock ${stockName} not found`, 404);
      } else {
        return parseLastStockResponse({ stockName, result });
      }
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      } else {
        throw new ApplicationError("internal error");
      }
    }
  }
}

export default StockServiceLastQuota;
