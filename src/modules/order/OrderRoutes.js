import express from "express";

import OrderController from "./OrderController.js";
import validate from "../../middleware/validate.js";
import requireAuth from "../../middleware/requireAuth.js";
import isMongoId from "../../middleware/isMongoId.js";
import createOrder from "./commands/createOrder.js";

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
