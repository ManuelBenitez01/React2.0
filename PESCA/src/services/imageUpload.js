// Servicio para subir imágenes a través del backend
import { API_CONFIG } from '../config/config.js';

const API_BASE_URL = API_CONFIG.BASE_URL;

/**
 * Obtiene el token de autenticación
 */
const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

/**
 * Sube una imagen al servidor backend
 * @param {File} imageFile - Archivo de imagen a subir
 * @returns {Promise<string>} - URL de la imagen subida
 */
export const subirImagen = async (imageFile) => {
  try {
    // Validar que sea un archivo de imagen
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen válida');
    }

    // Validar tamaño (máximo 32MB)
    const maxSize = 32 * 1024 * 1024; // 32MB en bytes
    if (imageFile.size > maxSize) {
      throw new Error('La imagen es demasiado grande. Máximo 32MB');
    }

    console.log('📤 Subiendo imagen al servidor...', {
      nombre: imageFile.name,
      tamaño: `${(imageFile.size / 1024 / 1024).toFixed(2)}MB`,
      tipo: imageFile.type
    });

    // Obtener token de autenticación
    const token = getAuthToken();
    if (!token) {
      throw new Error('No estás autenticado. Por favor inicia sesión nuevamente.');
    }

    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', imageFile);

    // Realizar petición al backend
    const response = await fetch(`${API_BASE_URL}/images/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('❌ Error del servidor:', data);
      
      // Manejar errores específicos
      if (response.status === 401) {
        // Token expirado - limpiar localStorage
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_data');
        localStorage.removeItem('admin_logged_in');
        throw new Error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      }
      
      throw new Error(data.message || 'Error al subir imagen al servidor');
    }

    console.log('✅ Imagen subida exitosamente:', data.data.url);

    // Retornar la URL de la imagen
    return data.data.url;

  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    throw error;
  }
};

/**
 * Verifica el estado del servicio de imágenes
 */
export const verificarEstadoServicio = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/images/status`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('❌ Error al verificar estado del servicio:', error);
    return { 
      success: false, 
      error: error.message,
      data: { imgbbConfigured: false }
    };
  }
};

/**
 * Valida si un archivo es una imagen válida
 * @param {File} file - Archivo a validar
 * @returns {boolean} - True si es una imagen válida
 */
export const esImagenValida = (file) => {
  const tiposPermitidos = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp'
  ];

  return file && tiposPermitidos.includes(file.type);
};

/**
 * Convierte bytes a un formato legible
 * @param {number} bytes - Cantidad de bytes
 * @returns {string} - Tamaño formateado
 */
export const formatearTamaño = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
