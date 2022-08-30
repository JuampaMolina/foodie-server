import { body } from "express-validator";
import capitalize from "../../../utils/capitalize.js";
import loginUser from "./loginUser.js";

export default () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío")
      .customSanitizer((value) => capitalize(value)),
    ...loginUser(),
  ];
};
