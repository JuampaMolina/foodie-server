import { body } from "express-validator";
import capitalize from "../../../utils/capitalize.js";

export default () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener como mínimo 3 carácteres")
      .customSanitizer((value) => capitalize(value)),
  ];
};
