const { pool } = require('../config/database');

class ProductoModel {
  static async getAll() {
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
      GROUP BY p.id, p.nombre, p.precio, p.imagen, p.descripcion, p.stock, p.cantidad_stock
    `;
    
    const [rows] = await pool.execute(query);
    
    return rows.map(row => ({
      ...row,
      categorias: row.categorias ? row.categorias.split(',') : [],
      categoria_ids: row.categoria_ids ? row.categoria_ids.split(',').map(id => parseInt(id)) : []
    }));
  }

  // Obtener producto por ID
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
      WHERE p.id = ?
      GROUP BY p.id, p.nombre, p.precio, p.imagen, p.descripcion, p.stock, p.cantidad_stock
    `;
    
    const [rows] = await pool.execute(query, [id]);
    
    if (rows.length === 0) return null;
    
    const producto = rows[0];
    return {
      ...producto,
      categorias: producto.categorias ? producto.categorias.split(',') : [],
      categoria_ids: producto.categoria_ids ? producto.categoria_ids.split(',').map(id => parseInt(id)) : []
    };
  }

  // Crear nuevo producto
  static async create(producto) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insertar producto
      const insertProductQuery = `
        INSERT INTO productos (id, nombre, precio, imagen, descripcion, stock, cantidad_stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(insertProductQuery, [
        producto.id,
        producto.nombre,
        producto.precio,
        producto.imagen || null,
        producto.descripcion || null,
        producto.stock !== undefined ? producto.stock : true,
        producto.cantidad_stock || 0
      ]);

      // Insertar relaciones con categorías si existen
      if (producto.categorias && producto.categorias.length > 0) {
        const insertCategoryQuery = `
          INSERT INTO producto_categoria (producto_id, categoria_id)
          VALUES (?, ?)
        `;
        
        for (const categoriaId of producto.categorias) {
          await connection.execute(insertCategoryQuery, [producto.id, categoriaId]);
        }
      }
      
      await connection.commit();
      return this.getById(producto.id);
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Actualizar producto
  static async update(id, updates) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Construir query dinámico para actualización
      const updateFields = [];
      const updateValues = [];
      
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
      
      if (updateFields.length > 0) {
        const updateQuery = `UPDATE productos SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(id);
        await connection.execute(updateQuery, updateValues);
      }
      
      // Actualizar categorías si se proporcionan
      if (updates.categorias !== undefined) {
        // Eliminar relaciones existentes
        await connection.execute('DELETE FROM producto_categoria WHERE producto_id = ?', [id]);
        
        // Insertar nuevas relaciones
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

  // Eliminar producto
  static async delete(id) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Eliminar relaciones con categorías
      await connection.execute('DELETE FROM producto_categoria WHERE producto_id = ?', [id]);
      
      // Eliminar producto
      const [result] = await connection.execute('DELETE FROM productos WHERE id = ?', [id]);
      
      await connection.commit();
      return result.affectedRows > 0;
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Obtener categorías de un producto
  static async getCategorias(productoId) {
    const query = `
      SELECT c.id, c.nombre
      FROM categorias c
      INNER JOIN producto_categoria pc ON c.id = pc.categoria_id
      WHERE pc.producto_id = ?
      ORDER BY c.nombre
    `;
    
    const [rows] = await pool.execute(query, [productoId]);
    return rows;
  }

  // Actualizar categorías de un producto
  static async updateCategorias(productoId, categoriaIds) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Eliminar todas las relaciones existentes del producto
      await connection.execute('DELETE FROM producto_categoria WHERE producto_id = ?', [productoId]);
      
      // Insertar las nuevas relaciones
      if (categoriaIds.length > 0) {
        const insertQuery = `
          INSERT INTO producto_categoria (producto_id, categoria_id)
          VALUES (?, ?)
        `;
        
        for (const categoriaId of categoriaIds) {
          // Validar que la categoría existe
          const [categoriaExists] = await connection.execute(
            'SELECT id FROM categorias WHERE id = ?', 
            [categoriaId]
          );
          
          if (categoriaExists.length > 0) {
            await connection.execute(insertQuery, [productoId, categoriaId]);
          }
        }
      }
      
      await connection.commit();
      return true;
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = ProductoModel;
