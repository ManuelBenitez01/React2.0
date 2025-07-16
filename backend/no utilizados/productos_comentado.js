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
 * Obtiene la lista completa de productos con sus categorías
 * Respuesta: { success: true, data: [...productos], message: string }
 */
router.get('/', ProductoController.getAll);

/**
 * GET /api/productos/:id
 * Obtiene un producto específico por su ID
 * Parámetros: id (número entero positivo)
 * Respuesta: { success: true, data: producto, message: string }
 * Errores: 400 (ID inválido), 404 (no encontrado)
 */
router.get('/:id', ProductoController.getById);

/**
 * POST /api/productos
 * Crea un nuevo producto con validación completa
 * Body requerido: {
 *   id: number,           // ID único del producto
 *   nombre: string,       // Nombre (1-255 caracteres)
 *   precio: number,       // Precio positivo
 *   imagen?: string,      // URL o ruta de imagen (opcional)
 *   descripcion?: string, // Descripción (opcional)
 *   categorias?: number[],// Array de IDs de categorías (opcional)
 *   stock?: boolean,      // Estado de stock (default: true)
 *   cantidad_stock?: number // Cantidad disponible (default: 0)
 * }
 * Respuesta: { success: true, data: producto_creado, message: string }
 * Errores: 400 (datos inválidos), 409 (ID duplicado)
 */
router.post('/', ProductoController.create);

/**
 * PUT /api/productos/:id
 * Actualiza un producto existente (actualización parcial)
 * Parámetros: id (número del producto a actualizar)
 * Body (todos opcionales): {
 *   nombre?: string,
 *   precio?: number,
 *   imagen?: string,
 *   descripcion?: string,
 *   categorias?: number[],
 *   stock?: boolean,
 *   cantidad_stock?: number
 * }
 * Respuesta: { success: true, data: producto_actualizado, message: string }
 * Errores: 400 (datos inválidos), 404 (producto no encontrado)
 */
router.put('/:id', ProductoController.update);

/**
 * DELETE /api/productos/:id
 * Elimina un producto y todas sus relaciones con categorías
 * Parámetros: id (número del producto a eliminar)
 * Respuesta: { success: true, message: string }
 * Errores: 400 (ID inválido), 404 (producto no encontrado)
 */
router.delete('/:id', ProductoController.delete);

module.exports = router;

/*
 * 💡 CARACTERÍSTICAS DE ESTAS RUTAS:
 * 
 * 1. **RESTful**: Siguen las convenciones REST estándar
 *    - GET para lectura
 *    - POST para creación
 *    - PUT para actualización
 *    - DELETE para eliminación
 * 
 * 2. **Validación automática**: Zod valida todos los datos antes de procesarlos
 * 
 * 3. **Respuestas consistentes**: Todas las respuestas tienen el formato:
 *    { success: boolean, data?: any, message: string, errors?: array }
 * 
 * 4. **Manejo de errores**: Códigos HTTP apropiados para cada situación
 * 
 * 5. **Transacciones**: Las operaciones que afectan múltiples tablas usan transacciones
 * 
 * 🎯 EJEMPLOS DE PETICIONES:
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
 *   -d '{
 *     "id": 124,
 *     "nombre": "Salmón Fresco",
 *     "precio": 25.99,
 *     "imagen": "/salmon.jpg",
 *     "descripcion": "Salmón fresco del Atlántico",
 *     "categorias": [1, 3],
 *     "stock": true,
 *     "cantidad_stock": 15
 *   }'
 * 
 * # Actualizar solo el precio
 * curl -X PUT http://localhost:3000/api/productos/124 \
 *   -H "Content-Type: application/json" \
 *   -d '{"precio": 22.99}'
 * 
 * # Eliminar producto
 * curl -X DELETE http://localhost:3000/api/productos/124
 * ```
 */
