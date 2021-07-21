import { Router } from "express";
import ExpressAdapter from "../../adapter/express.js";

import * as stockContoller from "../controller/stocks.js";
import { stcokRoutesConstants } from "./constants.js";

const router = Router();

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
