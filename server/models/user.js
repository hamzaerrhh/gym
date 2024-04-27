import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    imageProfile: String,
    virified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    forgetToken: String,
    rule: {
      type: String,
      enum: ["user", "admin", "cotch"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
