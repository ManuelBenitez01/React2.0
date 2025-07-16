const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Rutas públicas (solo lectura)
router.get('/', CategoriaController.getAll);
router.get('/:id', CategoriaController.getById);
router.get('/:id/productos', CategoriaController.getProductos);

// Rutas protegidas (requieren autenticación de administrador)
router.post('/', authenticateToken(pool), requireAdmin, CategoriaController.create);
router.put('/:id', authenticateToken(pool), requireAdmin, CategoriaController.update);
router.delete('/:id', authenticateToken(pool), requireAdmin, CategoriaController.delete);

module.exports = router;
