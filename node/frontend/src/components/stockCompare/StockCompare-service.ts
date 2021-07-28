import { StockInfo, StockServiceRequest } from "../stock/Stock-service";

export default class StockCompareService {
  constructor(readonly request: StockServiceRequest) {}
  async getCompare(stockName: string, data: string[]): Promise<StockInfo[]> {
    const response = await this.request.post(`/stocks/${stockName}/compare`, {
      stocks: data,
    });

    return response?.data?.prices ?? [];
  }
}
