const { Router } = require("express");
const handler = require("../controller/stocks");
const router = Router();

router.get("/:stock_name/quote", handler);
router.get("/:stock_name/history", handler);
router.get("/:stock_name/compare", handler);

module.exports = router;
