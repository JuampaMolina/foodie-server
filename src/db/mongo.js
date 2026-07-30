import mongoose from "mongoose";
import env from "../config/env.js";

const connect = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
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
