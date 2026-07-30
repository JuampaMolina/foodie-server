import Category from "./CategoryModel.js";
import Item from "../item/ItemModel.js";

export default (function () {
  const getAll = async () => {
    const categories = await Category.find();
    return categories;
  };

  const getById = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Categoría no encontrada");
    }
    return category;
  };

  const create = async (data) => {
    const category = await Category.create(data);
    if (!category) {
      throw new Error("No se ha podido crear la categoría");
    }
    return category;
  };

  const update = async (id, data) => {
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!category) {
      throw new Error("La categoría no existe");
    }

    return category;
  };

  const remove = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error("No se ha podido eliminar la categoría");
    }

    await Item.updateMany({ category: id }, { category: undefined });

    return category;
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
})();
