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
  getById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE orders.id = ?',
      [id]
    );
    const order = rows[0];
    return {
      id: order.order_id,
      user_id: order.user_id,
      rent_start: order.rent_start,
      rent_end: order.rent_end,
      total_price: order.total_price,
      status: order.status,
      items: rows.map((row) => ({
        item_id: row.item_id,
        quantity: row.quantity,
        price_per_day: row.price_per_day,
      })),
    };
  },
  updateStatus: async (status, id) => {
    const [order] = await db.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return order.affectedRows > 0;
  },
};

export default OrderModel;
