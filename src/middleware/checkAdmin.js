export default (req, res, next) => {
  const { userRole } = req.user;
  try {
    if (userRole !== "admin") {
      throw new Error("Debes tener permiso de administrador");
    }
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: error.message });
  }
};
