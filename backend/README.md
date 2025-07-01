# API de Productos y Categorías

API REST desarrollada con Node.js, Express, MySQL2, CORS y Zod para gestión de productos y categorías.

## 🚀 Características

- **Node.js** con Express.js
- **MySQL2** para base de datos
- **Zod** para validación de datos
- **CORS** habilitado
- Relaciones muchos a muchos entre productos y categorías
- Validación robusta de datos
- Manejo de errores centralizado
- Logging de requests

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus datos de MySQL
```

4. Configura tu base de datos MySQL con las siguientes tablas:

```sql
CREATE TABLE productos (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    precio DECIMAL(10,2),
    imagen VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE
);

CREATE TABLE producto_categoria (
    producto_id INT,
    categoria_id INT,
    PRIMARY KEY (producto_id, categoria_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
```

## 🏃‍♂️ Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

La API estará disponible en `http://localhost:3000`

## 📚 Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

### Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Obtener todas las categorías |
| GET | `/api/categorias/:id` | Obtener categoría por ID |
| POST | `/api/categorias` | Crear nueva categoría |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |
| GET | `/api/categorias/:id/productos` | Obtener productos de una categoría |

### Otros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado de la API |

## 📝 Ejemplos de uso

### Crear un producto
```bash
POST /api/productos
Content-Type: application/json

{
  "id": 1,
  "nombre": "Laptop Gaming",
  "precio": 1299.99,
  "imagen": "https://ejemplo.com/laptop.jpg",
  "descripcion": "Laptop para gaming de alta gama",
  "categorias": [1, 2]
}
```

### Crear una categoría
```bash
POST /api/categorias
Content-Type: application/json

{
  "nombre": "Electrónicos"
}
```

### Actualizar un producto
```bash
PUT /api/productos/1
Content-Type: application/json

{
  "precio": 1199.99,
  "categorias": [1]
}
```

## 🔧 Configuración

### Variables de entorno

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
DB_PORT=3306
PORT=3000
```

## 🏗️ Estructura del proyecto

```
src/
├── config/
│   └── database.js         # Configuración de MySQL
├── controllers/
│   ├── ProductoController.js
│   └── CategoriaController.js
├── models/
│   ├── Producto.js
│   └── Categoria.js
├── routes/
│   ├── index.js
│   ├── productos.js
│   └── categorias.js
├── schemas/
│   └── validation.js       # Esquemas de validación Zod
└── index.js                # Punto de entrada
```

## ✅ Validaciones

La API incluye validaciones robustas usando Zod:

- **Productos**: ID requerido, nombre (1-255 chars), precio positivo, URL de imagen válida
- **Categorías**: Nombre único (1-100 chars)
- **IDs**: Números enteros positivos

## 🛡️ Manejo de errores

- Validación de datos con Zod
- Manejo de errores de base de datos
- Respuestas consistentes con formato JSON
- Logging de errores

## 📄 Licencia

ISC

