import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface StockServiceRequest {
  get: (uri: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
}

export interface StockSearchItem {
  name: string;
  symbol: string;
}
class StockSearchService {
  constructor(readonly request: StockServiceRequest) {}

  async searchForString(query: string): Promise<StockSearchItem[]> {
    const request = await this.request.get("/stocks/search", {
      params: {
        query,
      },
    });

    return request?.data?.data ?? [];
  }
}

export default StockSearchService;
