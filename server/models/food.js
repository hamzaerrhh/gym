import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    info: {
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
    },
    mainImage: { type: String, required: true },

    order: { type: Number, default: 0 },
    favorite: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Food = mongoose.model.Food || mongoose.model("Food", foodSchema); // Corrected model name to "Food"
export default Food;
