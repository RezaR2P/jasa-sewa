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

export const getItemsById = async (req, res) => {
  try {
    const id = req.params.id;
    const items = await ItemModel.getById(id);
    res.json({
      succes: true,
      messsage: 'Berhasil Mengambil Data Barang By ID',
      data: items,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: 'Terjadi kesalahan di server',
    });
  }
};
