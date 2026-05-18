import db from '../config/db.js';

const ItemModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM items');
    return rows;
  },
};

export default ItemModel;
