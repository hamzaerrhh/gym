import mongoose from "mongoose";
import cron from "node-cron";
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
      enum: ["user", "admin", "cotch"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
