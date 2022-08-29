import express from "express";

import * as CategoryController from "../controllers/CategoryController.js";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import validate from "../middleware/validate.js";
import isObjectId from "../middleware/isObjectId.js";
import createCategory from "../middleware/commands/category/createCategory.js";
import updateCategory from "../middleware/commands/category/updateCategory.js";
import deleteCategory from "../middleware/commands/category/deleteCategory.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", isObjectId(), validate, CategoryController.getById);
router.post(
  "/",
  checkAuth,
  checkAdmin,
  createCategory(),
  validate,
  CategoryController.create
);
router.put(
  "/:id",
  checkAuth,
  checkAdmin,
  updateCategory(),
  validate,
  CategoryController.update
);
router.delete(
  "/:id",
  checkAuth,
  checkAdmin,
  deleteCategory(),
  validate,
  CategoryController.remove
);

export default router;
