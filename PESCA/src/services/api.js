// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Función helper para manejar las respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Error ${response.status}`;
    
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const detailedErrors = errorData.errors.map(err => err.message || err.code).join(', ');
        errorMessage += `: ${detailedErrors}`;
      }
    } catch {
      errorMessage += `: ${errorText}`;
    }
    
    throw new Error(errorMessage);
  }
  return await response.json();
};

// Función para validar URL de imagen mejorada
const validarImagenUrl = (imagen) => {
  if (!imagen || imagen.trim() === '') return '';
  
  // Lista de dominios problemáticos
  const dominiosProblematicos = [
    'scontent.faep',
    'fbcdn.net',
    'instagram.com',
    'cdninstagram.com'
  ];
  
  // Verificar si es un dominio problemático
  const esProblematico = dominiosProblematicos.some(dominio => 
    imagen.includes(dominio)
  );
  
  if (esProblematico) {
    console.warn('⚠️ URL de Facebook/Instagram detectada. Usando imagen por defecto.');
    return '/logo.png';
  }
  
  // Si empieza con /, mantener como está
  if (imagen.startsWith('/')) {
    return imagen;
  }
  
  // Si ya es una URL válida, devolverla
  if (imagen.startsWith('http')) {
    return imagen;
  }
  
  // Si no es válida, tratar como nombre de archivo
  return `/${imagen}`;
};

// Función para mapear los datos del backend al formato del frontend
const mapearProducto = (producto) => {
  console.log('Mapeando producto desde backend:', producto);
  
  const mapeado = {
    id: producto.id,
    Nombre: producto.nombre,
    Precio: parseFloat(producto.precio),
    Image: validarImagenUrl(producto.imagen),
    Descripcion: producto.descripcion || '',
    Categoria: producto.categorias || [],
    Stock: producto.stock !== undefined ? Boolean(producto.stock) : true,
    CantidadStock: producto.cantidad_stock !== undefined ? parseInt(producto.cantidad_stock) : 0
  };
  
  console.log('Producto mapeado:', mapeado);
  return mapeado;
};

// Función para convertir nombres de categorías a IDs
const convertirCategoriasAIds = async (categorias) => {
  if (!Array.isArray(categorias)) return [];
  
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);
    const data = await handleResponse(response);
    const todasCategorias = data.data || [];
    
    const ids = categorias.map(nombreCategoria => {
      const categoria = todasCategorias.find(cat => cat.nombre === nombreCategoria);
      return categoria ? categoria.id : null;
    }).filter(id => id !== null);
    
    return ids;
  } catch (error) {
    console.error('Error al convertir categorías:', error);
    return [];
  }
};

// Función para mapear datos del frontend al formato del backend
const mapearProductoParaBackend = (producto) => {
  return {
    nombre: producto.Nombre,
    precio: Number(producto.Precio),
    imagen: validarImagenUrl(producto.Image),
    descripcion: producto.Descripcion || '',
    stock: Boolean(producto.Stock),
    cantidad_stock: Number(producto.CantidadStock) || 0
  };
};

// Servicio de productos
export const productosService = {
  // Obtener todos los productos
  obtenerTodos: async () => {
    console.log('📋 Obteniendo todos los productos...');
    try {
      const response = await fetch(`${API_BASE_URL}/productos`);
      const data = await handleResponse(response);
      
      const productos = (data.data || []).map(mapearProducto);
      console.log('✅ Productos obtenidos:', productos.length);
      
      return {
        success: true,
        data: productos
      };
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  obtenerPorId: async (id) => {
    console.log('🔍 Obteniendo producto por ID:', id);
    try {
      // Validar ID - CORREGIDO para aceptar 0
      if (id === null || id === undefined || isNaN(id) || id < 0) {
        throw new Error('ID de producto inválido');
      }

      const response = await fetch(`${API_BASE_URL}/productos/${id}`);
      const data = await handleResponse(response);
      
      const producto = mapearProducto(data.data);
      console.log('✅ Producto obtenido:', producto);
      
      return {
        success: true,
        data: producto
      };
    } catch (error) {
      console.error('❌ Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear nuevo producto
  crear: async (producto) => {
    console.log('➕ Creando nuevo producto:', producto);
    try {
      // Convertir categorías a IDs
      let categoriaIds = [];
      if (producto.Categoria && Array.isArray(producto.Categoria)) {
        categoriaIds = await convertirCategoriasAIds(producto.Categoria);
      }

      // Preparar datos
      const productoParaEnviar = {
        ...mapearProductoParaBackend(producto),
        categorias: categoriaIds
      };
      
      console.log('📤 Datos a enviar:', productoParaEnviar);
      
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoParaEnviar),
      });
      
      const data = await handleResponse(response);
      const productoCreado = mapearProducto(data.data);
      
      console.log('✅ Producto creado exitosamente:', productoCreado);
      
      return {
        success: true,
        data: productoCreado,
        message: 'Producto creado exitosamente'
      };
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      throw error;
    }
  },

  // Actualizar producto - VERSIÓN CORREGIDA
  actualizar: async (id, producto) => {
    console.log('🔄 Actualizando producto ID:', id);
    console.log('📝 Datos del producto:', producto);
    
    try {
      // Validar ID - CORREGIDO para aceptar 0
      if (id === null || id === undefined || isNaN(id) || id < 0) {
        throw new Error('ID de producto inválido');
      }

      // Convertir categorías a IDs si existen
      let categoriaIds = [];
      if (producto.Categoria && Array.isArray(producto.Categoria)) {
        categoriaIds = await convertirCategoriasAIds(producto.Categoria);
      }

      // Preparar datos para el backend
      const productoParaEnviar = {
        ...mapearProductoParaBackend(producto),
        categorias: categoriaIds
      };
      
      console.log('📤 Datos a enviar al backend:', productoParaEnviar);
      
      // Realizar petición PUT
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoParaEnviar),
      });
      
      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      // Manejar respuesta
      const data = await handleResponse(response);
      const productoActualizado = mapearProducto(data.data);
      
      console.log('✅ Producto actualizado exitosamente:', productoActualizado);
      
      return {
        success: true,
        data: productoActualizado,
        message: 'Producto actualizado exitosamente'
      };
      
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar producto - TAMBIÉN CORREGIDO
  eliminar: async (id) => {
    console.log('🗑️ Eliminando producto ID:', id);
    try {
      // Validar ID - CORREGIDO para aceptar 0
      if (id === null || id === undefined || isNaN(id) || id < 0) {
        throw new Error('ID de producto inválido');
      }

      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE',
      });
      
      const data = await handleResponse(response);
      console.log('✅ Producto eliminado exitosamente');
      
      return {
        success: true,
        message: 'Producto eliminado exitosamente'
      };
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      throw error;
    }
  }
};

// Servicio para categorías
export const categoriasService = {
  // Obtener todas las categorías
  obtenerTodas: async () => {
    console.log('📋 Obteniendo todas las categorías...');
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Categorías obtenidas:', data.data?.length || 0);
      
      return {
        success: true,
        data: data.data || []
      };
    } catch (error) {
      console.error('❌ Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener categoría por ID
  obtenerPorId: async (id) => {
    console.log('🔍 Obteniendo categoría por ID:', id);
    try {
      if (id === null || id === undefined || isNaN(id) || id < 0) {
        throw new Error('ID de categoría inválido');
      }

      const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Categoría obtenida:', data.data);
      
      return {
        success: true,
        data: data.data
      };
    } catch (error) {
      console.error('❌ Error al obtener categoría:', error);
      throw error;
    }
  },

  // Crear nueva categoría
  crear: async (categoria) => {
    console.log('➕ Creando nueva categoría:', categoria);
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Categoría creada exitosamente:', data.data);
      
      return {
        success: true,
        data: data.data,
        message: 'Categoría creada exitosamente'
      };
    } catch (error) {
      console.error('❌ Error al crear categoría:', error);
      throw error;
    }
  }
};
