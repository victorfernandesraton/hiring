import axios from "axios";
import { parseServiceLasStockAxiosResponse } from "../../adapter/stock.js";
class StockService {
  constructor({ key, uri }) {
    this.key = key;
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
      return parseServiceLasStockAxiosResponse({ stockName, result });
    } catch (error) {
      throw new Error("unavaliable API");
    }
  }
}

export default StockService;
