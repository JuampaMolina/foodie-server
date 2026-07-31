import mongoose from "mongoose";
import requestLogger from "./middleware/requestLogger.js";
import userRoutes from "./modules/user/UserRoutes.js";
import itemRoutes from "./modules/item/ItemRoutes.js";
import categoryRoutes from "./modules/category/CategoryRoutes.js";
import orderRoutes from "./modules/order/OrderRoutes.js";
import metricsRoutes from "./modules/metrics/MetricsRoutes.js";

const MONGO_STATES = [
  "disconnected",
  "connected",
  "connecting",
  "disconnecting",
];

export default function (app) {
  app.use(requestLogger);

  app.get("/health", (req, res) => {
    const mongoStatus =
      MONGO_STATES[mongoose.connection.readyState] ?? "unknown";
    const healthy = mongoose.connection.readyState === 1;
    res.status(healthy ? 200 : 503).json({
      status: healthy ? "ok" : "degraded",
      mongo: mongoStatus,
      uptime: process.uptime(),
    });
  });

  app.use("/users", userRoutes);
  app.use("/items", itemRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);
  app.use("/metrics", metricsRoutes);

  // 404
  app.use(function (req, res) {
    res.status(404).json({
      message: "Page does not exist",
    });
  });
}
