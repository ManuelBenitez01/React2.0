import express from 'express';
import {
    getProductos,
    getProductoPorId,
    crearProducto,
    modificarProducto,
    eliminarProducto
} from '../controller/controller.js';

const router = express.Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoPorId);
router.post('/productos', crearProducto);
router.put('/productos/:id', modificarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;