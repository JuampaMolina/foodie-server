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
// Público a propósito: sólo expone nombre/cantidad vendida de los productos
// más pedidos (sin ingresos ni datos de usuarios), y el cliente lo usa para
// la sección de "Destacados" en la home, visible sin haber iniciado sesión.
router.get(
  "/top-items",
  topItemsQuery(),
  validate(),
  MetricsController.getTopItems
);

export default router;
