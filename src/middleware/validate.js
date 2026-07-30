import { validationResult } from "express-validator";
import logger from "../config/logger.js";

export default () => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  logger.debug({ errors: errors.array() }, "validation failed");
  let error = errors
    .array({ onlyFirstError: true })
    .map((err) => `[${err.path}]: ${err.msg}`)[0];

  return res.status(400).json({
    message: error,
  });
};
