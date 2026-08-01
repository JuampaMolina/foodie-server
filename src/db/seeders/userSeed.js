import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import User from "../../modules/user/UserModel.js";

const encriptPassword = async (password) => await bycrypt.hash(password, 10);

// Contraseña "1234" para todos, para poder probar cualquier cuenta a mano.
const passwordHash = await encriptPassword("1234");

const users = [
  {
    _id: "631621f581a0daa0953adc79",
    name: "Juampa",
    email: "juampa@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: "631621f581a0daa0953adc7a",
    name: "Admin",
    email: "admin@gmail.com",
    role: "admin",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Lucía Fernández",
    email: "lucia.fernandez@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Marc Oliver",
    email: "marc.oliver@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Aitana Gómez",
    email: "aitana.gomez@gmail.com",
    role: "admin",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Diego Serrano",
    email: "diego.serrano@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Nerea Castillo",
    email: "nerea.castillo@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Pablo Navarro",
    email: "pablo.navarro@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Carla Iglesias",
    email: "carla.iglesias@gmail.com",
    role: "user",
    passwordHash,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Sergio Blanco",
    email: "sergio.blanco@gmail.com",
    role: "user",
    passwordHash,
  },
];

const seed = async () => {
  console.log("Inserting users");
  await User.deleteMany({});
  await User.insertMany(users);
};

export default seed;
export { users };
