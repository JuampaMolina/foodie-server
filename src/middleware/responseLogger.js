// https://thewebdev.info/2022/03/06/how-to-log-the-response-body-with-express/

const responseLogger = (req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (chunk, ...args) => {
    chunks.push(chunk);
    return oldWrite.apply(res, [chunk, ...args]);
  };

  res.end = (chunk, ...args) => {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString("utf8");
    console.log(req.path, body);
    return oldEnd.apply(res, [chunk, ...args]);
  };

  next();
};

export default responseLogger;
