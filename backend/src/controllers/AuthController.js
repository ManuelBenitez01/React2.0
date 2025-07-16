const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

class AuthController {
  constructor(db) {
    this.db = db;
    this.adminModel = new Admin(db);
  }

  // Login de administrador
  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validar datos de entrada
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Usuario y contraseña son requeridos'
        });
      }

      // Validar credenciales
      const result = await this.adminModel.validateCredentials(username, password);

      if (!result.success) {
        return res.status(401).json({
          success: false,
          message: result.message
        });
      }

      // Generar JWT token
      const token = jwt.sign(
        { 
          adminId: result.admin.id,
          username: result.admin.username,
          role: result.admin.role
        },
        process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura',
        { 
          expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        }
      );

      // Respuesta exitosa
      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          admin: {
            id: result.admin.id,
            username: result.admin.username,
            role: result.admin.role
          },
          token,
          expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        }
      });

    } catch (error) {
      console.error('❌ Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };

  // Verificar token
  verify = async (req, res) => {
    try {
      // Si llegamos aquí, el middleware ya validó el token
      res.json({
        success: true,
        message: 'Token válido',
        data: {
          admin: req.admin
        }
      });
    } catch (error) {
      console.error('❌ Error en verificación:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };

  // Logout (opcional - en el frontend se puede eliminar el token)
  logout = async (req, res) => {
    try {
      // En implementaciones más avanzadas, aquí se podría invalidar el token
      // Por ahora, simplemente confirmamos el logout
      res.json({
        success: true,
        message: 'Logout exitoso'
      });
    } catch (error) {
      console.error('❌ Error en logout:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };

  // Cambiar contraseña
  changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const adminId = req.admin.id;

      // Validar datos de entrada
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Contraseña actual y nueva contraseña son requeridas'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La nueva contraseña debe tener al menos 6 caracteres'
        });
      }

      // Validar contraseña actual
      const validation = await this.adminModel.validateCredentials(req.admin.username, currentPassword);
      
      if (!validation.success) {
        return res.status(401).json({
          success: false,
          message: 'Contraseña actual incorrecta'
        });
      }

      // Cambiar contraseña
      const changed = await this.adminModel.changePassword(adminId, newPassword);

      if (changed) {
        res.json({
          success: true,
          message: 'Contraseña cambiada exitosamente'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al cambiar la contraseña'
        });
      }

    } catch (error) {
      console.error('❌ Error al cambiar contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };
}

module.exports = AuthController;
