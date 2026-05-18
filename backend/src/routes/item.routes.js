import { Router } from 'express';
import {
  getItems,
  getItemsById,
  createItem,
  updateItem,
} from '../controllers/item.controller.js';

const router = Router();

// get all data items
router.get('/', getItems);
// get by id data items
router.get('/:id', getItemsById);
// Create data barang
router.post('/', createItem);
// Update data barang
router.put('/:id', updateItem);

export default router;
