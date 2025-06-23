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
    const { carrito, cantidadTotal, totalCarrito, vaciarCarrito, eliminarDelCarrito } = useCarrito();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dia, setDia] = useState('');
    const [horario, setHorario] = useState('');
    const [medioPago, setMedioPago] = useState('Efectivo'); // Nuevo estado

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horarios = Array.from({ length: 13 }, (_, i) => `${9 + i}:00`);

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    };

    // Calcular total con descuento si es efectivo
    const totalConDescuento = medioPago === 'Efectivo'
        ? Math.round(totalCarrito * 0.9 * 100) / 100
        : totalCarrito;

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

        mensaje += `\n💰 Total: $${totalConDescuento}\n`;

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

            {mostrarCarrito && (
                <div className="carrito-modal" onClick={toggleCarrito}>
                    <div className="carrito-contenido" onClick={(e) => e.stopPropagation()}>
                        <h2>Carrito de Compras</h2>
                        {carrito.length === 0 ? (
                            <p>El carrito está vacío.</p>
                        ) : (
                            <>
                                <ul>
                                    {carrito.map((producto) => (
                                        <li key={producto.id}>
                                            {producto.Nombre} (x{producto.cantidad}) - ${producto.Precio * producto.cantidad}
                                            <button
                                                onClick={() => eliminarDelCarrito(producto.id)}
                                                className="btn-eliminar"
                                            >
                                                ❌
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ margin: "1rem 0" }}>
                                    <label style={{ fontWeight: 600 }}>Medio de pago:&nbsp;</label>
                                    <select
                                        value={medioPago}
                                        onChange={e => setMedioPago(e.target.value)}
                                        style={{ padding: "0.3rem", borderRadius: 6, border: "1px solid var(--color-secundario)" }}
                                    >
                                        <option value="Efectivo">Efectivo (10% de descuento)</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="MercadoPago">MercadoPago</option>
                                    </select>
                                </div>
                                <h3>
                                    Total: ${totalConDescuento}
                                    {medioPago === 'Efectivo' && (
                                        <span style={{ color: "var(--color-acento)", fontSize: "1rem", marginLeft: 8 }}>
                                            (10% OFF)
                                        </span>
                                    )}
                                </h3>
                                <button onClick={vaciarCarrito} className="btn-vaciar">
                                    Vaciar carrito
                                </button>
                                <form onSubmit={handleSubmit} className="formulario-retiro">
                                    <label>
                                        Nombre:
                                        <input
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Apellido:
                                        <input
                                            type="text"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Teléfono (opcional):
                                        <input
                                            type="tel"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="Ej: 123456789"
                                        />
                                    </label>
                                    <label>
                                        Día de Retiro:
                                        <select
                                            value={dia}
                                            onChange={(e) => setDia(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            {dias.map((d, i) => (
                                                <option key={i} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Horario de Retiro:
                                        <select
                                            value={horario}
                                            onChange={(e) => setHorario(e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            {horarios.map((h, i) => (
                                                <option key={i} value={h}>
                                                    {h}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <button type="submit">Confirmar Pedido</button>
                                </form>
                            </>
                        )}
                        <button onClick={toggleCarrito}>Cerrar</button>
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