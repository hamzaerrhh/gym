import mongoose from "mongoose";

const AppoinementSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    info: {
      type: {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        lastName: String,
      },
    },
    appointmentType: {
      type: String,
      enum: ["spa", "massage", "kenie"],
      required: true,
    },
    reservationTime: { type: Date, required: true },
    validation: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Appoinement =
  mongoose.models.Appoinement ||
  mongoose.model("appoinements", AppoinementSchema);

export default Appoinement;
