import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    totalPrice: Number,
    date: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { versionKey: false }
);

const order = mongoose.model("order", orderSchema);

export default order;
