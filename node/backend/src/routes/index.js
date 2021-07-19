const { Router } = require("express");
const stocks = require("./stocks");

const router = Router();

router.use("/stocks", stocks);

module.exports = router;
