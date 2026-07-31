import express from "express";
import ItemController from "./ItemController.js";
import validate from "../../middleware/validate.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import isMongoId from "../../middleware/isMongoId.js";
import paginationQuery from "../../middleware/paginationQuery.js";
import createItem from "./commands/createItem.js";
import updateItem from "./commands/updateItem.js";

const router = express.Router();

router.get("/", paginationQuery(), validate(), ItemController.getAll);
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
