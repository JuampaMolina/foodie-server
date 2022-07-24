import express from 'express';

import {getItems, createItem, getItemsByCategoryId, addCategoryToItem} from '../controllers/items.js'


const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.get('/category/:id', getItemsByCategoryId);
router.put('/category', addCategoryToItem);

export default router;