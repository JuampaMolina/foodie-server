import express from "express";

import UserController from "../controllers/UserController.js";
import validate from "../middleware/validate.js";
import loginUser from "../middleware/commands/user/loginUser.js";
import registerUser from "../middleware/commands/user/registerUser.js";

const router = express.Router();

router.post("/login", loginUser(), validate(), UserController.login);
router.post("/register", registerUser(), validate(), UserController.register);

export default router;
