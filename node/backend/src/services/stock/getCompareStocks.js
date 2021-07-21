import { ApplicationError } from "../../adapter/error.js";
import { parseCompareStockResponse } from "../../adapter/stock.js";

import StockService from "./stockService.js";

class StockServiceCompareQuota extends StockService {
  constructor({ key, uri, request }) {
    super({ key, uri });
    this.request = request;
  }

  async getCompareStocks({ stockList = [] }) {
    const promisses = stockList.map(async (stcok) => {
      try {
        const result = await this.request.getLastQuota(stcok);
        return result;
      } catch (error) {
        return null;
      }
    });

    const results = await Promise.all(promisses);
    const response = results.filter((item) => !!item);

    if (!response?.length) {
      throw new ApplicationError("stocks not found", 404);
    }

    return parseCompareStockResponse(response);
  }
}
export default StockServiceCompareQuota;
