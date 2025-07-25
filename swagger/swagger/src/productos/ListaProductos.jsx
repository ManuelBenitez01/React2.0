import  { useEffect, useState } from "react";
import { getProductos } from "../conexion/api";

export default function ListaProductos() {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos()
      .then(data => {
        setProductos(data.data); 
        setLoading(false);
      })
      .catch(err => {
        setError("Error al cargar productos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Productos</h2>
      {Array.isArray(productos) && productos.length > 0 ? (
        <pre style={{ background: '#222', color: '#0f0', padding: 16, borderRadius: 8 }}>
          {JSON.stringify(productos, null, 2)}
        </pre>
      ) : (
        <p style={{ color: 'orange' }}>No hay productos disponibles.</p>
      )}
    </div>
  );
}