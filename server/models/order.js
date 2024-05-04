import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    info: {
      number: Number,
      adress: String,
    },
  },
  {
    Timestamp,
  }
);

const Order = mongoose.models.Order || mongoose.model("orders", OrderSchema);

export default Order;
