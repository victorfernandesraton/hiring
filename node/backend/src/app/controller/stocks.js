export default class StockController {
  constructor({
    stockServiceInstance,
    stockServiceHistoryQuote,
    stockServiceCompareQuota,
  }) {
    this.stockServiceCompareQuota = stockServiceCompareQuota;
    this.stockServiceHistoryQuote = stockServiceHistoryQuote;
    this.stockServiceInstance = stockServiceInstance;
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
}
