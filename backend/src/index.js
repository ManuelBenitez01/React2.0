require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Productos y Categorías',
    version: '1.0.0',
    endpoints: {
      productos: '/api/productos',
      categorias: '/api/categorias',
      health: '/api/health'
    }
  });
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
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📚 Documentación de endpoints:`);
      console.log(`   GET    /api/productos         - Obtener todos los productos`);
      console.log(`   GET    /api/productos/:id     - Obtener producto por ID`);
      console.log(`   POST   /api/productos         - Crear nuevo producto`);
      console.log(`   PUT    /api/productos/:id     - Actualizar producto`);
      console.log(`   DELETE /api/productos/:id     - Eliminar producto`);
      console.log(`   GET    /api/categorias        - Obtener todas las categorías`);
      console.log(`   GET    /api/categorias/:id    - Obtener categoría por ID`);
      console.log(`   POST   /api/categorias        - Crear nueva categoría`);
      console.log(`   PUT    /api/categorias/:id    - Actualizar categoría`);
      console.log(`   DELETE /api/categorias/:id    - Eliminar categoría`);
      console.log(`   GET    /api/categorias/:id/productos - Productos de una categoría`);
      console.log(`   GET    /api/health            - Estado de la API`);
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
