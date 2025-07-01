const express = require('express');
const ProductoController = require('../controllers/ProductoController');

const router = express.Router();

// Rutas para productos
router.get('/', ProductoController.getAll);
router.get('/:id', ProductoController.getById);
router.post('/', ProductoController.create);
router.put('/:id', ProductoController.update);
router.delete('/:id', ProductoController.delete);

// Rutas para categorías de productos
router.get('/:id/categorias', ProductoController.getCategorias);
router.put('/:id/categorias', ProductoController.updateCategorias);

module.exports = router;
