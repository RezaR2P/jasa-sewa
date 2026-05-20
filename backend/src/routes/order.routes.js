import { Router } from 'express';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
} from '../controllers/order.controller.js';
import { body } from 'express-validator';
const router = Router();

router.get('/', getOrders);
router.post(
  '/',
  [
    body('user_id')
      .notEmpty()
      .withMessage('User id tidak boleh kosong')
      .bail()
      .isNumeric()
      .withMessage('User id Harus Angka'),
    body('rent_start')
      .notEmpty()
      .withMessage('Tanggal Harus di isi')
      .bail()
      .isDate()
      .withMessage('Format Tanggal tidak Valid'),
    body('rent_end').custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.rent_start)) {
        throw new Error('Tanggal Selesai Harus lebih dari tanggal mulai');
      }
      return true;
    }),
    body('items').isArray({ min: 1 }).withMessage('Item Tidak Boleh kosong'),
    body('items.*.item_id')
      .notEmpty()
      .withMessage('Item id Tidak boleh kosong')
      .bail()
      .isNumeric()
      .withMessage('Item id harus angka'),
    body('items.*.quantity')
      .notEmpty()
      .withMessage('Quantity wajib di isi')
      .bail()
      .isInt({ min: 1 })
      .withMessage('Quantity Minimal 1'),
    body('items.*.price_per_day')
      .notEmpty()
      .withMessage('Wajib di isi tidak boleh kosong')
      .bail()
      .isNumeric()
      .withMessage('Price per day harus angka'),
  ],
  createOrder
);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrder);

export default router;
