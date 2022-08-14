import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
