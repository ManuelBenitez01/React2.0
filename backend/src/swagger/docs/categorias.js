// Documentación Swagger para endpoints de categorías
module.exports = {
  paths: {
    '/categorias': {
      get: {
        tags: ['Categorías'],
        summary: 'Obtener todas las categorías',
        description: `
          Retorna una lista de todas las categorías disponibles para clasificar productos.
          
          **Características:**
          - Endpoint público (no requiere autenticación)
          - Incluye el conteo de productos por categoría
          - Categorías ordenadas alfabéticamente por nombre
          - Ideal para menús de navegación y filtros
        `,
        security: [], // Endpoint público
        responses: {
          200: {
            description: 'Lista de categorías obtenida exitosamente',
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
                      example: 'Categorías obtenidas exitosamente'
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/CategoriaCompleta'
                      }
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
        tags: ['Categorías'],
        summary: 'Crear una nueva categoría',
        description: `
          Crea una nueva categoría para clasificar productos.
          
          **Requiere autenticación de administrador.**
          
          Las categorías permiten organizar el catálogo de productos 
          y facilitar la navegación a los usuarios.
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          description: 'Datos de la nueva categoría',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoriaInput'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Categoría creada exitosamente',
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
                      example: 'Categoría creada exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/CategoriaCompleta'
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
          409: {
            description: 'Categoría duplicada',
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
                      example: 'Ya existe una categoría con ese nombre'
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
    '/categorias/{id}': {
      get: {
        tags: ['Categorías'],
        summary: 'Obtener una categoría específica',
        description: `
          Retorna los detalles de una categoría específica por su ID.
          
          **Características:**
          - Endpoint público (no requiere autenticación)
          - Incluye la lista de productos asociados a la categoría
          - Útil para páginas de categoría y filtros
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
            description: 'ID único de la categoría',
            example: 1
          }
        ],
        responses: {
          200: {
            description: 'Categoría encontrada',
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
                      example: 'Categoría obtenida exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/CategoriaConProductos'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Categoría no encontrada',
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
                      example: 'Categoría no encontrada'
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
        tags: ['Categorías'],
        summary: 'Actualizar una categoría existente',
        description: `
          Actualiza los datos de una categoría existente.
          
          **Requiere autenticación de administrador.**
          
          Todos los campos son opcionales. Solo se actualizarán los campos proporcionados.
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
            description: 'ID único de la categoría a actualizar'
          }
        ],
        requestBody: {
          required: true,
          description: 'Datos actualizados de la categoría',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CategoriaInputOpcional'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Categoría actualizada exitosamente',
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
                      example: 'Categoría actualizada exitosamente'
                    },
                    data: {
                      $ref: '#/components/schemas/CategoriaCompleta'
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
            description: 'Categoría no encontrada',
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
                      example: 'Categoría no encontrada'
                    }
                  }
                }
              }
            }
          },
          409: {
            description: 'Nombre de categoría duplicado',
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
                      example: 'Ya existe una categoría con ese nombre'
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
        tags: ['Categorías'],
        summary: 'Eliminar una categoría',
        description: `
          Elimina una categoría del sistema.
          
          **Requiere autenticación de administrador.**
          
          ⚠️ **ATENCIÓN**: Esta operación eliminará:
          - La categoría seleccionada
          - Todas las asociaciones con productos
          
          Los productos asociados NO se eliminarán, solo perderán esta categoría.
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
            description: 'ID único de la categoría a eliminar'
          }
        ],
        responses: {
          200: {
            description: 'Categoría eliminada exitosamente',
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
                      example: 'Categoría eliminada exitosamente'
                    },
                    detalles: {
                      type: 'object',
                      properties: {
                        productos_afectados: {
                          type: 'integer',
                          example: 5,
                          description: 'Número de productos que perdieron esta categoría'
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
            description: 'Categoría no encontrada',
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
                      example: 'Categoría no encontrada'
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
      CategoriaCompleta: {
        type: 'object',
        description: 'Categoría con información completa',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID único de la categoría'
          },
          nombre: {
            type: 'string',
            example: 'Pescados Frescos',
            description: 'Nombre de la categoría'
          },
          descripcion: {
            type: 'string',
            example: 'Pescados frescos del día, directamente del mar',
            description: 'Descripción detallada de la categoría'
          },
          activa: {
            type: 'boolean',
            example: true,
            description: 'Indica si la categoría está activa'
          },
          productos_count: {
            type: 'integer',
            example: 12,
            description: 'Número de productos asociados a esta categoría'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-10T08:00:00.000Z',
            description: 'Fecha y hora de creación'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-01-15T16:30:00.000Z',
            description: 'Fecha y hora de última actualización'
          }
        }
      },
      CategoriaConProductos: {
        allOf: [
          {
            $ref: '#/components/schemas/CategoriaCompleta'
          },
          {
            type: 'object',
            properties: {
              productos: {
                type: 'array',
                description: 'Lista de productos asociados a la categoría',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1
                    },
                    nombre: {
                      type: 'string',
                      example: 'Salmón Atlántico Fresco'
                    },
                    precio: {
                      type: 'number',
                      example: 25.99
                    },
                    imagen_url: {
                      type: 'string',
                      example: 'https://i.ibb.co/abcd123/salmon.jpg'
                    },
                    disponible: {
                      type: 'boolean',
                      example: true
                    }
                  }
                }
              }
            }
          }
        ]
      },
      CategoriaInput: {
        type: 'object',
        required: ['nombre'],
        description: 'Datos requeridos para crear una nueva categoría',
        properties: {
          nombre: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Pescados Frescos',
            description: 'Nombre de la categoría (requerido y único)'
          },
          descripcion: {
            type: 'string',
            maxLength: 500,
            example: 'Pescados frescos del día, directamente del mar',
            description: 'Descripción detallada de la categoría'
          },
          activa: {
            type: 'boolean',
            example: true,
            default: true,
            description: 'Estado de la categoría'
          }
        }
      },
      CategoriaInputOpcional: {
        type: 'object',
        description: 'Datos opcionales para actualizar una categoría existente',
        properties: {
          nombre: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Pescados Premium',
            description: 'Nuevo nombre de la categoría'
          },
          descripcion: {
            type: 'string',
            maxLength: 500,
            example: 'Pescados de calidad premium importados',
            description: 'Nueva descripción de la categoría'
          },
          activa: {
            type: 'boolean',
            example: false,
            description: 'Nuevo estado de la categoría'
          }
        }
      }
    }
  }
};
