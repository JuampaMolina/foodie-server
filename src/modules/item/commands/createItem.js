import { body } from "express-validator";
import capitalize from "../../../utils/capitalize.js";

export default () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("El nombre es necesario")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener como mínimo 3 carácteres")
      .customSanitizer((value) => capitalize(value)),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("La categoría es necesaria")
      .isMongoId()
      .withMessage("Se necesita un Id válido de la categoría"),
    body("description").trim(),
    body("price").notEmpty().isNumeric().withMessage("El precio es necesario"),
  ];
};
