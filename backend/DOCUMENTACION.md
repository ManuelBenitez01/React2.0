# 📚 DOCUMENTACIÓN COMPLETA DEL BACKEND

## 🏗️ ESTRUCTURA DEL PROYECTO

```
backend/
├── 📄 package.json          # Configuración del proyecto y dependencias
├── 📄 .env                  # Variables de entorno (credenciales BD)
├── 📄 .env.example          # Ejemplo de variables de entorno
├── 📁 src/                  # Código fuente principal
│   ├── 📄 index.js          # Archivo principal del servidor
│   ├── 📁 config/           # Configuraciones
│   │   └── database.js      # Configuración de conexión a MySQL
│   ├── 📁 controllers/      # Controladores (lógica de negocio)
│   │   ├── ProductoController.js     # CRUD de productos
│   │   └── CategoriaController.js    # CRUD de categorías
│   ├── 📁 models/           # Modelos de datos
│   │   ├── Producto.js      # Modelo de producto (interacción BD)
│   │   └── Categoria.js     # Modelo de categoría (interacción BD)
│   ├── 📁 routes/           # Definición de rutas
│   │   ├── index.js         # Rutas principales
│   │   ├── productos.js     # Rutas específicas de productos
│   │   └── categorias.js    # Rutas específicas de categorías
│   └── 📁 schemas/          # Validaciones
│       └── validation.js    # Esquemas de validación con Zod
└── 📁 node_modules/         # Dependencias instaladas
```

## 🔧 TECNOLOGÍAS UTILIZADAS

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para APIs REST
- **MySQL2**: Cliente para base de datos MySQL
- **Zod**: Librería de validación y tipado
- **CORS**: Middleware para permitir peticiones cross-origin
- **dotenv**: Gestión de variables de entorno

## 🎯 FUNCIONALIDADES PRINCIPALES

1. **Gestión de Productos**: CRUD completo con stock y categorías
2. **Gestión de Categorías**: CRUD básico de categorías
3. **Validación de datos**: Validación robusta con Zod
4. **Manejo de errores**: Respuestas consistentes de error
5. **Conexión a BD**: Pool de conexiones MySQL
6. **CORS habilitado**: Permite peticiones desde el frontend

## 📡 ENDPOINTS DISPONIBLES

### Productos:
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Categorías:
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría
- `GET /api/categorias/:id/productos` - Productos de una categoría

### Utilidad:
- `GET /api/health` - Estado de la API
- `GET /` - Información de la API

## 🗄️ ESTRUCTURA DE BASE DE DATOS

### Tabla: productos
```sql
- id (INT PRIMARY KEY)
- nombre (VARCHAR)
- precio (DECIMAL)
- imagen (TEXT)
- descripcion (TEXT)
- stock (BOOLEAN)
- cantidad_stock (INT)
```

### Tabla: categorias
```sql
- id (INT PRIMARY KEY)
- nombre (VARCHAR)
```

### Tabla: producto_categoria (relación many-to-many)
```sql
- producto_id (INT FOREIGN KEY)
- categoria_id (INT FOREIGN KEY)
```
