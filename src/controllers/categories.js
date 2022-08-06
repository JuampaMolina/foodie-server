import Category from "../models/Category.js";
import Item from "../models/Item.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getCategoryByName = async (req, res) => {
//   const reqCategory = req.body;
//   console.log(reqCategory);
//   const category = await Category.findOne(reqCategory);
//   console.log(category);
//   return category;
//   //   try {
//   //     const category = await Category.findOne(reqCategory);
//   //     res.status(200).json(categories);
//   //   } catch (error) {
//   //     res.status(404).json({ message: error.message });
//   //   }
// };

export const createCategory = async (req, res) => {
  // todo: comprobar si ya existe la categoría
  // todo: convertir nombre a uppercase
  //   const categoryWithName = await getCategoryByName(category);
  //   if (categoryWithName !== null) {
  //     throw new Error(`Ya existe una categoría con el nombre ${category.name}`);
  //   }
  const category = req.body;
  const newCategory = new Category(category);
  try {
    const insertedCategory = await Category.create(newCategory);
    res.status(200).json(insertedCategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
