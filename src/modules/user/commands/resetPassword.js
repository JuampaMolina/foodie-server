import { body } from "express-validator";

export default () => {
  return [
    body("token").trim().notEmpty().withMessage("El token es necesario"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("La contraseña es necesaria")
      .isLength({ min: 4 })
      .withMessage("La contraseña debe tener como mínimo 4 carácteres"),
  ];
};
