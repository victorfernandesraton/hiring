import StockServiceExternal from "../../services/stock-external/index.js";
import StockServiceHistoryQuote from "../../services/stock/getHistoryQuite.js";

export const handler = (req, res, next) => {
  return next(new Error("not implemented"));
};
const stockServiceInstance = new StockServiceExternal({
  key: process.env.ALPHA_VANTAGE_API_KEY,
  uri: process.env.AlPHA_VANTAGE_API_URI,
});

const stockServiceHistoryQuote = new StockServiceHistoryQuote({
  key: process.env.TIINGO_API_KEY,
  uri: process.env.TIINGO_API_URI,
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
