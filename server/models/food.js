import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  prix: { type: Number, require: true },
  description: { type: String },
  info: {
    protien: { Type: Number, require: true },
    carbs: { type: Number, require: true },
    fat: { type: Number, require: true },
  },
});

const Food = mongoose.model.Food || mongoose.model("foods", foodSchema);
export default Food;
