// Documentación Swagger para endpoints de manejo de imágenes
module.exports = {
  paths: {
    '/images/upload': {
      post: {
        tags: ['Imágenes'],
        summary: 'Subir imagen de producto',
        description: `
          Sube una imagen a ImgBB y devuelve la URL para usar en productos.
          
          **Requiere autenticación de administrador.**
          
          **Características:**
          - Integración con ImgBB para almacenamiento externo
          - Soporte para múltiples formatos (JPG, PNG, GIF, WebP)
          - Redimensionamiento automático si es necesario
          - URLs permanentes y optimizadas para web
          
          **Proceso:**
          1. La imagen se sube a ImgBB usando la API key configurada
          2. Se retorna la URL permanente de la imagen
          3. Esta URL puede usarse en el campo \`imagen_url\` de productos
          
          **Límites:**
          - Tamaño máximo: 16 MB por imagen
          - Formatos soportados: JPG, JPEG, PNG, GIF, WebP, BMP
          - La imagen queda alojada permanentemente en ImgBB
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          description: 'Archivo de imagen a subir',
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['image'],
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Archivo de imagen (JPG, PNG, GIF, WebP, BMP)',
                    example: 'archivo-imagen.jpg'
                  },
                  name: {
                    type: 'string',
                    maxLength: 100,
                    example: 'salmon-atlantico-producto',
                    description: 'Nombre opcional para la imagen (se usa como título en ImgBB)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Imagen subida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                      description: 'Indica si la subida fue exitosa'
                    },
                    message: {
                      type: 'string',
                      example: 'Imagen subida exitosamente',
                      description: 'Mensaje descriptivo del resultado'
                    },
                    data: {
                      type: 'object',
                      description: 'Información de la imagen subida',
                      properties: {
                        url: {
                          type: 'string',
                          format: 'url',
                          example: 'https://i.ibb.co/AbCd123/salmon-atlantico.jpg',
                          description: 'URL directa de la imagen subida (usar en productos)'
                        },
                        delete_url: {
                          type: 'string',
                          format: 'url',
                          example: 'https://ibb.co/AbCd123/delete/xyz789',
                          description: 'URL para eliminar la imagen (guardar para futuras eliminaciones)'
                        },
                        thumbnail: {
                          type: 'string',
                          format: 'url',
                          example: 'https://i.ibb.co/AbCd123/thumb-salmon-atlantico.jpg',
                          description: 'URL de la miniatura de la imagen'
                        },
                        size: {
                          type: 'integer',
                          example: 245760,
                          description: 'Tamaño del archivo en bytes'
                        },
                        width: {
                          type: 'integer',
                          example: 800,
                          description: 'Ancho de la imagen en píxeles'
                        },
                        height: {
                          type: 'integer',
                          example: 600,
                          description: 'Alto de la imagen en píxeles'
                        },
                        filename: {
                          type: 'string',
                          example: 'salmon-atlantico.jpg',
                          description: 'Nombre del archivo original'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Error en los datos de entrada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      examples: {
                        noFile: {
                          value: 'No se proporcionó ningún archivo de imagen'
                        },
                        invalidFormat: {
                          value: 'Formato de archivo no soportado. Use JPG, PNG, GIF, WebP o BMP'
                        },
                        tooLarge: {
                          value: 'El archivo es demasiado grande. Máximo 16 MB'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError'
          },
          413: {
            description: 'Archivo demasiado grande',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      example: 'El archivo supera el límite de 16 MB'
                    }
                  }
                }
              }
            }
          },
          502: {
            description: 'Error del servicio ImgBB',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      example: 'Error al subir imagen a ImgBB'
                    },
                    error: {
                      type: 'string',
                      example: 'ImgBB API is temporarily unavailable'
                    }
                  }
                }
              }
            }
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/images/delete': {
      delete: {
        tags: ['Imágenes'],
        summary: 'Eliminar imagen de ImgBB',
        description: `
          Elimina una imagen previamente subida a ImgBB usando su URL de eliminación.
          
          **Requiere autenticación de administrador.**
          
          **Importante:**
          - Solo funciona con la URL de eliminación devuelta al subir la imagen
          - Una vez eliminada, la imagen no se puede recuperar
          - Se recomienda eliminar imágenes solo cuando se elimine el producto
          
          **Uso recomendado:**
          1. Guardar la \`delete_url\` al subir la imagen
          2. Usar esta URL para eliminar cuando sea necesario
          3. Actualizar el producto para remover la \`imagen_url\`
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          description: 'URL de eliminación de la imagen',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['deleteUrl'],
                properties: {
                  deleteUrl: {
                    type: 'string',
                    format: 'url',
                    example: 'https://ibb.co/AbCd123/delete/xyz789',
                    description: 'URL de eliminación obtenida al subir la imagen'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Imagen eliminada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    message: {
                      type: 'string',
                      example: 'Imagen eliminada exitosamente'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'URL de eliminación inválida',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      examples: {
                        noUrl: {
                          value: 'Se requiere la URL de eliminación'
                        },
                        invalidUrl: {
                          value: 'URL de eliminación inválida o expirada'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError'
          },
          404: {
            description: 'Imagen no encontrada o ya eliminada',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      example: 'La imagen no existe o ya fue eliminada'
                    }
                  }
                }
              }
            }
          },
          502: {
            description: 'Error del servicio ImgBB',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false
                    },
                    message: {
                      type: 'string',
                      example: 'Error al eliminar imagen de ImgBB'
                    }
                  }
                }
              }
            }
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    }
  },
  
  components: {
    schemas: {
      ImageUploadResponse: {
        type: 'object',
        description: 'Respuesta exitosa de subida de imagen',
        properties: {
          url: {
            type: 'string',
            format: 'url',
            example: 'https://i.ibb.co/AbCd123/salmon-atlantico.jpg',
            description: 'URL directa de la imagen (usar en productos)'
          },
          delete_url: {
            type: 'string',
            format: 'url',
            example: 'https://ibb.co/AbCd123/delete/xyz789',
            description: 'URL para eliminar la imagen'
          },
          thumbnail: {
            type: 'string',
            format: 'url',
            example: 'https://i.ibb.co/AbCd123/thumb-salmon-atlantico.jpg',
            description: 'URL de la miniatura'
          },
          size: {
            type: 'integer',
            example: 245760,
            description: 'Tamaño en bytes'
          },
          width: {
            type: 'integer',
            example: 800,
            description: 'Ancho en píxeles'
          },
          height: {
            type: 'integer',
            example: 600,
            description: 'Alto en píxeles'
          },
          filename: {
            type: 'string',
            example: 'salmon-atlantico.jpg',
            description: 'Nombre del archivo'
          }
        }
      },
      ImageDeleteRequest: {
        type: 'object',
        required: ['deleteUrl'],
        description: 'Petición para eliminar una imagen',
        properties: {
          deleteUrl: {
            type: 'string',
            format: 'url',
            example: 'https://ibb.co/AbCd123/delete/xyz789',
            description: 'URL de eliminación de ImgBB'
          }
        }
      }
    }
  }
};
