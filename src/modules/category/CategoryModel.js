import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
