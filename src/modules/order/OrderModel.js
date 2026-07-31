import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    totalPrice: Number,
    date: Date,
    address: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        _id: false,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { versionKey: false }
);

const order = mongoose.model("order", orderSchema);

export default order;
