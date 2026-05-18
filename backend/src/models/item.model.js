import db from '../config/db.js';

const ItemModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM items');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);
    return rows;
  },
  create: async (name, description, price_per_day, stock, image_url) => {
    const [rows] = await db.execute(
      'INSERT INTO items (name, description, price_per_day, stock, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price_per_day, stock, image_url]
    );
  },
  update: async (name, description, price_per_day, stock, image_url, id) => {
    const [rows] = await db.execute(
      'UPDATE items SET name=?, description=?, price_per_day=?, stock=?, image_url=? WHERE id = ?',
      [name, description, price_per_day, stock, image_url, id]
    );
  },
};

export default ItemModel;
