import { AxiosInstance } from "axios";
import { format } from "date-fns";

export interface StockProjectionResponse {
  purchasedAt: string;
  priceAtDate: number;
  name: string;
  purchasedAmount: number;
  lastPrice: number;
  capitalGains: number;
}

export default class StockProjectionService {
  constructor(readonly request: AxiosInstance) {}

  async getProjection(
    stockName: string,
    date: Date,
    purchasedAmount = 1
  ): Promise<StockProjectionResponse> {
    const result = await this.request.get(`/stocks/${stockName}/gains`, {
      params: {
        purchasedAmount,
        purchasedAt: format(date, "yyyy-MM-dd"),
      },
    });

    return result.data;
  }
}
