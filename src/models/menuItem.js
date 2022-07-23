import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number
});

const MenuItem = mongoose.model('MenuItem', itemSchema);

export default MenuItem;