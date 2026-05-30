import { useParams, Link } from "react-router-dom";
import { productos } from '../data/producto'; 
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; 

export default function ProductoDetalle() {
    const { id } = useParams(); 
    const { addToCart, cart, totalGeneral, subtotalCarrito, codigoPostal, setCodigoPostal, calcularEnvio, costoEnvio } = useCart(); 
    
    const producto = productos.find((p) => p.id === Number(id));

    const esFunda = producto?.categoria?.toLowerCase().includes('funda') || producto?.imgAll;
    const tieneColores = producto?.colores && Object.keys(producto.colores).length > 0;
    const primerColorHex = tieneColores ? Object.keys(producto.colores)[0] : null;
    const tieneModelos = producto?.modelos && Object.keys(producto.modelos).length > 0;
    const primerModelo = tieneModelos ? Object.keys(producto.modelos)[0] : null;

    // ✅ FIX: Todos los hooks ANTES del return condicional
    const [modeloActivo, setModeloActivo] = useState(primerModelo);
    const [colorActivo, setColorActivo] = useState(primerColorHex);
    const [imagenActiva, setImagenActiva] = useState(0);
    const [cantidad, setCantidad] = useState(1);
    const [mensajeError, setMensajeError] = useState("");

    // ✅ FIX: stockDisponible definido ANTES de stockFinal (que lo necesita)
    const datosColorActual = tieneColores ? producto?.colores[colorActivo] : null;
    const stockDisponible = tieneColores ? datosColorActual?.stock : (producto?.stock || 0);
    const stockModelo = tieneModelos ? producto?.modelos[modeloActivo] : null;
    const stockFinal = tieneModelos ? stockModelo : stockDisponible;

    // Sincronizar imágenes por color
    useEffect(() => {
        if (tieneColores && datosColorActual) {
            const indiceImagen = datosColorActual.id - 1;
            setImagenActiva(indiceImagen >= 0 ? indiceImagen : 0);
            setCantidad(1);
            setMensajeError("");
        }
    }, [colorActivo, tieneColores, datosColorActual]);

    // Forzar la carga inicial de la imagen si no tiene colores activos de entrada
    useEffect(() => {
        setImagenActiva(0);
    }, [id]);

    // ✅ FIX: return condicional DESPUÉS de todos los hooks
    if (!producto) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold">Producto no encontrado</h2>
                <Link to="/" className="mt-4 text-blue-600 underline">Volver al inicio</Link>
            </div>
        );
    }

    const usarListaMovil = producto.imgMobile && producto.imgMobile.length > 0;
    const usarListaDesktop = producto.imgDesktop && producto.imgDesktop.length > 0;
    const usarListaAll = producto.imgAll && producto.imgAll.length > 0;

    let listaImagenes = [];
    if (usarListaAll) {
        listaImagenes = producto.imgAll;
    } else if (usarListaDesktop) {
        listaImagenes = producto.imgDesktop;
    } else {
        listaImagenes = producto.imagenes || [];
    }

    const cambiarCantidad = (nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        if (nuevaCantidad > stockFinal) {
            setMensajeError("No hay más stock disponible.");
            return;
        }
        setMensajeError("");
        setCantidad(nuevaCantidad);
    };

    const añadirAlCarritoOk = () => {
        if (stockFinal <= 0) return;
        
        // 1. Buscamos si este mismo producto (y color si tiene) ya está en el carrito
        const itemEnCarrito = cart.find(
            (item) => item.id === producto.id && (!tieneColores || item.color?.nombre === datosColorActual?.nombre)
        );

        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        // 2. VALIDACIÓN usando stockFinal (contempla modelos)
        if (cantidadEnCarrito + cantidad > stockFinal) {
            setMensajeError("No hay más stock disponible.");
            setTimeout(() => setMensajeError(""), 4000);
            return;
        }

        // 3. Resolvemos cuál es el precio real
        const precioReal = producto.descuento > 0 ? producto.precioOferta : producto.precioOriginal;

        // 4. Imagen activa
        const imagenReal = listaImagenes[imagenActiva] || (producto.imagenes && producto.imagenes[0]) || '';

        // 5. Objeto formateado para el carrito
        const productoFormateado = {
            id: producto.id,
            nombre: producto.nombre,
            precio: precioReal,          
            precioOriginal: producto.precioOriginal,
            precioOferta: producto.precioOferta,
            descuento: producto.descuento,
            imagen: imagenReal,          
            categoria: producto.categoria,
            modelo: modeloActivo || null
        };

        // 6. Enviamos al context y limpiamos error
        addToCart(productoFormateado, cantidad, datosColorActual);
        setMensajeError(""); 
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-8 pt-4 md:pt-8 relative overflow-x-hidden">
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                
                {/* COLUMNA IZQUIERDA: Galería de Imágenes */}
                <div className="space-y-6 md:sticky md:top-24 w-full">
                    <div className="w-full h-72 md:h-auto md:aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 relative flex items-center justify-center">
                        <picture className="w-full h-full flex items-center justify-center">
                            <source 
                                media="(max-width: 767px)" 
                                srcSet={usarListaAll ? producto.imgAll[imagenActiva] : (usarListaMovil ? producto.imgMobile[imagenActiva] : (producto.imagenes ? producto.imagenes[imagenActiva] : ''))} 
                            />
                            <source 
                                media="(min-width: 768px)" 
                                srcSet={usarListaAll ? producto.imgAll[imagenActiva] : (usarListaDesktop ? producto.imgDesktop[imagenActiva] : (producto.imagenes ? producto.imagenes[imagenActiva] : ''))} 
                            />
                            <img
                                src={listaImagenes[imagenActiva] || (producto.imagenes && producto.imagenes[0]) || ''} 
                                alt={producto.nombre}
                                className={`object-contain transition-all duration-300 w-full h-full max-h-full ${
                                    esFunda ? "p-4" : "p-8 md:p-12 max-h-[90%]"
                                }`}
                                decoding="sync"
                                fetchpriority="high"
                            />
                        </picture>

                        {stockFinal <= 0 && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                                <span className="bg-gray-900 text-white font-bold px-6 py-3 rounded-full shadow-lg tracking-wide uppercase text-sm">
                                    Sin Stock Disponible
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {!esFunda && (
                        <div className="grid grid-cols-4 gap-4">
                            {listaImagenes.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setImagenActiva(index)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                        imagenActiva === index ? "border-blue-600 scale-102" : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="miniatura" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* COLUMNA DERECHA: Info del Producto */}
                <div className="flex flex-col mt-4 md:mt-0">
                    <span className="text-blue-600 font-semibold uppercase tracking-widest text-xs">
                        {producto.categoria}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold mt-1 text-gray-900 tracking-tight">
                        {producto.nombre}
                    </h1>
                    
                    {/* Precios */}
                    <div className="mt-3 flex items-baseline gap-3">
                        {producto.descuento > 0 ? (
                            <>
                                <span className="text-3xl font-bold text-gray-900">
                                    ${producto.precioOffer?.toLocaleString('es-AR') || producto.precioOferta?.toLocaleString('es-AR')}
                                </span>
                                <span className="text-lg font-medium text-gray-400 line-through">
                                    ${producto.precioOriginal?.toLocaleString('es-AR')}
                                </span>
                                <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
                                    {producto.descuento}% OFF
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-gray-900">
                                ${producto.precioOriginal?.toLocaleString('es-AR')}
                            </span>
                        )}
                    </div>

                    <p className="mt-6 text-gray-600 leading-relaxed text-base border-b border-gray-100 pb-6">
                        {producto.descripcion || "Sin descripción disponible."} 
                    </p>

                    {/* Colores */}
                    {tieneColores && (
                        <div className="mt-6 border-b border-gray-100 pb-6">
                            <p className="text-sm font-medium text-gray-700 mt-2">
                                Color - <span className="text-gray-900 font-semibold">{datosColorActual?.nombre}</span>
                            </p>
                            <div className="flex flex-wrap gap-4 mt-3">
                                {Object.keys(producto.colores).map((hex) => {
                                    const itemColor = producto.colores[hex];
                                    const esSeleccionado = colorActivo === hex;
                                    const sinStock = itemColor.stock <= 0;

                                    return (
                                        <button
                                            key={hex}
                                            onClick={() => setColorActivo(hex)}
                                            style={producto.id === 8 ? {} : { backgroundColor: hex }}
                                            className={`w-10 h-10 rounded-full relative transition-all duration-200 transform hover:scale-110 shadow-inner overflow-hidden ${
                                                esSeleccionado ? "ring-2 ring-offset-2 ring-blue-600 scale-105" : "ring-1 ring-black/10"
                                            } ${sinStock ? "opacity-40" : ""}`}
                                        >
                                            {producto.id === 8 && (
                                                <>
                                                    <span className="absolute inset-0 w-1/2 left-0" style={{ backgroundColor: '#1f2324' }} />
                                                    <span className="absolute inset-0 w-1/2 left-1/2" style={{ backgroundColor: '#e94f1c' }} />
                                                </>
                                            )}
                                            {sinStock && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-full h-[2px] bg-red-600 transform -rotate-45"></div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Modelos - solo para productos con modelos como el templado */}
                    {tieneModelos && (
                        <div className="mt-6 border-b border-gray-100 pb-6">
                            <p className="text-sm font-medium text-gray-700 mb-3">
                                Modelo — <span className="text-gray-900 font-semibold">{modeloActivo}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(producto.modelos).map(([modelo, stock]) => {
                                    const esSeleccionado = modeloActivo === modelo;
                                    const sinStock = stock <= 0;
                                    return (
                                        <button
                                            key={modelo}
                                            onClick={() => { setModeloActivo(modelo); setCantidad(1); setMensajeError(""); }}
                                            disabled={sinStock}
                                            className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transition-all ${
                                                esSeleccionado
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : sinStock
                                                        ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed'
                                                        : 'border-gray-300 text-gray-700 hover:border-gray-500'
                                            }`}
                                        >
                                            {modelo}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Cantidad */}
                    {stockDisponible > 0 && (
                        <div className="mt-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Cantidad</h3>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => cambiarCantidad(cantidad - 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900 text-lg">
                                    {cantidad}
                                </span>
                                <button 
                                    onClick={() => cambiarCantidad(cantidad + 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-gray-50 active:scale-95 transition-all"
                                >
                                    +
                                </button>

                            </div>
                            
                        </div>
                    )}

                    {/* Botón único de acción */}
                    <div className="mt-8">
                        <button
                            onClick={añadirAlCarritoOk}
                            disabled={stockFinal <= 0}
                            className={`w-full py-4 rounded-2xl font-bold text-center tracking-wide transition-all ${
                                stockFinal > 0
                                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-200"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Añadir al carrito
                        </button>

                        {mensajeError && (
                            <p className="text-red-500 font-medium text-xs mt-2 bg-red-50 p-2 rounded-lg border border-red-100 text-center">
                                {mensajeError}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}