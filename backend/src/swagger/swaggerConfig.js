const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar documentación modular
const authDocs = require('./docs/auth');
const productosDocs = require('./docs/productos');
const categoriasDocs = require('./docs/categorias');
const imagesDocs = require('./docs/images');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PESCA API',
      version: '1.0.0',
      description: `
        # API de Gestión de Productos PESCA
        
        Esta API REST permite gestionar un catálogo de productos pesqueros con sus categorías correspondientes, 
        además de manejar la autenticación de administradores y subida de imágenes.
        
        ## Características principales:
        - 🐟 **Gestión de Productos**: CRUD completo de productos pesqueros
        - 🏷️ **Gestión de Categorías**: Organización por categorías
        - 🔐 **Autenticación JWT**: Sistema seguro para administradores
        - 📸 **Subida de Imágenes**: Integración con ImgBB para imágenes
        - 🔄 **Relaciones**: Productos pueden tener múltiples categorías
        
        ## Autenticación
        
        Para acceder a los endpoints protegidos, necesitas:
        1. Hacer login en \`POST /api/auth/login\`
        2. Usar el token JWT en el header: \`Authorization: Bearer <token>\`
        
        ## Endpoints Públicos vs Protegidos
        
        - **Públicos**: Consulta de productos y categorías (GET)
        - **Protegidos**: Creación, edición, eliminación (POST, PUT, DELETE)
        
        ## Frontend
        
        Esta API trabaja junto con una aplicación React que incluye:
        - 🏪 **Catálogo público** de productos
        - 👨‍💼 **Panel de administración** para gestión
        - 🛒 **Carrito de compras** funcional
        - 📱 **Diseño responsive** para móviles
      `,
      contact: {
        name: 'Soporte API PESCA',
        email: 'soporte@pesca.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://tu-api-produccion.com/api',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtenido del endpoint de login. Formato: `Bearer <token>`'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de acceso faltante o inválido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Token inválido o expirado' }
                }
              }
            }
          }
        },
        ForbiddenError: {
          description: 'Acceso denegado - Se requieren permisos de administrador',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Acceso denegado' }
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Error de validación en los datos enviados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Datos inválidos' },
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', example: 'nombre' },
                        message: { type: 'string', example: 'El nombre es requerido' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ServerError: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Error interno del servidor' }
                }
              }
            }
          }
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Estado de la API'
      },
      {
        name: 'Auth',
        description: 'Autenticación y autorización de administradores'
      },
      {
        name: 'Productos',
        description: 'Gestión del catálogo de productos pesqueros'
      },
      {
        name: 'Categorías',
        description: 'Gestión de categorías para clasificar productos'
      },
      {
        name: 'Imágenes',
        description: 'Subida y gestión de imágenes de productos'
      }
    ],
    paths: {
      // Combinar todas las rutas de los módulos
      ...authDocs.paths,
      ...productosDocs.paths,
      ...categoriasDocs.paths,
      ...imagesDocs.paths,
      
      // Health check endpoint
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Estado de la API',
          description: 'Verifica que la API esté funcionando correctamente',
          responses: {
            200: {
              description: 'API funcionando correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'API funcionando correctamente' },
                      timestamp: { 
                        type: 'string', 
                        format: 'date-time',
                        example: '2025-07-15T04:30:00.000Z'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: [], // No necesitamos APIs adicionales ya que definimos todo manualmente
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
  swaggerJsdoc
};
