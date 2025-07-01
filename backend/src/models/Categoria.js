const { pool } = require('../config/database');

class CategoriaModel {
  // Obtener todas las categorías
  static async getAll() {
    const query = 'SELECT * FROM categorias ORDER BY nombre';
    const [rows] = await pool.execute(query);
    return rows;
  }

  // Obtener categoría por ID
  static async getById(id) {
    const query = 'SELECT * FROM categorias WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // Crear nueva categoría
  static async create(categoria) {
    const query = 'INSERT INTO categorias (nombre) VALUES (?)';
    const [result] = await pool.execute(query, [categoria.nombre]);
    return this.getById(result.insertId);
  }

  // Actualizar categoría
  static async update(id, updates) {
    const query = 'UPDATE categorias SET nombre = ? WHERE id = ?';
    const [result] = await pool.execute(query, [updates.nombre, id]);
    
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // Eliminar categoría
  static async delete(id) {
    // Verificar si la categoría tiene productos asociados
    const checkQuery = 'SELECT COUNT(*) as count FROM producto_categoria WHERE categoria_id = ?';
    const [checkResult] = await pool.execute(checkQuery, [id]);
    
    if (checkResult[0].count > 0) {
      throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
    }
    
    const query = 'DELETE FROM categorias WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // Obtener productos de una categoría
  static async getProductos(categoriaId) {
    const query = `
      SELECT p.* 
      FROM productos p
      INNER JOIN producto_categoria pc ON p.id = pc.producto_id
      WHERE pc.categoria_id = ?
    `;
    const [rows] = await pool.execute(query, [categoriaId]);
    return rows;
  }
}

module.exports = CategoriaModel;
