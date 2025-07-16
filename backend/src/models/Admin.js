const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

class Admin {
  constructor(db) {
    this.db = db;
    this.initializeTable();
  }

  // Crear tabla de administradores si no existe
  async initializeTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS admins (
          id INT PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR(50) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP NULL,
          is_active BOOLEAN DEFAULT true
        )
      `;
      
      await this.db.execute(createTableQuery);
      
      // Verificar si existe el admin por defecto
      await this.createDefaultAdmin();
      
    } catch (error) {
      console.error('❌ Error al inicializar tabla de administradores:', error);
    }
  }

  // Crear administrador por defecto si no existe
  async createDefaultAdmin() {
    try {
      const [existingAdmin] = await this.db.execute(
        'SELECT id FROM admins WHERE username = ?',
        ['admin']
      );

      if (existingAdmin.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        
        await this.db.execute(
          'INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)',
          ['admin', hashedPassword, 'admin']
        );
        
        console.log('✅ Administrador por defecto creado: admin / admin123');
      }
    } catch (error) {
      console.error('❌ Error al crear admin por defecto:', error);
    }
  }

  // Validar credenciales de administrador
  async validateCredentials(username, password) {
    try {
      const [rows] = await this.db.execute(
        'SELECT id, username, password_hash, role, is_active FROM admins WHERE username = ? AND is_active = true',
        [username]
      );

      if (rows.length === 0) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      const admin = rows[0];
      const isValidPassword = await bcrypt.compare(password, admin.password_hash);

      if (!isValidPassword) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      // Actualizar último login
      await this.updateLastLogin(admin.id);

      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
          role: admin.role
        }
      };
    } catch (error) {
      console.error('❌ Error al validar credenciales:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }

  // Actualizar último login
  async updateLastLogin(adminId) {
    try {
      await this.db.execute(
        'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [adminId]
      );
    } catch (error) {
      console.error('❌ Error al actualizar último login:', error);
    }
  }

  // Obtener admin por ID (para verificación de token)
  async getById(adminId) {
    try {
      const [rows] = await this.db.execute(
        'SELECT id, username, role, is_active FROM admins WHERE id = ? AND is_active = true',
        [adminId]
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('❌ Error al obtener admin por ID:', error);
      return null;
    }
  }

  // Cambiar contraseña
  async changePassword(adminId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      const [result] = await this.db.execute(
        'UPDATE admins SET password_hash = ? WHERE id = ?',
        [hashedPassword, adminId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error('❌ Error al cambiar contraseña:', error);
      return false;
    }
  }
}

module.exports = Admin;
