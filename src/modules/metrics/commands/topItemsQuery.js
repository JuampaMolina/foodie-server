import { query } from "express-validator";

export default () => {
  return [
    query("limit")
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("limit debe ser un entero entre 1 y 20")
      .toInt(),
  ];
};
