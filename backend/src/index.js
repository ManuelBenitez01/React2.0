require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection, pool } = require('./config/database');
const routes = require('./routes');
const Admin = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging mejorado y bloqueo de clientes problemáticos
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${req.method} ${req.path}`;
  const userAgent = req.get('User-Agent') || 'No user-agent';
  
  // Bloquear Steam HTTP Client específicamente
  if (userAgent.includes('Valve/Steam HTTP Client')) {
    console.log(`🚫 BLOQUEADO: Cliente Steam detectado - ${userAgent}`);
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado',
      reason: 'Cliente no autorizado'
    });
  }
  
  // Detectar posibles bucles en la ruta raíz
  if (req.method === 'POST' && req.path === '/') {
    console.log(`🚨 ALERTA: ${logMessage} - Posible bucle detectado!`);
    console.log(`   Headers: ${JSON.stringify(req.headers, null, 2)}`);
    console.log(`   Origin: ${req.get('Origin') || 'No origin'}`);
    console.log(`   User-Agent: ${userAgent}`);
    console.log(`   IP: ${req.ip || req.connection.remoteAddress}`);
  } else {
    console.log(logMessage);
  }
  
  next();
});

// Rutas
app.use('/api', routes);

// Documentación Swagger
const swaggerRouter = require('./routes/swagger');
app.use('/api-docs', swaggerRouter);

// Ruta raíz - manejar todos los métodos
app.all('/', (req, res) => {
  if (req.method === 'GET') {
    res.json({
      message: 'API de Productos y Categorías',
      version: '1.0.0',
      endpoints: {
        productos: '/api/productos',
        categorias: '/api/categorias',
        health: '/api/health'
      }
    });
  } else {
    console.log(`⚠️ RECHAZADO: Método ${req.method} no permitido en ruta raíz desde ${req.get('User-Agent') || 'Desconocido'}`);
    res.status(405).json({
      success: false,
      message: `Método ${req.method} no permitido en esta ruta. Solo se permite GET.`,
      allowedMethods: ['GET']
    });
  }
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    console.log('🔍 Verificando conexión a la base de datos...');
    await testConnection();
    
    // Inicializar modelo de administradores
    console.log('🔧 Inicializando sistema de administradores...');
    const adminModel = new Admin(pool);
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`� Documentación Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`�📚 Documentación de endpoints:`);
      console.log(`   === AUTENTICACIÓN ===`);
      console.log(`   POST   /api/auth/login         - Login de administrador`);
      console.log(`   GET    /api/auth/verify        - Verificar token`);
      console.log(`   POST   /api/auth/logout        - Logout`);
      console.log(`   POST   /api/auth/change-password - Cambiar contraseña`);
      console.log(`   === PRODUCTOS (Lectura pública) ===`);
      console.log(`   GET    /api/productos         - Obtener todos los productos`);
      console.log(`   GET    /api/productos/:id     - Obtener producto por ID`);
      console.log(`   === PRODUCTOS (Administración) ===`);
      console.log(`   POST   /api/productos         - Crear nuevo producto [AUTH]`);
      console.log(`   PUT    /api/productos/:id     - Actualizar producto [AUTH]`);
      console.log(`   DELETE /api/productos/:id     - Eliminar producto [AUTH]`);
      console.log(`   === CATEGORÍAS (Lectura pública) ===`);
      console.log(`   GET    /api/categorias        - Obtener todas las categorías`);
      console.log(`   GET    /api/categorias/:id    - Obtener categoría por ID`);
      console.log(`   === CATEGORÍAS (Administración) ===`);
      console.log(`   POST   /api/categorias        - Crear nueva categoría [AUTH]`);
      console.log(`   PUT    /api/categorias/:id    - Actualizar categoría [AUTH]`);
      console.log(`   DELETE /api/categorias/:id    - Eliminar categoría [AUTH]`);
      console.log(`   GET    /api/categorias/:id/productos - Productos de una categoría`);
      console.log(`   === IMÁGENES (Administración) ===`);
      console.log(`   POST   /api/images/upload     - Subir imagen [AUTH]`);
      console.log(`   DELETE /api/images/delete     - Eliminar imagen [AUTH]`);
      console.log(`   === OTROS ===`);
      console.log(`   GET    /api/health            - Estado de la API`);
      console.log(`   GET    /api-docs              - Documentación Swagger`);
      console.log(`   GET    /api-docs/json         - Especificación OpenAPI`);
      console.log(`   `);
      console.log(`🔐 CREDENCIALES POR DEFECTO:`);
      console.log(`   Usuario: admin`);
      console.log(`   Contraseña: admin123`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:');
    console.error('   - Verifica que MySQL esté ejecutándose');
    console.error('   - Verifica las credenciales en el archivo .env');
    console.error(`   - Verifica que la base de datos '${process.env.DB_NAME}' exista`);
    console.error('   - Error específico:', error.message);
    
    // Iniciar servidor sin base de datos para debugging
    console.log('⚠️  Iniciando servidor sin conexión a base de datos...');
    app.listen(PORT, () => {
      console.log(`🟡 Servidor ejecutándose en http://localhost:${PORT} (SIN BASE DE DATOS)`);
      console.log('   Corrige la conexión y reinicia el servidor');
    });
  }
};

startServer();
