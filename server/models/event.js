import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  title: { type: String, require: true },
  descreption: { type: String, require: true },
  dateTimeStarted: { type: Date, require: true },
  dateTimeEnd: { type: Number, require: true },
  localisation: { type: String, require: true },
});
const Event = mongoose.model.Event || mongoose.model("events", EventSchema);
export default Event;
