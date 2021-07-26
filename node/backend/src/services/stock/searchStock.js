import StockService from "./stockService.js";
import { parseSearchResults } from "../../adapter/stock.js";
import { ApplicationError } from "../../adapter/error.js";
class SearchStockService extends StockService {
  async findStockByname(stok_name) {
    try {
      const response = await this.request.get("query", {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: stok_name,
        },
      });

      if (!response?.data?.bestMatches) {
        throw new ApplicationError("stocks not match for any value", 404);
      }

      return parseSearchResults(response?.data?.bestMatches ?? []);
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      } else {
        throw new ApplicationError();
      }
    }
  }
}

export default SearchStockService;
