const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Middleware para verificar token JWT
const authenticateToken = (db) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token de acceso requerido'
        });
      }

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura');
      
      // Verificar que el admin aún existe y está activo
      const adminModel = new Admin(db);
      const admin = await adminModel.getById(decoded.adminId);

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o usuario inactivo'
        });
      }

      // Agregar información del admin al request
      req.admin = admin;
      next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expirado'
        });
      }

      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
      }

      console.error('❌ Error en middleware de autenticación:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };
};

// Middleware para verificar rol de administrador
const requireAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Se requieren permisos de administrador'
    });
  }
};

module.exports = {
  authenticateToken,
  requireAdmin
};
