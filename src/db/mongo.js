import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default {
  connect: async () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection
      .once("open", () => console.log("Mongo connection has been made"))
      .on("error", (error) => console.log("Mongo connection error", error))
      .on("disconnected", () => console.log("Mongo connection disconnected"));
  },
  disconnect: async (done) => {
    mongoose.disconnect(done);
  },
};
