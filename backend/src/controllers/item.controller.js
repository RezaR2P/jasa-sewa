import ItemModel from '../models/item.model.js';

export const getItems = async (req, res) => {
  try {
    const items = await ItemModel.getAll();
    res.json({
      succes: true,
      message: 'Berhasil Mengambil Data Barang',
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: 'Terjadi kesalahan di server',
    });
  }
};
