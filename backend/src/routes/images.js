const express = require('express');
const multer = require('multer');
const ImageController = require('../controllers/ImageController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Configurar multer para manejar archivos en memoria
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 32 * 1024 * 1024, // 32MB máximo
    files: 1 // Solo un archivo por vez
  },
  fileFilter: (req, file, cb) => {
    // Tipos de archivo permitidos
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido. Solo se permiten imágenes.'), false);
    }
  }
});

// Middleware para manejar errores de multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Archivo demasiado grande. Máximo 32MB permitido.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Solo se permite subir un archivo por vez.'
      });
    }
  }
  
  if (err.message === 'Formato de archivo no válido. Solo se permiten imágenes.') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  next(err);
};

// Rutas públicas
router.get('/status', ImageController.getStatus);

// Rutas protegidas (requieren autenticación de administrador)
router.post('/upload', 
  authenticateToken(pool), 
  requireAdmin, 
  upload.single('file'), // Cambiado 'image' por 'file' para que coincida con el frontend
  handleMulterError,
  ImageController.uploadImage
);

module.exports = router;
