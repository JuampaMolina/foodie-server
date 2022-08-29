import Category from "../models/Category.js";
import Item from "../models/Item.js";

export async function getAll() {
  try {
    const items = await Item.find().populate("category");
    return items;
  } catch (error) {
    throw error;
  }
}

export async function getById(id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      throw new Error("Item no encontrado");
    }
    return item.populate("category");
  } catch (error) {
    throw error;
  }
}

export async function getItemsByCategoryId(categoryId) {
  try {
    const items = await Item.find({ category: categoryId }).populate(
      "category"
    );
    return items;
  } catch (error) {
    throw error;
  }
}

export async function create(data) {
  try {
    const item = await Item.create(data);
    if (!item) {
      throw new Error("No se ha podido crear el item");
    }
    return item.populate("category");
  } catch (error) {
    throw error;
  }
}

export async function update(id, data) {
  try {
    const item = await Item.findByIdAndUpdate(id, data, { new: true });
    if (!item) {
      throw new Error("No se ha podido actualizar el item");
    }
    return item.populate("category");
  } catch (error) {
    throw error;
  }
}

export async function remove(id) {
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      throw new Error("No se ha podido eliminar el item");
    }
    return item;
  } catch (error) {
    throw error;
  }
}
