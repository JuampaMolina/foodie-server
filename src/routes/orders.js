import express from "express";

import * as OrderController from "../controllers/OrderController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", OrderController.getAll);
router.post("/", checkAuth, OrderController.create);
router.get("/user/:id", OrderController.getOrdersByUserId);

export default router;
