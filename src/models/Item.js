import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number
}, {versionKey: false});

const Item = mongoose.model('Item', itemSchema);

export default Item;