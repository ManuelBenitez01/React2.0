/*
 * 🗃️ MODELO DE PRODUCTO (Producto.js)
 * 
 * Los modelos manejan toda la interacción con la base de datos.
 * Contienen las consultas SQL y la lógica de acceso a datos.
 * Este modelo maneja productos con categorías en relación many-to-many.
 */

const { pool } = require('../config/database');

class ProductoModel {
  
  // ================================
  // 📋 OBTENER TODOS LOS PRODUCTOS
  // ================================
  
  /**
   * Obtiene todos los productos con sus categorías asociadas
   * Utiliza JOIN para combinar datos de múltiples tablas
   * Agrupa resultados para evitar duplicados por múltiples categorías
   */
  static async getAll() {
    const query = `
      SELECT 
        p.id,                           -- ID único del producto
        p.nombre,                       -- Nombre del producto
        p.precio,                       -- Precio del producto
        p.imagen,                       -- URL o ruta de la imagen
        p.descripcion,                  -- Descripción del producto
        p.stock,                        -- Estado de stock (boolean)
        p.cantidad_stock,               -- Cantidad disponible en stock
        GROUP_CONCAT(c.nombre) as categorias,       -- Categorías como string separado por comas
        GROUP_CONCAT(c.id) as categoria_ids         -- IDs de categorías como string
      FROM productos p
      LEFT JOIN producto_categoria pc ON p.id = pc.producto_id    -- Unión con tabla de relación
      LEFT JOIN categorias c ON pc.categoria_id = c.id            -- Unión con tabla categorías
      GROUP BY p.id, p.nombre, p.precio, p.imagen, p.descripcion, p.stock, p.cantidad_stock
    `;
    
    // Ejecuta la consulta usando el pool de conexiones
    const [rows] = await pool.execute(query);
    
    // Procesa los resultados para convertir strings en arrays
    return rows.map(row => ({
      ...row,
      // Convierte string "cat1,cat2,cat3" en array ["cat1", "cat2", "cat3"]
      categorias: row.categorias ? row.categorias.split(',') : [],
      // Convierte string "1,2,3" en array [1, 2, 3]
      categoria_ids: row.categoria_ids ? row.categoria_ids.split(',').map(id => parseInt(id)) : []
    }));
  }

  // ================================
  // 🔍 OBTENER PRODUCTO POR ID
  // ================================
  
  /**
   * Obtiene un producto específico por su ID
   * Incluye todas sus categorías asociadas
   */
  static async getById(id) {
    const query = `
      SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.imagen,
        p.descripcion,
        p.stock,
        p.cantidad_stock,
        GROUP_CONCAT(c.nombre) as categorias,
        GROUP_CONCAT(c.id) as categoria_ids
      FROM productos p
      LEFT JOIN producto_categoria pc ON p.id = pc.producto_id
      LEFT JOIN categorias c ON pc.categoria_id = c.id
      WHERE p.id = ?                   -- Filtro por ID específico
      GROUP BY p.id, p.nombre, p.precio, p.imagen, p.descripcion, p.stock, p.cantidad_stock
    `;
    
    // Ejecuta consulta con parámetro para prevenir SQL injection
    const [rows] = await pool.execute(query, [id]);
    
    // Si no se encuentra, retorna null
    if (rows.length === 0) return null;
    
    // Procesa y retorna el producto encontrado
    const producto = rows[0];
    return {
      ...producto,
      categorias: producto.categorias ? producto.categorias.split(',') : [],
      categoria_ids: producto.categoria_ids ? producto.categoria_ids.split(',').map(id => parseInt(id)) : []
    };
  }

  // ================================
  // ➕ CREAR NUEVO PRODUCTO
  // ================================
  
  /**
   * Crea un nuevo producto con sus categorías
   * Utiliza transacciones para asegurar consistencia de datos
   */
  static async create(producto) {
    // Obtiene conexión para manejar transacción
    const connection = await pool.getConnection();
    
    try {
      // Inicia transacción - si algo falla, se revierte todo
      await connection.beginTransaction();
      
      // 1. Inserta el producto principal
      const insertProductQuery = `
        INSERT INTO productos (id, nombre, precio, imagen, descripcion, stock, cantidad_stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(insertProductQuery, [
        producto.id,
        producto.nombre,
        producto.precio,
        producto.imagen || null,                    // NULL si no hay imagen
        producto.descripcion || null,               // NULL si no hay descripción
        producto.stock !== undefined ? producto.stock : true,  // Default: true
        producto.cantidad_stock || 0                // Default: 0
      ]);

      // 2. Inserta relaciones con categorías (si existen)
      if (producto.categorias && producto.categorias.length > 0) {
        const insertCategoryQuery = `
          INSERT INTO producto_categoria (producto_id, categoria_id)
          VALUES (?, ?)
        `;
        
        // Inserta cada relación por separado
        for (const categoriaId of producto.categorias) {
          await connection.execute(insertCategoryQuery, [producto.id, categoriaId]);
        }
      }
      
      // Confirma la transacción - hace permanentes todos los cambios
      await connection.commit();
      
      // Retorna el producto completo recién creado
      return this.getById(producto.id);
      
    } catch (error) {
      // Si hay error, revierte todos los cambios
      await connection.rollback();
      throw error; // Re-lanza el error para que lo maneje el controlador
      
    } finally {
      // IMPORTANTE: Siempre libera la conexión
      connection.release();
    }
  }

  // ================================
  // ✏️ ACTUALIZAR PRODUCTO
  // ================================
  
  /**
   * Actualiza un producto existente
   * Permite actualización parcial (solo campos proporcionados)
   */
  static async update(id, updates) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Construye query dinámico para actualización parcial
      const updateFields = [];
      const updateValues = [];
      
      // Solo incluye campos que se proporcionaron
      if (updates.nombre !== undefined) {
        updateFields.push('nombre = ?');
        updateValues.push(updates.nombre);
      }
      if (updates.precio !== undefined) {
        updateFields.push('precio = ?');
        updateValues.push(updates.precio);
      }
      if (updates.imagen !== undefined) {
        updateFields.push('imagen = ?');
        updateValues.push(updates.imagen || null);
      }
      if (updates.descripcion !== undefined) {
        updateFields.push('descripcion = ?');
        updateValues.push(updates.descripcion);
      }
      if (updates.stock !== undefined) {
        updateFields.push('stock = ?');
        updateValues.push(updates.stock);
      }
      if (updates.cantidad_stock !== undefined) {
        updateFields.push('cantidad_stock = ?');
        updateValues.push(updates.cantidad_stock);
      }
      
      // Solo ejecuta UPDATE si hay campos para actualizar
      if (updateFields.length > 0) {
        const updateQuery = `UPDATE productos SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(id);
        await connection.execute(updateQuery, updateValues);
      }
      
      // Actualiza categorías si se proporcionaron
      if (updates.categorias !== undefined) {
        // Elimina todas las relaciones existentes
        await connection.execute('DELETE FROM producto_categoria WHERE producto_id = ?', [id]);
        
        // Inserta las nuevas relaciones
        if (updates.categorias.length > 0) {
          const insertCategoryQuery = `
            INSERT INTO producto_categoria (producto_id, categoria_id)
            VALUES (?, ?)
          `;
          
          for (const categoriaId of updates.categorias) {
            await connection.execute(insertCategoryQuery, [id, categoriaId]);
          }
        }
      }
      
      await connection.commit();
      return this.getById(id);
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // ================================
  // 🗑️ ELIMINAR PRODUCTO
  // ================================
  
  /**
   * Elimina un producto y todas sus relaciones
   * Utiliza transacción para mantener integridad referencial
   */
  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // 1. Primero elimina las relaciones con categorías
      await connection.execute('DELETE FROM producto_categoria WHERE producto_id = ?', [id]);
      
      // 2. Luego elimina el producto
      const [result] = await connection.execute('DELETE FROM productos WHERE id = ?', [id]);
      
      await connection.commit();
      
      // Retorna true si se eliminó algo, false si no existía
      return result.affectedRows > 0;
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = ProductoModel;

/*
 * 💡 CARACTERÍSTICAS IMPORTANTES:
 * 
 * 1. **Relaciones Many-to-Many**:
 *    - Un producto puede tener múltiples categorías
 *    - Una categoría puede tener múltiples productos
 *    - Tabla intermedia: producto_categoria
 * 
 * 2. **Transacciones**:
 *    - Aseguran que todas las operaciones se completen o se reviertan
 *    - Mantienen integridad de datos
 *    - Especialmente importantes en operaciones múltiples
 * 
 * 3. **Prevención de SQL Injection**:
 *    - Uso de parámetros preparados (?)
 *    - Nunca concatenación directa de strings
 * 
 * 4. **Manejo de conexiones**:
 *    - Uso de pool para reutilización
 *    - Liberación obligatoria con release()
 *    - Try-catch-finally para cleanup
 * 
 * 5. **Flexibilidad**:
 *    - Actualización parcial (solo campos proporcionados)
 *    - Manejo de valores NULL
 *    - Agregación de datos relacionados
 */
