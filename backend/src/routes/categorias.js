const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const router = express.Router();

// Rutas para categorías
router.get('/', CategoriaController.getAll);
router.get('/:id', CategoriaController.getById);
router.post('/', CategoriaController.create);
router.put('/:id', CategoriaController.update);
router.delete('/:id', CategoriaController.delete);

// Ruta para obtener productos de una categoría
router.get('/:id/productos', CategoriaController.getProductos);

module.exports = router;
