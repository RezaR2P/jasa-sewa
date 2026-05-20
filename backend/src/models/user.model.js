import db from '../config/db.js';

const UserModel = {
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? ', [
      email,
    ]);
    return rows.length > 0 ? rows[0] : null;
  },
  create: async (name, email, password, phone) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ? ,?, ?)',
      [name, email, password, phone]
    );
    return result.insertId;
  },
};

export default UserModel;
