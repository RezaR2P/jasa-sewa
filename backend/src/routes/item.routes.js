import { Router } from 'express';
import { getItems, getItemsById } from '../controllers/item.controller.js';

const router = Router();

// get all data items
router.get('/', getItems);
// get by id data items
router.get('/:id', getItemsById);

export default router;
