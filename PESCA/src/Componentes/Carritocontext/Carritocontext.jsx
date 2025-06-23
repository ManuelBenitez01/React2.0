import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.id === producto.id); 
            if (existe) {
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
};

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter(item => item.cantidad > 0) // Elimina los productos con cantidad 0
        );
    };

    const totalCarrito = carrito.reduce(
        (acc, producto) => acc + (Number(producto?.Precio) * (producto?.cantidad || 1)),
        0
    );

    const cantidadTotal = carrito.reduce((acc, producto) => acc + (producto?.cantidad || 1), 0);

    return (
        <CarritoContext.Provider value={{ 
            carrito, 
            agregarAlCarrito, 
            vaciarCarrito, 
            cantidadTotal, 
            totalCarrito,
            eliminarDelCarrito 
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

