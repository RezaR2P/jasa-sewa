import { Router } from 'express';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
} from '../controllers/order.controller.js';
const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrder);

export default router;
