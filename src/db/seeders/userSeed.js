import bycrypt from "bcryptjs";
import User from "../../modules/user/UserModel.js";

const encriptPassword = async (password) => await bycrypt.hash(password, 10);

const users = [
  {
    _id: "631621f581a0daa0953adc79",
    name: "Juampa",
    email: "juampa@gmail.com",
    role: "user",
    passwordHash: await encriptPassword("1234"),
  },
  {
    _id: "631621f581a0daa0953adc7a",
    name: "Admin",
    email: "admin@gmail.com",
    role: "admin",
    passwordHash: await encriptPassword("1234"),
  },
];

const seed = async () => {
  console.log("Inserting users");
  await User.deleteMany({});
  await User.insertMany(users);
};

export default seed;
