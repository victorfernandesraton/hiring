export default class StockController {
  constructor({
    stockServiceInstance,
    stockServiceHistoryQuote,
    stockServiceCompareQuota,
    stockServiceProjection,
    stockServiceSearch,
  }) {
    this.stockServiceCompareQuota = stockServiceCompareQuota;
    this.stockServiceHistoryQuote = stockServiceHistoryQuote;
    this.stockServiceInstance = stockServiceInstance;
    this.stockServiceProjection = stockServiceProjection;
    this.stockSerach = stockServiceSearch;
  }
  getLastQuota = async ({ params }) => {
    try {
      const result = await this.stockServiceInstance.getLastQuota(
        params.stock_name
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  geHistoricalQuota = async ({ params, query }) => {
    const { stock_name } = params;
    const { to, from } = query;

    const result = await this.stockServiceHistoryQuote.getHistoryQuote({
      stockName: stock_name,
      from,
      to,
    });

    return result;
  };

  getCompareStocks = async ({ params, body }) => {
    const { stock_name } = params;
    const { stocks } = body;

    const result = await this.stockServiceCompareQuota.getCompareStocks({
      stockList: Array.from(new Set([...stocks, stock_name])),
    });

    return result;
  };

  getProjection = async ({ params, query }) => {
    const { stock_name } = params;
    const { purchasedAmount, purchasedAt } = query;

    const result = await this.stockServiceProjection.getProjections({
      stockName: stock_name,
      annount: purchasedAmount,
      date: purchasedAt,
    });

    return result;
  };

  getSerach = async ({ query }) => {
    const stock_name = query?.query;

    const result = await this.stockSerach.findStockByName(stock_name);

    return result;
  };
}
