


import { useState } from 'react';
import { getProductos, getProductoById, getCategorias } from './conexion/api';

function App() {

  const [productos, setProductos] = useState(null);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [categorias, setCategorias] = useState(null);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [errorCategorias, setErrorCategorias] = useState(null);


  const [productoId, setProductoId] = useState("");
  const [productoBuscado, setProductoBuscado] = useState(null);
  const [loadingId, setLoadingId] = useState(false);
  const [errorId, setErrorId] = useState(null);
  const [mostrarProductoId, setMostrarProductoId] = useState(false);


  const handleTraerProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductos();
      if (Array.isArray(data.data)) {
        setProductos(data.data);
        setMostrarProductos(true);
      } else {
        setProductos([]);
        setMostrarProductos(true);
      }
    } catch (e) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };
  const handleCerrarProductos = () => setMostrarProductos(false);


  const handleTraerCategorias = async () => {
    setLoadingCategorias(true);
    setErrorCategorias(null);
    try {
      const data = await getCategorias();
      if (Array.isArray(data)) {
        setCategorias(data);
      } else if (Array.isArray(data.data)) {
        setCategorias(data.data);
      } else {
        setCategorias([]);
      }
      setMostrarCategorias(true);
    } catch (e) {
      setErrorCategorias('Error al cargar categorías');
    } finally {
      setLoadingCategorias(false);
    }
  };
  const handleCerrarCategorias = () => setMostrarCategorias(false);


  const handleInputId = (e) => setProductoId(e.target.value);
  const handleBuscarPorId = async () => {
    setLoadingId(true);
    setErrorId(null);
    setProductoBuscado(null);
    setMostrarProductoId(false);
    try {
      const data = await getProductoById(productoId);
      setProductoBuscado(data);
      setMostrarProductoId(true);
    } catch (e) {
      setErrorId('Error al buscar producto por ID');
    } finally {
      setLoadingId(false);
    }
  };
  const handleCerrarProductoId = () => setMostrarProductoId(false);

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      background: '#f8f9fa',
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1a237e', marginBottom: 32 }}>API Pública - Documentación</h1>
      <section style={{
        width: '100%',
        maxWidth: 1200,
        marginBottom: 32,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px #0001',
        padding: 24,
        boxSizing: 'border-box',
        marginTop: 24
      }}>
        <h2 style={{ color: '#1565c0', marginTop: 0 }}>GET <span style={{ fontWeight: 400, color: '#333' }}>/productos</span></h2>
        <p style={{ color: '#444', marginBottom: 16 }}>Obtiene todos los productos de la base de datos.</p>
        <button
          onClick={handleTraerProductos}
          disabled={loading}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 24px',
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 20
          }}
        >
          {loading ? 'Cargando...' : 'Traer productos'}
        </button>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        {mostrarProductos && (
          <div style={{
            maxWidth: '100%',
            overflowX: 'auto',
            marginTop: 16,
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#222',
            padding: 0,
            position: 'relative'
          }}>
            <button
              onClick={handleCerrarProductos}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                fontSize: 14,
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              Cerrar
            </button>
            <pre style={{
              color: '#0f0',
              fontSize: 14,
              margin: 0,
              padding: 16,
              whiteSpace: 'pre',
              overflowX: 'auto',
              minWidth: 300,
              maxWidth: 850
            }}>
              {JSON.stringify(productos, null, 2)}
            </pre>
          </div>
        )}
      </section>

    
      <section style={{
        width: '100%',
        maxWidth: 1200,
        marginBottom: 32,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px #0001',
        padding: 24,
        boxSizing: 'border-box',
        marginTop: 24
      }}>
        <h2 style={{ color: '#1565c0', marginTop: 0 }}>GET <span style={{ fontWeight: 400, color: '#333' }}>/categorias</span></h2>
        <p style={{ color: '#444', marginBottom: 16 }}>Obtiene todas las categorías de la base de datos.</p>
        <button
          onClick={handleTraerCategorias}
          disabled={loadingCategorias}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 24px',
            fontSize: 16,
            cursor: loadingCategorias ? 'not-allowed' : 'pointer',
            marginBottom: 20
          }}
        >
          {loadingCategorias ? 'Cargando...' : 'Traer categorías'}
        </button>
        {errorCategorias && <p style={{ color: 'red', marginTop: 8 }}>{errorCategorias}</p>}
        {mostrarCategorias && (
          <div style={{
            maxWidth: '100%',
            overflowX: 'auto',
            marginTop: 16,
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#222',
            padding: 0,
            position: 'relative'
          }}>
            <button
              onClick={handleCerrarCategorias}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                fontSize: 14,
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              Cerrar
            </button>
            <pre style={{
              color: '#0ff',
              fontSize: 14,
              margin: 0,
              padding: 16,
              whiteSpace: 'pre',
              overflowX: 'auto',
              minWidth: 300,
              maxWidth: 850
            }}>
              {JSON.stringify(categorias, null, 2)}
            </pre>
          </div>
        )}
      </section>

      <section style={{
        width: '100%',
        maxWidth: 1200,
        marginBottom: 32,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px #0001',
        padding: 24,
        boxSizing: 'border-box',
        marginTop: 24
      }}>
        <h2 style={{ color: '#1565c0', marginTop: 0 }}>GET <span style={{ fontWeight: 400, color: '#333' }}>/productos/&#123;id&#125;</span></h2>
        <p style={{ color: '#444', marginBottom: 16 }}>Obtiene un producto específico por su ID.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <input
            type="number"
            min="1"
            value={productoId}
            onChange={handleInputId}
            placeholder="Ingrese ID de producto"
            style={{
              padding: '8px 12px',
              fontSize: 16,
              borderRadius: 4,
              border: '1px solid #bbb',
              width: 180
            }}
          />
          <button
            onClick={handleBuscarPorId}
            disabled={loadingId || !productoId}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 24px',
              fontSize: 16,
              cursor: loadingId || !productoId ? 'not-allowed' : 'pointer'
            }}
          >
            {loadingId ? 'Buscando...' : 'Buscar por ID'}
          </button>
        </div>
        {errorId && <p style={{ color: 'red', marginTop: 8 }}>{errorId}</p>}
        {mostrarProductoId && (
          <div style={{
            maxWidth: '100%',
            overflowX: 'auto',
            marginTop: 16,
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#222',
            padding: 0,
            position: 'relative'
          }}>
            <button
              onClick={handleCerrarProductoId}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 12px',
                fontSize: 14,
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              Cerrar
            </button>
            <pre style={{
              color: '#0f0',
              fontSize: 14,
              margin: 0,
              padding: 16,
              whiteSpace: 'pre',
              overflowX: 'auto',
              minWidth: 300,
              maxWidth: 850
            }}>
              {JSON.stringify(productoBuscado, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;