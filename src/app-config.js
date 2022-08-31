import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import requestLogger from "./middleware/requestLogger.js";

export default function (app) {
  dotenv.config();
  app.use(express.json());
  app.use(cors());
  app.use(requestLogger);
}
