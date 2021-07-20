import axios from "axios";
import StockService from "../stock/index.js";
import { parseLastStockResponse } from "../../adapter/stock.js";
import { ApplicationError } from "../../adapter/express.js";
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
      if (!result?.data?.["Global Quote"]?.["05. price"]) {
        throw new ApplicationError("stock not found", 404);
      } else {
        return parseLastStockResponse({ stockName, result });
      }
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      } else {
        console.log(error);
        throw new ApplicationError("internal error");
      }
    }
  }
}

export default StockServiceExternal;
