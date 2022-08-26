import express from "express";

import * as ItemController from "../controllers/ItemController.js";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.get("/", ItemController.getAll);
router.post("/", checkAuth, checkAdmin, ItemController.create);
router.get("/:id", ItemController.getById);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.remove);
router.get("/category/:id", ItemController.getItemsByCategoryId);
// router.get("/category/:id", getItemsByCategoryId);
// router.put("/category", addCategoryToItem);

export default router;
