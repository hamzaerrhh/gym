import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    descreption: { type: String, required: true },
    dateTimeStarted: { type: Date, required: true },
    dateTimeEnd: { type: Date, required: true },
    ingrediens: { type: String, required: true },
    localisation: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
const Event = mongoose.model.Event || mongoose.model("events", EventSchema);
export default Event;
