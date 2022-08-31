import { validationResult } from "express-validator";

export default () => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  console.log(errors.array());
  let error = errors
    .array({ onlyFirstError: true })
    .map((err) => `[${err.param}]: ${err.msg}`)[0];

  return res.status(400).json({
    message: error,
  });
};
