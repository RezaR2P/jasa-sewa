import { body } from 'express-validator';
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
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Nama Tidak Boleh Kosong'),
    body('price_per_day')
      .notEmpty()
      .withMessage('Harga Tidak Boleh Kosong')
      .bail()
      .isNumeric()
      .withMessage('Harus angka tidak boleh huruf'),
    body('stock')
      .notEmpty()
      .withMessage('Stock Tidak Boleh Kosong')
      .bail()
      .isNumeric()
      .withMessage('Harus angka tidak boleh huruf'),
  ],
  createItem
);
// Update data barang
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Nama Tidak Boleh Kosong'),
    body('price_per_day')
      .notEmpty()
      .withMessage('Harga Tidak Boleh Kosong')
      .bail()
      .isNumeric()
      .withMessage('Harus angka tidak boleh huruf'),
    body('stock')
      .notEmpty()
      .withMessage('Stock Tidak Boleh Kosong')
      .bail()
      .isNumeric()
      .withMessage('Harus angka tidak boleh huruf'),
  ],
  updateItem
);
// Delete data barang
router.delete('/:id', deleteItem);

export default router;
