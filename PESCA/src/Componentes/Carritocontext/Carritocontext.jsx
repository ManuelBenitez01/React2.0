import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [descuento, setDescuento] = useState(0);
    const [codigoDescuentoAplicado, setCodigoDescuentoAplicado] = useState('');

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        const descuentoGuardado = localStorage.getItem('descuentoCarrito');
        const codigoGuardado = localStorage.getItem('codigoDescuento');
        
        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                setCarrito(carritoParseado);
            } catch (error) {
                console.error('Error al cargar carrito:', error);
            }
        }
        
        if (descuentoGuardado) {
            setDescuento(Number(descuentoGuardado));
        }
        
        if (codigoGuardado) {
            setCodigoDescuentoAplicado(codigoGuardado);
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // Guardar descuento en localStorage
    useEffect(() => {
        localStorage.setItem('descuentoCarrito', descuento.toString());
        localStorage.setItem('codigoDescuento', codigoDescuentoAplicado);
    }, [descuento, codigoDescuentoAplicado]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        console.log('🛒 Agregando al carrito:', producto.Nombre, 'Cantidad:', cantidad);
        setCarrito(prev => {
            const existe = prev.find(item => item.id === producto.id); 
            if (existe) {
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad }];
            }
        });
    };

    const vaciarCarrito = () => {
        console.log('🗑️ Vaciando carrito');
        setCarrito([]);
        setDescuento(0);
        setCodigoDescuentoAplicado('');
        localStorage.removeItem('carrito');
        localStorage.removeItem('descuentoCarrito');
        localStorage.removeItem('codigoDescuento');
    };

    const eliminarDelCarrito = (id) => {
        console.log('➖ Eliminando del carrito ID:', id);
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

    // Nueva función para remover completamente un producto
    const removerProducto = (id) => {
        console.log('🗑️ Removiendo producto ID:', id);
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    // Nueva función para actualizar cantidad específica
    const actualizarCantidad = (id, nuevaCantidad) => {
        console.log('🔄 Actualizando cantidad ID:', id, 'Nueva cantidad:', nuevaCantidad);
        if (nuevaCantidad <= 0) {
            removerProducto(id);
            return;
        }
        
        setCarrito(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, cantidad: nuevaCantidad }
                    : item
            )
        );
    };

    // Códigos de descuento válidos
    const codigosDescuento = {
        'PESCA10': 10,
        'DESCUENTO15': 15,
        'NUEVO20': 20,
        'ESPECIAL25': 25,
        'VERANO30': 30
    };

    // Función para aplicar código de descuento
    const aplicarCodigoDescuento = (codigo) => {
        const codigoMayuscula = codigo.toUpperCase().trim();
        const porcentajeDescuento = codigosDescuento[codigoMayuscula];
        
        if (porcentajeDescuento) {
            setDescuento(porcentajeDescuento);
            setCodigoDescuentoAplicado(codigoMayuscula);
            console.log('✅ Código aplicado:', codigoMayuscula, porcentajeDescuento + '%');
            return {
                success: true,
                message: `¡Descuento del ${porcentajeDescuento}% aplicado!`,
                porcentaje: porcentajeDescuento
            };
        } else {
            console.log('❌ Código inválido:', codigo);
            return {
                success: false,
                message: 'Código de descuento inválido'
            };
        }
    };

    // Función para remover descuento
    const removerDescuento = () => {
        setDescuento(0);
        setCodigoDescuentoAplicado('');
        console.log('🚫 Descuento removido');
    };

    // Calcular subtotal
    const subtotal = carrito.reduce(
        (acc, producto) => acc + (Number(producto?.Precio) * (producto?.cantidad || 1)),
        0
    );

    // Calcular descuento en dinero
    const montoDescuento = subtotal * (descuento / 100);

    // Calcular costo de envío (gratis si es mayor a $50)
    const costoEnvio = subtotal > 50 ? 0 : 5;

    // Calcular total final
    const totalCarrito = Math.max(0, subtotal - montoDescuento + costoEnvio);

    // Calcular cantidad total de items
    const cantidadTotal = carrito.reduce((acc, producto) => acc + (producto?.cantidad || 1), 0);

    // Función para obtener información del producto por ID
    const obtenerProducto = (id) => {
        return carrito.find(item => item.id === id);
    };

    // Función para verificar si un producto está en el carrito
    const estaEnCarrito = (id) => {
        return carrito.some(item => item.id === id);
    };

    // Función para obtener cantidad de un producto específico
    const obtenerCantidadProducto = (id) => {
        const producto = carrito.find(item => item.id === id);
        return producto ? producto.cantidad : 0;
    };

    // Función para obtener resumen del carrito
    const obtenerResumenCarrito = () => {
        return {
            items: carrito.length,
            cantidadTotal,
            subtotal,
            descuento,
            codigoDescuentoAplicado,
            montoDescuento,
            costoEnvio,
            total: totalCarrito,
            envioGratis: costoEnvio === 0
        };
    };

    const valorContexto = {
        // Estado
        carrito,
        cantidadTotal,
        totalCarrito,
        subtotal,
        descuento,
        codigoDescuentoAplicado,
        montoDescuento,
        costoEnvio,
        
        // Funciones originales (mantenidas para compatibilidad)
        agregarAlCarrito,
        vaciarCarrito,
        eliminarDelCarrito,
        
        // Nuevas funciones
        removerProducto,
        actualizarCantidad,
        aplicarCodigoDescuento,
        removerDescuento,
        obtenerProducto,
        estaEnCarrito,
        obtenerCantidadProducto,
        obtenerResumenCarrito,
        
        // Información adicional
        codigosDisponibles: Object.keys(codigosDescuento),
        carritoVacio: carrito.length === 0,
        tieneDescuento: descuento > 0,
        envioGratis: costoEnvio === 0
    };

    return (
        <CarritoContext.Provider value={valorContexto}>
            {children}
        </CarritoContext.Provider>
    );
};

CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

