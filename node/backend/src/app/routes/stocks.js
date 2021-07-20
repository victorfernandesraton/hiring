import { Router } from "express";
import { handler, getLastQuota } from "../controller/stocks.js";
import ExpressAdapter from "../../adapter/express.js";
const router = Router();

router.get("/:stock_name/quote", ExpressAdapter(getLastQuota));
router.get("/:stock_name/history", handler);
router.get("/:stock_name/compare", handler);

export default router;
