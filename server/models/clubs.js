import mongoose from "mongoose";

const ClubSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, require: true },
  subImages: { type: [String] },
  timeline: {
    type: [
      {
        start: Date,
        end: Date,
      },
    ],
  },
  prix: {
    type: {
      oneMonth: Number,
      threeMonths: Number,
      sixMonths: Number,
      oneYear: Number,
    },
  },
});

const Club = mongoose.model.Club || mongoose.model("clubs", ClubSchema);
export default Club;
