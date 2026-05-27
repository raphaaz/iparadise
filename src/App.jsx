"use client"; // Siempre al inicio
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productos } from './data/producto';
import ProductoDetalle from './components/ProductoDetalle.jsx';
import Catalogo from './components/catalogo'; 
import { useCart } from "./context/CartContext"; 
import CarritoSidebar from './components/CarritoSidebar.jsx';

// Formateador de moneda local
const formateador = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
});

/* ==========================================================================
   1. COMPONENTE HEADER
   ========================================================================== */
function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAccesorios, setDesplegableAccesorios] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const { cart, abrirCarrito } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    const terminoLimpio = busqueda.trim();
    if (terminoLimpio) {
      navigate(`/catalogo?search=${encodeURIComponent(terminoLimpio)}`);
      setBusqueda(''); 
      setMenuAbierto(false);
    }
  };

  const manejarBusquedaMovil = () => {
    const q = prompt("¿Qué estás buscando?");
    if (q && q.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(q.trim())}`);
      setMenuAbierto(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
              iParadise
            </h1>
          </Link>

          {/* Buscador Central (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto">
            <form onSubmit={manejarBusqueda} className="relative w-full">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="¿Qué estás buscando?"
                className="w-full bg-muted/50 text-sm pl-4 pr-12 py-2.5 border border-border focus:outline-none focus:border-foreground focus:bg-background transition-all"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 border-l border-border bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Buscar">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Acciones del lado derecho */}
          <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0">
            <button onClick={manejarBusquedaMovil} className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button onClick={abrirCarrito} className="p-2 relative text-muted-foreground hover:text-foreground transition-colors group" aria-label="Ver carrito">
              <svg className="w-5 h-5 sm:w-6 h-6 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuAbierto ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú de Navegación Desktop */}
      <div className="hidden md:block border-t border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center h-11 gap-8 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors py-3">Inicio</Link>
            <Link to="/catalogo" className="hover:text-foreground transition-colors py-3">Catálogo</Link>
            
            <div className="relative" onMouseEnter={() => setDesplegableAccesorios(true)} onMouseLeave={() => setDesplegableAccesorios(false)}>
              <button className="hover:text-foreground transition-colors py-3 flex items-center gap-1 cursor-default uppercase font-bold text-foreground">
                Accesorios
                <svg className={`w-3 h-3 transition-transform duration-200 ${desplegableAccesorios ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {desplegableAccesorios && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl bg-background border border-border shadow-xl p-8 grid grid-cols-5 gap-6 text-left animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-foreground border-b border-border pb-1.5 mb-2 text-[11px]">Protección</h3>
                    <ul className="space-y-1.5 font-normal normal-case text-muted-foreground text-sm">
                      <li><Link to="/catalogo?categoria=pantalla" className="hover:text-primary">Fundas</Link></li>
                      <li><Link to="/catalogo?categoria=trasero" className="hover:text-primary">Templados</Link></li>
                    </ul>
                    <h3 className="font-bold text-foreground border-b border-border pb-1.5 mb-2 mt-4 text-[11px]">Auriculares</h3>
                    <ul className="space-y-1.5 font-normal normal-case text-muted-foreground text-sm">
                      <li><Link to="/catalogo?categoria=inalambricos" className="hover:text-primary">Airpods Max</Link></li>
                      <li><Link to="/catalogo?categoria=cables" className="hover:text-primary">Airpods segunda generacion</Link></li>
                      <li><Link to="/catalogo?categoria=cables" className="hover:text-primary">Earpods</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground border-b border-border pb-1.5 mb-2 text-[11px]">Cargadores</h3>
                    <ul className="space-y-1.5 font-normal normal-case text-muted-foreground text-sm">
                      <li><Link to="/catalogo?categoria=cargador-pared" className="hover:text-primary">Adaptador original</Link></li>
                      <li><Link to="/catalogo?categoria=cargador-auto" className="hover:text-primary">Adaptador para auto</Link></li>
                      <li><Link to="/catalogo?categoria=cargador-portatil" className="hover:text-primary">Adaptador replica</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground border-b border-border pb-1.5 mb-2 text-[11px]">Cables</h3>
                    <ul className="space-y-1.5 font-normal normal-case text-muted-foreground text-sm">
                      <li><Link to="/catalogo?categoria=cable-iphone" className="hover:text-primary">Cables tipo Lightning</Link></li>
                      <li><Link to="/catalogo?categoria=cable-tipo-c" className="hover:text-primary">Cables tipo C</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground border-b border-border pb-1.5 mb-2 text-[11px]">Otros</h3>
                    <ul className="space-y-1.5 font-normal normal-case text-muted-foreground text-sm">
                      <li><Link to="/catalogo?categoria=soportes" className="hover:text-primary">Apple Watch Ultra 2</Link></li>
                      <li><Link to="/catalogo?categoria=correas" className="hover:text-primary">Batery Pack</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link to="/ofertas" className="text-red-500 font-bold hover:text-red-600 transition-colors py-3 flex items-center gap-1">
              Ofertas y Promociones 🔥
            </Link>
            <Link to="/como-comprar" className="hover:text-foreground transition-colors py-3">Cómo comprar</Link>
            <Link to="/envios" className="hover:text-foreground transition-colors py-3">Envíos</Link>
            <Link to="/#contacto" className="hover:text-foreground transition-colors py-3">Contacto</Link>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-background border-t border-border py-4 px-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto w-full left-0 right-0">
          <div className="flex flex-col gap-3 font-medium text-muted-foreground">
            <Link to="/" onClick={() => setMenuAbierto(false)} className="hover:text-foreground py-1">Inicio</Link>
            <Link to="/catalogo" onClick={() => setMenuAbierto(false)} className="hover:text-foreground py-1">Catálogo</Link>
            <Link to="/ofertas" onClick={() => setMenuAbierto(false)} className="text-red-500 font-bold py-1">Ofertas 🔥</Link>
            <Link to="/como-comprar" onClick={() => setMenuAbierto(false)} className="hover:text-foreground py-1">Cómo comprar</Link>
            <Link to="/envios" onClick={() => setMenuAbierto(false)} className="hover:text-foreground py-1">Envíos</Link>
            <a href="#contacto" onClick={() => setMenuAbierto(false)} className="hover:text-foreground py-1">Contacto</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   2. COMPONENTE LANDING (Contenido Principal de la Home)
   ========================================================================== */
function IParadiceLanding() {
  const enviarWhatsApp = (producto) => {
    const mensaje = producto
      ? `¡Hola! Me interesa el producto: ${producto.nombre} - $${producto.precioOriginal}`
      : "¡Hola! Me gustaría más información sobre sus productos.";
    const url = `https://wa.me/3454193823?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    // Reemplazamos <main> por un <div> contenedor común para no duplicar etiquetas estructurales en App
    <div className="w-full"> 
      {/* HERO SECTION */}
      <section className="pb-16">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#f5f5f7]">
          <img src="/images/heroImg1.webp" alt="iPhone con accesorios premium iParadice" className="w-full h-full object-cover" loading="eager" />
        </div>
      </section>

      {/* CATEGORÍAS SECTION */}
      <section id="categorias" className="hidden md:block py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link to="/catalogo" className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/categories/fundasTemplados.jpeg" alt="Categoría Fundas y Templados" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white tracking-tight">Fundas y Templados</h3>
                <p className="text-white/90 text-sm mt-1 font-medium">Protección completa para tu dispositivo</p>
              </div>
            </Link>

            <Link to="/ofertas" className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/images/categories/ofertas.png" alt="Categoría Ofertas y Promociones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white tracking-tight">Ofertas y Promociones</h3>
                <p className="text-white/90 text-sm mt-1 font-medium">Los mejores precios y combos especiales</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="productos" className="py-16 sm:py-24 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground">Productos Destacados</h2>
          </div>

          {/* Cambiado de sm:grid-cols-2 a grid-cols-2 para móviles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {productos.map((producto) => {
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

              return (
                <Link to={`/producto/${producto.id}`} key={producto.id} className="block no-underline group">
<article className="group bg-card rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-gray-200 relative flex flex-col md:block h-full md:h-auto">                    {tieneDescuento && (
                      <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                        {producto.descuento}% OFF
                      </div>
                    )}

                    <div className="relative aspect-square overflow-hidden">
                      <picture>
                        <source media="(max-width: 767px)" srcSet={srcMovil} />
                        <source media="(min-width: 768px)" srcSet={srcOriginal} />
<img src={srcOriginal} alt={producto.nombre} className={`absolute inset-0 w-full h-full transition-transform duration-500 ${producto.categoria.toLowerCase().includes('funda') ? 'object-cover p-0 scale-95 group-hover:scale-100' : 'object-contain p-6 group-hover:scale-105'}`} decoding="sync" />                      </picture>
                    </div>

                    <div className="p-6 flex flex-col flex-grow md:flex-none md:block">
                      <span className="hidden md:block text-xs font-medium text-muted-foreground uppercase tracking-wider">{producto.categoria}</span>
                        <h3 className="mt-2 text-center md:text-left text-sm sm:text-lg font-semibold text-foreground group-hover:text-blue-500 transition-colors line-clamp-2 md:line-clamp-1 leading-tight">{producto.nombre}</h3>                        
                          <div className="mt-auto md:mt-2 pt-4 md:pt-0 flex items-baseline justify-center md:justify-start gap-2">
                          {tieneDescuento ? (
                          <>
                            <span className="text-xl font-semibold text-foreground">{formateador.format(producto.precioOferta)}</span>
                            <span className="text-sm font-medium text-muted-foreground/70 line-through">{formateador.format(producto.precioOriginal)}</span>
                          </>
                        ) : (
                          <span className="text-xl font-semibold text-foreground">{formateador.format(producto.precioOriginal)}</span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / CONTACTO */}
      <section id="contacto" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-foreground">¿Tienes alguna pregunta?</h2>
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 max-w-xl mx-auto">Estamos aquí para ayudarte. Contáctanos por WhatsApp y te responderemos al instante.</p>
          <button onClick={() => enviarWhatsApp(null)} className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#22c55e] transition-colors shadow-md">
            Escríbenos por WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   3. COMPONENTE FOOTER OPTIMIZADO PARA MÓVIL
   ========================================================================== */
function Footer() {
  return (
<footer className="bg-card border-t border-border/60 text-muted-foreground text-xs pt-12 pb-12 px-4 sm:px-6 lg:px-8 w-full">     
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground tracking-tight">iParadise</h3>
          <p className="text-sm leading-relaxed text-muted-foreground/80 max-w-sm mx-auto md:mx-0">Tu tienda de confianza para fundas, cargadores y accesorios premium para tus dispositivos Apple favoritos.</p>
        </div>
        <div className="space-y-2.5">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Navegación</h4>
          <ul className="space-y-1.5 text-sm">
            <li><Link to="/" className="hover:text-foreground transition-colors block py-0.5">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-foreground transition-colors block py-0.5">Catálogo</Link></li>
            <li><Link to="/ofertas" className="hover:text-foreground transition-colors block py-0.5">Ofertas 🔥</Link></li>
            <li><Link to="/como-comprar" className="hover:text-foreground transition-colors block py-0.5">Cómo comprar</Link></li>
          </ul>
        </div>
        <div className="space-y-2.5">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Soporte y Envíos</h4>
          <ul className="space-y-1.5 text-sm">
            <li><Link to="/envios" className="hover:text-foreground transition-colors block py-0.5">Información de Envíos</Link></li>
            <li><a href="#contacto" className="hover:text-foreground transition-colors block py-0.5">Contacto directo</a></li>
          </ul>
        </div>
        <div className="space-y-2.5">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Ubicación y Pagos</h4>
          <p className="text-sm text-muted-foreground/80 max-w-sm mx-auto md:mx-0">Envíos a todo el país. Métodos de pago seguros vía transferencia o efectivo.</p>
          <div className="pt-2 flex justify-center md:justify-start gap-4 text-lg text-foreground/40">
            <span>💳</span> <span>💵</span> <span>📦</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/40 text-center text-muted-foreground/60 text-[11px] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} iParadise. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ==========================================================================
    4. COMPONENTE PRINCIPAL (Manejo de Rutas Globales)
   ========================================================================== */
export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <CarritoSidebar />
      
      {/* El <main> único global maneja la altura fluida.
        - pt-28 en resoluciones md: asegura espacio para el header de doble fila.
        - pt-16 en móvil se ajusta a la barra compacta.
      */}
      <main className="w-full pt-16 md:pt-28 flex-1">
        <Routes>
          <Route path="/" element={<IParadiceLanding />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/ofertas" element={<Catalogo soloOfertas={true} />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="/como-comprar" element={
            <div className="py-16 text-center text-foreground flex-grow flex items-center justify-center text-xl font-medium">
              Página de Instrucciones de Compra
            </div>
          } />
          <Route path="/envios" element={
            <div className="py-16 text-center text-foreground flex-grow flex items-center justify-center text-xl font-medium">
              Página de Información de Envíos
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}