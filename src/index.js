import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import itemRoutes from "./routes/items.js";
import categoryRoutes from "./routes/categories.js";
import requestLogger from "./middleware/requestLogger.js";
import responseLogger from "./middleware/responseLogger.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
// app.use(responseLogger);

app.use("/items", itemRoutes);
app.use("/categories", categoryRoutes);

// 404
app.use(function (req, res) {
  res.status(404).json({
    message: "Page does not exist",
  });
});

const PORT = process.env.PORT || 3000;

// Abrimos el servidor si la conexión con mongo es extitosa
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
  .catch((error) => console.error(error.message));
