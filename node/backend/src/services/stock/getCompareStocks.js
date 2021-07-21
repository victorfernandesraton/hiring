import {
  parseCompareStockResponse,
  parseLastStockResponse,
} from "../../adapter/stock.js";

import StockService from "./stockService.js";

class StockServiceCompareQuota extends StockService {
  constructor({ key, uri, request }) {
    super({ key, uri });
    this.request = request;
  }

  async getCompareStocks({ stockList = [] }) {
    const promisses = stockList.map((stcok) =>
      this.request
        .get(`/query?function=GLOBAL_QUOTE&symbol=${stcok}`)
        .then((result) => {
          return parseLastStockResponse({ stockName: stcok, result });
        })
        .catch((error) => {
          return null;
        })
    );
    const results = await Promise.all(promisses);

    return parseCompareStockResponse(results);
  }
}
export default StockServiceCompareQuota;
