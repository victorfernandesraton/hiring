import axios from "axios";
import StockService from "../stock/index.js";
import { parseLastStockResponse } from "../../adapter/stock.js";
class StockServiceExternal extends StockService {
  constructor({ key, uri }) {
    super({ key, uri });
    const requestInstance = axios.create({
      baseURL: uri,
    });
    requestInstance.interceptors.request.use((config) => {
      config.params = {
        apikey: this.key,
        ...config.params,
      };

      return config;
    });
    this.request = requestInstance;
  }
  async getLastQuota(stockName) {
    try {
      const result = await this.request.get(
        `query?function=GLOBAL_QUOTE&symbol=${stockName}`
      );
      return parseLastStockResponse({ stockName, result });
    } catch (error) {
      throw new Error("unavaliable API");
    }
  }
}

export default StockServiceExternal;
