import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default {
  connect: async () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection
      .once("open", () => console.log("Connection has been made"))
      .on("error", (error) => console.log("Connect error", error))
      .on("disconnected", () => console.log("Connection disconnected"));
  },
  disconnect: async (done) => {
    mongoose.disconnect(done);
  },
};
