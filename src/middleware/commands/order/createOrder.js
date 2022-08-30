import { body } from "express-validator";

export default () => {
  return [
    body("user")
      .trim()
      .notEmpty()
      .withMessage("El usuario es necesario")
      .isMongoId()
      .withMessage("Se necesita un Id válido del usuario"),
    body("date").notEmpty().isISO8601().toDate(),
    body("totalPrice")
      .notEmpty()
      .isNumeric()
      .withMessage("El precio es necesario"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("El pedido debe tener como mínimo 1 item"),
  ];
};
