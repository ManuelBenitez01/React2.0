import  productoModel  from '../model/model.js';

export const getProductos = async (req, res) => {
    const productos = await productoModel.obtenerProductos();
    res.json({ success: true, data: productos });
    if (!productos) {
        return res.status(404).json({ success: false, message: "No existen productos" });
    }
};

export const getProductoPorId = async (req, res) => {
    
    const { id } = req.params;
    const producto = await productoModel.obtenerProductoPorId(id);
     if (!producto)  {
        return res.status(404).json({ success: false, message: "No existe este producto amiguito" });
    }
    
    res.json({ success: true, data: producto });
   
};

export const crearProducto = async (req, res) => {
    const id = await productoModel.crearProducto(req.body);
    res.status(201).json({ success: true, id });
};

export const modificarProducto = async (req, res) => {
    const { id } = req.params;
    await productoModel.modificarProducto(id, req.body);
    res.json({ success: true, message: 'Actulizaste el producto' });
};

export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    await productoModel.eliminarProducto(id);
    res.json({ success: true, message: 'Borraste el producto' });
};




