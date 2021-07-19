import expresAdapter from "../adapter/express.js";
import StockService from "../services/stock-external/index.js";
export const handler = (req, res, next) => {
  return next(new Error("not implemented"));
};

const stockServiceInstance = new StockService({
  key: "WCQ9J13R7X5K46V5",
  uri: "https://www.alphavantage.co/",
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
