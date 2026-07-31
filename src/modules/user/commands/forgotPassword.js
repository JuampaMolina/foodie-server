import { body } from "express-validator";

export default () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El email es necesario")
      .isEmail()
      .withMessage("El email debe tener un formato válido"),
  ];
};
