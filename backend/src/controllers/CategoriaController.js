const CategoriaModel = require('../models/Categoria');
const { createCategoriaSchema, idParamSchema } = require('../schemas/validation');

class CategoriaController {
  // GET /api/categorias
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaModel.getAll();
      res.json({
        success: true,
        data: categorias,
        message: 'Categorías obtenidas correctamente'
      });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // GET /api/categorias/:id
  static async getById(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const categoria = await CategoriaModel.getById(id);
      
      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }
      
      res.json({
        success: true,
        data: categoria,
        message: 'Categoría obtenida correctamente'
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
          errors: error.errors
        });
      }
      
      console.error('Error al obtener categoría:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // POST /api/categorias
  static async create(req, res) {
    try {
      const categoriaData = createCategoriaSchema.parse(req.body);
      const nuevaCategoria = await CategoriaModel.create(categoriaData);
      
      res.status(201).json({
        success: true,
        data: nuevaCategoria,
        message: 'Categoría creada correctamente'
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
          message: 'Ya existe una categoría con ese nombre'
        });
      }
      
      console.error('Error al crear categoría:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // PUT /api/categorias/:id
  static async update(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const updates = createCategoriaSchema.parse(req.body);
      
      const categoriaActualizada = await CategoriaModel.update(id, updates);
      
      if (!categoriaActualizada) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }
      
      res.json({
        success: true,
        data: categoriaActualizada,
        message: 'Categoría actualizada correctamente'
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
          message: 'Ya existe una categoría con ese nombre'
        });
      }
      
      console.error('Error al actualizar categoría:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // DELETE /api/categorias/:id
  static async delete(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      
      const eliminado = await CategoriaModel.delete(id);
      
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }
      
      res.json({
        success: true,
        message: 'Categoría eliminada correctamente'
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
          errors: error.errors
        });
      }
      
      if (error.message.includes('productos asociados')) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      console.error('Error al eliminar categoría:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // GET /api/categorias/:id/productos
  static async getProductos(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      
      // Verificar que la categoría existe
      const categoria = await CategoriaModel.getById(id);
      if (!categoria) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada'
        });
      }
      
      const productos = await CategoriaModel.getProductos(id);
      
      res.json({
        success: true,
        data: {
          categoria: categoria,
          productos: productos
        },
        message: 'Productos de la categoría obtenidos correctamente'
      });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
          errors: error.errors
        });
      }
      
      console.error('Error al obtener productos de categoría:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = CategoriaController;
