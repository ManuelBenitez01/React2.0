/*
 * 🎛️ CONTROLADOR DE PRODUCTOS (ProductoController.js)
 * 
 * Los controladores contienen la lógica de negocio de la aplicación.
 * Reciben las peticiones HTTP, validan datos, llaman a los modelos
 * y devuelven respuestas al cliente.
 */

const ProductoModel = require('../models/Producto');
const { createProductoSchema, updateProductoSchema, idParamSchema } = require('../schemas/validation');

class ProductoController {
  
  // ================================
  // 📋 OBTENER TODOS LOS PRODUCTOS
  // ================================
  
  /**
   * GET /api/productos
   * Devuelve la lista completa de productos con sus categorías
   */
  static async getAll(req, res) {
    try {
      // Llama al modelo para obtener todos los productos
      const productos = await ProductoModel.getAll();
      
      // Respuesta exitosa con formato estándar
      res.json({
        success: true,
        data: productos,
        message: 'Productos obtenidos correctamente'
      });
      
    } catch (error) {
      // Manejo de errores - log del error y respuesta al cliente
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // ================================
  // 🔍 OBTENER PRODUCTO POR ID
  // ================================
  
  /**
   * GET /api/productos/:id
   * Devuelve un producto específico por su ID
   */
  static async getById(req, res) {
    try {
      // Valida que el ID sea un número válido usando Zod
      const { id } = idParamSchema.parse(req.params);
      
      // Busca el producto en la base de datos
      const producto = await ProductoModel.getById(id);
      
      // Si no existe, devuelve 404
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      
      // Si existe, devuelve el producto
      res.json({
        success: true,
        data: producto,
        message: 'Producto obtenido correctamente'
      });
      
    } catch (error) {
      // Si es error de validación de Zod, devuelve 400
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
          errors: error.errors
        });
      }
      
      // Otros errores son 500
      console.error('Error al obtener producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // ================================
  // ➕ CREAR NUEVO PRODUCTO
  // ================================
  
  /**
   * POST /api/productos
   * Crea un nuevo producto con validación completa
   */
  static async create(req, res) {
    try {
      // Valida todos los datos del producto usando Zod
      const productoData = createProductoSchema.parse(req.body);
      
      // Verifica si ya existe un producto con ese ID
      const existingProduct = await ProductoModel.getById(productoData.id);
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un producto con ese ID'
        });
      }
      
      // Crea el producto en la base de datos
      const nuevoProducto = await ProductoModel.create(productoData);
      
      // Respuesta exitosa con status 201 (Created)
      res.status(201).json({
        success: true,
        data: nuevoProducto,
        message: 'Producto creado correctamente'
      });
      
    } catch (error) {
      // Error de validación de datos
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: error.errors
        });
      }
      
      // Error de duplicación en base de datos
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un producto con ese ID'
        });
      }
      
      // Otros errores
      console.error('Error al crear producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // ================================
  // ✏️ ACTUALIZAR PRODUCTO
  // ================================
  
  /**
   * PUT /api/productos/:id
   * Actualiza un producto existente (actualización parcial permitida)
   */
  static async update(req, res) {
    try {
      // Valida el ID del parámetro
      const { id } = idParamSchema.parse(req.params);
      
      // Valida los datos a actualizar
      const updates = updateProductoSchema.parse(req.body);
      
      // Actualiza el producto en la base de datos
      const productoActualizado = await ProductoModel.update(id, updates);
      
      // Si no se encontró el producto, devuelve 404
      if (!productoActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      
      // Respuesta exitosa con producto actualizado
      res.json({
        success: true,
        data: productoActualizado,
        message: 'Producto actualizado correctamente'
      });
      
    } catch (error) {
      // Error de validación
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: error.errors
        });
      }
      
      console.error('Error al actualizar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // ================================
  // 🗑️ ELIMINAR PRODUCTO
  // ================================
  
  /**
   * DELETE /api/productos/:id
   * Elimina un producto y sus relaciones con categorías
   */
  static async delete(req, res) {
    try {
      // Valida el ID
      const { id } = idParamSchema.parse(req.params);
      
      // Elimina el producto de la base de datos
      const eliminado = await ProductoModel.delete(id);
      
      // Si no se encontró el producto, devuelve 404
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      
      // Respuesta exitosa
      res.json({
        success: true,
        message: 'Producto eliminado correctamente'
      });
      
    } catch (error) {
      // Error de validación
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
          errors: error.errors
        });
      }
      
      console.error('Error al eliminar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = ProductoController;

/*
 * 💡 PATRONES UTILIZADOS:
 * 
 * 1. **Separación de responsabilidades**: 
 *    - Controlador: lógica de negocio y manejo HTTP
 *    - Modelo: interacción con base de datos
 *    - Schema: validación de datos
 * 
 * 2. **Manejo consistente de errores**:
 *    - 400: Datos inválidos (validación)
 *    - 404: Recurso no encontrado
 *    - 409: Conflicto (duplicados)
 *    - 500: Error interno del servidor
 * 
 * 3. **Respuestas estandarizadas**:
 *    - Siempre incluye success (boolean)
 *    - Incluye message descriptivo
 *    - Incluye data cuando es apropiado
 * 
 * 4. **Validación robusta**:
 *    - Zod valida tipos y formatos
 *    - Verificación de existencia antes de crear/actualizar
 *    - Manejo de errores de base de datos
 */
