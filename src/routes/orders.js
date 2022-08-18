import express from "express";

import * as OrderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", OrderController.getAll);
router.post("/", OrderController.create);
router.get("/user/:id", OrderController.getOrdersByUserId);

export default router;
