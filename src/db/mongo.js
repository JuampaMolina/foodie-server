import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI ?? "";

const connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Mongo connection has been made");
  } catch (error) {
    console.log("Mongo connection error", error);
  }
};

const disconnect = async () => {
  await mongoose.disconnect();
  console.log("Mongo connection disconnected");
};

export default {
  connect,
  disconnect,
};
