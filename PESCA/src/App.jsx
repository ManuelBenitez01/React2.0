import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Componentes/Header/Header';
import Inicio from './Componentes/Mainx/inicio/Inicio';
import Productos from './Componentes/Productos/Productos';
import Provedores from './Componentes/Provedores/provedores';
import Recetas from './Componentes/Recetas/recetas';

function AppContent() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.ID === producto.ID);
      if (existe) {
        return prev.map(item =>
          item.ID === producto.ID
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <>
      <Header
        onVerInicio={() => navigate('/')}
        onVerProductos={() => navigate('/productos')}
        onSeleccionCategoria={cat => {
          setCategoriaSeleccionada(cat);
          navigate('/productos');
        }}
        onVerProvedores={() => navigate('/provedores')}
        onVerRecetas={() => navigate('/recetas')}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Inicio
              onSeleccionCategoria={cat => {
                setCategoriaSeleccionada(cat);
                navigate('/productos');
              }}
            />
          }
        />
        <Route
          path="/productos"
          element={
            <Productos
              agregarAlCarrito={agregarAlCarrito}
              categoriaSeleccionada={categoriaSeleccionada}
              onVerRecetas={producto => {
                setProductoSeleccionado(producto);
                navigate('/recetas');
              }}
            />
          }
        />
        <Route
          path="/recetas"
          element={<Recetas producto={productoSeleccionado} />}
        />
        <Route path="/provedores" element={<Provedores />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;