import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default (function () {
  const login = async (email, password) => {
    try {
      const user = await User.findOne({ email });

      const incorrectCredentials =
        user === null
          ? true
          : !(await bycrypt.compare(password, user.passwordHash));

      if (incorrectCredentials) {
        throw new Error("El usuario y contraseña no coinciden");
      }

      const userForToken = {
        user,
      };

      const token = jwt.sign(userForToken, "secret", { expiresIn: "24h" });

      return { user, token };
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    register,
  };
})();
