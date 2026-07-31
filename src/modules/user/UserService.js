import crypto from "node:crypto";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./UserModel.js";
import env from "../../config/env.js";
import paginate from "../../utils/paginate.js";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export default (function () {
  const login = async (email, password) => {
    const user = await User.findOne({ email });

    const incorrectCredentials =
      user === null
        ? true
        : !(await bycrypt.compare(password, user.passwordHash));

    if (incorrectCredentials) {
      throw new Error("El usuario y contraseña no coinciden");
    }

    const token = jwt.sign({ user }, env.JWT_SECRET, { expiresIn: "24h" });

    return { user, token };
  };

  const register = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Ya existe un usuario con este correo");
    }

    const passwordHash = await bycrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      role: "user",
      passwordHash,
    });

    const savedUser = await user.save();

    return savedUser;
  };

  const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No existe ningún usuario con este correo");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordTokenHash = hashToken(token);
    user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    return {
      token,
      warning:
        "Este proyecto no tiene un servicio de email configurado: en producción este token se enviaría por correo, no se devolvería en la respuesta.",
    };
  };

  const resetPassword = async (token, password) => {
    const user = await User.findOne({
      resetPasswordTokenHash: hashToken(token),
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("El token no es válido o ha caducado");
    }

    user.passwordHash = await bycrypt.hash(password, 10);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: "Contraseña actualizada correctamente" };
  };

  const getAll = async (pagination) => {
    return paginate(User, User.find(), pagination);
  };

  const updateRole = async (id, role) => {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      throw new Error("El usuario no existe");
    }
    return user;
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    getAll,
    updateRole,
  };
})();
