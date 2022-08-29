import Category from "../models/Category.js";
import Item from "../models/Item.js";

export async function getAll() {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw error;
  }
}

export async function getById(id) {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Categoría no encontrado");
    }
    return category;
  } catch (error) {
    throw error;
  }
}

export async function create(data) {
  try {
    const category = await Category.create(data);
    if (!category) {
      throw new Error("No se ha podido crear la categoría");
    }
    return category;
  } catch (error) {
    throw error;
  }
}

export async function update(id, data) {
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
}

export async function remove(id) {
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
}
