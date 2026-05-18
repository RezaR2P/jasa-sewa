import db from '../config/db.js';

const ItemModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM items');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  },
  create: async (name, description, price_per_day, stock, image_url) => {
    const [result] = await db.execute(
      'INSERT INTO items (name, description, price_per_day, stock, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price_per_day, stock, image_url]
    );
    return result.insertId;
  },
  update: async (name, description, price_per_day, stock, image_url, id) => {
    const [result] = await db.execute(
      'UPDATE items SET name=?, description=?, price_per_day=?, stock=?, image_url=? WHERE id = ?',
      [name, description, price_per_day, stock, image_url, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default ItemModel;
