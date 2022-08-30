import jwt from "jsonwebtoken";

export default () => (req, res, next) => {
  const authorization = req.get("authorization");
  try {
    if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
      throw new Error("La cabecera auhtorization debe ser de tipo Bearer");
    } else {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, "secret");
      if (!token || !decodedToken.user) {
        throw new Error("Falta el token o no es válido");
      } else {
        console.log(decodedToken);
        req.user = decodedToken.user;
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ status: 401, message: error.message });
  }
};
