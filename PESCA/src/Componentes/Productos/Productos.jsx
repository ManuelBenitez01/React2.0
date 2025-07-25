import React, { useState, useEffect } from 'react';
import { useCarrito } from '../Carritocontext/Carritocontext';
import { productosService, categoriasService } from '../../services/api';
import './Productos.css';

// Datos locales como fallback - fuera del componente para evitar recreaciones
const productosLocales = [
    {
        id: 1,
        Nombre: "Filet de Merluza",
        Precio: 100,
        Image: "/logo.png",
        Descripcion: "Filetes de merluza frescos, ideales para preparar a la plancha o al horno.",
        Categoria: ["Congelados", "Filetes"],
        Stock: true,
        CantidadStock: 50
    },
    {
        id: 2,
        Nombre: "Filet de Gatuzo",
        Precio: 200,
        Image: "/logo.png",
        Descripcion: "Filetes de gatuzo, un pescado blanco suave perfecto para empanadas o guisos.",
        Categoria: ["Congelados"],
        Stock: false,
        CantidadStock: 0
    },
    {
        id: 3,
        Nombre: "Filet de Lenguado",
        Precio: 300,
        Image: "/logo.png",
        Descripcion: "Filetes de lenguado de textura fina y sabor delicado, listos para cocinar.",
        Categoria: ["Filetes", "Frescos"],
        Stock: true,
        CantidadStock: 25
    },
    {
        id: 4,
        Nombre: "Filet de Salmón Rosado",
        Precio: 150,
        Image: "/logo.png",
        Descripcion: "Salmón rosado de alta calidad, rico en Omega-3, ideal para la parrilla.",
        Categoria: ["Frescos", "Mariscos"],
        Stock: true,
        CantidadStock: 30
    }
];

const categoriasLocales = ['Congelados', 'Comidas', 'Mariscos', 'Filetes', 'Enteros', 'Frescos'];

// Helper para resolver rutas de imágenes
const resolverRutaImagen = (imagen) => {
    if (!imagen) return '/logo.png';
    if (imagen.startsWith('http')) return imagen; // URL completa
    if (imagen.startsWith('/')) return imagen; // Ruta absoluta
    return `/${imagen}`; // Ruta relativa
};

export default function Productos({ categoriaSeleccionada }) {
    const { eliminarDelCarrito, carrito, agregarAlCarrito } = useCarrito();
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [ordenPrecio, setOrdenPrecio] = useState('menor');
    const [productos, setProductos] = useState(productosLocales);
    const [categorias, setCategorias] = useState(categoriasLocales);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar productos y categorías desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                
                const productosData = await productosService.obtenerTodos();
                
                const categoriasData = await categoriasService.obtenerTodas();
                
                if (productosData.data && productosData.data.length > 0) {
                    setProductos(productosData.data);
                }
                
                if (categoriasData && categoriasData.length > 0) {
                    setCategorias(categoriasData);
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    // Sincroniza el filtro local con la categoría seleccionada desde el header o inicio
    useEffect(() => {
        if (categoriaSeleccionada) {
            setCategoriaFiltro(categoriaSeleccionada);
        } else {
            setCategoriaFiltro('');
        }
    }, [categoriaSeleccionada]);

    // Función para obtener la cantidad de un producto en el carrito
    const cantidadEnCarrito = (id) => {
        const prod = carrito.find(item => item.id === id);
        return prod ? prod.cantidad : 0;
    };

    // Filtra productos según la categoría seleccionada o filtro local
    let productosFiltrados = productos;
    if (categoriaFiltro) {
        productosFiltrados = productosFiltrados.filter(producto =>
            Array.isArray(producto.Categoria)
                ? producto.Categoria.some(
                    cat => cat.toLowerCase() === categoriaFiltro.toLowerCase()
                  )
                : (producto.Categoria?.toLowerCase() === categoriaFiltro.toLowerCase())
        );
    }

    // Orden por precio
    productosFiltrados = [...productosFiltrados].sort((a, b) => {
        if (ordenPrecio === 'menor') {
            return a.Precio - b.Precio;
        } else {
            return b.Precio - a.Precio;
        }
    });

    return (
        <>
            {/* Estado de carga */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Cargando productos desde base de datos...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                    <p>Error al cargar productos: {error}</p>
                    <p>Mostrando datos locales como respaldo.</p>
                </div>
            )}

            {/* Info sobre origen de datos */}
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
                <p>Mostrando {productos.length} productos {error ? '(datos locales)' : '(desde base de datos)'}</p>
            </div>

            {/* Filtros */}
            <div className="filtros-productos" style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                <select
                    value={categoriaFiltro}
                    onChange={e => setCategoriaFiltro(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    value={ordenPrecio}
                    onChange={e => setOrdenPrecio(e.target.value)}
                >
                    <option value="menor">Precio: menor a mayor</option>
                    <option value="mayor">Precio: mayor a menor</option>
                </select>
            </div>

            <div className="productos">
                {productosFiltrados.map((Producto, index) => (
                    <div
                        key={Producto.id}
                        className={`producto ${!Producto.Stock ? 'sin-stock' : ''}`}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '1rem',
                            margin: '1rem',
                            backgroundColor: !Producto.Stock ? '#f5f5f5' : 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            position: 'relative'
                        }}
                    >
                        {!Producto.Stock && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                SIN STOCK
                            </div>
                        )}
                        
                        <img
                            src={resolverRutaImagen(Producto.Image)}
                            alt={Producto.Nombre}
                            onError={(e) => {
                                e.target.src = '/logo.png'; // Imagen por defecto
                            }}
                            style={{ 
                                width: '100%', 
                                height: '200px', 
                                objectFit: 'cover', 
                                borderRadius: '4px',
                                opacity: !Producto.Stock ? 0.6 : 1
                            }}
                        />
                        <h3 style={{ opacity: !Producto.Stock ? 0.6 : 1 }}>{Producto.Nombre}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', opacity: !Producto.Stock ? 0.6 : 1 }}>
                            {Producto.Descripcion}
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c5530' }}>
                            ${Producto.Precio}
                        </p>
                        
                        {/* Información de stock */}
                        <div style={{ margin: '0.5rem 0' }}>
                            {Producto.Stock ? (
                                <p style={{ fontSize: '0.9rem', color: '#28a745', fontWeight: 'bold' }}>
                                    ✅ En stock {Producto.CantidadStock > 0 ? `(${Producto.CantidadStock} disponibles)` : ''}
                                </p>
                            ) : (
                                <p style={{ fontSize: '0.9rem', color: '#dc3545', fontWeight: 'bold' }}>
                                    ❌ Sin stock
                                </p>
                            )}
                        </div>
                        
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>
                            Categorías: {Array.isArray(Producto.Categoria) ? Producto.Categoria.join(', ') : Producto.Categoria}
                        </p>
                        
                        {/* Botones del carrito */}
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={() => agregarAlCarrito(Producto)}
                                disabled={!Producto.Stock}
                                style={{
                                    backgroundColor: !Producto.Stock ? '#ccc' : '#0a3d3b',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: !Producto.Stock ? 'not-allowed' : 'pointer',
                                    opacity: !Producto.Stock ? 0.6 : 1
                                }}
                                title={!Producto.Stock ? 'Producto sin stock' : 'Agregar al carrito'}
                            >
                                {!Producto.Stock ? 'Sin stock' : 'Agregar al carrito'}
                            </button>
                            
                            {cantidadEnCarrito(Producto.id) > 0 && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ color: '#0a3d3b', fontWeight: 'bold' }}>
                                        En carrito: {cantidadEnCarrito(Producto.id)}
                                    </span>
                                    <button
                                        onClick={() => eliminarDelCarrito(Producto.id)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginLeft: '0.5rem',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
