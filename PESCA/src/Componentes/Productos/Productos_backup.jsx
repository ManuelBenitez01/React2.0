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
        Image: "../../Imagenes/calamares.jpg",
        Descripcion: "Salmón rosado de alta calidad, rico en Omega-3, ideal para la parrilla.",
        Categoria: ["Frescos", "Mariscos"]
    }
    // ... más productos si necesitas
];

const categoriasLocales = ['Congelados', 'Comidas', 'Mariscos', 'Filetes', 'Enteros', 'Frescos'];

export default function Productos({ categoriaSeleccionada }) {
    const { eliminarDelCarrito, carrito ,agregarAlCarrito} = useCarrito();
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [ordenPrecio, setOrdenPrecio] = useState('menor'); // 'menor' o 'mayor'
    const [productos, setProductos] = useState(productosLocales); // Inicializar con datos locales
    const [categorias, setCategorias] = useState(categoriasLocales); // Inicializar con categorías locales
    const [loading, setLoading] = useState(false); // Cambiar a false ya que tenemos datos iniciales
    const [error, setError] = useState(null);

    // Cargar productos y categorías desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const [productosData, categoriasData] = await Promise.all([
                    productosService.obtenerTodos(),
                    categoriasService.obtenerTodas()
                ]);
                
                if (productosData.data && productosData.data.length > 0) {
                    setProductos(productosData.data);
                }
                if (categoriasData && categoriasData.length > 0) {
                    setCategorias(categoriasData);
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError(err.message);
                // Los datos locales ya están cargados por defecto
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

    // Datos locales como fallback
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
            Image: "../../Imagenes/calamares.jpg",
            Descripcion: "Salmón rosado de alta calidad, rico en Omega-3, ideal para la parrilla.",
            Categoria: ["Frescos", "Mariscos"]
        },
        {
            id: 4,
            Nombre: "Filet de Abadejo",
            Precio: 250,
            Image: "../../Imagenes/cangrejo.jpg",
            Descripcion: "Filetes de abadejo, un pescado blanco sabroso y versátil para distintas recetas.",
            Categoria: ["Congelados", "Enteros"]
        },
        {
            id: 5,
            Nombre: "Filet de Pez Angel (pollo de mar)",
            Precio: 350,
            Image: "../../Imagenes/pulpo.jpg",
            Descripcion: "Conocido como pollo de mar, este pez ofrece carne tierna y sabrosa.",
            Categoria: ["Enteros"]
        },
        {
            id: 6,
            Nombre: "Filet de Pez Gallo",
            Precio: 50,
            Image: "../../Imagenes/almejas.jpg",
            Descripcion: "Filetes de pez gallo con carne firme, ideales para freír o al horno.",
            Categoria: ["Frescos"]
        },
        {
            id: 7,
            Nombre: "Filet de Trucha",
            Precio: 75,
            Image: "../../Imagenes/mejillones.jpg",
            Descripcion: "Trucha fresca con excelente sabor, rica en nutrientes esenciales.",
            Categoria: ["Frescos", "Filetes"]
        },
        {
            id: 8,
            Nombre: "Filet de Merluza ( Rebozado )",
            Precio: 80,
            Image: "../../Imagenes/ostras.jpg",
            Descripcion: "Merluza rebozada, lista para freír y disfrutar como plato rápido.",
            Categoria: ["Comidas", "Congelados"]
        },
        {
            id: 9,
            Nombre: "Filet de Merluza ( Rebozado sin Sal )",
            Precio: 120,
            Image: "../../Imagenes/salmon.jpg",
            Descripcion: "Merluza rebozada sin sal, opción ideal para dietas bajas en sodio.",
            Categoria: ["Comidas"]
        },
        {
            id: 10,
            Nombre: "Filet de Brotola ( Rebozado )",
            Precio: 110,
            Image: "../../Imagenes/trucha.jpg",
            Descripcion: "Brotola rebozada, de textura firme y sabor suave, perfecta para niños.",
            Categoria: ["Comidas"]
        },
        {
            id: 11,
            Nombre: "Lomos de Brótola ( Rebozado )",
            Precio: 130,
            Image: "../../Imagenes/atun.jpg",
            Descripcion: "Lomos de brótola listos para cocinar, con rebozado crujiente.",
            Categoria: ["Comidas"]
        },
        {
            id: 12,
            Nombre: "Cornalitos",
            Precio: 90,
            Image: "../../Imagenes/bacalao.jpg",
            Descripcion: "Pescaditos pequeños ideales para freír como aperitivo crocante.",
            Categoria: ["Mariscos"]
        },
        {
            id: 13,
            Nombre: "Rabas",
            Precio: 140,
            Image: "../../Imagenes/dorada.jpg",
            Descripcion: "Aros de calamar rebozados, perfectos para picadas o entradas.",
            Categoria: ["Mariscos", "Comidas"]
        },
        {
            id: 14,
            Nombre: "Molido De Merluza",
            Precio: 160,
            Image: "../../Imagenes/lubina.jpg",
            Descripcion: "Merluza molida lista para preparar hamburguesas o albóndigas.",
            Categoria: ["Congelados"]
        },
        {
            id: 15,
            Nombre: "Corvina",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado blanco de carne firme y sabor suave, ideal para cocinar al horno o a la parrilla.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 16,
            Nombre: "Mero",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de carne compacta y sabor delicado, excelente para preparaciones gourmet.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 17,
            Nombre: "Lisa",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de río de sabor característico, muy utilizado en platos tradicionales.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 18,
            Nombre: "Salmon Blanco",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Variedad de salmón de carne clara y textura tierna, ideal para cocinar al horno o a la plancha.",
            Categoria: ["Frescos"]
        },
        {
            id: 19,
            Nombre: "Abadejo",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de carne magra y sabor suave, perfecto para empanados o guisos marinos.",
            Categoria: ["Congelados", "Enteros"]
        },
        {
            id: 20,
            Nombre: "Chernia",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado firme de sabor intenso, muy apreciado en la cocina por su calidad.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 21,
            Nombre: "Palometa",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado azul de carne sabrosa, excelente para la parrilla o el horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 22,
            Nombre: "Anchoa",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado pequeño y sabroso, ideal para conservas, pizzas y ensaladas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 23,
            Nombre: "Pescadilla",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado blanco de textura suave, perfecto para frituras y milanesas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 24,
            Nombre: "Gatuzo ( Lomo De Atun )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Filete de gatuzo con sabor similar al atún, ideal para plancha o empanado.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 25,
            Nombre: "Pez Pavo",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de carne blanca y sabor neutro, fácil de cocinar y combinar con salsas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 26,
            Nombre: "Merluza",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Uno de los pescados más consumidos, carne blanda y muy versátil en la cocina.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 27,
            Nombre: "Trucha ( Despinada )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Trucha sin espinas, lista para cocinar a la plancha, al horno o en papillote.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 28,
            Nombre: "Sabalo",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de río tradicional, de carne sabrosa, ideal para la parrilla.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 29,
            Nombre: "Filet de Brotola",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Filete de brótola, carne blanca y textura blanda, ideal para empanados.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 30,
            Nombre: "Boga",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de río muy popular, ideal para asar o cocinar al horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 31,
            Nombre: "Pati",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de carne suave y sabor delicado, común en la cocina casera.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 32,
            Nombre: "Dorado",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado muy apreciado por su carne firme y sabrosa, ideal para la parrilla.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 33,
            Nombre: "Surubi",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado típico del litoral argentino, excelente para cocinar en rodajas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 34,
            Nombre: "Pacu",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pescado de carne rosada, sabrosa y con alto contenido graso, ideal para la parrilla.",
            Categoria: ["Frescos", "Enteros"]
        },{
            id: 35,
            Nombre: "Calamares",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Molusco muy utilizado en cocina, ideal para preparar rabas, guisos y cazuelas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 36,
            Nombre: "Salmon Blanco ( Rodajas )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Rodajas de salmón blanco, listas para cocinar al horno, a la parrilla o en guisos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 37,
            Nombre: "Atun Nacional ( Rodajas )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Rodajas de atún fresco, carne firme y sabrosa, perfectas para grill o plancha.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 38,
            Nombre: "Pati ( Rodajas )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Rodajas de pati, pescado de río con carne blanda, ideal para preparar al horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 39,
            Nombre: "Surubi ( Rodajas )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Rodajas de surubí, listas para cocinar a la parrilla, en cazuela o al horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 40,
            Nombre: "Abadejo ( Rodajas )",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Rodajas de abadejo, carne blanca y delicada, excelentes para preparaciones suaves.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 41,
            Nombre: "Camarones Pelados Cocidos",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Camarones listos para consumir, perfectos para ensaladas, pastas o salteados.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 42,
            Nombre: "Langostinos Pelados Cocidos",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Langostinos cocidos y pelados, ideales para entradas, arroces y platos fríos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 43,
            Nombre: "Mejillones Pelados Cocidos",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Mejillones cocidos sin cáscara, listos para cazuelas, arroces o salsas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 44,
            Nombre: "Berberechos Pelados Cocidos",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Mariscos cocidos, listos para consumir en tapas, ensaladas o paellas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 45,
            Nombre: "Vieyras Peladas Cocidas",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Vieiras listas para consumir, suaves y sabrosas, ideales para entradas gourmet.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 46,
            Nombre: "Langostinos Enteros Cocidos",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Langostinos cocidos con cáscara, perfectos para platos principales o picadas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 47,
            Nombre: "Mejillones Con Cascara Cocido",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Mejillones cocidos en su cáscara, ideales para cazuelas y presentaciones elegantes.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 48,
            Nombre: "Cazuelas Cocidas",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Mezcla de mariscos cocidos, lista para calentar y servir como guiso o entrada.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 49,
            Nombre: "Calamaretis",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pequeños calamares tiernos, ideales para salteados, guisos o fritos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 50,
            Nombre: "Kanikama",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Bastones de surimi sabor cangrejo, perfectos para ensaladas o sushi.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 51,
            Nombre: "Kanikama Ahumado",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Kanikama con sabor ahumado, ideal para picadas o acompañamientos fríos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 52,
            Nombre: "Kanikama Familiar",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Presentación familiar de kanikama, ideal para compartir o preparar múltiples platos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 53,
            Nombre: "Salmon Rosado Ahumado",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Salmón rosado ahumado, ideal para canapés, ensaladas o platos gourmet.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 54,
            Nombre: "Tinta Calamar",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Tinta natural de calamar, utilizada para arroces, pastas o platos gourmet.",
            Categoria: ["Frescos", "Enteros"]
        },{
            id: 55,
            Nombre: "Pulpo Español",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Pulpo cocido de excelente calidad, ideal para preparar a la gallega o en ensaladas.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 56,
            Nombre: "Trillas Limpias",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Trillas listas para cocinar, ideales para frituras o preparaciones al horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 57,
            Nombre: "Hamburguesas Sin Sal Naturales",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Hamburguesas de pescado sin sal añadida, saludables y listas para cocinar.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 58,
            Nombre: "Hamburguesas Rebozadas De Merluza",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Hamburguesas de merluza con cobertura crocante, ideales para horno o fritura.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 59,
            Nombre: "Hamburguesas Rebozadas De Merluza Con Espinaca",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Hamburguesas de merluza y espinaca, rebozadas y listas para cocinar.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 60,
            Nombre: "Hamburguesas De Merluza Crocantes",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Hamburguesas crocantes de merluza, ideales para preparar en minutos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 61,
            Nombre: "Langostinos Rebozados",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Langostinos con cobertura crujiente, listos para freír o llevar al horno.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 62,
            Nombre: "Rabas Rebozadas",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Aros de calamar rebozados, clásicos para fritura, crocantes y sabrosos.",
            Categoria: ["Frescos", "Enteros"]
        },
        {
            id: 63,
            Nombre: "Merluza",
            Precio: 170,
            Image: "/logo.png",
            Descripcion: "Clásico filet de merluza, versátil y nutritivo, ideal para diversas preparaciones.",
            Categoria: ["Frescos", "Enteros"]
        }

    ]


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
                    <p>Cargando productos...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                    <p>Error al cargar productos: {error}</p>
                    <p>Mostrando datos locales como respaldo.</p>
                </div>
            )}

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
                            animationDelay: `${index * 0.1}s`,
                            background: "var(--color-principal)",
                            border: "1px solid var(--color-secundario)",
                            color: "var(--color-secundario)"
                        }}
                        title={Producto.Descripcion}
                    >
                        <img src={Producto.Image} alt={Producto.Nombre} />
                        <h1 style={{ color: "var(--color-secundario)" }}>{Producto.Nombre}</h1>
                        <h2 style={{ color: "var(--color-secundario)" }}>${Producto.Precio.toFixed(2)}</h2>
                        <p style={{ color: "var(--color-secundario)" }}>{Producto.Descripcion}</p>
                        <button
                            className='button'
                            type='button'
                            
                            onClick={() => agregarAlCarrito(Producto)}
                        >
                            Agregar al carrito 🛒
                        </button>
                        {/* Mostrar el botón solo si hay al menos uno en el carrito */}
                        {cantidadEnCarrito(Producto.id) > 0 && (
                            <>
                                <button
                                    className='boton-quitar'
                                    style={{
                                        background: "var(--color-acento)",
                                        color: "var(--color-principal)"
                                    }}
                                    onClick={() => eliminarDelCarrito(Producto.id)}
                                >
                                    Quitar del carrito
                                </button>
                                <span
                                    className="cantidad-en-carrito"
                                    style={{
                                        background: "var(--color-acento)",
                                        color: "var(--color-principal)"
                                    }}
                                >
                                    En carrito: {cantidadEnCarrito(Producto.id)}
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <footer style={{
                background: "var(--color-secundario)",
                color: "var(--color-principal)",
                padding: "1rem",
                textAlign: "center",
                width: "100%",
                marginTop: "2rem"
            }}>
                <p>&copy; 2023 Pescadería Puerto Argentino. Todos los derechos reservados.</p>
                <p>Diseñado y Desarrollado por </p>
                <h2 style={{ color: "var(--color-acento)" }}>Jose Manuel Benitez</h2>
            </footer>
        </>
    );
}

Productos.propTypes = {
    categoriaSeleccionada: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ])
};