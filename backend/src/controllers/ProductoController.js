const { createProductoSchema, updateProductoSchema, idParamSchema } = require('../schemas/validation');
const ProductoModel = require('../models/Producto');

class ProductoController {
  // GET /api/productos
  static async getAll(req, res) {
    try {
      const productos = await ProductoModel.getAll();
      res.json({
        success: true,
        data: productos,
        message: 'Productos obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // GET /api/productos/:id
  static async getById(req, res) {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un número válido - CORREGIDO
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }
      
      const producto = await ProductoModel.getById(idNum);
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: producto,
        message: 'Producto obtenido correctamente'
      });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // POST /api/productos
  static async create(req, res) {
    try {
      const productoData = createProductoSchema.parse(req.body);
      
      // Verificar si el producto ya existe
      const existingProduct = await ProductoModel.getById(productoData.id);
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un producto con ese ID'
        });
      }
      
      const nuevoProducto = await ProductoModel.create(productoData);
      
      res.status(201).json({
        success: true,
        data: nuevoProducto,
        message: 'Producto creado correctamente'
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: error.errors
        });
      }
      
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un producto con ese ID'
        });
      }
      
      console.error('Error al crear producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // PUT /api/productos/:id
  // Actualizar producto - VERSIÓN CORREGIDA
  static async update(req, res) {
    console.log('🔄 PUT /productos/:id - Actualizando producto');
    console.log('📋 ID:', req.params.id);
    console.log('📤 Body:', req.body);
    
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un número válido - CORREGIDO
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }

      // Validar los datos usando Zod
      const validationResult = updateProductoSchema.safeParse(req.body);
      if (!validationResult.success) {
        console.log('❌ Error de validación:', validationResult.error.errors);
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: validationResult.error.errors
        });
      }

      const datosValidados = validationResult.data;
      console.log('✅ Datos validados:', datosValidados);

      // Verificar que el producto existe
      const productoExistente = await ProductoModel.getById(idNum);
      if (!productoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      console.log('✅ Producto encontrado, procediendo a actualizar...');

      // Actualizar el producto
      const productoActualizado = await ProductoModel.update(idNum, datosValidados);
      
      console.log('✅ Producto actualizado exitosamente:', productoActualizado);

      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: productoActualizado
      });

    } catch (error) {
      console.error('❌ Error en ProductoController.update:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/productos/:id
  // Eliminar producto - CORREGIDO
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un número válido - CORREGIDO
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }

      // Verificar que el producto existe
      const productoExistente = await ProductoModel.getById(idNum);
      if (!productoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      // Eliminar el producto
      await ProductoModel.delete(idNum);
      
      res.json({
        success: true,
        message: 'Producto eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // GET /api/productos/:id/categorias
  static async getCategorias(req, res) {
    try {
      const { id } = req.params;
      
      // Validar que el ID sea un número válido
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }
      
      // Verificar que el producto existe
      const producto = await ProductoModel.getById(idNum);
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      const categorias = await ProductoModel.getCategorias(idNum);
      
      res.json({
        success: true,
        data: categorias,
        message: 'Categorías del producto obtenidas correctamente'
      });

    } catch (error) {
      console.error('Error al obtener categorías del producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // PUT /api/productos/:id/categorias
  static async updateCategorias(req, res) {
    try {
      const { id } = req.params;
      const { categorias } = req.body;
      
      // Validar que el ID sea un número válido
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido'
        });
      }
      
      // Validar que categorias sea un array
      if (!Array.isArray(categorias)) {
        return res.status(400).json({
          success: false,
          message: 'Las categorías deben ser un array'
        });
      }
      
      // Verificar que el producto existe
      const producto = await ProductoModel.getById(idNum);
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      await ProductoModel.updateCategorias(idNum, categorias);
      
      res.json({
        success: true,
        message: 'Categorías del producto actualizadas correctamente'
      });

    } catch (error) {
      console.error('Error al actualizar categorías del producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = ProductoController;
