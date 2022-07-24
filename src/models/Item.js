import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        name: String
    },
}, {versionKey: false});

const Item = mongoose.model('Item', itemSchema);

export default Item;