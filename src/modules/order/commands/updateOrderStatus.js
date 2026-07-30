import { body } from "express-validator";
import isMongoId from "../../../middleware/isMongoId.js";

export default () => {
  return [
    ...isMongoId(),
    body("status")
      .trim()
      .notEmpty()
      .withMessage("El estado es necesario")
      .isIn(["pending", "preparing", "delivered"])
      .withMessage("Estado no válido"),
  ];
};
