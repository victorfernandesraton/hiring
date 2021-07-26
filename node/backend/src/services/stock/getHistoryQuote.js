import StockService from "./stockService.js";
import { ApplicationError } from "../../adapter/error.js";
import { parseHistoricalStockResponse } from "../../adapter/stock.js";

class StockServiceHistoryQuote extends StockService {
  async getHistoryQuote({ stockName, from, to }) {
    try {
      const response = await this.request.get(`/query`, {
        params: {
          function: "TIME_SERIES_DAILY_ADJUSTED",
          symbol: stockName,
          outputsize: "full",
        },
      });

      if (!response?.data?.["Time Series (Daily)"]) {
        throw new ApplicationError("stock not found", 404);
      }

      return parseHistoricalStockResponse({
        stockName,
        result: response?.data?.["Time Series (Daily)"],
        finalDate: to,
        initialDate: from,
      });
    } catch (error) {
      if (error?.response?.status === 404) {
        throw new ApplicationError("stock not found", 404);
      } else if (error instanceof ApplicationError) {
        throw error;
      } else {
        throw new ApplicationError();
      }
    }
  }
}

export default StockServiceHistoryQuote;
