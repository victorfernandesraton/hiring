import RequestAdapter from "../../adapter/request.js";

import StockServiceLastQuote from "../../services/stock/getLastQuota.js";
import StockServiceHistoryQuote from "../../services/stock/getHistoryQuote.js";

export const handler = (req, res, next) => {
  return next(new Error("not implemented"));
};

const stockServiceInstance = new StockServiceLastQuote({
  key: process.env.ALPHA_VANTAGE_API_KEY,
  uri: process.env.AlPHA_VANTAGE_API_URI,
  request: RequestAdapter("axios", {
    baseURL: process.env.AlPHA_VANTAGE_API_URI,
    params: {
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  }),
});

const stockServiceHistoryQuote = new StockServiceHistoryQuote({
  key: process.env.TIINGO_API_KEY,
  uri: process.env.TIINGO_API_URI,
  request: RequestAdapter("axios", {
    baseURL: process.env.TIINGO_API_URI,
    params: {
      token: process.env.TIINGO_API_KEY,
    },
  }),
});

export const getLastQuota = async ({ params }) => {
  try {
    const result = await stockServiceInstance.getLastQuota(params.stock_name);

    return result;
  } catch (error) {
    throw error;
  }
};

export const geHistoricalQuota = async ({ params, query }) => {
  const { stock_name } = params;
  const { to, from } = query;

  const result = await stockServiceHistoryQuote.getHistoryQuote({
    stockName: stock_name,
    from,
    to,
  });

  return result;
};
