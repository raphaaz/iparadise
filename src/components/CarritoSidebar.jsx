import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';

export default function CarritoSidebar() {
    const { cart, cartAbierto, cerrarCarrito, removeFromCart, updateQuantity } = useCart();
    const [paso, setPaso] = useState(1); // 1 = carrito, 2 = datos del comprador
    const [datosComprador, setDatosComprador] = useState({
        nombre: '', apellido: '', telefono: '',
        calle: '', numero: '', piso: '',
        ciudad: '', provincia: '', codigoPostal: ''
    });
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (cartAbierto) {
            document.body.style.overflow = 'hidden';
            setPaso(1); // resetea al abrir
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [cartAbierto]);

    const subtotalCarrito = useMemo(() => {
        return cart.reduce((acc, item) => {
            const precio = item.descuento > 0 ? item.precioOferta : item.precioOriginal;
            return acc + (precio * item.cantidad);
        }, 0);
    }, [cart]);

    const validarDatos = () => {
        const nuevosErrores = {};
        if (!datosComprador.nombre.trim()) nuevosErrores.nombre = true;
        if (!datosComprador.apellido.trim()) nuevosErrores.apellido = true;
        if (!datosComprador.telefono.trim()) nuevosErrores.telefono = true;
        if (!datosComprador.calle.trim()) nuevosErrores.calle = true;
        if (!datosComprador.numero.trim()) nuevosErrores.numero = true;
        if (!datosComprador.ciudad.trim()) nuevosErrores.ciudad = true;
        if (!datosComprador.provincia.trim()) nuevosErrores.provincia = true;
        if (!datosComprador.codigoPostal.trim()) nuevosErrores.codigoPostal = true;
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handlePagar = async () => {
    if (!validarDatos()) return;

    try {
        const items = cart.map(item => ({
            title: item.nombre,
            quantity: item.cantidad,
            unit_price: item.descuento > 0 ? item.precioOferta : item.precioOriginal,
            currency_id: 'ARS'
        }));

        const itemsConStock = cart.map(item => ({
            producto_id: item.id,
            color_nombre: item.color?.nombre || null,
            cantidad: item.cantidad,
            stock_nuevo: (item.color?.stock || item.stock || 10) - item.cantidad
        }));

        const res = await fetch('/api/crear-preferencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, itemsConStock })
        });

        const data = await res.json();

        if (data.init_point) {
            localStorage.setItem('iparadise_comprador', JSON.stringify({
                datos: datosComprador,
                productos: cart.map(item => ({
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.descuento > 0 ? item.precioOferta : item.precioOriginal,
                    color: item.color?.nombre || null,
                    modelo: item.modelo || null
                })),
                total: subtotalCarrito
            }));

            window.location.href = data.init_point;
        } else {
            alert('Error al crear el pago: ' + JSON.stringify(data));
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
};

    const campo = (key, label, placeholder, tipo = 'text', mitad = false) => (
        <div className={mitad ? 'flex-1' : 'w-full'}>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</label>
            <input
                type={tipo}
                placeholder={placeholder}
                value={datosComprador[key]}
                onChange={e => {
                    setDatosComprador(prev => ({ ...prev, [key]: e.target.value }));
                    if (errores[key]) setErrores(prev => ({ ...prev, [key]: false }));
                }}
                className={`mt-0.5 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black ${errores[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
            />
        </div>
    );

    if (!cartAbierto) return null;

    return createPortal(
        <>
        <div className="fixed inset-0 bg-black/50 z-[9999]" onClick={cerrarCarrito} />

        <div className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] bg-white z-[10000] shadow-2xl flex flex-col overflow-hidden">

            {/* CABECERA */}
            <div className="h-16 border-b flex justify-between items-center px-4 bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    {paso === 2 && (
                        <button onClick={() => setPaso(1)} className="text-gray-400 hover:text-gray-900 text-sm">
                            ← 
                        </button>
                    )}
                    <h2 className="text-lg font-black text-gray-900 tracking-wide uppercase">
                        {paso === 1 ? 'Carrito de compras' : 'Datos de envío'}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    {/* Indicador de pasos */}
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${paso === 1 ? 'bg-black' : 'bg-gray-300'}`} />
                        <div className={`w-2 h-2 rounded-full ${paso === 2 ? 'bg-black' : 'bg-gray-300'}`} />
                    </div>
                    <button onClick={cerrarCarrito} className="text-gray-400 hover:text-gray-900 text-2xl font-light p-1">✕</button>
                </div>
            </div>

            {/* PASO 1 — PRODUCTOS */}
            {paso === 1 && (
                <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white border-b">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center py-12">Tu carrito está vacío.</p>
                    ) : (
                        cart.map((item) => {
                            const precioBase = item.descuento > 0 ? item.precioOferta : item.precioOriginal;
                            const cantidadActual = item.cantidad || 1;
                            const imagenProducto = item.imagen || item.imgAll?.[0] || item.imgDesktop?.[0];
                            const stockDisponible = item.color?.stock || item.stock || 10;
                            const itemKey = `${item.id}-${item.color?.nombre || 'sin-color'}-${item.modelo || 'sin-modelo'}`;

                            return (
                                <div key={itemKey} className="flex gap-4 border-b pb-4 items-start">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl border flex-shrink-0 p-1 flex items-center justify-center overflow-hidden">
                                        {imagenProducto ? (
                                            <img src={imagenProducto} alt={item.nombre} className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">Sin foto</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight">{item.nombre}</h4>
                                            <button onClick={() => removeFromCart(item.id, item.color?.nombre, item.modelo)} className="text-gray-400 hover:text-red-500 font-medium text-sm px-1">✕</button>
                                        </div>
                                        {item.color && <p className="text-[11px] text-gray-400 uppercase mt-0.5">Color: {item.color.nombre}</p>}
                                        {item.modelo && <p className="text-[11px] text-gray-400 uppercase mt-0.5">Modelo: {item.modelo}</p>}
                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center border rounded-md bg-white">
                                                <button onClick={() => {
                                                    if (cantidadActual > 1) updateQuantity(item.id, item.color?.nombre, cantidadActual - 1, item.modelo);
                                                    else removeFromCart(item.id, item.color?.nombre, item.modelo);
                                                }} className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold">-</button>
                                                <span className="px-3 text-xs font-bold">{cantidadActual}</span>
                                                <button onClick={() => {
                                                    if (cantidadActual >= stockDisponible) { alert(`¡Ups! Solo quedan ${stockDisponible} unidades disponibles.`); return; }
                                                    updateQuantity(item.id, item.color?.nombre, cantidadActual + 1, item.modelo);
                                                }} disabled={cantidadActual >= stockDisponible} className={`px-2 py-0.5 font-bold ${cantidadActual >= stockDisponible ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>+</button>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">${(precioBase * cantidadActual).toLocaleString('es-AR')}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="flex-shrink-0 p-4 pb-8 bg-gray-50 space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-gray-800">Subtotal:</span>
                        <span className="text-lg font-black text-gray-900">${subtotalCarrito.toLocaleString('es-AR')}</span>
                    </div>
                    <p className="text-xs text-gray-400">El costo de envío se coordinará por WhatsApp luego del pago.</p>
                    <button
                        onClick={() => { if (cart.length > 0) setPaso(2); }}
                        disabled={cart.length === 0}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        Continuar con el envío →
                    </button>
                    <button onClick={cerrarCarrito} className="w-full text-center text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors block py-0.5">
                        Ver más productos
                    </button>
                </div>
                </>
            )}

            {/* PASO 2 — DATOS DEL COMPRADOR */}
            {paso === 2 && (
                <>
                <div className="flex-grow overflow-y-auto p-4 bg-white space-y-3">

                    <p className="text-xs text-gray-400 pb-1">Completá tus datos para coordinar el envío después del pago.</p>

                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-700 pb-1">Datos personales</p>
                        <div className="flex gap-2">
                            {campo('nombre', 'Nombre *', 'Juan', 'text', true)}
                            {campo('apellido', 'Apellido *', 'García', 'text', true)}
                        </div>
                        {campo('telefono', 'Teléfono *', 'Ej: 3454123456', 'tel')}
                    </div>

                    <div className="space-y-1 pt-2">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-700 pb-1">Dirección de envío</p>
                        <div className="flex gap-2">
                            {campo('calle', 'Calle *', 'Av. San Martín', 'text', true)}
                            {campo('numero', 'Número *', '1234', 'text', true)}
                        </div>
                        {campo('piso', 'Piso / Depto (opcional)', 'Ej: 3° B', 'text')}
                        {campo('ciudad', 'Ciudad *', 'Concordia', 'text')}
                        <div className="flex gap-2">
                            {campo('provincia', 'Provincia *', 'Entre Ríos', 'text', true)}
                            {campo('codigoPostal', 'Código Postal *', '3200', 'text', true)}
                        </div>
                    </div>

                    {Object.keys(errores).some(k => errores[k]) && (
                        <p className="text-xs text-red-500 font-medium">Completá los campos obligatorios marcados en rojo.</p>
                    )}
                </div>

                <div className="flex-shrink-0 p-4 pb-8 bg-gray-50 space-y-3">
                    <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-gray-800">Total:</span>
                        <span className="text-lg font-black text-gray-900">${subtotalCarrito.toLocaleString('es-AR')}</span>
                    </div>
                    <p className="text-xs text-gray-400">+ envío a coordinar por WhatsApp</p>
                    <button onClick={handlePagar} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                        Pagar con Mercado Pago
                    </button>
                </div>
                </>
            )}

        </div>
        </>,
        document.body
    );
}