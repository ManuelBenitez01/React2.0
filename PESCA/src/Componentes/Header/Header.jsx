import React, { useState } from 'react';
import './Header.css';

export default function Header() {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    };

    return (
        <header>
            <nav>
                <ul className='menu'>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Productos</a></li>
                    <li>
                        <a href="#" className='carrito' onClick={toggleCarrito}>
                            Carrito 🛒
                        </a>
                    </li>   
                </ul>
            </nav>

            {/* Ventana emergente del carrito */}
            {mostrarCarrito && (
                <div className="carrito-modal">
                    <div className="carrito-contenido">
                        <h2>Carrito de Compras</h2>
                        <p>Aquí aparecerán los productos seleccionados.</p>
                        <button onClick={toggleCarrito}>Cerrar</button>
                    </div>
                </div>
            )}
        </header>
    );
}