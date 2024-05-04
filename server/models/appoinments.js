import mongoose from "mongoose";

const AppoinementSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    clientNumber: { type: Number, required: true },
    appointmentType: {
      type: String,
      enum: ["Spa", "Massage", "Kenie"],
      required: true,
    },
    reservationTime: { type: Date, required: true },
    validation: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);
const Appoinement =
  mongoose.models.Coach || Appoinement.model("appoinements", AppoinementSchema);

export default Coach;
