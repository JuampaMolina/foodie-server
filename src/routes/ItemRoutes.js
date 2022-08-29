import express from "express";

import * as ItemController from "../controllers/ItemController.js";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const router = express.Router();

router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getById);
router.get("/category/:id", ItemController.getItemsByCategoryId);
router.post("/", checkAuth, checkAdmin, ItemController.create);
router.put("/:id", checkAuth, checkAdmin, ItemController.update);
router.delete("/:id", checkAuth, checkAdmin, ItemController.remove);

export default router;
