import express from "express";

import ItemController from "../controllers/ItemController.js";
import validate from "../middleware/validate.js";
import requireAdmin from "../middleware/requireAdmin.js";
import isMongoId from "../middleware/commands/isMongoId.js";
import createItem from "../middleware/commands/item/createItem.js";
import updateItem from "../middleware/commands/item/updateItem.js";

const router = express.Router();

router.get("/", ItemController.getAll);
router.get("/:id", isMongoId(), validate(), ItemController.getById);
router.get(
  "/category/:id",
  isMongoId(),
  validate(),
  ItemController.getItemsByCategoryId
);
router.post(
  "/",
  createItem(),
  validate(),
  requireAdmin(),
  ItemController.create
);
router.put(
  "/:id",
  updateItem(),
  validate(),
  requireAdmin(),
  ItemController.update
);
router.delete(
  "/:id",
  isMongoId(),
  validate(),
  requireAdmin(),
  ItemController.remove
);

export default router;
