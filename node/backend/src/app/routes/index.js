import { Router } from "express";

import asyncHandler from "../middleware/asyncHandler.js";

import stocks from "./stocks.js";

const router = Router();

router.use("/stocks", stocks);
router.use(asyncHandler);

export default router;
