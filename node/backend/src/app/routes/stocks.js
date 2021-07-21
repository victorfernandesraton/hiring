import { Router } from "express";
import ExpressAdapter from "../../adapter/express.js";

import * as stockContoller from "../controller/stocks.js";

const router = Router();

router.get("/:stock_name/quote", ExpressAdapter(stockContoller.getLastQuota));
router.get(
  "/:stock_name/history",
  ExpressAdapter(stockContoller.geHistoricalQuota)
);
router.post(
  "/:stock_name/compare",
  ExpressAdapter(stockContoller.getCompareStocks)
);

export default router;
