import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  plan_name: String,
  duration_options: [
    {
      duration_months: Number,
      price: Number,
    },
  ],
  description: String,
});
const Subscription =
  mongoose.model.Subscription ||
  mongoose.model("subscriptions", subscriptionSchema);
export default Subscription;
