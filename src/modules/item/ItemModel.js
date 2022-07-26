import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { versionKey: false }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
