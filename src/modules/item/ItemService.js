import Item from "./ItemModel.js";
import Category from "../category/CategoryModel.js";

export default (function () {
  const getAll = async () => {
    try {
      const items = await Item.find().populate("category");
      return items;
    } catch (error) {
      throw error;
    }
  };

  const getById = async (id) => {
    try {
      const item = await Item.findById(id);
      if (!item) {
        throw new Error("El item no existe");
      }
      return item.populate("category");
    } catch (error) {
      throw error;
    }
  };

  const getItemsByCategoryId = async (categoryId) => {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("La categoría no existe");
      }

      const items = await Item.find({ category: categoryId }).populate(
        "category"
      );
      return items;
    } catch (error) {
      throw error;
    }
  };

  const create = async (data) => {
    try {
      const category = await Category.findById(data.category);
      if (!category) {
        throw new Error("La categoría no existe");
      }

      const item = await Item.create(data);
      if (!item) {
        throw new Error("No se ha podido crear el item");
      }
      return item.populate("category");
    } catch (error) {
      throw error;
    }
  };

  const update = async (id, data) => {
    try {
      const category = await Category.findById(data.category);
      if (!category) {
        throw new Error("La categoría no existe");
      }

      const item = await Item.findById(id);
      if (!item) {
        throw new Error("El item no existe");
      }

      const modifiedItem = await Item.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!modifiedItem) {
        throw new Error("No se ha podido actualizar el item");
      }
      return modifiedItem.populate("category");
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        throw new Error("No se ha podido eliminar el item");
      }
      return item;
    } catch (error) {
      throw error;
    }
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
