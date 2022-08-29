import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes.js";
import itemRoutes from "./routes/ItemRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";

import requestLogger from "./middleware/requestLogger.js";

import mongo from "./db/mongo.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(responseLogger);

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

// 404
app.use(function (req, res) {
  res.status(404).json({
    message: "Page does not exist",
  });
});

const PORT = process.env.PORT || 3000;

mongo
  .connect()
  .then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)));
