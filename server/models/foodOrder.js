import mongoose from "mongoose";

const FoodOrderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order: [
      {
        food_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    info: {
      numberUrg: Number,
      adress: String,
      city: String,
      email: String,
      zip: String,
      name: String,
      lastName: String,
      phone: String,
    },
    pay_methode: {
      type: String,
      enum: ["cart", "homme delevery"],
      default: "homme delevery",
    },
  },
  {
    timestamps: true,
  }
);

const OrderFood =
  mongoose.models.OrderFood || mongoose.model("orders_food", FoodOrderSchema);

export default OrderFood;
