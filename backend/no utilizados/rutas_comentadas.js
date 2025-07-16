/*
 * 🛣️ RUTAS PRINCIPALES (routes/index.js)
 * 
 * Este archivo actúa como el enrutador principal que organiza
 * todas las rutas de la API en módulos separados.
 */

const express = require('express');
const productosRoutes = require('./productos');    // Rutas de productos
const categoriasRoutes = require('./categorias');  // Rutas de categorías

const router = express.Router();

// ================================
// 🏥 RUTA DE SALUD DE LA API
// ================================

/**
 * GET /api/health
 * Endpoint para verificar que la API esté funcionando
 * Útil para monitoreo y health checks
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()  // Timestamp para verificar respuesta fresca
  });
});

// ================================
// 📡 REGISTRO DE RUTAS MODULARES
// ================================

/**
 * Todas las rutas de productos estarán bajo /api/productos
 * Por ejemplo: /api/productos, /api/productos/:id, etc.
 */
router.use('/productos', productosRoutes);

/**
 * Todas las rutas de categorías estarán bajo /api/categorias
 * Por ejemplo: /api/categorias, /api/categorias/:id, etc.
 */
router.use('/categorias', categoriasRoutes);

// Exporta el router principal
module.exports = router;

/*
 * 💡 PATRÓN DE ORGANIZACIÓN:
 * 
 * 1. **Separación por recursos**: Cada entidad (productos, categorías) 
 *    tiene su propio archivo de rutas
 * 
 * 2. **Prefijos automáticos**: Al usar router.use('/productos', productosRoutes),
 *    todas las rutas en productosRoutes automáticamente tendrán el prefijo /productos
 * 
 * 3. **Escalabilidad**: Fácil agregar nuevos módulos de rutas
 * 
 * 4. **Health check**: Endpoint estándar para verificar estado de la API
 * 
 * 🌐 ESTRUCTURA FINAL DE URLs:
 * 
 * - GET  /api/health                    ← Definido aquí
 * - GET  /api/productos                 ← Delegado a productos.js
 * - POST /api/productos                 ← Delegado a productos.js
 * - GET  /api/productos/:id             ← Delegado a productos.js
 * - GET  /api/categorias                ← Delegado a categorias.js
 * - POST /api/categorias                ← Delegado a categorias.js
 * - etc...
 */

/*
 * 🛣️ RUTAS DE PRODUCTOS (routes/productos.js)
 * 
 * Define todas las rutas específicas para el manejo de productos.
 * Cada ruta delega la lógica al controlador correspondiente.
 */

const express = require('express');
const ProductoController = require('../controllers/ProductoController');

const router = express.Router();

// ================================
// 📋 RUTAS CRUD DE PRODUCTOS
// ================================

/**
 * GET /api/productos
 * Obtiene la lista completa de productos
 */
router.get('/', ProductoController.getAll);

/**
 * GET /api/productos/:id
 * Obtiene un producto específico por su ID
 */
router.get('/:id', ProductoController.getById);

/**
 * POST /api/productos
 * Crea un nuevo producto
 * Body: { id, nombre, precio, imagen?, descripcion?, categorias?, stock?, cantidad_stock? }
 */
router.post('/', ProductoController.create);

/**
 * PUT /api/productos/:id
 * Actualiza un producto existente (actualización parcial)
 * Body: { nombre?, precio?, imagen?, descripcion?, categorias?, stock?, cantidad_stock? }
 */
router.put('/:id', ProductoController.update);

/**
 * DELETE /api/productos/:id
 * Elimina un producto y sus relaciones con categorías
 */
router.delete('/:id', ProductoController.delete);

module.exports = router;

/*
 * 💡 PATRÓN DE DELEGACIÓN:
 * 
 * 1. **Rutas como conectores**: Las rutas solo conectan URLs con métodos de controlador
 * 2. **Sin lógica de negocio**: Toda la lógica está en los controladores
 * 3. **Reutilización**: Los controladores pueden usarse desde diferentes rutas
 * 4. **Claridad**: Fácil ver qué endpoints están disponibles
 * 
 * 🎯 EJEMPLOS DE USO:
 * 
 * ```bash
 * # Obtener todos los productos
 * curl GET http://localhost:3000/api/productos
 * 
 * # Obtener producto específico
 * curl GET http://localhost:3000/api/productos/123
 * 
 * # Crear nuevo producto
 * curl -X POST http://localhost:3000/api/productos \
 *   -H "Content-Type: application/json" \
 *   -d '{"id": 124, "nombre": "Nuevo Producto", "precio": 99.99}'
 * 
 * # Actualizar producto
 * curl -X PUT http://localhost:3000/api/productos/124 \
 *   -H "Content-Type: application/json" \
 *   -d '{"precio": 89.99}'
 * 
 * # Eliminar producto
 * curl -X DELETE http://localhost:3000/api/productos/124
 * ```
 */
