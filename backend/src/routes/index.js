const express = require('express');
const productosRoutes = require('./productos');
const categoriasRoutes = require('./categorias');

const router = express.Router();

// Ruta de salud de la API
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas principales
router.use('/productos', productosRoutes);
router.use('/categorias', categoriasRoutes);

module.exports = router;
