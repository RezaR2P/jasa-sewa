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
};

export default ItemModel;
