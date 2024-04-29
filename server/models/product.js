import mongoose from "mongoose";

const prodyctShema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    prix: { type: Number, require: true },
    image: {
      type: Array(String),
      require: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.model.Product || mongoose.model("Products", prodyctShema);

export default Product;
