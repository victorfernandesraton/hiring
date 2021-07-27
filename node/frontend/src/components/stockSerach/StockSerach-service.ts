import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface StockServiceRequest {
  get: (uri: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
}

class StockSearchService {
  constructor(readonly request: StockServiceRequest) {}

  async searchForString(query: string): Promise<any> {
    const request = await this.request.get("/stocks/search", {
      params: {
        query,
      },
    });

    return request.data;
  }
}

export default StockSearchService;
