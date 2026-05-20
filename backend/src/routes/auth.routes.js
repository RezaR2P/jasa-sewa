import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Nama Tidak Boleh Kosong'),
    body('email')
      .notEmpty()
      .withMessage('Email Tidak Boleh Kosong')
      .bail()
      .isEmail()
      .withMessage('Format Email Tidak Valid Harus gunakan @'),
    body('password')
      .notEmpty()
      .withMessage('Password Tidak Boleh Kosong')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password Minimal 8 karakter'),
    body('phone').notEmpty().withMessage('Nomor HP Wajib Di isi'),
  ],
  register
);

export default router;
