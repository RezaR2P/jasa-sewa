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
    let total_price = 0;
    const { user_id, rent_start, rent_end, items } = req.body;
    console.log(req.body);
    const start = new Date(rent_start);
    const end = new Date(rent_end);
    const day = 1000 * 60 * 60 * 24;
    const jumlah_hari = (end - start) / day;

    for (const item of items) {
      total_price += item.quantity * item.price_per_day * jumlah_hari;
    }
    const order = await OrderModel.create(
      user_id,
      rent_start,
      rent_end,
      total_price,
      items
    );
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
