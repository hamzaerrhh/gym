import mongoose from "mongoose";

const CoachSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    bio: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);
const Coach = mongoose.models.Coach || mongoose.model("coachs", CoachSchema);

export default Coach;
