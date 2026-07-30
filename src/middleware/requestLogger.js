import logger from "../config/logger.js";

const requestLogger = (request, response, next) => {
  logger.info({ method: request.method, url: request.url }, "request");
  next();
};

export default requestLogger;
