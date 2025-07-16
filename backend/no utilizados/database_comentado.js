/*
 * 🗄️ CONFIGURACIÓN DE BASE DE DATOS (database.js)
 * 
 * Este archivo maneja la conexión a MySQL usando un pool de conexiones
 * para optimizar el rendimiento y manejo concurrente de peticiones.
 */

require('dotenv').config();           // Carga variables de entorno
const mysql = require('mysql2/promise'); // Cliente MySQL con soporte para Promises

// ================================
// 🔧 CONFIGURACIÓN DEL POOL DE CONEXIONES
// ================================

/*
 * Pool de conexiones: En lugar de crear una nueva conexión para cada consulta,
 * mantiene un pool (conjunto) de conexiones reutilizables.
 * 
 * Ventajas:
 * - Mejor rendimiento (evita crear/cerrar conexiones constantemente)
 * - Manejo automático de conexiones
 * - Límite de conexiones simultáneas
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',        // Servidor de BD (por defecto localhost)
  user: process.env.DB_USER || 'root',             // Usuario de BD (por defecto root)
  password: process.env.DB_PASSWORD || '',         // Contraseña de BD (por defecto vacía)
  database: process.env.DB_NAME || 'test',         // Nombre de la base de datos
  port: process.env.DB_PORT || 3306,               // Puerto de MySQL (por defecto 3306)
  
  // Configuración del pool
  waitForConnections: true,    // Espera si no hay conexiones disponibles
  connectionLimit: 10,         // Máximo 10 conexiones simultáneas
  queueLimit: 0               // Sin límite en la cola de espera
});

// ================================
// 🧪 FUNCIÓN DE PRUEBA DE CONEXIÓN
// ================================

/**
 * Función para verificar que la conexión a la base de datos funciona
 * Se ejecuta al iniciar el servidor para asegurar conectividad
 */
const testConnection = async () => {
  try {
    // Obtiene una conexión del pool
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    
    // IMPORTANTE: Libera la conexión de vuelta al pool
    connection.release();
    
  } catch (error) {
    // Si hay error, muestra mensaje descriptivo
    console.error('❌ Error conectando a MySQL:', error.message);
    throw error; // Re-lanza el error para que el servidor lo maneje
  }
};

// ================================
// 📤 EXPORTACIÓN DE MÓDULOS
// ================================

module.exports = {
  pool,           // Pool de conexiones para usar en los modelos
  testConnection  // Función de prueba para usar en index.js
};

/*
 * 💡 NOTAS IMPORTANTES:
 * 
 * 1. Variables de entorno (.env):
 *    DB_HOST=localhost
 *    DB_USER=root
 *    DB_PASSWORD=tu_contraseña
 *    DB_NAME=nombre_de_tu_bd
 *    DB_PORT=3306
 * 
 * 2. El pool se encarga automáticamente de:
 *    - Crear conexiones cuando se necesitan
 *    - Reutilizar conexiones existentes
 *    - Cerrar conexiones inactivas
 *    - Manejar reconexión en caso de error
 * 
 * 3. Siempre usar connection.release() después de usar una conexión
 *    o mejor aún, usar pool.execute() directamente
 */
