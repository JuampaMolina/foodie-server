const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

export default requestLogger;
