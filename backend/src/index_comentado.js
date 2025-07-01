/*
 * 🚀 ARCHIVO PRINCIPAL DEL SERVIDOR (index.js)
 * 
 * Este es el punto de entrada de tu aplicación backend.
 * Configura Express, middlewares, rutas y inicia el servidor.
 */

require('dotenv').config();           // Carga variables de entorno desde .env
const express = require('express');   // Framework web para Node.js
const cors = require('cors');         // Middleware para permitir peticiones cross-origin
const { testConnection } = require('./config/database');  // Función para probar conexión a BD
const routes = require('./routes');   // Importa todas las rutas de la API

const app = express();                // Crea la aplicación Express
const PORT = process.env.PORT || 3000; // Puerto del servidor (variable de entorno o 3000)

// ================================
// 🔧 CONFIGURACIÓN DE MIDDLEWARES
// ================================

app.use(cors());                      // Permite peticiones desde cualquier origen (frontend)
app.use(express.json());              // Parsea JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Parsea datos de formularios

// Middleware personalizado para logging de peticiones
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next(); // Continúa al siguiente middleware/ruta
});

// ================================
// 📡 CONFIGURACIÓN DE RUTAS
// ================================

app.use('/api', routes);              // Todas las rutas API empiezan con /api

// Ruta raíz - información básica de la API
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

// ================================
// 🛡️ MIDDLEWARES DE MANEJO DE ERRORES
// ================================

// Middleware para rutas no encontradas (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware global para manejo de errores (500)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// ================================
// 🎯 FUNCIÓN DE INICIO DEL SERVIDOR
// ================================

const startServer = async () => {
  try {
    // Primero verifica que la base de datos esté disponible
    console.log('🔍 Verificando conexión a la base de datos...');
    await testConnection();
    
    // Si la conexión es exitosa, inicia el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      
      // Muestra documentación de endpoints disponibles
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
    // Si hay error con la base de datos, muestra información útil
    console.error('❌ Error al iniciar el servidor:');
    console.error('   - Verifica que MySQL esté ejecutándose');
    console.error('   - Verifica las credenciales en el archivo .env');
    console.error(`   - Verifica que la base de datos '${process.env.DB_NAME}' exista`);
    console.error('   - Error específico:', error.message);
    
    // Inicia el servidor sin base de datos para debugging
    console.log('⚠️  Iniciando servidor sin conexión a base de datos...');
    app.listen(PORT, () => {
      console.log(`🟡 Servidor ejecutándose en http://localhost:${PORT} (SIN BASE DE DATOS)`);
      console.log('   Corrige la conexión y reinicia el servidor');
    });
  }
};

// Ejecuta la función de inicio
startServer();
