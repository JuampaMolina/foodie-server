import { param } from "express-validator";

export default () => {
  return [
    param("id").trim().isMongoId().withMessage("Se necesita un Id válido"),
  ];
};
