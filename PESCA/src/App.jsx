import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Componentes/Header/Header';
import Inicio from './Componentes/Mainx/inicio/Inicio';
import Productos from './Componentes/Productos/Productos';
import Provedores from './Componentes/Provedores/provedores';
import Recetas from './Componentes/Recetas/recetas';
import Admin from './Componentes/Admin/Admin';

/**
 * Componente principal de contenido de la aplicación
 * Maneja el estado global y la navegación entre páginas
 */
function AppContent() {
  // Estado para la categoría seleccionada desde el menú o inicio
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
  // Estado para el producto seleccionado (usado para recetas)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  // Estado del carrito de compras (array de productos con cantidad)
  const [carrito, setCarrito] = useState([]);
  
  // Hook de navegación para cambiar entre rutas
  const navigate = useNavigate();

  /**
   * Función para agregar productos al carrito
   * Si el producto ya existe, incrementa la cantidad
   * Si es nuevo, lo agrega con cantidad 1
   * @param {Object} producto - Producto a agregar al carrito
   */
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      // Buscar si el producto ya existe en el carrito
      const existe = prev.find(item => item.ID === producto.ID);
      
      if (existe) {
        // Si existe, incrementar cantidad
        return prev.map(item =>
          item.ID === producto.ID
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <>
      {/* Componente Header que aparece en todas las páginas */}
      <Header
        onVerInicio={() => navigate('/')}                    // Navegar a página de inicio
        onVerProductos={() => navigate('/productos')}        // Navegar a página de productos
        onSeleccionCategoria={cat => {                       // Seleccionar categoría y navegar a productos
          setCategoriaSeleccionada(cat);
          navigate('/productos');
        }}
        onVerProvedores={() => navigate('/provedores')}      // Navegar a página de proveedores
        onVerRecetas={() => navigate('/recetas')}            // Navegar a página de recetas
      />

      {/* Definición de rutas de la aplicación */}
      <Routes>
        {/* Ruta de inicio - página principal */}
        <Route
          path="/"
          element={
            <Inicio
              onSeleccionCategoria={cat => {                 // Función para seleccionar categoría desde inicio
                setCategoriaSeleccionada(cat);
                navigate('/productos');
              }}
            />
          }
        />
        
        {/* Ruta de productos - catálogo principal */}
        <Route
          path="/productos"
          element={
            <Productos
              agregarAlCarrito={agregarAlCarrito}             // Función para agregar al carrito
              categoriaSeleccionada={categoriaSeleccionada}  // Categoría para filtrar productos
              onVerRecetas={producto => {                     // Función para ver recetas de un producto
                setProductoSeleccionado(producto);
                navigate('/recetas');
              }}
            />
          }
        />
        
        {/* Ruta de recetas - recetas relacionadas a un producto */}
        <Route
          path="/recetas"
          element={<Recetas producto={productoSeleccionado} />}  // Pasamos el producto seleccionado
        />
        
        {/* Ruta de proveedores */}
        <Route path="/provedores" element={<Provedores />} />
        
        {/* Ruta del panel de administración */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

/**
 * Componente principal de la aplicación
 * Envuelve todo en React Router para habilitar la navegación
 */
function App() {
  return (
    <Router>
      <AppContent />  {/* Componente que contiene toda la lógica de la app */}
    </Router>
  );
}

export default App;