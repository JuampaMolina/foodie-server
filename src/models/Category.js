import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

// https://mongoosejs.com/docs/middleware.html

const Category = mongoose.model("Category", categorySchema);

export default Category;
