/**
 * Configuración centralizada de la aplicación
 * Todas las variables de entorno y configuraciones van aquí
 */

// Configuración de la API - Sin variables de entorno
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Cambiar aquí para producción
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'PESCA Admin',
  VERSION: '1.0.0',
  ENVIRONMENT: 'development' // Cambiar a 'production' cuando sea necesario
};

// Configuración de imágenes
export const IMAGE_CONFIG = {
  MAX_SIZE: 32 * 1024 * 1024, // 32MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp'
  ]
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  TOKEN_KEY: 'admin_token',
  USER_DATA_KEY: 'admin_data',
  LOGIN_STATUS_KEY: 'admin_logged_in'
};

// Función helper para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Función para verificar si estamos en desarrollo
export const isDevelopment = () => {
  return APP_CONFIG.ENVIRONMENT === 'development';
};

// Función para verificar si estamos en producción
export const isProduction = () => {
  return APP_CONFIG.ENVIRONMENT === 'production';
};
