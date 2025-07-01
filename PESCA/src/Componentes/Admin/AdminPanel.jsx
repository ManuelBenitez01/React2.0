import React, { useState, useEffect } from 'react';
import { productosService, categoriasService } from '../../services/api';
import './AdminPanel.css';

const AdminPanel = ({ onLogout }) => {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados para formularios
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  // NUEVO: Estado para categorías del producto
  const [categoriasProducto, setCategoriasProducto] = useState([]);

  // Estado del nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    Nombre: '',
    Precio: '',
    Image: '',
    Descripcion: '',
    Categoria: [],
    Stock: true,
    CantidadStock: 0
  });

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para cargar productos y categorías
  const cargarDatos = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('🔄 Cargando datos del admin...');
      
      // Cargar productos
      const productosResponse = await productosService.obtenerTodos();
      setProductos(productosResponse.data || []);
      
      // Cargar categorías directamente desde el backend
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        if (response.ok) {
          const categoriasData = await response.json();
          setCategorias(categoriasData.data || []);
        } else {
          console.warn('⚠️ No se pudieron cargar las categorías');
          setCategorias([]);
        }
      } catch (catError) {
        console.warn('⚠️ Error al cargar categorías:', catError);
        setCategorias([]);
      }
      
      console.log('✅ Datos cargados:', {
        productos: productosResponse.data?.length || 0,
        categorias: categorias.length
      });
      
    } catch (error) {
      console.error('❌ Error al cargar datos:', error);
      setError('Error al cargar los datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // CORREGIR: Función para cargar categorías del producto
  const cargarCategoriasProducto = async (productoId) => {
    try {
      console.log('🔍 Cargando categorías del producto ID:', productoId);
      setCategoriasProducto([]); // Limpiar antes de cargar
      
      const response = await fetch(`http://localhost:5000/api/productos/${productoId}/categorias`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Categorías del producto cargadas:', data);
        
        // Asegurar que tenemos el formato correcto
        const categoriasFormateadas = (data.data || []).map(cat => ({
          id: Number(cat.id),
          nombre: cat.nombre || cat.name || `Categoría ${cat.id}`
        }));
        
        setCategoriasProducto(categoriasFormateadas);
        console.log('📋 Categorías formateadas:', categoriasFormateadas);
        
      } else {
        console.warn('⚠️ No se pudieron cargar las categorías del producto:', response.status);
        setCategoriasProducto([]);
      }
    } catch (error) {
      console.error('❌ Error al cargar categorías del producto:', error);
      setCategoriasProducto([]);
    }
  };

  // CORREGIR: Función para manejar cambios de categorías
  const handleCategoriaChange = (categoriaId, asignada) => {
    const idNumerico = Number(categoriaId);
    console.log('🔄 Cambiando categoría:', { categoriaId: idNumerico, asignada });
    
    if (asignada) {
      // Agregar categoría si no existe
      setCategoriasProducto(prev => {
        const yaExiste = prev.some(cat => Number(cat.id) === idNumerico);
        if (!yaExiste) {
          const nuevaCategoria = categorias.find(cat => Number(cat.id) === idNumerico);
          const categoriaAgregar = {
            id: idNumerico,
            nombre: nuevaCategoria?.nombre || `Categoría ${idNumerico}`
          };
          console.log('➕ Agregando categoría:', categoriaAgregar);
          return [...prev, categoriaAgregar];
        }
        return prev;
      });
    } else {
      // Remover categoría
      console.log('➖ Removiendo categoría ID:', idNumerico);
      setCategoriasProducto(prev => prev.filter(cat => Number(cat.id) !== idNumerico));
    }
  };

  // CORREGIR: Función para guardar categorías del producto
  const guardarCategoriasProducto = async (productoId) => {
    try {
      const categoriasIds = categoriasProducto.map(cat => cat.id);
      console.log('💾 Guardando categorías del producto:', { productoId, categoriasIds });
      
      const response = await fetch(`http://localhost:5000/api/productos/${productoId}/categorias`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categorias: categoriasIds }),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar categorías en el servidor');
      }
      
      console.log('✅ Categorías actualizadas exitosamente');
    } catch (error) {
      console.error('❌ Error al actualizar categorías:', error);
      throw error; // Re-lanzar el error para manejarlo en handleSubmitEditar
    }
  };

  // Función para mostrar mensajes temporales
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  // Función para limpiar errores
  const limpiarError = () => {
    setError('');
  };

  // Manejar envío del formulario de nuevo producto
  const handleSubmitNuevo = async (e) => {
    e.preventDefault();
    setLoading(true);
    limpiarError();
    
    console.log('📝 Creando nuevo producto:', nuevoProducto);
    
    try {
      // Validar campos obligatorios
      if (!nuevoProducto.Nombre || !nuevoProducto.Precio) {
        throw new Error('Nombre y precio son campos obligatorios');
      }

      if (isNaN(nuevoProducto.Precio) || Number(nuevoProducto.Precio) <= 0) {
        throw new Error('El precio debe ser un número mayor a 0');
      }

      // Preparar producto para crear
      const productoACrear = {
        ...nuevoProducto,
        Precio: Number(nuevoProducto.Precio),
        CantidadStock: Number(nuevoProducto.CantidadStock) || 0
      };
      
      // Crear producto
      const response = await productosService.crear(productoACrear);
      
      // Actualizar lista local
      setProductos(prev => [...prev, response.data]);
      
      // Limpiar formulario
      setNuevoProducto({
        Nombre: '',
        Precio: '',
        Image: '',
        Descripcion: '',
        Categoria: [],
        Stock: true,
        CantidadStock: 0
      });
      
      setMostrarFormulario(false);
      mostrarMensaje('✅ Producto creado exitosamente');
      
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      setError('Error al crear producto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // CORREGIR: Manejar envío del formulario de edición
  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    setLoading(true);
    limpiarError();
    
    console.log('🔄 Actualizando producto:', productoEditando);
    console.log('🏷️ Categorías a asignar:', categoriasProducto);
    
    try {
      // Validar campos obligatorios
      if (!productoEditando.Nombre || !productoEditando.Precio) {
        throw new Error('Nombre y precio son campos obligatorios');
      }

      if (isNaN(productoEditando.Precio) || Number(productoEditando.Precio) <= 0) {
        throw new Error('El precio debe ser un número mayor a 0');
      }

      // Preparar producto para actualizar
      const productoAActualizar = {
        ...productoEditando,
        Precio: Number(productoEditando.Precio),
        CantidadStock: Number(productoEditando.CantidadStock) || 0
      };
      
      // Actualizar producto primero
      const response = await productosService.actualizar(productoEditando.id, productoAActualizar);

      // Luego actualizar categorías del producto
      await guardarCategoriasProducto(productoEditando.id);
      
      // Actualizar lista local
      setProductos(prev => prev.map(p => 
        p.id === productoEditando.id ? response.data : p
      ));
      
      // Limpiar formulario
      setProductoEditando(null);
      setMostrarFormularioEdicion(false);
      setCategoriasProducto([]); // Limpiar categorías
      mostrarMensaje('✅ Producto y categorías actualizados exitosamente');
      
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      setError('Error al actualizar producto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // CORREGIR: Función para iniciar edición
  const iniciarEdicion = async (producto) => {
    console.log('✏️ Iniciando edición de producto:', producto);
    setProductoEditando({ ...producto });
    setMostrarFormularioEdicion(true);
    
    // Limpiar categorías previas y cargar las del producto
    setCategoriasProducto([]);
    await cargarCategoriasProducto(producto.id);
    
    limpiarError();
  };

  // Función para eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }
    
    setLoading(true);
    limpiarError();
    
    try {
      await productosService.eliminar(id);
      
      // Actualizar lista local
      setProductos(prev => prev.filter(p => p.id !== id));
      mostrarMensaje('✅ Producto eliminado exitosamente');
      
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      setError('Error al eliminar producto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para resolver ruta de imagen
  const resolverRutaImagen = (imagen) => {
    if (!imagen) return '/logo.png';
    if (imagen.startsWith('http')) return imagen;
    if (imagen.startsWith('/')) return imagen;
    return `/${imagen}`;
  };

  // En el useEffect para manejar el scroll del body
  useEffect(() => {
    if (mostrarFormularioEdicion) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [mostrarFormularioEdicion]);

  // Función para cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mostrarFormularioEdicion) {
        setProductoEditando(null);
        setMostrarFormularioEdicion(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mostrarFormularioEdicion]);

  // CORREGIR: Función para cerrar modal
  const cerrarModal = (e) => {
    if (e.target === e.currentTarget) {
      setProductoEditando(null);
      setMostrarFormularioEdicion(false);
      setCategoriasProducto([]); // Limpiar categorías al cerrar
    }
  };

  // AGREGAR: Función para cerrar modal con botón
  const cerrarModalEdicion = () => {
    setProductoEditando(null);
    setMostrarFormularioEdicion(false);
    setCategoriasProducto([]); // Limpiar categorías al cerrar
  };

  // Render del componente
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛠️ Panel de Administración</h1>
        <button onClick={onLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="mensaje-error">
          <span>❌ {error}</span>
          <button onClick={limpiarError}>✕</button>
        </div>
      )}

      {mensaje && (
        <div className={`mensaje-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      {/* Botones de acción */}
      <div className="admin-actions">
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="btn-nuevo-producto"
          disabled={loading}
        >
          {mostrarFormulario ? '❌ Cancelar' : '➕ Nuevo Producto'}
        </button>
        
        <button 
          onClick={cargarDatos}
          className="btn-recargar"
          disabled={loading}
        >
          {loading ? '⏳ Cargando...' : '🔄 Recargar'}
        </button>
      </div>

      {/* Formulario para nuevo producto */}
      {mostrarFormulario && (
        <div className="formulario-producto">
          <h3>➕ Crear Nuevo Producto</h3>
          <form onSubmit={handleSubmitNuevo}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre del Producto *:</label>
                <input
                  type="text"
                  value={nuevoProducto.Nombre}
                  onChange={(e) => setNuevoProducto(prev => ({
                    ...prev,
                    Nombre: e.target.value
                  }))}
                  required
                  placeholder="Ej: Salmón fresco"
                />
              </div>

              <div className="form-group">
                <label>Precio *:</label>
                <input
                  type="number"
                  step="0.01"
                  value={nuevoProducto.Precio}
                  onChange={(e) => setNuevoProducto(prev => ({
                    ...prev,
                    Precio: e.target.value
                  }))}
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>URL de Imagen:</label>
                <input
                  type="text"
                  value={nuevoProducto.Image}
                  onChange={(e) => setNuevoProducto(prev => ({
                    ...prev,
                    Image: e.target.value
                  }))}
                  placeholder="/imagen.jpg o https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  value={nuevoProducto.Descripcion}
                  onChange={(e) => setNuevoProducto(prev => ({
                    ...prev,
                    Descripcion: e.target.value
                  }))}
                  placeholder="Descripción del producto..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={nuevoProducto.Stock}
                    onChange={(e) => setNuevoProducto(prev => ({
                      ...prev,
                      Stock: e.target.checked
                    }))}
                  />
                  Producto en stock
                </label>
              </div>

              <div className="form-group">
                <label>Cantidad en stock:</label>
                <input
                  type="number"
                  min="0"
                  value={nuevoProducto.CantidadStock}
                  onChange={(e) => setNuevoProducto(prev => ({
                    ...prev,
                    CantidadStock: e.target.value
                  }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-guardar"
                disabled={loading}
              >
                {loading ? '⏳ Creando...' : '✅ Crear Producto'}
              </button>
              <button 
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="btn-cancelar"
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario de edición - CORREGIR */}
      {mostrarFormularioEdicion && productoEditando && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>✏️ Editar Producto</h3>
              <button 
                className="btn-cerrar-modal"
                onClick={cerrarModalEdicion}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSubmitEditar}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre del Producto *:</label>
                    <input
                      type="text"
                      value={productoEditando.Nombre}
                      onChange={(e) => setProductoEditando(prev => ({
                        ...prev,
                        Nombre: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Precio *:</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productoEditando.Precio}
                      onChange={(e) => setProductoEditando(prev => ({
                        ...prev,
                        Precio: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>URL de Imagen:</label>
                    <input
                      type="text"
                      value={productoEditando.Image}
                      onChange={(e) => setProductoEditando(prev => ({
                        ...prev,
                        Image: e.target.value
                      }))}
                      placeholder="/imagen.jpg o https://ejemplo.com/imagen.jpg"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                      value={productoEditando.Descripcion}
                      onChange={(e) => setProductoEditando(prev => ({
                        ...prev,
                        Descripcion: e.target.value
                      }))}
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={productoEditando.Stock}
                        onChange={(e) => setProductoEditando(prev => ({
                          ...prev,
                          Stock: e.target.checked
                        }))}
                      />
                      Producto en stock
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Cantidad en stock:</label>
                    <input
                      type="number"
                      min="0"
                      value={productoEditando.CantidadStock}
                      onChange={(e) => setProductoEditando(prev => ({
                        ...prev,
                        CantidadStock: e.target.value
                      }))}
                    />
                  </div>

                  {/* CORREGIR SECCIÓN: Categorías del Producto */}
                  <div className="form-group form-group-categorias">
                    <label>🏷️ Categorías del Producto:</label>
                    <div className="categorias-selector">
                      {categorias.length === 0 ? (
                        <p className="no-categorias">No hay categorías disponibles</p>
                      ) : (
                        <div className="categorias-grid">
                          {categorias.map((categoria) => {
                            const estaAsignada = categoriasProducto.some(cat => 
                              Number(cat.id) === Number(categoria.id)
                            );
                            
                            return (
                              <label 
                                key={categoria.id} 
                                className={`categoria-checkbox ${estaAsignada ? 'selected' : ''}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={estaAsignada}
                                  onChange={(e) => handleCategoriaChange(categoria.id, e.target.checked)}
                                  className="checkbox-input"
                                />
                                <span className="checkbox-custom"></span>
                                <div className="categoria-info">
                                  <span className="categoria-nombre">{categoria.nombre}</span>
                                  {categoria.descripcion && (
                                    <span className="categoria-desc">{categoria.descripcion}</span>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <small className="form-help">
                      Selecciona las categorías a las que pertenece este producto
                    </small>
                    {/* Debug info - puedes remover esto después */}
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                      <strong>Categorías asignadas:</strong> {categoriasProducto.length > 0 
                        ? categoriasProducto.map(cat => cat.nombre || cat.id).join(', ')
                        : 'Ninguna'
                      }
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button"
                onClick={cerrarModalEdicion}
                className="btn-cancelar"
              >
                ❌ Cancelar
              </button>
              <button 
                type="submit"
                onClick={handleSubmitEditar}
                className="btn-guardar"
                disabled={loading}
              >
                {loading ? '⏳ Actualizando...' : '✅ Actualizar Producto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      <div className="productos-lista">
        <h3>📋 Productos ({productos.length})</h3>
        
        {loading && productos.length === 0 ? (
          <div className="loading">⏳ Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="no-productos">
            📦 No hay productos disponibles. ¡Crea el primero!
          </div>
        ) : (
          <div className="productos-grid">
            {productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="producto-imagen">
                  <img 
                    src={resolverRutaImagen(producto.Image)} 
                    alt={producto.Nombre}
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                  <div className="producto-badges">
                    <span className={`badge-stock ${producto.Stock ? 'disponible' : 'agotado'}`}>
                      {producto.Stock ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
                
                <div className="producto-info">
                  <h4>{producto.Nombre}</h4>
                  <p className="precio">${Number(producto.Precio).toFixed(2)}</p>
                  <p className="descripcion">{producto.Descripcion}</p>
                  <div className="stock-info">
                    <span>Stock: {producto.Stock ? 'Disponible' : 'Agotado'}</span>
                    <span>Cantidad: {producto.CantidadStock}</span>
                  </div>
                </div>
                
                <div className="producto-actions">
                  <button 
                    onClick={() => iniciarEdicion(producto)}
                    className="btn-editar"
                    disabled={loading}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => eliminarProducto(producto.id)}
                    className="btn-eliminar"
                    disabled={loading}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
