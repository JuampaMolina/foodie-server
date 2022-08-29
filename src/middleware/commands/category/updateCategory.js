import { body, param } from "express-validator";
import capitalize from "../../../utils/capitalize.js";

export default () => {
  return [
    param("id")
      .trim()
      .isMongoId()
      .withMessage("Se necesita un Id válido de la categoría a modificar"),

    body("name")
      .trim()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener como mínimo 3 carácteres")
      .customSanitizer((value) => capitalize(value)),
  ];
};
