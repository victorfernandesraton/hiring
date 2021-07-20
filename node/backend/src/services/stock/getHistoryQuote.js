import StockService from "./stockService.js";
import { ApplicationError } from "../../adapter/error.js";
import { parseHistoricalStockResponse } from "../../adapter/stock.js";

class StockServiceHistoryQuote extends StockService {
  constructor({ key, uri, request }) {
    super({ key, uri });
    this.request = request;
  }

  async getHistoryQuote({ stockName, from, to }) {
    try {
      const response = await this.request.get(
        `/tiingo/daily/${stockName}/prices`,
        {
          params: {
            startDate: from,
            endDate: to,
          },
        }
      );

      return parseHistoricalStockResponse({ stockName, result: response.data });
    } catch (error) {
      if (error.response.status == 404) {
        throw new ApplicationError("stock not found", 404);
      } else {
        throw new ApplicationError();
      }
    }
  }
}

export default StockServiceHistoryQuote;
