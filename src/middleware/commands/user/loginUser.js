import { body } from "express-validator";

export default () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El email es necesario")
      .isEmail()
      .withMessage("El email debe tener un formato válido"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("La contraseña es necesaria")
      .isLength({ min: 4 })
      .withMessage("La contraseña debe tener como mínimo 4 carácteres"),
  ];
};
