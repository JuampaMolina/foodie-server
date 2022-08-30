import express from "express";

import OrderController from "../controllers/OrderController.js";
import requireAuth from "../middleware/requireAuth.js";
import validate from "../middleware/validate.js";
import isMongoId from "../middleware/commands/isMongoId.js";
import createOrder from "../middleware/commands/order/createOrder.js";

const router = express.Router();

router.get("/", OrderController.getAll);
router.post(
  "/",
  requireAuth(),
  createOrder(),
  validate(),
  OrderController.create
);
router.get(
  "/user/:id",
  isMongoId(),
  validate(),
  OrderController.getOrdersByUserId
);

export default router;
