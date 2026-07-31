import Item from "./ItemModel.js";
import Category from "../category/CategoryModel.js";
import paginate from "../../utils/paginate.js";

export default (function () {
  const getAll = async (pagination) => {
    return paginate(Item, Item.find().populate("category"), pagination);
  };

  const getById = async (id) => {
    const item = await Item.findById(id);
    if (!item) {
      throw new Error("El item no existe");
    }
    return item.populate("category");
  };

  const getItemsByCategoryId = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("La categoría no existe");
    }

    const items = await Item.find({ category: categoryId }).populate(
      "category"
    );
    return items;
  };

  const create = async (data) => {
    const category = await Category.findById(data.category);
    if (!category) {
      throw new Error("La categoría no existe");
    }

    const item = await Item.create(data);
    if (!item) {
      throw new Error("No se ha podido crear el item");
    }
    return item.populate("category");
  };

  const update = async (id, data) => {
    const category = await Category.findById(data.category);
    if (!category) {
      throw new Error("La categoría no existe");
    }

    const modifiedItem = await Item.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!modifiedItem) {
      throw new Error("El item no existe");
    }
    return modifiedItem.populate("category");
  };

  const remove = async (id) => {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      throw new Error("No se ha podido eliminar el item");
    }
    return item;
  };

  return {
    getAll,
    getById,
    getItemsByCategoryId,
    create,
    update,
    remove,
  };
})();
