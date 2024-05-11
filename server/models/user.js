import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
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
    number: Number,
    imageProfile: String,
    virified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    forgetToken: String,
    role: {
      type: String,
      enum: ["user", "admin", "coach"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("users", userSchema);

export default User;
