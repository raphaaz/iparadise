import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';

export default function CarritoSidebar() {
    const { cart, cartAbierto, cerrarCarrito, removeFromCart, updateQuantity } = useCart();
    const [codigoPostal, setCodigoPostal] = useState('');
    const [costoEnvio, setCostoEnvio] = useState(0);

    // EFECTO PROFESIONAL: Bloquea el scroll de la página principal al abrir el carrito
    useEffect(() => {
        if (cartAbierto) {
            document.body.style.overflow = 'hidden';
        }
        
        // Cleanup: Devuelve el scroll normal cuando el carrito se cierra
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [cartAbierto]);

    const subtotalCarrito = useMemo(() => {
        return cart.reduce((acc, item) => {
            const precio = item.descuento > 0 ? item.precioOferta : item.precioOriginal;
            return acc + (precio * item.cantidad);
        }, 0);
    }, [cart]);
    
    const totalGeneral = subtotalCarrito + costoEnvio;

    const handleCodigoPostalChange = (e) => {
        const valor = e.target.value;
        setCodigoPostal(valor);
        if (!valor.trim()) {
            setCostoEnvio(0);
        }
    };


    const handlePagar = async () => {
    try {
        const items = cart.map(item => ({
            title: item.nombre,
            quantity: item.cantidad,
            unit_price: item.descuento > 0 ? item.precioOferta : item.precioOriginal,
            currency_id: 'ARS'
        }));

        const res = await fetch('/api/crear-preferencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items })
        });

        const data = await res.json();
        console.log('Respuesta MP:', data);

        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            alert('Error: ' + JSON.stringify(data));
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
};

    const calcularEnvio = () => {
        if (codigoPostal.trim()) {
            setCostoEnvio(1500);
        }
    };

    if (!cartAbierto) return null;

    return createPortal(
        <>
        {/* Backdrop oscuro */}
        <div 
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={cerrarCarrito}
        />

        {/* CONTENEDOR PRINCIPAL CORREGIDO:
            - Usamos h-screen fijo tanto para PC como Celular.
            - overflow-y-auto asegura que si el contenido supera la altura de la pantalla, 
                toda la barra scrollea de arriba a abajo de forma independiente y fluida.
        */}
        {/* CONTENEDOR PRINCIPAL */}
        <div className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] bg-white z-[10000] shadow-2xl flex flex-col overflow-hidden">            {/* 1. CABECERA */}
            <div className="h-16 border-b flex justify-between items-center px-4 bg-white">
                <h2 className="text-lg font-black text-gray-900 tracking-wide uppercase">Carrito de compras</h2>
                <button 
                    onClick={cerrarCarrito}
                    className="text-gray-400 hover:text-gray-900 text-2xl font-light p-1"
                >
                    ✕
                </button>
            </div>

            {/* 2. LISTA DE PRODUCTOS CON SU PROPIO SCROLL INTERNO
                Mantenemos los 350px estables por comodidad visual inmediata.
            */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white border-b scroll-lindo">                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-12">Tu carrito está vacío.</p>
                ) : (
                    cart.map((item) => {
                        const precioBase = item.descuento > 0 ? item.precioOferta : item.precioOriginal;
                        const cantidadActual = item.cantidad || 1;
                        const imagenProducto = item.imagen || item.imgAll?.[0] || item.imgDesktop?.[0]; 
                        const stockDisponible = item.color?.stock || item.stock || 10;
                        
                        const itemKey = `${item.id}-${item.color?.nombre || 'sin-color'}`;

                        return (
                            <div key={itemKey} className="flex gap-4 border-b pb-4 items-start">
                                <div className="w-20 h-20 bg-gray-50 rounded-xl border flex-shrink-0 p-1 flex items-center justify-center overflow-hidden">
                                    {imagenProducto ? (
                                        <img 
                                            src={imagenProducto} 
                                            alt={item.nombre} 
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">Sin foto</div>
                                    )}
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight">{item.nombre}</h4>
                                        <button 
                                            onClick={() => removeFromCart(item.id, item.color?.nombre)} 
                                            className="text-gray-400 hover:text-red-500 font-medium text-sm px-1"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {item.color && (
                                        <p className="text-[11px] text-gray-400 uppercase mt-0.5">
                                            Color: {item.color.nombre}
                                        </p>
                                    )}
                                    
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center border rounded-md bg-white">
                                            <button 
                                                onClick={() => {
                                                    if (cantidadActual > 1) {
                                                        updateQuantity(item.id, item.color?.nombre, cantidadActual - 1);
                                                    } else {
                                                        removeFromCart(item.id, item.color?.nombre);
                                                    }
                                                }}
                                                className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                                            >
                                                -
                                            </button>
                                            
                                            <span className="px-3 text-xs font-bold">{cantidadActual}</span>
                                            
                                            <button 
                                                onClick={() => {
                                                    if (cantidadActual >= stockDisponible) {
                                                        alert(`¡Ups! Solo quedan ${stockDisponible} unidades disponibles.`);
                                                        return;
                                                    }
                                                    updateQuantity(item.id, item.color?.nombre, cantidadActual + 1);
                                                }}
                                                disabled={cantidadActual >= stockDisponible}
                                                className={`px-2 py-0.5 font-bold ${
                                                    cantidadActual >= stockDisponible 
                                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        <span className="text-sm font-bold text-gray-900">
                                            ${(precioBase * cantidadActual).toLocaleString('es-AR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 3. PANEL INFERIOR DE TOTALES
                Tiene espacio extra abajo para asegurar comodidad total en pantallas chicas o cortas.
            */}
                <div className="flex-shrink-0 p-4 pb-8 bg-gray-50 space-y-4">
                    <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-gray-800">Subtotal:</span>
                    <span className="text-lg font-black text-gray-900">
                        ${subtotalCarrito.toLocaleString('es-AR')}
                    </span>
                </div>

                {/* Código Postal */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
                        Medios de envío
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Tu código postal"
                            value={codigoPostal}
                            onChange={handleCodigoPostalChange}
                            className="flex-1 px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <button 
                            type="button"
                            onClick={calcularEnvio}
                            className="px-4 py-2 border border-black text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                        >
                            Calcular
                        </button>
                    </div>
                </div>

                {/* Total Final */}
                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                    <span className="text-base font-black text-gray-900 uppercase">Total:</span>
                    <span className="text-xl font-black text-gray-900">
                        ${totalGeneral.toLocaleString('es-AR')}
                    </span>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2.5">
                    <button 
                    onClick={handlePagar}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    Pagar con Mercado Pago
                </button>
                    <button 
                        type="button"
                        onClick={cerrarCarrito}
                        className="w-full text-center text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors block py-0.5"
                    >
                        Ver más productos
                    </button>
                </div>
            </div>

        </div>
        </>,
        document.body
    );
}