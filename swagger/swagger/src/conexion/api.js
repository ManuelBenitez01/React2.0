const API_URL = "http://localhost:5000/api";

export async function getProductos() {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
}

export async function getProductoById(id) {
  const res = await fetch(`${API_URL}/productos/${id}`);
  return res.json();
}

export async function getCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function getCategoriaById(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`);
  return res.json();
}