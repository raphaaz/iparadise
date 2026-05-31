import { useState, useEffect } from 'react';
import { productos } from '../data/producto'; 
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const formateador = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
});

// COMPONENTE AUXILIAR AFUERA
const TarjetaProducto = ({ producto }) => {
    const tieneEstructuraNueva = producto.imgDesktop && producto.imgDesktop.length > 0;
    
    let srcOriginal = '';
    let srcMovil = '';

    if (tieneEstructuraNueva) {
        srcOriginal = Array.isArray(producto.imgDesktop) ? producto.imgDesktop[0] : producto.imgDesktop;
        srcMovil = Array.isArray(producto.imgMobile) ? producto.imgMobile[0] : producto.imgMobile;
    } else if (producto.imgAll && producto.imgAll.length > 0) {
        srcOriginal = producto.imgAll[0];
        srcMovil = producto.imgAll[0];
    } else {
        srcOriginal = Array.isArray(producto.imagenes) ? producto.imagenes[0] : (producto.imagenes || '');
        srcMovil = srcOriginal;
    }

    const tieneDescuento = producto.descuento > 0;
    const esFunda = producto.categoria?.toLowerCase().includes('funda');

    return (
        <Link to={`/producto/${producto.id}`} className="block no-underline group">
            <article className="group bg-card rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-gray-200 relative md:block">
                {tieneDescuento && (
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                        {producto.descuento}% OFF
                    </div>
                )}
                    <div className="relative aspect-[4/5] md:aspect-square overflow-hidden mt-8 md:mt-0">
                        <picture>
                        <source media="(max-width: 767px)" srcSet={srcMovil} />
                        <source media="(min-width: 768px)" srcSet={srcOriginal} />
                        <img
                            src={srcOriginal}
                            alt={producto.nombre}
                            className={`absolute inset-0 w-full h-full transition-transform duration-500 ${esFunda ? 'object-cover p-0 scale-100 group-hover:scale-105' : 'object-contain p-1 md:p-10 group-hover:scale-105'}`}
                            decoding="sync"
                        />
                    </picture>
                </div>
                <div className="p-2 pt-4 md:pt-6 md:p-6 md:block min-h-[100px] md:min-h-0">
                    {/* Categoría: oculta en móvil */}
                    <span className="hidden md:block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {producto.categoria}
                    </span>
                    {/* Nombre: centrado en móvil, izquierda en desktop, multilínea */}
                    <h3 className="mt-2 text-center md:text-left text-sm sm:text-lg font-semibold text-foreground group-hover:text-blue-500 transition-colors leading-tight line-clamp-2 md:line-clamp-1">
                        {producto.nombre}
                    </h3>
                    {/* Precios: siempre centrados en móvil */}
                    <div className="mt-1 md:mt-2 pt-0 md:pt-0 flex items-baseline justify-center md:justify-start gap-2">
                            {tieneDescuento ? (
                            <>
                                <span className="text-lg sm:text-xl font-semibold text-foreground">
                                    {formateador.format(producto.precioOferta)}
                                </span>
                                <span className="text-sm sm:text-base font-medium text-muted-foreground/70 line-through">
                                    {formateador.format(producto.precioOriginal)}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg sm:text-xl font-semibold text-foreground">
                                {formateador.format(producto.precioOriginal)}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default function Catalogo({ soloOfertas = false }) {
    const navigate = useNavigate();
    
    // Cambiamos useLocation por useSearchParams para escuchar la URL reactivamente
    const [searchParams] = useSearchParams();
    const busquedaNavbar = searchParams.get('search') || '';

    // --- ESTADOS DE FILTROS ---
    const [filtroOfertas, setFiltroOfertas] = useState(soloOfertas);
    const [filtroCategoria, setFiltroCategoria] = useState([]);
    const [filtroColor, setFiltroColor] = useState([]);
    const [filtroModelo, setFiltroModelo] = useState([]);
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const [openAcordeon, setOpenAcordeon] = useState({
        categoria: false,
        color: false,
        modelo: false,
        precio: false
    });

    useEffect(() => {
        setFiltroOfertas(soloOfertas);
    }, [soloOfertas]);

    const categoriasOpciones = ['fundas', 'templado', 'cables', 'adaptador', 'audio', 'relojes', 'batery pack'];
const coloresOpciones = [
    { nombre: 'Negro', hex: '#1a1a1a' },
    { nombre: 'Blanco', hex: '#f4f4f4' },
    { nombre: 'Azul Marino', hex: '#111d36' },
    { nombre: 'Azul Francia', hex: '#0046aa' },
    { nombre: 'Azul Turquesa', hex: '#3fdfcf' },
    { nombre: 'Celeste', hex: '#acd8e6' },
    { nombre: 'Verde Militar', hex: '#4b521f' },
    { nombre: 'Verde Loro', hex: '#31cd31' },
    { nombre: 'Fucsia', hex: '#ff007e' },
    { nombre: 'Rosa Pastel', hex: '#ffbfca' },
    { nombre: 'Naranja', hex: '#ff7e4f' },
    { nombre: 'Rojo', hex: '#ff0000' },
    { nombre: 'Violeta', hex: '#492d80' },
    { nombre: 'Lila', hex: '#d1c3e8' },
    { nombre: 'Amarillo', hex: '#e1ac01' },
    { nombre: 'Beige', hex: '#e6d4c3' },
    { nombre: 'Marrón', hex: '#a0522d' },
    { nombre: 'Gris', hex: '#3a3b3b' },
];    const modelosOpciones = [
        'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
        'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
        'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
        'iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
        'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
        'iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
        'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max'
    ];

    const toggleAcordeon = (campo) => {
        setOpenAcordeon(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    const manejarSeleccionMultiple = (listaActual, setLista, valor) => {
        if (listaActual.includes(valor)) {
            setLista(listaActual.filter(item => item !== valor));
        } else {
            setLista([...listaActual, valor]);
        }
    };

    const tieneFiltrosActivos = busquedaNavbar || filtroOfertas || filtroCategoria.length > 0 || filtroColor.length > 0 || filtroModelo.length > 0 || precioMin || precioMax;

    const limpiarFiltros = () => {
        setFiltroOfertas(false);
        setFiltroCategoria([]);
        setFiltroColor([]);
        setFiltroModelo([]);
        setPrecioMin('');
        setPrecioMax('');
        navigate('/catalogo');
    };

    // --- PRE-PROCESAMIENTO DE FILTROS ---
    const categoriasSeleccionadas = filtroCategoria.map(c => c.toLowerCase());
    const coloresSeleccionados = filtroColor.map(c => c.toLowerCase().split(' ')[0]);
    const modelosSeleccionados = filtroModelo.map(m => m.toLowerCase());
    
    const palabrasBusqueda = busquedaNavbar.toLowerCase().split(' ').filter(p => p.trim() !== '');

    // --- FUNCIÓN DE EVALUACIÓN DE FILTROS ---
    const cumpleFiltros = (prod) => {
        // 0. Filtro del Navbar Inteligente (Multi-palabra)
        // 0. Filtro del Navbar con tolerancia a errores de tipeo
        if (palabrasBusqueda.length > 0) {
            const nombreProd = prod.nombre?.toLowerCase() || '';
            const catProd = prod.categoria?.toLowerCase() || '';
            const modelosArray = Array.isArray(prod.modelo) 
                ? prod.modelo.map(m => m?.toLowerCase() || '') 
                : [prod.modelo?.toLowerCase() || ''];

            const similitud = (busqueda, texto) => {
                if (texto.includes(busqueda)) return true;
                if (busqueda.length < 3) return false;
                // Busca la palabra de búsqueda como subcadena en cada palabra del texto
                const palabrasTexto = texto.split(' ');
                return palabrasTexto.some(palabra => {
                    if (Math.abs(palabra.length - busqueda.length) > 2) return false;
                    let coincidencias = 0;
                    for (let i = 0; i < busqueda.length; i++) {
                        if (palabra.includes(busqueda[i])) coincidencias++;
                    }
                    return coincidencias >= Math.ceil(busqueda.length * 0.8);
                });
            };

            const coincideTodo = palabrasBusqueda.every(palabra => {
                const enNombre = nombreProd.includes(palabra) || similitud(palabra, nombreProd);
                const enCategoria = catProd.includes(palabra) || similitud(palabra, catProd);
                const enModelo = modelosArray.some(m => m.includes(palabra) || similitud(palabra, m));
                return enNombre || enCategoria || enModelo;
            });

            if (!coincideTodo) return false;
        }

        // 1. Filtro de Ofertas
        if (filtroOfertas && (!prod.descuento || prod.descuento <= 0)) return false;
        
        // 2. Filtro de Categoría
        if (categoriasSeleccionadas.length > 0 && !categoriasSeleccionadas.includes(prod.categoria?.toLowerCase())) return false;
        
        // 3. Filtro de Color
        if (coloresSeleccionados.length > 0) {
            if (!prod.colores) return false;
            const nombresColoresProd = Object.values(prod.colores)
                .map(c => c.nombre.toLowerCase());
            const tieneColorCoincidente = coloresSeleccionados.some(colorFiltro =>
                nombresColoresProd.some(nombreColor => nombreColor.includes(colorFiltro))
            );
            if (!tieneColorCoincidente) return false;
        }
        
        // 4. Filtro de Modelo
        if (modelosSeleccionados.length > 0) {
            if (!prod.modelo) return false;
            const modelosProducto = Array.isArray(prod.modelo) 
                ? prod.modelo.map(m => m.toLowerCase()) 
                : [prod.modelo.toLowerCase()];
            
            const tieneCoincidencia = modelosProducto.some(m => modelosSeleccionados.includes(m));
            if (!tieneCoincidencia) return false;
        }

        // 5. Filtro de Rango de Precio
        const precioFinal = prod.descuento > 0 ? prod.precioOferta : prod.precioOriginal;
        if (precioMin && precioFinal < parseFloat(precioMin)) return false;
        if (precioMax && precioFinal > parseFloat(precioMax)) return false;

        return true;
    };

    // --- PARTICIÓN DEL CATÁLOGO ---
    const productosFiltrados = productos.filter(cumpleFiltros);
    const productosSugeridos = tieneFiltrosActivos ? productos.filter(prod => !cumpleFiltros(prod)) : [];

    return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-16">
                {/* ENCABEZADO PRINCIPAL DE LA PÁGINA */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground ">
                    {filtroOfertas ? "Ofertas y Promociones 🔥" : "Catálogo de Productos"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {tieneFiltrosActivos 
                        ? `Encontramos ${productosFiltrados.length}  ${productosFiltrados.length === 1 ? 'coincidencia' : 'coincidencias'} para tu búsqueda`
                        : `Explorá nuestra colección completa de ${productos.length} productos`
                    }
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* BARRA LATERAL IZQUIERDA: FILTROS */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
                    <div className="pb-2 border-b border-border/40 hidden md:block">
                        <h2 className="text-sm font-black tracking-wider text-foreground uppercase">Filtros</h2>
                    </div>
                
                    {tieneFiltrosActivos && (
                        <button 
                            onClick={limpiarFiltros}
                            className="w-full py-2 px-4 bg-muted hover:bg-muted/80 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-foreground mb-2"
                        >
                            Limpiar Filtros ✕
                        </button>
                    )}

                    {/* Checkbox master Ofertas */}
                    <div className="border border-border/60 rounded-2xl bg-card p-5 flex items-center justify-between hover:border-red-500/40 transition-colors shadow-sm">
                        <span className="text-sm font-bold text-foreground flex items-center gap-2">
                            Solo Ofertas <span className="text-red-500">🔥</span>
                        </span>
                        <input 
                            type="checkbox" 
                            checked={filtroOfertas}
                            onChange={(e) => setFiltroOfertas(e.target.checked)}
                            className="accent-red-500 h-5 w-5 rounded border-border focus:ring-0 cursor-pointer"
                        />
                    </div>

                    {/* ACORDEÓN 1: CATEGORÍA */}
                    <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
                        <button 
                            onClick={() => toggleAcordeon('categoria')}
                            className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors"
                        >
                            <span>Categorías</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openAcordeon.categoria ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {openAcordeon.categoria && (
                            <div className="px-5 pb-4 space-y-2 border-t border-border/40 pt-3 max-h-52 overflow-y-auto">
                                {categoriasOpciones.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer capitalize">
                                        <input 
                                            type="checkbox" 
                                            checked={filtroCategoria.includes(cat)}
                                            onChange={() => manejarSeleccionMultiple(filtroCategoria, setFiltroCategoria, cat)}
                                            className="accent-primary h-4 w-4 rounded border-border focus:ring-0 cursor-pointer" 
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ACORDEÓN 2: COLOR */}
                    <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
                        <button 
                            onClick={() => toggleAcordeon('color')}
                            className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors"
                        >
                            <span>Color</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openAcordeon.color ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {openAcordeon.color && (
                            <div className="px-5 pb-4 space-y-2 border-t border-border/40 pt-3 max-h-52 overflow-y-auto">
                                {coloresOpciones.map((col) => (
                                    <label key={col.nombre} className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={filtroColor.includes(col.nombre)}
                                            onChange={() => manejarSeleccionMultiple(filtroColor, setFiltroColor, col.nombre)}
                                            className="accent-primary h-4 w-4 rounded border-border focus:ring-0 cursor-pointer" 
                                        />
                                        <span 
                                            className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                                            style={{ backgroundColor: col.hex }}
                                        />
                                        {col.nombre}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ACORDEÓN 3: MODELO */}
                    <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
                        <button 
                            onClick={() => toggleAcordeon('modelo')}
                            className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors"
                        >
                            <span>Modelo</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openAcordeon.modelo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {openAcordeon.modelo && (
                            <div className="px-5 pb-4 space-y-2 border-t border-border/40 pt-3 max-h-60 overflow-y-auto">
                                {modelosOpciones.map((mod) => (
                                    <label key={mod} className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={filtroModelo.includes(mod)}
                                            onChange={() => manejarSeleccionMultiple(filtroModelo, setFiltroModelo, mod)}
                                            className="accent-primary h-4 w-4 rounded border-border focus:ring-0 cursor-pointer" 
                                        />
                                        {mod}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ACORDEÓN 4: PRECIO */}
                    <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
                        <button 
                            onClick={() => toggleAcordeon('precio')}
                            className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted/20 transition-colors"
                        >
                            <span>Precio</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openAcordeon.precio ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {openAcordeon.precio && (
                            <div className="px-5 pb-5 border-t border-border/40 pt-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground/80">Desde</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">$</span>
                                            <input 
                                                type="number" 
                                                placeholder="Mín"
                                                value={precioMin}
                                                onChange={(e) => setPrecioMin(e.target.value)}
                                                className="w-full bg-muted/30 text-sm pl-7 pr-2 py-2 border border-border/80 rounded-xl focus:outline-none focus:border-foreground focus:bg-background transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground/80">Hasta</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">$</span>
                                            <input 
                                                type="number" 
                                                placeholder="Máx"
                                                value={precioMax}
                                                onChange={(e) => setPrecioMax(e.target.value)}
                                                className="w-full bg-muted/30 text-sm pl-7 pr-2 py-2 border border-border/80 rounded-xl focus:outline-none focus:border-foreground focus:bg-background transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* CONTENIDO PRINCIPAL DE PRODUCTOS */}
                <main className="flex-1 space-y-12">
                    {/* SECCIÓN 1: RESULTADOS DE LA BUSQUEDA */}
                    {tieneFiltrosActivos && (
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold tracking-tight text-foreground/90 uppercase border-b border-border/30 pb-2">
                                Resultados de la búsqueda {busquedaNavbar && `para "${busquedaNavbar}"`}
                            </h2>
                            
                            {productosFiltrados.length === 0 ? (
                                <div className="text-center py-12 bg-muted/10 border border-dashed border-border rounded-3xl">
                                    <p className="text-muted-foreground text-sm">
                                        No encontramos productos que coincidan exactamente con el criterio seleccionado.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-start">
                                    {productosFiltrados.map((producto) => (
                                        <TarjetaProducto key={producto.id} producto={producto} />
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* SECCIÓN 2: EL RESTO DEL CATÁLOGO / SUGERENCIAS */}
                    <section className="space-y-6">
                        {tieneFiltrosActivos && (
                            <h2 className="text-lg font-bold tracking-tight text-foreground/90 uppercase border-b border-border/30 pb-2 pt-4">
                                Otros productosque te pueden interesar
                            </h2>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-start">
                            {tieneFiltrosActivos 
                                ? productosSugeridos.map((producto) => (
                                    <TarjetaProducto key={producto.id} producto={producto} />
                                ))
                                : productos.map((producto) => (
                                    <TarjetaProducto key={producto.id} producto={producto} />
                                ))
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}