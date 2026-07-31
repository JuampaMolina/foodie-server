import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    role: String,
    passwordHash: String,
    resetPasswordTokenHash: String,
    resetPasswordExpires: Date,
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
    delete returnedObject.resetPasswordTokenHash;
    delete returnedObject.resetPasswordExpires;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
