const express = require('express');
const ProductoController = require('../controllers/ProductoController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Rutas públicas (solo lectura)
router.get('/', ProductoController.getAll);
router.get('/:id', ProductoController.getById);
router.get('/:id/categorias', ProductoController.getCategorias);

// Rutas protegidas (requieren autenticación de administrador)
router.post('/', authenticateToken(pool), requireAdmin, ProductoController.create);
router.put('/:id', authenticateToken(pool), requireAdmin, ProductoController.update);
router.delete('/:id', authenticateToken(pool), requireAdmin, ProductoController.delete);
router.put('/:id/categorias', authenticateToken(pool), requireAdmin, ProductoController.updateCategorias);

module.exports = router;
