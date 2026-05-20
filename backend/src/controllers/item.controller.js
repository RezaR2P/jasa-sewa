import { validationResult } from 'express-validator';
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
    console.log(error);
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
      message: 'Berhasil Mengambil Data Barang By ID',
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
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { name, description, price_per_day, stock, image_url } = req.body;
    const item = await ItemModel.create(
      name,
      description,
      price_per_day,
      stock,
      image_url
    );
    res.status(201).json({
      success: true,
      message: 'Berhasil Membuat Barang',
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Kesalahan Server',
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const { name, description, price_per_day, stock, image_url } = req.body;

    const updated = await ItemModel.update(
      name,
      description,
      price_per_day,
      stock,
      image_url,
      id
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      });
    }
    const item = await ItemModel.getById(id);

    res.json({
      success: true,
      message: 'Daftar Barang Berhasil Di Update',
      data: item,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Kesalahan Server',
    });
  }
};
