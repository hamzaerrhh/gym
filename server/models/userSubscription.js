import mongoose from "mongoose";

const UserSubscribeSchema = mongoose.model({
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscriptions",
  },
  start_date: Date,
  end_date: Date,
});
const UserSubscribe =
  mongoose.model.UserSubscribe ||
  mongoose.model.apply("userSubscription", UserSubscribeSchema);
export default UserSubscribe;
