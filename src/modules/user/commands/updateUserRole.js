import { body } from "express-validator";
import isMongoId from "../../../middleware/isMongoId.js";

export default () => {
  return [
    ...isMongoId(),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("El rol es necesario")
      .isIn(["user", "admin"])
      .withMessage("Rol no válido"),
  ];
};
