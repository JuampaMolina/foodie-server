import Item from '../models/Item.js'

export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        console.log(items);

        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
} 

export const createItem = async (req, res) => {
    const item = req.body

    const newItem = new Item(item)

    try {
        const insertedItem = await Item.create(newItem)
        console.log(insertedItem);

        res.status(200).json(insertedItem);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
} 