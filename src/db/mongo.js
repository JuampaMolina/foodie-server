import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connect = async (retriesLeft = MAX_RETRIES) => {
  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    logger.info("Mongo connection has been made");
  } catch (error) {
    if (retriesLeft <= 0) {
      logger.error({ err: error }, "Mongo connection error, no retries left");
      throw error;
    }
    logger.warn(
      { err: error, retriesLeft },
      `Mongo connection error, retrying in ${RETRY_DELAY_MS}ms`
    );
    await wait(RETRY_DELAY_MS);
    return connect(retriesLeft - 1);
  }
};

mongoose.connection.on("error", (error) => {
  logger.error({ err: error }, "Mongo connection error");
});

mongoose.connection.on("disconnected", () => {
  logger.warn("Mongo connection lost");
});

mongoose.connection.on("reconnected", () => {
  logger.info("Mongo connection restored");
});

const disconnect = async () => {
  await mongoose.disconnect();
  logger.info("Mongo connection disconnected");
};

export default {
  connect,
  disconnect,
};
