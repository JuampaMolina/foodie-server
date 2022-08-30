import Category from "../models/Category.js";
import Item from "../models/Item.js";

export default (function () {
  const getAll = async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw error;
    }
  };

  const getById = async (id) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error("Categoría no encontrada");
      }
      return category;
    } catch (error) {
      throw error;
    }
  };

  const create = async (data) => {
    try {
      const category = await Category.create(data);
      if (!category) {
        throw new Error("No se ha podido crear la categoría");
      }
      return category;
    } catch (error) {
      throw error;
    }
  };

  const update = async (id, data) => {
    try {
      const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!category) {
        throw new Error("No se ha podido actualizar la categoría");
      }

      return category;
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        throw new Error("No se ha podido eliminar la categoría");
      }

      await Item.updateMany({ category: id }, { category: undefined });

      return category;
    } catch (error) {
      throw error;
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
})();
