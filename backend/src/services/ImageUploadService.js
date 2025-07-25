// Servicio para subir imágenes a ImgBB desde el backend
let fetch;
try {
  fetch = require('node-fetch');
  if (fetch.default) fetch = fetch.default;
} catch (e) {
  fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
}

class ImageUploadService {
  constructor() {
    this.imgbbApiKey = process.env.IMGBB_API_KEY;
    this.imgbbApiUrl = 'https://api.imgbb.com/1/upload';
    
    // Formatos de imagen permitidos
    this.allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp'
    ];
    
    // Tamaño máximo: 32MB
    this.maxFileSize = 32 * 1024 * 1024;
  }

  /**
   * Valida si la API key está configurada
   */
  isConfigured() {
    return this.imgbbApiKey && this.imgbbApiKey !== 'TU_API_KEY_DE_IMGBB_AQUI';
  }

  /**
   * Valida un archivo de imagen
   */
  validateImage(file) {
    if (!file) {
      console.error('❌ [validateImage] No se recibió ningún archivo:', file);
      throw new Error('No se recibió ningún archivo');
    }
    if (!this.allowedTypes.includes(file.mimetype)) {
      console.error('❌ [validateImage] Formato de imagen no válido:', file.mimetype);
      throw new Error('Formato de imagen no válido. Usa JPG, PNG, GIF, WebP o BMP');
    }
    if (file.size > this.maxFileSize) {
      const sizeMB = (this.maxFileSize / (1024 * 1024)).toFixed(0);
      console.error('❌ [validateImage] Imagen demasiado grande:', file.size, 'bytes');
      throw new Error(`Imagen demasiado grande. Máximo ${sizeMB}MB permitido`);
    }
    return true;
  }

  /**
   * Sube una imagen a ImgBB
   */
  async uploadToImgBB(imageBuffer, filename) {
    try {
      if (!this.isConfigured()) {
        throw new Error('API key de ImgBB no configurada. Revisa las variables de entorno');
      }

      // Convertir buffer a base64
      const base64Image = imageBuffer.toString('base64');
      
      // Crear FormData para ImgBB
      const FormData = require('form-data');
      const formData = new FormData();
      
      formData.append('key', this.imgbbApiKey);
      formData.append('image', base64Image);
      formData.append('name', filename);

      console.log('📤 Subiendo imagen a ImgBB...', {
        filename,
        size: `${(imageBuffer.length / 1024 / 1024).toFixed(2)}MB`
      });

      // Realizar petición a ImgBB
      const response = await fetch(this.imgbbApiUrl, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders()
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('❌ Error de ImgBB:', data);
        
        let errorMessage = 'Error al subir imagen a ImgBB';
        
        if (data.error) {
          if (data.error.message) {
            errorMessage = data.error.message;
          } else if (typeof data.error === 'string') {
            errorMessage = data.error;
          }
        }
        
        // Errores específicos
        if (errorMessage.includes('Invalid API')) {
          errorMessage = 'API key de ImgBB inválida. Verifica la configuración del servidor';
        }
        
        throw new Error(errorMessage);
      }

      console.log('✅ Imagen subida exitosamente a ImgBB:', data.data.url);

      // Retornar información de la imagen
      return {
        success: true,
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        size: data.data.size,
        width: data.data.width,
        height: data.data.height,
        filename: data.data.image.filename
      };

    } catch (error) {
      console.error('❌ Error al subir imagen:', error);
      throw error;
    }
  }

  /**
   * Función principal para subir imagen
   */
  async uploadImage(file) {
    try {
      console.log('📥 [uploadImage] Archivo recibido:', file ? {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      } : file);
      this.validateImage(file);
      // Subir a ImgBB
      const result = await this.uploadToImgBB(file.buffer, file.originalname);
      return {
        success: true,
        data: result,
        message: 'Imagen subida exitosamente'
      };
    } catch (error) {
      console.error('❌ Error en uploadImage:', error);
      // Devuelve el error real al frontend para depuración
      return {
        success: false,
        error: error.message || String(error),
        message: error.message || 'Error al subir imagen'
      };
    }
  }
}

module.exports = new ImageUploadService();
