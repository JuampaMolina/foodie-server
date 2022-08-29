import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
