import ItemModel from '../models/item.model.js';

export const getItems = async (req, res) => {
  try {
    const items = await ItemModel.getAll();
    res.json({
      success: true,
      message: 'Berhasil Mengambil Data Barang',
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan di server',
    });
  }
};

export const getItemsById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await ItemModel.getById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Data Tidak Di Temukan',
      });
    }
    res.json({
      success: true,
      messsage: 'Berhasil Mengambil Data Barang By ID',
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan di server',
    });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, description, price_per_day, stock, image_url } = req.body;
    const item = await ItemModel.create(
      name,
      description,
      price_per_day,
      stock,
      image_url
    );
    res.json({
      success: true,
      message: 'Berhasil Membuat Barang',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kesalahan Server',
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price_per_day, stock, image_url } = req.body;

    const item = await ItemModel.update(
      name,
      description,
      price_per_day,
      stock,
      image_url,
      id
    );
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Daftar Barang Berhasil Di Update',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kesalahan Server',
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await ItemModel.delete(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Data Berhasil Di Hapus',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kesalahan Server',
    });
  }
};
