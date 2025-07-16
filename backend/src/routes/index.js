const express = require('express');
const { pool } = require('../config/database');
const productosRoutes = require('./productos');
const categoriasRoutes = require('./categorias');
const imagesRoutes = require('./images');
const createAuthRoutes = require('./auth');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Ruta de salud de la API
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas de autenticación (públicas)
router.use('/auth', createAuthRoutes(pool));

// Rutas públicas (solo lectura)
router.use('/productos', productosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/images', imagesRoutes);

// Aplicar middleware de autenticación a todas las rutas administrativas
// Las rutas protegidas son las que modifican datos (POST, PUT, DELETE)

module.exports = router;
