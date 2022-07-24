import Category from '../models/Category.js';
import Item from '../models/Item.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category);

    try {
        const insertedCategory = await Category.create(newCategory);
        res.status(200).json(insertedCategory);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}