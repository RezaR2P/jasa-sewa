import { validationResult } from 'express-validator';
import OrderModel from '../models/order.model.js';

export const getOrders = async (req, res) => {
  try {
    const order = await OrderModel.getAll();
    res.json({
      success: true,
      message: 'Berhasi Mengambil Data Order',
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi Kesalahan di server',
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { user_id, rent_start, rent_end, items } = req.body;
    let total_price = 0;
    const start = new Date(rent_start);
    const end = new Date(rent_end);
    const day = 1000 * 60 * 60 * 24;
    const jumlah_hari = (end - start) / day;
    for (const item of items) {
      total_price += item.quantity * item.price_per_day * jumlah_hari;
    }
    const created = await OrderModel.create(
      user_id,
      rent_start,
      rent_end,
      total_price,
      items
    );

    const order = await OrderModel.getById(created);
    res.status(201).json({
      success: true,
      message: 'Order Berhasil Di buat',
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi Kesalahan di server',
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await OrderModel.getById(id);
    if (!rows) {
      return res.status(404).json({
        success: false,
        message: 'Data Tidak Ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Berhasil Mendapatkan Data Order By Id',
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi Kesalahan di Server',
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const id = req.params.id;
    const { status } = req.body;
    console.log('id:', id);
    console.log('status:', status);
    const order = await OrderModel.updateStatus(status, id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: 'Data Tidak Ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Order Berhasil di Update',
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi Kesalahan di Server',
    });
  }
};
