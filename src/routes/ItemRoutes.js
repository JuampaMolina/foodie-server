import express from "express";

import ItemController from "../controllers/ItemController.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getById);
router.get("/category/:id", ItemController.getItemsByCategoryId);
router.post("/", requireAdmin(), ItemController.create);
router.put("/:id", requireAdmin(), ItemController.update);
router.delete("/:id", requireAdmin(), ItemController.remove);

export default router;
