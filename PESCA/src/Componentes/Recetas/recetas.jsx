import React, { useState, useEffect } from 'react';
import { productosService } from '../../services/api';
import './recetas.css';

/**
 * Componente principal de recetas
 * Muestra recetas organizadas por categorías con productos relacionados
 */
const Recetas = () => {
  const [productos, setProductos] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // Base de datos de recetas con productos relacionados
  const recetasData = [
    {
      id: 1,
      titulo: "Salmón a la Plancha con Limón",
      categoria: "Platos Principales",
      tiempoCoccion: "20 min",
      dificultad: "Fácil",
      porciones: 4,
      imagen: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      ingredientes: [
        "4 filetes de salmón",
        "2 limones",
        "3 dientes de ajo",
        "Aceite de oliva",
        "Sal y pimienta",
        "Perejil fresco"
      ],
      instrucciones: [
        "Precalienta la plancha a fuego medio-alto.",
        "Sazona los filetes de salmón con sal y pimienta.",
        "Cocina el salmón 4-5 minutos por cada lado.",
        "Mientras tanto, mezcla ajo picado con aceite de oliva.",
        "Sirve con limón y perejil fresco por encima."
      ],
      productosRelacionados: ["Salmón", "Filet de Salmón"],
      tags: ["saludable", "omega-3", "rápido"],
      valorNutricional: {
        calorias: 285,
        proteinas: "42g",
        grasas: "12g",
        carbohidratos: "2g"
      }
    },
    {
      id: 2,
      titulo: "Merluza al Horno con Verduras",
      categoria: "Platos Principales",
      tiempoCoccion: "35 min",
      dificultad: "Fácil",
      porciones: 6,
      imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      ingredientes: [
        "6 filetes de merluza",
        "2 zanahorias",
        "1 calabacín",
        "1 cebolla",
        "Tomates cherry",
        "Aceite de oliva",
        "Vino blanco",
        "Hierbas aromáticas"
      ],
      instrucciones: [
        "Precalienta el horno a 200°C.",
        "Corta las verduras en juliana.",
        "Coloca la merluza en una fuente de horno.",
        "Rodea con las verduras y rocía con aceite.",
        "Agrega un chorrito de vino blanco.",
        "Hornea durante 25-30 minutos."
      ],
      productosRelacionados: ["Merluza", "Filet de Merluza"],
      tags: ["horno", "verduras", "completo"],
      valorNutricional: {
        calorias: 220,
        proteinas: "35g",
        grasas: "6g",
        carbohidratos: "8g"
      }
    },
    {
      id: 3,
      titulo: "Empanadas de Gatuzo",
      categoria: "Aperitivos",
      tiempoCoccion: "45 min",
      dificultad: "Intermedio",
      porciones: 12,
      imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      ingredientes: [
        "500g de gatuzo desmenuzado",
        "Masa para empanadas",
        "1 cebolla grande",
        "2 huevos duros",
        "Aceitunas verdes",
        "Comino y pimentón",
        "Caldo de pescado"
      ],
      instrucciones: [
        "Cocina y desmenuza el gatuzo.",
        "Sofríe la cebolla hasta dorar.",
        "Mezcla el pescado con cebolla y condimentos.",
        "Agrega huevos duros picados y aceitunas.",
        "Rellena las empanadas y píntalas con huevo.",
        "Hornea a 180°C por 20-25 minutos."
      ],
      productosRelacionados: ["Gatuzo", "Filet de Gatuzo"],
      tags: ["tradicional", "argentino", "fiesta"],
      valorNutricional: {
        calorias: 180,
        proteinas: "12g",
        grasas: "9g",
        carbohidratos: "15g"
      }
    },
    {
      id: 4,
      titulo: "Lenguado Meunière",
      categoria: "Gourmet",
      tiempoCoccion: "15 min",
      dificultad: "Intermedio",
      porciones: 2,
      imagen: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      ingredientes: [
        "2 filetes de lenguado",
        "Harina",
        "Mantequilla",
        "Limón",
        "Perejil",
        "Sal y pimienta blanca",
        "Aceite neutro"
      ],
      instrucciones: [
        "Enharina ligeramente los filetes.",
        "Calienta aceite en una sartén.",
        "Cocina el lenguado 2-3 min por lado.",
        "Retira y mantén caliente.",
        "En la misma sartén, dora la mantequilla.",
        "Agrega limón y perejil, sirve inmediatamente."
      ],
      productosRelacionados: ["Lenguado", "Filet de Lenguado"],
      tags: ["francés", "elegante", "mantequilla"],
      valorNutricional: {
        calorias: 245,
        proteinas: "28g",
        grasas: "14g",
        carbohidratos: "3g"
      }
    },
    {
      id: 5,
      titulo: "Ceviche de Pescado Fresco",
      categoria: "Entradas",
      tiempoCoccion: "0 min (marinado 2h)",
      dificultad: "Fácil",
      porciones: 4,
      imagen: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400&h=300&fit=crop",
      ingredientes: [
        "500g pescado blanco fresco",
        "Jugo de 8 limones",
        "1 cebolla morada",
        "Ají amarillo",
        "Cilantro",
        "Sal",
        "Batata dulce",
        "Choclo"
      ],
      instrucciones: [
        "Corta el pescado en cubitos pequeños.",
        "Marina con jugo de limón por 2 horas.",
        "Pica finamente la cebolla morada.",
        "Mezcla pescado, cebolla y ají.",
        "Agrega cilantro y ajusta sal.",
        "Sirve con batata y choclo hervidos."
      ],
      productosRelacionados: ["Pescado Fresco", "Lenguado", "Merluza"],
      tags: ["peruano", "fresco", "limón"],
      valorNutricional: {
        calorias: 165,
        proteinas: "25g",
        grasas: "2g",
        carbohidratos: "12g"
      }
    },
    {
      id: 6,
      titulo: "Paella de Mariscos",
      categoria: "Platos Principales",
      tiempoCoccion: "40 min",
      dificultad: "Difícil",
      porciones: 8,
      imagen: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop",
      ingredientes: [
        "Arroz bomba",
        "Langostinos",
        "Mejillones",
        "Calamares",
        "Caldo de pescado",
        "Azafrán",
        "Ajo y cebolla",
        "Pimentón dulce",
        "Judías verdes"
      ],
      instrucciones: [
        "Sofríe mariscos y resérvalos.",
        "En la paellera, sofríe ajo y cebolla.",
        "Agrega arroz y tuesta 2 minutos.",
        "Añade caldo caliente con azafrán.",
        "Cocina 15 min sin remover.",
        "Incorpora mariscos y termina cocción."
      ],
      productosRelacionados: ["Mariscos", "Langostinos", "Calamares"],
      tags: ["español", "festivo", "azafrán"],
      valorNutricional: {
        calorias: 420,
        proteinas: "22g",
        grasas: "8g",
        carbohidratos: "65g"
      }
    }
  ];

  // Categorías disponibles
  const categorias = ['Todas', 'Platos Principales', 'Entradas', 'Aperitivos', 'Gourmet'];

  // Cargar productos al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await productosService.obtenerTodos();
        setProductos(response.data || []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Filtrar recetas por categoría y búsqueda
  const recetasFiltradas = recetasData.filter(receta => {
    const coincideCategoria = categoriaFiltro === 'Todas' || receta.categoria === categoriaFiltro;
    const coincideBusqueda = busqueda === '' || 
      receta.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      receta.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));
    
    return coincideCategoria && coincideBusqueda;
  });

  // Obtener productos relacionados con la receta
  const obtenerProductosRelacionados = (productosRelacionados) => {
    return productos.filter(producto => 
      productosRelacionados.some(nombre => 
        producto.Nombre.toLowerCase().includes(nombre.toLowerCase())
      )
    );
  };

  // Componente para mostrar el icono de dificultad
  const IconoDificultad = ({ dificultad }) => {
    const getColor = () => {
      switch(dificultad) {
        case 'Fácil': return '#4CAF50';
        case 'Intermedio': return '#FF9800';
        case 'Difícil': return '#F44336';
        default: return '#757575';
      }
    };

    return (
      <span className="dificultad-badge" style={{ backgroundColor: getColor() }}>
        {dificultad}
      </span>
    );
  };

  // Si se selecciona una receta, mostrar vista detallada
  if (recetaSeleccionada) {
    const productosRel = obtenerProductosRelacionados(recetaSeleccionada.productosRelacionados);
    
    return (
      <div className="recetas-container">
        <div className="receta-detalle">
          <button 
            className="btn-volver"
            onClick={() => setRecetaSeleccionada(null)}
          >
            ← Volver a recetas
          </button>
          
          <div className="receta-header">
            <div className="receta-imagen-grande">
              <img src={recetaSeleccionada.imagen} alt={recetaSeleccionada.titulo} />
              <div className="receta-overlay">
                <h1>{recetaSeleccionada.titulo}</h1>
                <div className="receta-meta">
                  <span className="categoria">{recetaSeleccionada.categoria}</span>
                  <IconoDificultad dificultad={recetaSeleccionada.dificultad} />
                </div>
              </div>
            </div>
          </div>

          <div className="receta-contenido">
            <div className="receta-info">
              <div className="info-grid">
                <div className="info-item">
                  <span className="icono">⏱️</span>
                  <div>
                    <strong>Tiempo</strong>
                    <p>{recetaSeleccionada.tiempoCoccion}</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icono">👥</span>
                  <div>
                    <strong>Porciones</strong>
                    <p>{recetaSeleccionada.porciones} persona{recetaSeleccionada.porciones > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icono">🔥</span>
                  <div>
                    <strong>Calorías</strong>
                    <p>{recetaSeleccionada.valorNutricional.calorias} kcal</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icono">💪</span>
                  <div>
                    <strong>Proteínas</strong>
                    <p>{recetaSeleccionada.valorNutricional.proteinas}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="receta-cuerpo">
              <div className="ingredientes-section">
                <h3>📝 Ingredientes</h3>
                <ul className="ingredientes-lista">
                  {recetaSeleccionada.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
                </ul>
              </div>

              <div className="instrucciones-section">
                <h3>👨‍🍳 Preparación</h3>
                <ol className="instrucciones-lista">
                  {recetaSeleccionada.instrucciones.map((paso, index) => (
                    <li key={index}>{paso}</li>
                  ))}
                </ol>
              </div>
            </div>

            {productosRel.length > 0 && (
              <div className="productos-relacionados">
                <h3>🐟 Productos recomendados</h3>
                <div className="productos-grid">
                  {productosRel.map(producto => (
                    <div key={producto.id} className="producto-card">
                      <img src={producto.Image || '/logo.png'} alt={producto.Nombre} />
                      <div className="producto-info">
                        <h4>{producto.Nombre}</h4>
                        <p className="precio">${producto.Precio}</p>
                        <span className={`stock ${producto.Stock ? 'disponible' : 'agotado'}`}>
                          {producto.Stock ? '✅ Disponible' : '❌ Agotado'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="tags-section">
              <h4>🏷️ Tags</h4>
              <div className="tags">
                {recetaSeleccionada.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal de recetas
  return (
    <div className="recetas-container">
      <div className="recetas-header">
        <h1>🍽️ Recetas de Pescadería</h1>
        <p>Descubre deliciosas recetas con nuestros productos frescos</p>
      </div>

      <div className="filtros-section">
        <div className="busqueda-container">
          <input
            type="text"
            placeholder="Buscar recetas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
          <span className="busqueda-icono">🔍</span>
        </div>

        <div className="categorias-filtros">
          {categorias.map(categoria => (
            <button
              key={categoria}
              className={`filtro-btn ${categoriaFiltro === categoria ? 'active' : ''}`}
              onClick={() => setCategoriaFiltro(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando recetas...</p>
        </div>
      ) : (
        <div className="recetas-grid">
          {recetasFiltradas.length > 0 ? (
            recetasFiltradas.map(receta => (
              <div 
                key={receta.id} 
                className="receta-card"
                onClick={() => setRecetaSeleccionada(receta)}
              >
                <div className="receta-imagen">
                  <img src={receta.imagen} alt={receta.titulo} />
                  <div className="receta-badges">
                    <IconoDificultad dificultad={receta.dificultad} />
                    <span className="tiempo-badge">⏱️ {receta.tiempoCoccion}</span>
                  </div>
                </div>
                
                <div className="receta-contenido-card">
                  <div className="receta-categoria-small">{receta.categoria}</div>
                  <h3>{receta.titulo}</h3>
                  
                  <div className="receta-stats">
                    <span>👥 {receta.porciones} porciones</span>
                    <span>🔥 {receta.valorNutricional.calorias} kcal</span>
                  </div>
                  
                  <div className="receta-tags-preview">
                    {receta.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag-small">#{tag}</span>
                    ))}
                  </div>
                  
                  <button className="btn-ver-receta">
                    Ver receta completa →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-resultados">
              <span className="no-resultados-icono">🍽️</span>
              <h3>No se encontraron recetas</h3>
              <p>Intenta con otros términos de búsqueda o cambia el filtro de categoría</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recetas;