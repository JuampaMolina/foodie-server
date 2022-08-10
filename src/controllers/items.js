import Category from "../models/Category.js";
import Item from "../models/Item.js";

export const getItemsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  const items = await Item.find({ "category.id": categoryId });
  res.status(200).json(items);
};

export const addCategoryToItem = async (req, res) => {
  const { categoryId, itemId } = req.body;
  try {
    const category = await Category.findById(categoryId);
    if (!category) throw new Error("No se ha encontrado la categoría");

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        category: {
          id: category._id,
          name: category.name,
        },
      },
      { new: true }
    );
    if (!updatedItem) throw new Error("No se ha encontrado el artículo");
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
