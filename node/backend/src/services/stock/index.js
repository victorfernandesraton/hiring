class StockService {
  constructor({ key, uri }) {
    this.key = key;
    this.uri = uri;
  }

  async getLastQuota(stockName) {
    throw new Error("not implemented Yet");
  }

  async getHistoryQuote(stockName, from, to) {
    throw new Error("not implemented Yet");
  }
}

export default StockService;
