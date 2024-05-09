import mongoose from "mongoose";

const ClubSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    timeline: {
      type: [{ day: String, startTime: String, endTime: String }],
    },
    prix: {
      type: {
        oneMonth: Number,
        threeMonths: Number,
        sixMonths: Number,
        oneYear: Number,
      },
    },
    category: { type: String, enum: ["kids", "women", "man", "mix"] },
    sport: { type: String },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model.Club || mongoose.model("clubs", ClubSchema);
export default Club;
