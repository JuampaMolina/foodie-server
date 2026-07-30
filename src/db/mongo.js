import mongoose from "mongoose";
import env from "../config/env.js";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connect = async (retriesLeft = MAX_RETRIES) => {
  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Mongo connection has been made");
  } catch (error) {
    if (retriesLeft <= 0) {
      console.log("Mongo connection error, no retries left:", error.message);
      throw error;
    }
    console.log(
      `Mongo connection error, retrying in ${RETRY_DELAY_MS}ms (${retriesLeft} intentos restantes):`,
      error.message
    );
    await wait(RETRY_DELAY_MS);
    return connect(retriesLeft - 1);
  }
};

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection lost");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongo connection restored");
});

const disconnect = async () => {
  await mongoose.disconnect();
  console.log("Mongo connection disconnected");
};

export default {
  connect,
  disconnect,
};
