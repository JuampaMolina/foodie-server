import requireAuth from "./requireAuth.js";

export default () => (req, res, next) => {
  let auth = requireAuth();
  auth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        status: 401,
        message: "Debes tener permiso de administrador",
      });
    }
    next();
  });
};
