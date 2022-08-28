import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // en producción sería mejor no dar pistas sobre si el usuario existe o no
      throw new Error("El usuario no existe");
    }

    const correctPassword = await bycrypt.compare(password, user.passwordHash);
    if (!correctPassword) {
      throw new Error("La contraseña no es correcta");
    }

    const userForToken = {
      userId: user._id,
      userRole: user.role,
    };

    const token = jwt.sign(userForToken, "secret", { expiresIn: "24h" });

    return { user, token };
  } catch (error) {
    throw error;
  }
}

export async function register(name, email, password) {
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
}
