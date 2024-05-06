import mongoose from "mongoose";

const TestSchema = mongoose.Schema({
  total: { type: String, enum: [""] },
  prix: {},
});
