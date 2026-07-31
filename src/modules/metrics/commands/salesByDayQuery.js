import { query } from "express-validator";

export default () => {
  return [
    query("days")
      .optional()
      .isInt({ min: 1, max: 365 })
      .withMessage("days debe ser un entero entre 1 y 365")
      .toInt(),
  ];
};
