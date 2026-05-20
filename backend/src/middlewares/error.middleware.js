export const errorHandler = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || 'Terjadi Kesalahan Di Server';

  res.status(status).json({
    success: false,
    message,
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
};
