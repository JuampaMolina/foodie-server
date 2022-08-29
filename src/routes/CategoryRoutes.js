import express from "express";

import * as CategoryController from "../controllers/CategoryController.js";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", checkAuth, checkAdmin, CategoryController.create);
router.put("/:id", checkAuth, checkAdmin, CategoryController.update);
router.delete("/:id", checkAuth, checkAdmin, CategoryController.remove);

export default router;
