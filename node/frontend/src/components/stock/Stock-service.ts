import { AxiosResponse } from "axios";
import { format } from "date-fns";

import { compare, gains, historic, quota } from "./Stock-requests";

export interface HttpResponse {
  data: any;
  status: number;
}

export interface StockServiceRequest {
  get: (uri: string, config?: any) => Promise<AxiosResponse>;
  post: (uri: string, config?: any) => Promise<AxiosResponse>;
}

export interface StockServiceObjectParams {
  request: StockServiceRequest;
}

export interface StockQuota {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export interface StockInfo {
  opening: number;
  high: number;
  low: number;
  closing: number;
  pricedAt: string;
}

export interface StockHistoryinterval {
  to: Date;
  from: Date;
}

export interface StockProjection {
  name: string;
  purchasedAmount: number;
  lastPrice: number;
  pricedAt: Date;
  purchasedAt: Date;
  priceAtDate: number;
  capitalGains: number;
}

export class StockService {
  readonly request: StockServiceRequest;
  constructor({ request }: StockServiceObjectParams) {
    this.request = request;
  }

  async getLastQuota(stockName: string): Promise<StockQuota> {
    const response = await this.request.get(quota(stockName));
    if (response.status != 200) {
      throw new Error(response?.data?.message);
    }
    return { ...response.data };
  }

  async getHistory(
    stockName: string,
    date: StockHistoryinterval
  ): Promise<StockInfo[]> {
    const response = await this.request.get(historic(stockName), {
      params: {
        ...date,
      },
    });

    return { ...response.data };
  }
  async getCompare(stock: string, stockNames: string[]): Promise<StockQuota[]> {
    const response = await this.request.post(compare(stock), {
      data: {
        stocks: stockNames,
      },
    });

    return { ...response.data };
  }
  async getProjection(
    stockName: string,
    date: Date,
    ammount: number
  ): Promise<StockProjection> {
    const response = await this.request.get(gains(stockName), {
      params: {
        purchasedAmount: ammount,
        purchasedAt: format(date, "YYYY-MM-dd"),
      },
    });
    return { ...response.data };
  }
}

export default StockService;
