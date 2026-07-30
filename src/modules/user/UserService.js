import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./UserModel.js";
import env from "../../config/env.js";

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

  return {
    login,
    register,
  };
})();
