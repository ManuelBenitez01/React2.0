const { z } = require('zod');

// Schema para crear/actualizar producto
const createProductoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1, 'El nombre es requerido').max(255),
  precio: z.number().positive('El precio debe ser positivo'),
  imagen: z.string().optional().or(z.literal('')).refine(val => {
    if (!val || val === '') return true;
    // Permitir URLs completas, rutas que empiecen con / o ./, o nombres de archivo simples
    return val.startsWith('http') || val.startsWith('/') || val.startsWith('./') || val.startsWith('../') || val.includes('.');
  }, 'Debe ser una URL válida o una ruta/nombre de archivo de imagen'),
  descripcion: z.string().optional(),
  categorias: z.array(z.number().int().positive()).optional(),
  stock: z.boolean().optional().default(true),
  cantidad_stock: z.number().int().min(0, 'La cantidad de stock debe ser mayor o igual a 0').optional().default(0)
});

// Schema para actualizar producto (todos los campos opcionales excepto id)
const updateProductoSchema = z.object({
  nombre: z.string().min(1).max(255).optional(),
  precio: z.number().positive().optional(),
  imagen: z.string().optional().or(z.literal('')).refine(val => {
    if (!val || val === '') return true;
    // Permitir URLs completas, rutas que empiecen con / o ./, o nombres de archivo simples
    return val.startsWith('http') || val.startsWith('/') || val.startsWith('./') || val.startsWith('../') || val.includes('.');
  }, 'Debe ser una URL válida o una ruta/nombre de archivo de imagen'),
  descripcion: z.string().optional(),
  categorias: z.array(z.number().int().positive()).optional(),
  stock: z.boolean().optional(),
  cantidad_stock: z.number().int().min(0, 'La cantidad de stock debe ser mayor o igual a 0').optional()
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
