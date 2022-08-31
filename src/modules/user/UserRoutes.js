import express from "express";
import UserController from "./UserController.js";
import validate from "../../middleware/validate.js";
import loginUser from "./commands/loginUser.js";
import registerUser from "./commands/registerUser.js";

const router = express.Router();

router.post("/login", loginUser(), validate(), UserController.login);
router.post("/register", registerUser(), validate(), UserController.register);

export default router;
