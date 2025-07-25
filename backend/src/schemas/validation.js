const { z } = require('zod');

// Schema para crear/actualizar producto
const createProductoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1, 'El nombre es requerido').max(255),
  precio: z.number().positive('El precio debe ser positivo'),
  imagen: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  descripcion: z.string().optional(),
  categorias: z.array(z.number().int().positive()).optional()
});

// Schema para actualizar producto (todos los campos opcionales excepto id)
const updateProductoSchema = z.object({
  nombre: z.string().min(1).max(255).optional(),
  precio: z.number().positive().optional(),
  imagen: z.string().url().optional().or(z.literal('')),
  descripcion: z.string().optional(),
  categorias: z.array(z.number().int().positive()).optional()
});

// Schema para parámetros de ID
const idParamSchema = z.object({
  id: z.string().transform(val => parseInt(val)).refine(val => !isNaN(val) && val > 0, {
    message: 'ID debe ser un número positivo'
  })
});

// Schema para crear categoria
const createCategoriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100)
});

module.exports = {
  createProductoSchema,
  updateProductoSchema,
  idParamSchema,
  createCategoriaSchema
};
