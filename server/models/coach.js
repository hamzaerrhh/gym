import mongoose from "mongoose";

const CoachSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    info: {
      type: {
        firstName: { type: String },
        lastName: { type: String },
        number: { type: Number },
        sport: { type: String },
        description: { type: String },
      },
    },
    post: {
      type: {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    },
    appointments: [
      {
        time: { type: Date, required: true },
        client: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
        info: {
          number: { type: Number },
          object: { type: String },
        },
      },
    ],
    timeline: [
      {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        status: { type: String, enum: ["busy", "free"], default: "free" },
      },
    ],

    subscription: {
      client: { type: mongoose.Schema.Types.ObjectId, ref: "clients" },
      status: { type: String, enum: ["active", "inactive"] },
      duration: { type: String, enum: ["1 month", "6 months", "1 year"] },
      startDate: Date,
      endDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Coach = mongoose.models.Coach || mongoose.model("coaches", CoachSchema);

export default Coach;
