import { query } from "express-validator";

export default () => {
  return [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("page debe ser un entero positivo")
      .toInt(),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("limit debe ser un entero entre 1 y 100")
      .toInt(),
  ];
};
