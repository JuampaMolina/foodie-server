import MenuItem from '../models/menuItem.js'

export const getItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        console.log(menuItems);

        res.status(200).json(menuItems);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
} 