import express from "express";
import MetricsController from "./MetricsController.js";
import validate from "../../middleware/validate.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import salesByDayQuery from "./commands/salesByDayQuery.js";
import topItemsQuery from "./commands/topItemsQuery.js";

const router = express.Router();

router.get(
  "/sales-by-day",
  salesByDayQuery(),
  validate(),
  requireAdmin(),
  MetricsController.getSalesByDay
);
router.get(
  "/top-items",
  topItemsQuery(),
  validate(),
  requireAdmin(),
  MetricsController.getTopItems
);

export default router;
