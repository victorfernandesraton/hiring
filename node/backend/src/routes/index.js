import { Router } from "express";
import stocks from "./stocks.js";
const router = Router();

router.use("/stocks", stocks);

export default router;
