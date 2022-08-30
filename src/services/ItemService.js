import Item from "../models/Item.js";

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
        throw new Error("Item no encontrado");
      }
      return item.populate("category");
    } catch (error) {
      throw error;
    }
  };

  const getItemsByCategoryId = async (categoryId) => {
    try {
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
      const item = await Item.findByIdAndUpdate(id, data, { new: true });
      if (!item) {
        throw new Error("No se ha podido actualizar el item");
      }
      return item.populate("category");
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
