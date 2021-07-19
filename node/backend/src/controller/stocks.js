import expresAdapter from "../adapter/express.js";
import StockService from "../services/stock-external/index.js";
export const handler = (req, res, next) => {
  return next(new Error("not implemented"));
};

const stockServiceInstance = new StockService({
  key: process.env.ALPHA_VANTAGE_API_KEY,
  uri: process.env.AlPHA_VANTAGE_API_URI,
});

export const getLastQuota = async ({ params }) => {
  const { stock_name } = params;
  try {
    const result = await stockServiceInstance.getLastQuota(stock_name);

    return result;
  } catch (error) {
    throw error;
  }
};
