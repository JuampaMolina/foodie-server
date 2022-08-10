import express from "express";

import * as CategoryController from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.post("/", CategoryController.create);
router.get("/:id", CategoryController.getById);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;
