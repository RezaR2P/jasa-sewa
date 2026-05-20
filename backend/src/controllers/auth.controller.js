import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, phone } = req.body;

    // cek apakah sudah terdaftar
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email Sudah Terdaftar',
      });
    }

    // enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    const id = await UserModel.create(name, email, hashedPassword, phone);
    res.status(201).json({
      success: true,
      message: 'User berhasil di buat',
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan di server',
    });
  }
};
