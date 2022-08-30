import express from "express";

import OrderController from "../controllers/OrderController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", OrderController.getAll);
router.post("/", requireAuth(), OrderController.create);
router.get("/user/:id", OrderController.getOrdersByUserId);

export default router;
