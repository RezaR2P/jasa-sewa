import { Router } from 'express';
import {
  getItems,
  getItemsById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller.js';

const router = Router();

// get all data barang
router.get('/', getItems);
// get by id data barang
router.get('/:id', getItemsById);
// Create data barang
router.post('/', createItem);
// Update data barang
router.put('/:id', updateItem);
// Delete data barang
router.delete('/:id', deleteItem);

export default router;
