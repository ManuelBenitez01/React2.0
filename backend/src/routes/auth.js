const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/auth');

const createAuthRoutes = (db) => {
  const router = express.Router();
  const authController = new AuthController(db);

  // POST /api/auth/login - Login de administrador
  router.post('/login', authController.login);

  // GET /api/auth/verify - Verificar token válido
  router.get('/verify', authenticateToken(db), authController.verify);

  // POST /api/auth/logout - Logout (opcional)
  router.post('/logout', authenticateToken(db), authController.logout);

  // POST /api/auth/change-password - Cambiar contraseña
  router.post('/change-password', authenticateToken(db), authController.changePassword);

  return router;
};

module.exports = createAuthRoutes;
