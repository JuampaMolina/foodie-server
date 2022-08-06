import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

// todo: cuando borro una categoría se debería de quitar de los items que la tenían
// https://mongoosejs.com/docs/middleware.html

const Category = mongoose.model("Category", categorySchema);

export default Category;
