import express from "express";
import UserController from "./UserController.js";
import validate from "../../middleware/validate.js";
import loginUser from "./commands/loginUser.js";
import registerUser from "./commands/registerUser.js";
import forgotPassword from "./commands/forgotPassword.js";
import resetPassword from "./commands/resetPassword.js";

const router = express.Router();

router.post("/login", loginUser(), validate(), UserController.login);
router.post("/register", registerUser(), validate(), UserController.register);
router.post(
  "/forgot-password",
  forgotPassword(),
  validate(),
  UserController.forgotPassword
);
router.post(
  "/reset-password",
  resetPassword(),
  validate(),
  UserController.resetPassword
);

export default router;
