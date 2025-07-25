import mysql from 'mysql2/promise';
import { productosc, productosu } from '../scheme/scheme.js';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

class productoModel {
    constructor(config) {
        this.config = config;
    }
    async obtenerProductos() {
        const connection = await mysql.createConnection(this.config);
        const productos = await connection.execute('SELECT * FROM productos');
        await connection.end();
        return productos;
    }
    async obtenerProductoPorId(id) {
        const connection = await mysql.createConnection(this.config);
        const [productos] = await connection.execute('SELECT * FROM productos WHERE id = ?', [id]);
        await connection.end();
        return productos[0];
    }
    async crearProducto(data) {
        const validated = productosc.parse(data);
        const connection = await mysql.createConnection(this.config);
        const { nombre,imagen, precio, descripcion } = validated;
        const [producto] = await connection.execute(
            'INSERT INTO productos (nombre, imagen, precio, descripcion) VALUES (?, ?, ?, ?)',
            [nombre, imagen, precio, descripcion]
        );
        await connection.end();
        return producto.insertId;
    }
    async modificarProducto(id, data) {
        const validated = productosu.parse({ id, ...data });
        const connection = await mysql.createConnection(this.config);
        const { nombre,imagen, precio, descripcion } = validated;
        await connection.execute(
            'UPDATE productos SET nombre = ?, imagen = ?, precio = ?, descripcion = ? WHERE id = ?',
            [nombre,imagen , precio, descripcion, id]
        );
        await connection.end();
    }
    async eliminarProducto(id) {
        const connection = await mysql.createConnection(this.config);
        await connection.execute('DELETE FROM productos WHERE id = ?', [id]);
        await connection.end();
    }
}


export default new productoModel(config);


    
