import { ApplicationError } from "../../adapter/error.js";
import { parseProjectionFromDay } from "../../adapter/stock.js";

import StockService from "./stockService.js";

class StockServiceProjection extends StockService {
  constructor({ key, uri, request }) {
    super({ key, uri });
    this.request = request;
  }

  async getProjections({ stockName, annount, date }) {
    try {
      const [responseHistory, lastQuota] = await Promise.all([
        this.request.get(`/query`, {
          params: {
            function: "TIME_SERIES_DAILY_ADJUSTED",
            symbol: stockName,
            outputsize: "full",
          },
        }),
        this.request.getLastQuota(stockName),
      ]);

      const historicalPrices = responseHistory?.data?.["Time Series (Daily)"];

      if (!historicalPrices) {
        throw new ApplicationError("stock history not found", 404);
      }

      const projectionForDay = parseProjectionFromDay({
        date,
        historical: historicalPrices,
      });

      const capitalGainsDollar =
        (projectionForDay.priceAtDate - lastQuota.lastPrice) *
        parseFloat(annount);

      return {
        ...projectionForDay, // TODO converter pra dolar
        name: stockName,
        purchasedAmount: annount,
        lastPrice: lastQuota.lastPrice,
        capitalGains: capitalGainsDollar,
      };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      } else {
        throw new ApplicationError("internal error");
      }
    }
  }
}

export default StockServiceProjection;
