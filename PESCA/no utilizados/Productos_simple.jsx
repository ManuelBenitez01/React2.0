import React, { useState, useEffect } from 'react';
import { useCarrito } from '../Carritocontext/Carritocontext';
import { productosService, categoriasService } from '../../services/api';
import './Productos.css'
import PropTypes from 'prop-types';

// Datos locales como fallback - fuera del componente para evitar recreaciones
const productosLocales = [
    {
        id: 0,
        Nombre: "Filet de Merluza",
        Precio: 100,
        Image: "/logo.png",
        Descripcion: "Filetes de merluza frescos, ideales para preparar a la plancha o al horno.",
        Categoria: ["Congelados", "Filetes"]
    },
    {
        id: 1,
        Nombre: "Filet de Gatuzo",
        Precio: 200,
        Image: "/logo.png",
        Descripcion: "Filetes de gatuzo, un pescado blanco suave perfecto para empanadas o guisos.",
        Categoria: ["Congelados"]
    },
    {
        id: 2,
        Nombre: "Filet de Lenguado",
        Precio: 300,
        Image: "/logo.png",
        Descripcion: "Filetes de lenguado de textura fina y sabor delicado, listos para cocinar.",
        Categoria: ["Filetes", "Frescos"]
    },
    {
        id: 3,
        Nombre: "Filet de Salmón Rosado",
        Precio: 150,
        Image: "/logo.png",
        Descripcion: "Salmón rosado de alta calidad, rico en Omega-3, ideal para la parrilla.",
        Categoria: ["Frescos", "Mariscos"]
    }
];

const categoriasLocales = ['Congelados', 'Comidas', 'Mariscos', 'Filetes', 'Enteros', 'Frescos'];

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
                console.log('Cargando datos desde API...');
                
                const productosData = await productosService.obtenerTodos();
                console.log('Productos desde API:', productosData);
                
                const categoriasData = await categoriasService.obtenerTodas();
                console.log('Categorías desde API:', categoriasData);
                
                if (productosData.data && productosData.data.length > 0) {
                    setProductos(productosData.data);
                    console.log('Productos actualizados:', productosData.data.length);
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
                        className="producto"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '1rem',
                            margin: '1rem',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img
                            src={Producto.Image}
                            alt={Producto.Nombre}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <h3>{Producto.Nombre}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{Producto.Descripcion}</p>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2c5530' }}>
                            ${Producto.Precio}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#888' }}>
                            Categorías: {Array.isArray(Producto.Categoria) ? Producto.Categoria.join(', ') : Producto.Categoria}
                        </p>
                        
                        {/* Botones del carrito */}
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={() => agregarAlCarrito(Producto)}
                                style={{
                                    backgroundColor: '#2c5530',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Agregar al carrito
                            </button>
                            
                            {cantidadEnCarrito(Producto.id) > 0 && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ color: '#2c5530', fontWeight: 'bold' }}>
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

Productos.propTypes = {
    categoriaSeleccionada: PropTypes.string
};
