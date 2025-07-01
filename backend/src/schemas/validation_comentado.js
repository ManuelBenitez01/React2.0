/*
 * ✅ ESQUEMAS DE VALIDACIÓN (validation.js)
 * 
 * Este archivo define todos los esquemas de validación usando Zod.
 * Zod es una librería que permite validar tipos, formatos y reglas de negocio
 * antes de que los datos lleguen a la base de datos.
 */

const { z } = require('zod');

// ================================
// 🛍️ VALIDACIÓN DE PRODUCTOS
// ================================

/**
 * Schema para crear un nuevo producto
 * Define todos los campos requeridos y sus validaciones
 */
const createProductoSchema = z.object({
  // ID único del producto (requerido, número entero positivo)
  id: z.number().int().positive(),
  
  // Nombre del producto (requerido, 1-255 caracteres)
  nombre: z.string().min(1, 'El nombre es requerido').max(255),
  
  // Precio (requerido, número positivo)
  precio: z.number().positive('El precio debe ser positivo'),
  
  // URL o ruta de imagen (opcional, pero con validación de formato)
  imagen: z.string().optional().or(z.literal('')).refine(val => {
    if (!val || val === '') return true;
    // Permitir URLs completas, rutas que empiecen con / o ./, o nombres de archivo simples
    return val.startsWith('http') || val.startsWith('/') || val.startsWith('./') || val.startsWith('../') || val.includes('.');
  }, 'Debe ser una URL válida o una ruta/nombre de archivo de imagen'),
  
  // Descripción del producto (opcional)
  descripcion: z.string().optional(),
  
  // Array de IDs de categorías (opcional)
  categorias: z.array(z.number().int().positive()).optional(),
  
  // Estado de stock (opcional, default: true)
  stock: z.boolean().optional().default(true),
  
  // Cantidad en stock (opcional, debe ser >= 0, default: 0)
  cantidad_stock: z.number().int().min(0, 'La cantidad de stock debe ser mayor o igual a 0').optional().default(0)
});

/**
 * Schema para actualizar un producto existente
 * Todos los campos son opcionales (actualización parcial)
 */
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

// ================================
// 🏷️ VALIDACIÓN DE CATEGORÍAS
// ================================

/**
 * Schema para crear/actualizar categorías
 * Las categorías son más simples: solo requieren nombre
 */
const createCategoriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100)
});

// ================================
// 🆔 VALIDACIÓN DE PARÁMETROS ID
// ================================

/**
 * Schema para validar IDs en parámetros de URL (/:id)
 * Convierte string a número y valida que sea positivo
 */
const idParamSchema = z.object({
  id: z.string()
    .transform(val => parseInt(val))           // Convierte string a número
    .refine(val => !isNaN(val) && val > 0, {  // Valida que sea número positivo
      message: 'ID debe ser un número positivo'
    })
});

// ================================
// 📤 EXPORTACIÓN DE ESQUEMAS
// ================================

module.exports = {
  createProductoSchema,    // Para POST /productos
  updateProductoSchema,    // Para PUT /productos/:id
  idParamSchema,          // Para validar parámetros :id
  createCategoriaSchema   // Para POST/PUT /categorias
};

/*
 * 💡 VENTAJAS DE ZOD:
 * 
 * 1. **Validación de tipos**: Asegura que los datos sean del tipo correcto
 * 2. **Validación de formato**: URLs, emails, rangos numéricos, etc.
 * 3. **Mensajes de error claros**: Especifica exactamente qué está mal
 * 4. **Transformaciones**: Convierte tipos automáticamente (string → number)
 * 5. **Validación compleja**: Funciones refine() para lógica personalizada
 * 6. **Composición**: Reutilización de esquemas parciales
 * 
 * 🔒 VALIDACIONES IMPLEMENTADAS:
 * 
 * **Productos**:
 * - ID: Número entero positivo único
 * - Nombre: String 1-255 caracteres, requerido
 * - Precio: Número positivo, requerido
 * - Imagen: URL válida o ruta de archivo, opcional
 * - Descripción: String libre, opcional
 * - Categorías: Array de IDs válidos, opcional
 * - Stock: Boolean, opcional (default: true)
 * - Cantidad: Entero >= 0, opcional (default: 0)
 * 
 * **Categorías**:
 * - Nombre: String 1-100 caracteres, requerido
 * 
 * **IDs**:
 * - Conversión automática string → number
 * - Validación de número positivo
 * 
 * 🎯 CASOS DE USO:
 * 
 * ```javascript
 * // En controlador:
 * try {
 *   const validData = createProductoSchema.parse(req.body);
 *   // Los datos están validados y tipados correctamente
 * } catch (error) {
 *   // error.errors contiene detalles de validación
 * }
 * ```
 */
