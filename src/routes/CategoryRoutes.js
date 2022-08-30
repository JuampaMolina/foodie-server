import express from "express";

import CategoryController from "../controllers/CategoryController.js";
import validate from "../middleware/validate.js";
import isObjectId from "../middleware/isObjectId.js";
import requireAdmin from "../middleware/requireAdmin.js";
import createCategory from "../middleware/commands/category/createCategory.js";
import updateCategory from "../middleware/commands/category/updateCategory.js";
import deleteCategory from "../middleware/commands/category/deleteCategory.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", isObjectId(), validate(), CategoryController.getById);
router.post(
  "/",
  requireAdmin(),
  createCategory(),
  validate(),
  CategoryController.create
);
router.put(
  "/:id",
  requireAdmin(),
  updateCategory(),
  validate(),
  CategoryController.update
);
router.delete(
  "/:id",
  requireAdmin(),
  deleteCategory(),
  validate(),
  CategoryController.remove
);

export default router;
