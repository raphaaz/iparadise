import { createContext, useState, useEffect, useContext } from "react";

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos el Proveedor (Provider)
export function CartProvider({ children }) {
    // Inicializamos el carrito leyendo de localStorage si ya existe
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem("iparadice_cart");
        return localData ? JSON.parse(localData) : [];
    });

    // Estado global para controlar si el panel/modal del carrito está abierto o cerrado
    const [cartAbierto, setCartAbierto] = useState(false);

    // Funciones para modificar el estado de visibilidad externa
    const abrirCarrito = () => setCartAbierto(true);
    const cerrarCarrito = () => setCartAbierto(false);

    // Cada vez que el carrito cambie, lo guardamos en localStorage
    useEffect(() => {
        localStorage.setItem("iparadice_cart", JSON.stringify(cart));
    }, [cart]);

    // 1. FUNCIÓN PARA AGREGAR CONTROLANDO STOCK MÁXIMO GLOBAL
    const addToCart = (producto, cantidadAAgregar, colorSeleccionado = null) => {
        setCart((prevCart) => {
            // Buscamos si ya existe el producto basándonos en ID y el NOMBRE del color
            const itemExistente = prevCart.find(
                (item) => item.id === producto.id && item.color?.nombre === colorSeleccionado?.nombre
            );

            // Definimos el stock límite real de este producto/color
            const stockLimite = colorSeleccionado?.stock ?? producto.stock ?? 10;

            if (itemExistente) {
                const nuevaCantidadTotal = itemExistente.cantidad + cantidadAAgregar;

                // Si supera el stock, lo clavamos en el tope máximo
                if (nuevaCantidadTotal > stockLimite) {
                    alert(`No podés agregar más unidades. El stock máximo disponible es de ${stockLimite}.`);
                    return prevCart.map((item) =>
                        item.id === producto.id && item.color?.nombre === colorSeleccionado?.nombre
                            ? { ...item, cantidad: stockLimite }
                            : item
                    );
                }

                // Si no supera el stock, sumamos normalmente
                return prevCart.map((item) =>
                    item.id === producto.id && item.color?.nombre === colorSeleccionado?.nombre
                        ? { ...item, cantidad: nuevaCantidadTotal }
                        : item
                );
            }

            // Si el producto es nuevo en el carrito
            const cantidadInicial = cantidadAAgregar > stockLimite ? stockLimite : cantidadAAgregar;
            if (cantidadAAgregar > stockLimite) {
                alert(`Ajustado al stock máximo disponible: ${stockLimite} unidades.`);
            }

            return [
                ...prevCart, 
                { 
                    ...producto, 
                    cantidad: cantidadInicial, 
                    color: colorSeleccionado,
                    imagen: producto.imagen || producto.imgAll?.[0] || producto.imgDesktop?.[0] || ''
                }
            ];
        });
    };

    // 2. FUNCIÓN PARA ACTUALIZAR CANTIDADES DESDE EL CARRITO (BOTÓN +)
    const updateQuantity = (productId, colorNombre, nuevaCantidad) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === productId && item.color?.nombre === colorNombre) {
                    const stockLimite = item.color?.stock ?? item.stock ?? 10;
                    
                    if (nuevaCantidad > stockLimite) {
                        alert(`Alcanzaste el límite de stock de este producto (${stockLimite} uds).`);
                        return item; 
                    }
                    
                    return { ...item, cantidad: nuevaCantidad };
                }
                return item;
            })
        );
    };

    // 3. FUNCIÓN PARA RESTAR 1 EN CANTIDAD DESDE EL CARRITO (BOTÓN -)
    const decreaseQuantity = (id, colorNombre) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === id && item.color?.nombre === colorNombre) {
                    if (item.cantidad > 1) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    }
                }
                return item;
            });
        });
    };

    // 4. FUNCIÓN PARA ELIMINAR UN PRODUCTO POR COMPLETO
    const removeFromCart = (id, colorNombre) => {
        setCart((prevCart) => 
            prevCart.filter((item) => !(item.id === id && item.color?.nombre === colorNombre))
        );
    };

    // 5. FUNCIÓN PARA VACIAR EL CARRITO
    const clearCart = () => setCart([]);

    // Totales calculados en tiempo real
    const totalUnidades = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity,      // 👈 CORRECCIÓN: ¡Ahora sí está exportada!
            removeFromCart, 
            decreaseQuantity, 
            clearCart, 
            totalUnidades, 
            totalPrecio,
            cartAbierto,
            abrirCarrito,
            cerrarCarrito
        }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizado
export function useCart() {
    return useContext(CartContext);
}