import { categorias } from '../Categorias/categorias';
import { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useCarrito } from '../Carritocontext/Carritocontext';
import PropTypes from 'prop-types';

export default function Header({ onVerInicio, onVerProductos, onSeleccionCategoria, onVerProvedores, onVerRecetas }) {
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [menuActivo, setMenuActivo] = useState(false);
    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const menuRef = useRef(null);
    const { 
        carrito, 
        cantidadTotal, 
        totalCarrito, 
        vaciarCarrito, 
        eliminarDelCarrito,
        actualizarCantidad,
        subtotal,
        descuento,
        aplicarCodigoDescuento,
        removerDescuento,
        codigoDescuentoAplicado,
        montoDescuento,
        costoEnvio,
        envioGratis
    } = useCarrito();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dia, setDia] = useState('');
    const [horario, setHorario] = useState('');
    const [medioPago, setMedioPago] = useState('Efectivo');
    
    // Estados adicionales para el carrito mejorado
    const [codigoDescuentoInput, setCodigoDescuentoInput] = useState('');
    const [mostrarFormDescuento, setMostrarFormDescuento] = useState(false);
    const [mostrarCheckout, setMostrarCheckout] = useState(false);
    const [mensajeCarrito, setMensajeCarrito] = useState('');

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horarios = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`);

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    };

    // Calcular total con descuento por pago en efectivo
    const totalConDescuentoEfectivo = medioPago === 'Efectivo'
        ? Math.round(totalCarrito * 0.9 * 100) / 100
        : totalCarrito;

    // Función para mostrar mensajes temporales
    const mostrarMensajeTemp = (mensaje, duracion = 3000) => {
        setMensajeCarrito(mensaje);
        setTimeout(() => setMensajeCarrito(''), duracion);
    };

    // Función para aplicar código de descuento
    const manejarCodigoDescuento = () => {
        if (!codigoDescuentoInput.trim()) {
            mostrarMensajeTemp('Por favor ingresa un código', 'error');
            return;
        }

        const resultado = aplicarCodigoDescuento(codigoDescuentoInput);
        if (resultado.success) {
            mostrarMensajeTemp(resultado.message, 'success');
            setCodigoDescuentoInput('');
            setMostrarFormDescuento(false);
        } else {
            mostrarMensajeTemp(resultado.message, 'error');
        }
    };

    // Función para resolver URL de imagen
    const resolverImagenUrl = (imagen) => {
        if (!imagen) return '/logo.png';
        if (imagen.startsWith('http')) return imagen;
        if (imagen.startsWith('/')) return imagen;
        return `/${imagen}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !apellido.trim() || !dia || !horario) {
            alert('Por favor completá todos los campos obligatorios.');
            return;
        }

        const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;
        let mensaje = `📦 Pedido de ${nombreCompleto}\n`;
        mensaje += `📅 Día de retiro: ${dia}\n⏰ Horario: ${horario}\n`;
        mensaje += `💳 Medio de pago: ${medioPago}\n`;

        if (telefono.trim()) {
            mensaje += `📞 Teléfono: ${telefono.trim()}\n`;
        }

        mensaje += `\n🛒 Detalle del pedido:\n`;
        carrito.forEach((producto) => {
            mensaje += `- ${producto.Nombre} (x${producto.cantidad}): $${producto.Precio * producto.cantidad}\n`;
        });
        mensaje += `\n💳 Total : $${totalCarrito}\n`;
        if (medioPago === 'Efectivo') {
            mensaje += `\n💸 Descuento 10% por pago en efectivo aplicado.\n`;
        }

        mensaje += `\n💰 Total: $${totalConDescuentoEfectivo}\n`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const numeroWhatsapp = "5491162266637";
        const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;

        window.open(urlWhatsapp, '_blank');

        vaciarCarrito();
        setNombre('');
        setApellido('');
        setTelefono('');
        setDia('');
        setHorario('');
        setMostrarCarrito(false);
        setMenuActivo(false);
        setMedioPago('Efectivo');
        setMostrarCheckout(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuActivo && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuActivo(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuActivo]);

    useEffect(() => {
        if (mostrarCarrito) {
            document.body.classList.add('modal-abierto');
        } else {
            document.body.classList.remove('modal-abierto');
        }
    }, [mostrarCarrito]);

    return (
        <header>
            <div className="menu">
                <div className="logo">
                    <img src="/logotipo1.PNG" alt="Logo" />
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuActivo(!menuActivo)}
                    aria-label="Abrir/cerrar menú"
                >
                    ☰
                    {cantidadTotal > 0 && <span className="cantidad">{cantidadTotal}</span>}
                </button>

                <nav ref={menuRef} className={menuActivo ? 'active' : ''}>
                    <a
                        href="#"
                        onClick={() => {
                            onVerInicio();
                            setMenuActivo(false);
                            setMostrarCategorias(false);
                        }}
                    >
                        Inicio
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            setMostrarCategorias(!mostrarCategorias);
                            setMenuActivo(true);
                        }}
                    >
                        Productos
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            onVerRecetas();
                            setMenuActivo(false);
                            setMostrarCategorias(false);
                        }}
                    >
                        Recetas
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            onVerProvedores();
                            setMenuActivo(false);
                            setMostrarCategorias(false);
                        }}
                    >
                        Proveedores
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            toggleCarrito();
                            setMenuActivo(false);
                            setMostrarCategorias(false);
                        }}
                    >
                        Carrito 🛒
                        {cantidadTotal > 0 && <span className="cantidad">{cantidadTotal}</span>}
                    </a>
                    
                    {mostrarCategorias && (
                        <div className="categorias-header">
                            <button
                                className="btn-categoria-header"
                                onClick={() => {
                                    onSeleccionCategoria(null);
                                    onVerProductos();
                                    setMostrarCategorias(false);
                                    setMenuActivo(false);
                                }}
                            >
                                Ver todos
                            </button>
                            {categorias.map((cat) => (
                                <button
                                    key={cat}
                                    className="btn-categoria-header"
                                    onClick={() => {
                                        onSeleccionCategoria?.(cat);
                                        onVerProductos();
                                        setMostrarCategorias(false);
                                        setMenuActivo(false);
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </nav>
            </div>

            {/* CARRITO MEJORADO */}
            {mostrarCarrito && (
                <div className="carrito-modal-overlay" onClick={toggleCarrito}>
                    <div className="carrito-modal-mejorado" onClick={(e) => e.stopPropagation()}>
                        {/* Header del carrito */}
                        <div className="carrito-header-mejorado">
                            <div className="carrito-titulo">
                                <h2>🛒 Mi Carrito</h2>
                                <span className="items-count">
                                    {cantidadTotal} {cantidadTotal === 1 ? 'artículo' : 'artículos'}
                                </span>
                            </div>
                            <button className="btn-cerrar-carrito" onClick={toggleCarrito}>
                                ✕
                            </button>
                        </div>

                        {/* Mensaje temporal */}
                        {mensajeCarrito && (
                            <div className={`mensaje-carrito ${mensajeCarrito.includes('error') ? 'error' : 'success'}`}>
                                {mensajeCarrito}
                            </div>
                        )}

                        {/* Contenido del carrito */}
                        <div className="carrito-contenido-mejorado">
                            {carrito.length === 0 ? (
                                <div className="carrito-vacio-mejorado">
                                    <div className="vacio-icon">🛒</div>
                                    <h3>Tu carrito está vacío</h3>
                                    <p>¡Descubre nuestros productos frescos del mar!</p>
                                </div>
                            ) : (
                                <>
                                    {/* Lista de productos */}
                                    <div className="productos-carrito">
                                        {carrito.map((producto) => (
                                            <div key={producto.id} className="producto-carrito-item">
                                                <div className="producto-imagen-carrito">
                                                    <img 
                                                        src={resolverImagenUrl(producto.Image)} 
                                                        alt={producto.Nombre}
                                                        onError={(e) => e.target.src = '/logo.png'}
                                                    />
                                                </div>
                                                
                                                <div className="producto-info-carrito">
                                                    <h4>{producto.Nombre}</h4>
                                                    <p className="precio-unitario-carrito">
                                                        ${Number(producto.Precio).toFixed(2)} c/u
                                                    </p>
                                                </div>
                                                
                                                <div className="producto-controles-carrito">
                                                    <div className="cantidad-controles-carrito">
                                                        <button 
                                                            className="btn-cantidad-carrito"
                                                            onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="cantidad-carrito">{producto.cantidad}</span>
                                                        <button 
                                                            className="btn-cantidad-carrito"
                                                            onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="precio-total-carrito">
                                                        ${(Number(producto.Precio) * producto.cantidad).toFixed(2)}
                                                    </div>
                                                    
                                                    <button 
                                                        className="btn-eliminar-carrito"
                                                        onClick={() => eliminarDelCarrito(producto.id)}
                                                        title="Eliminar producto"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Códigos de descuento */}
                                    <div className="descuentos-carrito">
                                        <div className="descuento-header-carrito">
                                            <h4>💰 Códigos de Descuento</h4>
                                            <button 
                                                className="btn-toggle-descuento"
                                                onClick={() => setMostrarFormDescuento(!mostrarFormDescuento)}
                                            >
                                                {mostrarFormDescuento ? '▲' : '▼'}
                                            </button>
                                        </div>

                                        {mostrarFormDescuento && (
                                            <div className="form-descuento-carrito">
                                                <div className="input-descuento-carrito">
                                                    <input
                                                        type="text"
                                                        value={codigoDescuentoInput}
                                                        onChange={(e) => setCodigoDescuentoInput(e.target.value)}
                                                        placeholder="Ingresa tu código"
                                                        onKeyPress={(e) => e.key === 'Enter' && manejarCodigoDescuento()}
                                                    />
                                                    <button 
                                                        className="btn-aplicar-descuento"
                                                        onClick={manejarCodigoDescuento}
                                                    >
                                                        Aplicar
                                                    </button>
                                                </div>
                                                
                                                <div className="codigos-disponibles-carrito">
                                                    <small>Códigos disponibles:</small>
                                                    <div className="codigos-chips">
                                                        {['PESCA10', 'DESCUENTO15', 'NUEVO20'].map(codigo => (
                                                            <span 
                                                                key={codigo}
                                                                className="codigo-chip"
                                                                onClick={() => setCodigoDescuentoInput(codigo)}
                                                            >
                                                                {codigo}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {descuento > 0 && (
                                                    <div className="descuento-aplicado-carrito">
                                                        <span>✅ {codigoDescuentoAplicado} aplicado ({descuento}%)</span>
                                                        <button 
                                                            className="btn-remover-descuento-carrito"
                                                            onClick={removerDescuento}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Resumen de precios */}
                                    <div className="resumen-precios-carrito">
                                        <div className="linea-precio-carrito">
                                            <span>Subtotal:</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>

                                        {descuento > 0 && (
                                            <div className="linea-precio-carrito descuento-linea">
                                                <span>Descuento ({descuento}%):</span>
                                                <span>-${montoDescuento.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="linea-precio-carrito">
                                            <span>Envío:</span>
                                            <span>
                                                {envioGratis ? (
                                                    <span className="envio-gratis-carrito">¡GRATIS! 🎉</span>
                                                ) : (
                                                    `$${costoEnvio.toFixed(2)}`
                                                )}
                                            </span>
                                        </div>

                                        {!envioGratis && (
                                            <div className="envio-tip-carrito">
                                                💡 Envío gratis en compras mayores a $50
                                            </div>
                                        )}

                                        <div className="linea-precio-carrito total-linea">
                                            <span>Total:</span>
                                            <span>${totalCarrito.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Selección de medio de pago */}
                                    <div className="medio-pago-carrito">
                                        <label className="medio-pago-label">
                                            <strong>💳 Medio de pago:</strong>
                                        </label>
                                        <select
                                            value={medioPago}
                                            onChange={e => setMedioPago(e.target.value)}
                                            className="select-medio-pago"
                                        >
                                            <option value="Efectivo">💰 Efectivo (10% de descuento)</option>
                                            <option value="Tarjeta">💳 Tarjeta</option>
                                            <option value="MercadoPago">📱 MercadoPago</option>
                                        </select>
                                    </div>

                                    {/* Total final con descuento por efectivo */}
                                    <div className="total-final-carrito">
                                        <strong>
                                            💰 Total Final: ${totalConDescuentoEfectivo.toFixed(2)}
                                            {medioPago === 'Efectivo' && (
                                                <span className="descuento-efectivo-badge">
                                                    (10% OFF por efectivo)
                                                </span>
                                            )}
                                        </strong>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="acciones-carrito">
                                        <button 
                                            onClick={vaciarCarrito} 
                                            className="btn-vaciar-carrito"
                                        >
                                            🗑️ Vaciar Carrito
                                        </button>
                                        <button 
                                            onClick={() => setMostrarCheckout(true)}
                                            className="btn-proceder-carrito"
                                        >
                                            📦 Proceder al Pedido
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Formulario de checkout */}
                        {mostrarCheckout && carrito.length > 0 && (
                            <div className="checkout-form-carrito">
                                <h3>📋 Datos para el pedido</h3>
                                <form onSubmit={handleSubmit} className="formulario-retiro-mejorado">
                                    <div className="form-row">
                                        <label className="form-group-carrito">
                                            <span>Nombre *:</span>
                                            <input
                                                type="text"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                className="input-carrito"
                                            />
                                        </label>
                                        <label className="form-group-carrito">
                                            <span>Apellido *:</span>
                                            <input
                                                type="text"
                                                value={apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                required
                                                className="input-carrito"
                                            />
                                        </label>
                                    </div>
                                    
                                    <label className="form-group-carrito">
                                        <span>Teléfono (opcional):</span>
                                        <input
                                            type="tel"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="Ej: 123456789"
                                            className="input-carrito"
                                        />
                                    </label>
                                    
                                    <div className="form-row">
                                        <label className="form-group-carrito">
                                            <span>Día de Retiro *:</span>
                                            <select
                                                value={dia}
                                                onChange={(e) => setDia(e.target.value)}
                                                required
                                                className="select-carrito"
                                            >
                                                <option value="">Seleccionar</option>
                                                {dias.map((d, i) => (
                                                    <option key={i} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className="form-group-carrito">
                                            <span>Horario de Retiro *:</span>
                                            <select
                                                value={horario}
                                                onChange={(e) => setHorario(e.target.value)}
                                                required
                                                className="select-carrito"
                                            >
                                                <option value="">Seleccionar</option>
                                                {horarios.map((h, i) => (
                                                    <option key={i} value={h}>
                                                        {h}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    
                                    <div className="form-actions-carrito">
                                        <button 
                                            type="button"
                                            onClick={() => setMostrarCheckout(false)}
                                            className="btn-cancelar-checkout"
                                        >
                                            ❌ Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn-confirmar-pedido"
                                        >
                                            ✅ Confirmar Pedido
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

Header.propTypes = {
    onVerInicio: PropTypes.func.isRequired,
    onVerProductos: PropTypes.func.isRequired,
    onSeleccionCategoria: PropTypes.func.isRequired,
    onVerProvedores: PropTypes.func.isRequired,
    onVerRecetas: PropTypes.func.isRequired,
};