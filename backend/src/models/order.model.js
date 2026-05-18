import db from '../config/db.js';

const OrderModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM orders');
    return rows;
  },
  create: async (user_id, rent_start, rent_end, total_price, items) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const [order] = await conn.execute(
        'INSERT INTO orders (user_id, rent_start, rent_end, total_price) VALUES (?,?,?,?)',
        [user_id, rent_start, rent_end, total_price]
      );

      const order_id = order.insertId;
      for (const item of items) {
        await conn.execute(
          'INSERT INTO order_items (order_id, item_id, quantity, price_per_day) VALUES (?,?,?,?)',
          [order_id, item.item_id, item.quantity, item.price_per_day]
        );
      }

      await conn.commit();
      return order_id;
    } catch (error) {
      await conn.rollback;
      throw error;
    } finally {
      conn.release();
    }
  },
};

export default OrderModel;
