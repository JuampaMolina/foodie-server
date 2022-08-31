import express from "express";
import CategoryController from "./CategoryController.js";
import validate from "../../middleware/validate.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import isMongoId from "../../middleware/isMongoId.js";
import createCategory from "./commands/createCategory.js";
import updateCategory from "./commands/updateCategory.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", isMongoId(), validate(), CategoryController.getById);
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
  isMongoId(),
  validate(),
  CategoryController.remove
);

export default router;
