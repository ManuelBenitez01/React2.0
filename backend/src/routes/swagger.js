// Ruta para servir la documentación Swagger
const express = require('express');
const router = express.Router();
const { specs, swaggerUi } = require('../swagger/swaggerConfig');

// Middleware para servir Swagger UI
router.use('/', swaggerUi.serve);

// Ruta principal de Swagger UI
router.get('/', swaggerUi.setup(specs, {
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { 
      color: #1f4e79; 
      font-size: 2.5em;
    }
    .swagger-ui .info .description { 
      font-size: 1.1em;
      line-height: 1.6;
    }
  `,
  customSiteTitle: 'PESCA API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
}));

// Ruta para obtener el JSON de la especificación (útil para herramientas externas)
router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

module.exports = router;
