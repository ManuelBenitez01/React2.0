const ImageUploadService = require('../services/ImageUploadService');

class ImageController {
  /**
   * Subir una imagen
   * POST /api/images/upload
   */
  static async uploadImage(req, res) {
    try {
      // Verificar que se recibió un archivo
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No se recibió ningún archivo de imagen'
        });
      }

      console.log('📥 Recibiendo imagen para subir:', {
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: `${(req.file.size / 1024 / 1024).toFixed(2)}MB`
      });

      // Usar el servicio para subir la imagen
      const result = await ImageUploadService.uploadImage(req.file);

      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          data: {
            url: result.data.url,
            filename: result.data.filename,
            size: result.data.size,
            width: result.data.width,
            height: result.data.height
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error en uploadImage:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al subir imagen',
        error: error.message
      });
    }
  }

  /**
   * Verificar configuración de ImgBB
   * GET /api/images/status
   */
  static async getStatus(req, res) {
    try {
      const isConfigured = ImageUploadService.isConfigured();
      
      res.json({
        success: true,
        data: {
          imgbbConfigured: isConfigured,
          maxFileSize: '32MB',
          allowedFormats: ['JPG', 'PNG', 'GIF', 'WebP', 'BMP']
        },
        message: isConfigured 
          ? 'Servicio de imágenes configurado correctamente'
          : 'Servicio de imágenes no configurado. Configura IMGBB_API_KEY en .env'
      });

    } catch (error) {
      console.error('❌ Error en getStatus:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar estado del servicio',
        error: error.message
      });
    }
  }
}

module.exports = ImageController;
