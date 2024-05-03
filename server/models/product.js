import mongoose from "mongoose";

const prodyctShema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    prix: { type: Number, require: true },
    category: {
      type: Array(String),
      require: true,
    },
    stock: Number,
    rate: {
      type: Number,
      default: 0,
    },

    nbrOfRate: {
      type: Number,
      default: 0,
    },
    nbrOfOrder: {
      type: Number,
      default: 0,
    },
    mainImage: String,
    images: [{ type: String }],
    comments: {
      type: {
        comentaire: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          require: true,
        },
      },
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.model.Product || mongoose.model("Products", prodyctShema);

export default Product;
