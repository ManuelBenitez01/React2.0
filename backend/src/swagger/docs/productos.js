// Documentación Swagger para endpoints de productos
module.exports = {
  paths: {
    '/productos': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener todos los productos',
        description: `
          Retorna una lista paginada de todos los productos disponibles en el catálogo.
          
          **Características:**
          - Endpoint público (no requiere autenticación)
          - Incluye información de categorías asociadas
          - Productos ordenados por ID descendente (más recientes primero)
          - Ideal para mostrar el catálogo en el frontend público
        `,
        security: [], // Endpoint público
        parameters: [
          {
            name: 'limit',
            in: 'query',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20
            },
            description: 'Número máximo de productos a retornar'
          },
          {
            name: 'offset',
            in: 'query',
            schema: {
              type: 'integer',
              minimum: 0,
              default: 0
            },
            description: 'Número de productos a omitir (para paginación)'
          }
        ],
        responses: {
          200: {
            description: 'Lista de productos obtenida exitosamente',
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
                      example: 'Productos obtenidos exitosamente'
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/ProductoCompleto'
                      }
                    },
                    total: {
                      type: 'integer',
                      example: 45,
                      description: 'Total de productos en la base de datos'
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
      },
      post: {
        tags: ['Productos'],
        summary: 'Crear un nuevo producto',
        description: `
          Crea un nuevo producto en el catálogo.
          
          **Requiere autenticación de administrador.**
          
          El producto puede ser asociado con una o múltiples categorías existentes.
          Si se especifican categorías que no existen, serán ignoradas.
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          description: 'Datos del nuevo producto',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductoInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Producto creado exitosamente',
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
                      example: 'Producto creado exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/ProductoCompleto'
                    }
                  }
                }
              }
            }
          },
          400: {
            $ref: '#/components/responses/ValidationError'
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/productos/{id}': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener un producto específico',
        description: `
          Retorna los detalles de un producto específico por su ID.
          
          **Características:**
          - Endpoint público (no requiere autenticación)
          - Incluye todas las categorías asociadas al producto
          - Ideal para páginas de detalle de producto
        `,
        security: [], // Endpoint público
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            },
            description: 'ID único del producto',
            example: 1
          }
        ],
        responses: {
          200: {
            description: 'Producto encontrado',
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
                      example: 'Producto obtenido exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/ProductoCompleto'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Producto no encontrado',
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
                      example: 'Producto no encontrado'
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
      },
      put: {
        tags: ['Productos'],
        summary: 'Actualizar un producto existente',
        description: `
          Actualiza los datos de un producto existente.
          
          **Requiere autenticación de administrador.**
          
          Todos los campos son opcionales. Solo se actualizarán los campos proporcionados.
          Las categorías se reemplazarán completamente por las especificadas.
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            },
            description: 'ID único del producto a actualizar'
          }
        ],
        requestBody: {
          required: true,
          description: 'Datos actualizados del producto',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductoInputOpcional'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Producto actualizado exitosamente',
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
                      example: 'Producto actualizado exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/ProductoCompleto'
                    }
                  }
                }
              }
            }
          },
          400: {
            $ref: '#/components/responses/ValidationError'
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError'
          },
          404: {
            description: 'Producto no encontrado',
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
                      example: 'Producto no encontrado'
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
      },
      delete: {
        tags: ['Productos'],
        summary: 'Eliminar un producto',
        description: `
          Elimina un producto del catálogo de forma permanente.
          
          **Requiere autenticación de administrador.**
          
          ⚠️ **ATENCIÓN**: Esta operación es irreversible. 
          También se eliminarán todas las asociaciones del producto con categorías.
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            },
            description: 'ID único del producto a eliminar'
          }
        ],
        responses: {
          200: {
            description: 'Producto eliminado exitosamente',
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
                      example: 'Producto eliminado exitosamente'
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
            description: 'Producto no encontrado',
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
                      example: 'Producto no encontrado'
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
      ProductoCompleto: {
        type: 'object',
        description: 'Producto con toda su información y categorías asociadas',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID único del producto'
          },
          nombre: {
            type: 'string',
            example: 'Salmón Atlántico Fresco',
            description: 'Nombre del producto'
          },
          descripcion: {
            type: 'string',
            example: 'Salmón fresco del Atlántico, ideal para preparaciones gourmet',
            description: 'Descripción detallada del producto'
          },
          precio: {
            type: 'number',
            format: 'decimal',
            example: 25.99,
            description: 'Precio del producto en la moneda local'
          },
          imagen_url: {
            type: 'string',
            format: 'url',
            example: 'https://i.ibb.co/abcd123/salmon.jpg',
            description: 'URL de la imagen del producto (alojada en ImgBB)'
          },
          categoria_principal: {
            type: 'string',
            example: 'Pescados Frescos',
            description: 'Nombre de la categoría principal del producto'
          },
          disponible: {
            type: 'boolean',
            example: true,
            description: 'Indica si el producto está disponible para la venta'
          },
          stock: {
            type: 'integer',
            example: 15,
            minimum: 0,
            description: 'Cantidad disponible en inventario'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T10:30:00.000Z',
            description: 'Fecha y hora de creación del producto'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T14:45:00.000Z',
            description: 'Fecha y hora de la última actualización'
          },
          categorias: {
            type: 'array',
            description: 'Lista de todas las categorías asociadas al producto',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1
                },
                nombre: {
                  type: 'string',
                  example: 'Pescados Frescos'
                },
                descripcion: {
                  type: 'string',
                  example: 'Pescados frescos del día'
                }
              }
            }
          }
        }
      },
      ProductoInput: {
        type: 'object',
        required: ['nombre', 'precio'],
        description: 'Datos requeridos para crear un nuevo producto',
        properties: {
          nombre: {
            type: 'string',
            minLength: 2,
            maxLength: 255,
            example: 'Salmón Atlántico Fresco',
            description: 'Nombre del producto (requerido)'
          },
          descripcion: {
            type: 'string',
            maxLength: 1000,
            example: 'Salmón fresco del Atlántico, ideal para preparaciones gourmet',
            description: 'Descripción detallada del producto'
          },
          precio: {
            type: 'number',
            format: 'decimal',
            minimum: 0,
            example: 25.99,
            description: 'Precio del producto (requerido)'
          },
          imagen_url: {
            type: 'string',
            format: 'url',
            example: 'https://i.ibb.co/abcd123/salmon.jpg',
            description: 'URL de la imagen del producto'
          },
          categoria_principal: {
            type: 'string',
            example: 'Pescados Frescos',
            description: 'Nombre de la categoría principal'
          },
          disponible: {
            type: 'boolean',
            example: true,
            default: true,
            description: 'Disponibilidad del producto'
          },
          stock: {
            type: 'integer',
            minimum: 0,
            example: 15,
            default: 0,
            description: 'Cantidad en inventario'
          },
          categoria_ids: {
            type: 'array',
            items: {
              type: 'integer',
              minimum: 1
            },
            example: [1, 3, 5],
            description: 'IDs de las categorías a asociar con el producto'
          }
        }
      },
      ProductoInputOpcional: {
        type: 'object',
        description: 'Datos opcionales para actualizar un producto existente',
        properties: {
          nombre: {
            type: 'string',
            minLength: 2,
            maxLength: 255,
            example: 'Salmón Atlántico Premium',
            description: 'Nuevo nombre del producto'
          },
          descripcion: {
            type: 'string',
            maxLength: 1000,
            example: 'Salmón premium del Atlántico Norte',
            description: 'Nueva descripción del producto'
          },
          precio: {
            type: 'number',
            format: 'decimal',
            minimum: 0,
            example: 29.99,
            description: 'Nuevo precio del producto'
          },
          imagen_url: {
            type: 'string',
            format: 'url',
            example: 'https://i.ibb.co/xyz789/salmon-premium.jpg',
            description: 'Nueva URL de imagen'
          },
          categoria_principal: {
            type: 'string',
            example: 'Pescados Premium',
            description: 'Nueva categoría principal'
          },
          disponible: {
            type: 'boolean',
            example: false,
            description: 'Nueva disponibilidad'
          },
          stock: {
            type: 'integer',
            minimum: 0,
            example: 8,
            description: 'Nuevo stock'
          },
          categoria_ids: {
            type: 'array',
            items: {
              type: 'integer',
              minimum: 1
            },
            example: [1, 2, 4],
            description: 'Nuevas categorías (reemplaza las existentes)'
          }
        }
      }
    }
  }
};
