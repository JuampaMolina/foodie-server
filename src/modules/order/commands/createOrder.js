import { body } from "express-validator";

export default () => {
  return [
    body("date").notEmpty().isISO8601().toDate(),
    body("totalPrice")
      .notEmpty()
      .isNumeric()
      .withMessage("El precio es necesario"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("El pedido debe tener como mínimo 1 item"),
    body("address")
      .trim()
      .notEmpty()
      .withMessage("La dirección de entrega es necesaria"),
  ];
};
