import { Router } from "express";

import ExpressAdapter from "../../adapter/express.js";
import RequestAdapter from "../../adapter/request.js";

import StockServiceLastQuote from "../../services/stock/getLastQuota.js";
import StockServiceHistoryQuote from "../../services/stock/getHistoryQuote.js";
import StockServiceCompareQuota from "../../services/stock/getCompareStocks.js";

import StockContoller from "../controller/stocks.js";
import { stcokRoutesConstants } from "./constants.js";

const router = Router();

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
  key: process.env.ALPHA_VANTAGE_API_KEY,
  uri: process.env.AlPHA_VANTAGE_API_URI,
  request: RequestAdapter("axios", {
    baseURL: process.env.AlPHA_VANTAGE_API_URI,
    params: {
      apikey: process.env.ALPHA_VANTAGE_API_KEY,
    },
  }),
});
const stockServiceCompareQuota = new StockServiceCompareQuota({
  key: process.env.ALPHA_VANTAGE_API_KEY,
  uri: process.env.AlPHA_VANTAGE_API_URI,
  request: stockServiceInstance,
});
const stockContoller = new StockContoller({
  stockServiceCompareQuota,
  stockServiceHistoryQuote,
  stockServiceInstance,
});

router.get(
  stcokRoutesConstants.quote,
  ExpressAdapter(stockContoller.getLastQuota)
);

router.get(
  stcokRoutesConstants.history,
  ExpressAdapter(stockContoller.geHistoricalQuota)
);

router.post(
  stcokRoutesConstants.compare,
  ExpressAdapter(stockContoller.getCompareStocks)
);

export default router;
