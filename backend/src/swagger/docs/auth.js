// Documentación Swagger para endpoints de autenticación
module.exports = {
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesión de administrador',
        description: `
          Permite a un administrador autenticarse en el sistema.
          
          **Credenciales por defecto:**
          - Usuario: \`admin\`
          - Contraseña: \`admin123\`
          
          Al autenticarse correctamente, el sistema devuelve un token JWT que debe ser incluido 
          en el header \`Authorization\` de las peticiones protegidas.
        `,
        security: [], // Este endpoint no requiere autenticación
        requestBody: {
          required: true,
          description: 'Credenciales del administrador',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: {
                    type: 'string',
                    description: 'Nombre de usuario del administrador',
                    example: 'admin',
                    minLength: 3,
                    maxLength: 50
                  },
                  password: {
                    type: 'string',
                    description: 'Contraseña del administrador',
                    example: 'admin123',
                    minLength: 6,
                    maxLength: 100
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login exitoso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                      description: 'Indica si la operación fue exitosa'
                    },
                    message: {
                      type: 'string',
                      example: 'Login exitoso',
                      description: 'Mensaje descriptivo del resultado'
                    },
                    token: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      description: 'Token JWT para autenticación posterior'
                    },
                    admin: {
                      type: 'object',
                      description: 'Información del administrador autenticado',
                      properties: {
                        id: {
                          type: 'integer',
                          example: 1,
                          description: 'ID único del administrador'
                        },
                        username: {
                          type: 'string',
                          example: 'admin',
                          description: 'Nombre de usuario'
                        },
                        role: {
                          type: 'string',
                          example: 'admin',
                          description: 'Rol del usuario en el sistema'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          401: {
            description: 'Credenciales inválidas',
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
                      example: 'Credenciales inválidas'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Datos de entrada inválidos',
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
                      example: 'Username y password son requeridos'
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
    '/auth/verify': {
      get: {
        tags: ['Auth'],
        summary: 'Verificar token JWT',
        description: `
          Verifica si el token JWT proporcionado es válido y no ha expirado.
          
          Este endpoint es útil para validar la sesión del usuario antes de realizar 
          operaciones que requieren autenticación.
        `,
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Token válido',
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
                      example: 'Token válido'
                    },
                    admin: {
                      type: 'object',
                      description: 'Información del administrador autenticado',
                      properties: {
                        id: {
                          type: 'integer',
                          example: 1
                        },
                        username: {
                          type: 'string',
                          example: 'admin'
                        },
                        role: {
                          type: 'string',
                          example: 'admin'
                        },
                        iat: {
                          type: 'integer',
                          example: 1673904000,
                          description: 'Timestamp de creación del token'
                        },
                        exp: {
                          type: 'integer',
                          example: 1673990400,
                          description: 'Timestamp de expiración del token'
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
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    }
  }
};
