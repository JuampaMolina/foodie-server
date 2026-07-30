import express from "express";
import OrderController from "./OrderController.js";
import validate from "../../middleware/validate.js";
import requireAuth from "../../middleware/requireAuth.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import isMongoId from "../../middleware/isMongoId.js";
import createOrder from "./commands/createOrder.js";
import updateOrderStatus from "./commands/updateOrderStatus.js";

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
router.put(
  "/:id/status",
  updateOrderStatus(),
  validate(),
  requireAdmin(),
  OrderController.updateStatus
);

export default router;
