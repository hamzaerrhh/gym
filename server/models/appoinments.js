import mongoose from "mongoose";

const AppoinementSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    clientNumber: { type: String, required: true },
    appointmentType: {
      type: String,
      enum: ["Spa", "Massage", "Kenie"],
      required: true,
    },
    reservationTime: { type: Date, required: true },
  },
  {
    timestamp: true,
  }
);
const Coach = mongoose.models.Coach || mongoose.model("coachs", CoachSchema);

export default Coach;
