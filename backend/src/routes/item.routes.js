import { Router } from 'express';
import {
  getItems,
  getItemsById,
  createItem,
} from '../controllers/item.controller.js';

const router = Router();

// get all data items
router.get('/', getItems);
// get by id data items
router.get('/:id', getItemsById);
// Create data barang
router.post('/', createItem);

export default router;
