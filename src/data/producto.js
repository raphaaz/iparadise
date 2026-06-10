    // ============================================
    // DATOS DE PRODUCTOS(Array de objetos)
    // ============================================

    export const productos = 
    [

        {
        id: 1,
        nombre: "Templado",
        precioOriginal: 4500,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Templado",
        descripcion:"Protección total para tu pantalla. Vidrio templado de alta resistencia con tecnología anti-rayones y máxima transparencia. Conserva la sensibilidad táctil original de tu equipo sin sacrificar seguridad.",
        imgAll: [
        "/images/products/mediano/templado1.webp",
    
        ],

        modelos: {
        "iPhone XR-11": 14, 
        "iPhone 12-12 Pro": 10,  
        "iPhone 13 Pro Max": 10,
        "iPhone 14 Pro Max": 10,
        "iPhone 15-15 Pro": 10, "iPhone 15 Pro Max": 11,
        "iPhone 16 Pro": 11, "iPhone 16 Pro Max": 18,
        "iPhone 17": 8, "iPhone 17 Pro": 13, "iPhone 17 Pro Max": 16
    }
    },

        {
        id: 3,
        nombre: "Airpods Max",
        precioOriginal: 70000,
        descuento: 50, // <--- Modificá este número cuando quieras ponerle oferta (ej: 26)
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Audio",
        descripcion: "Auriculares inalámbricos de diseño minimalista, ligeros y compatibles con iOS y Android, ideales para música, llamadas y home office. Cuentan con control intuitivo de 2 botones (volumen, reproducción y llamadas) y una batería de hasta 6 horas de uso continuo. La caja incluye el auricular premium, estuche protector, cable de carga USB a USB-C y cable auxiliar Jack 3.5mm. Se realizan envíos a todo el país, con entregas en el día en CABA/GBA y punto de retiro en Caballito. Cuenta con 30 días de garantia (válida solo si se entrega en las mismas condiciones recibidas, excluyendo daños por mal uso o caídas).",
        imgDesktop: [
        "/images/products/grande/airpodsMax1.webp",
        "/images/products/grande/airpodsMax2.webp",
        "/images/products/grande/airpodsMax3.webp",
        "/images/products/grande/airpodsMax4.webp",
        ],
        imgMobile: [
        "/images/products/peque/airpodsMax1.webp",
        "/images/products/peque/airpodsMax2.webp",
        "/images/products/peque/airpodsMax3.webp",
        "/images/products/peque/airpodsMax4.webp",
        ],
        colores: {
        "#3f4247": { nombre: "Negro", stock: 3},
        }
    },
    {
        id: 4,
        nombre: "Adaptador original",
        precioOriginal: 45000,
        descuento: 10,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Adaptador",
        descripcion: "El adaptador de corriente USB-C de 20 W de Apple ofrece una carga rápida y eficiente, ideal para su uso en el hogar, la oficina o durante viajes. El paquete incluye un adaptador de corriente USB-C de 20 W de Apple, el cual es plenamente compatible con cualquier dispositivo que cuente con puerto de entrada USB-C.",
        imgDesktop: [
        "/images/products/grande/adaptOrig1.webp",
        "/images/products/grande/adaptOrig2.webp",
        "/images/products/grande/adaptOrig3.webp",
        "/images/products/grande/adaptOrig4.webp",
        ],
        imgMobile: [
        "/images/products/peque/adaptOrig1.webp",
        "/images/products/peque/adaptOrig2.webp",
        "/images/products/peque/adaptOrig3.webp",
        "/images/products/peque/adaptOrig4.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 29},
        
        }
    },
    {
        id: 5,
        nombre: "Adaptador Replica",
        precioOriginal: 12999,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Adaptador",
        descripcion: "Cargador de pared alternativo de alta calidad, diseñado con componentes certificados para ofrecer una carga turbo, rápida y eficiente en el hogar, la oficina o durante viajes. Cuenta con puerto de salida USB-C y es plenamente compatible con iPhone, iPad y cualquier dispositivo que admita esta conectividad, garantizando un rendimiento óptimo y seguro para tu batería.La caja incluye únicamente el adaptador de corriente USB-C de 20W (no incluye cable). Cuenta con 30 días de garantia (válida solo si se entrega en las mismas condiciones recibidas, excluyendo daños por mal uso o caídas).",
        imgDesktop: [
        "/images/products/grande/adaptRepli1.webp",
        "/images/products/grande/adaptRepli2.webp",
        "/images/products/grande/adaptRepli3.webp",
        ],
        imgMobile: [
        "/images/products/peque/adaptRepli1.webp",
        "/images/products/peque/adaptRepli2.webp",
        "/images/products/peque/adaptRepli3.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 85},
        }
    },
    {
        id: 6,
        nombre: "Airpods Segunda Generacion ",
        precioOriginal: 19999,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Audio",
        descripcion: "Auriculares alternativos de alta fidelidad con diseño idéntico de tamaño 1:1, ideales para disfrutar de tu música y llamadas con total comodidad y libertad de movimiento. Este modelo inalámbrico cuenta con micrófono incorporado, conectividad automática instantánea al abrir el estuche, sensores táctiles para el control de reproducción y una autonomía de batería de hasta 5 horas de uso continuo. No incluye luz LED ni posee resistencia al agua. La caja incluye los auriculares inalámbricos, el estuche de carga, el cable de carga correspondiente y un par extra de almohadillas de silicona adaptables para el oído. Cuenta con 30 días de garantia (válida únicamente si el producto se entrega en las mismas condiciones recibidas, excluyendo daños por mal uso, mojaduras o caídas).",
        imgDesktop: [
        "/images/products/grande/airpods2daGen1.webp",
        "/images/products/grande/airpods2daGen2.webp",
        ],
        imgMobile: [
        "/images/products/peque/airpods2daGen1.webp",
        "/images/products/peque/airpods2daGen2.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 5},
        }
    },
    {
        id: 7,
        nombre: "Batery Pack",
        precioOriginal: 19999,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Batery pack",
        descripcion: "Cargador portátil alternativo de alta calidad, diseñado para ofrecer una solución de carga inalámbrica eficiente, compacta y de alta velocidad. Con una capacidad de 5000 mAh, este modelo ligero y fácil de transportar cuenta con conector Lightning integrado para asegurar una conexión perfecta y segura, ideal para viajes, jornadas laborales o actividades al aire libre gracias a su diseño elegante y funcional. La caja incluye únicamente el cargador portátil tipo Battery Pack. Cuenta con 30 días de garantia (válida únicamente si el producto se entrega en las mismas condiciones recibidas, excluyendo daños por mal uso, golpes o caídas).",
        imgDesktop: [
        "/images/products/grande/bateryPack1.webp",
        "/images/products/grande/bateryPack2.webp",
        "/images/products/grande/bateryPack3.webp",
        "/images/products/grande/bateryPack4.webp",
        ],
        imgMobile: [
        "/images/products/peque/bateryPack1.webp",
        "/images/products/peque/bateryPack2.webp",
        "/images/products/peque/bateryPack3.webp",
        "/images/products/peque/bateryPack4.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 1 }, 
        }
    },
    {
        id: 8,
        nombre: "Watch Ultra 2 ",
        precioOriginal: 42000,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Relojes",
        descripcion: "Reloj inteligente alternativo de estilo premium que combina diseño avanzado y funcionalidad para el día a día. Ofrece compatibilidad universal con todos los modelos de iPhone, permitiendo atender y realizar llamadas al instante, así como recibir notificaciones inteligentes de aplicaciones como WhatsApp e Instagram. Cuenta con funciones de cuidado personal para el monitoreo del ritmo cardíaco y la temperatura corporal, herramientas prácticas como calculadora integrada y opciones de personalización completa (fondos de pantalla, bloqueo y vibraciones). Su estructura es resistente al polvo y a salpicaduras. La caja incluye el smartwatch y una malla de estilo premium. Cuenta con 30 días de garantia (válida únicamente si el producto se entrega en las mismas condiciones recibidas, excluyendo daños por mal uso, inmersiones prolongadas o impactos).",
        imgDesktop: [
        "/images/products/grande/watchUltra2_1Negro.webp",
        "/images/products/grande/watchUltra2_1Naranja.webp",
        "/images/products/grande/watchUltra2_2.webp",
        "/images/products/grande/watchUltra2_3.webp",
        /*"/images/products/grande/watchUltra2_4.webp",*/
        ],
        imgMobile: [
        "/images/products/peque/watchUltra2_1Negro.webp",
        "/images/products/peque/watchUltra2_1Naranja.webp",
        "/images/products/peque/watchUltra2_2.webp",
        "/images/products/peque/watchUltra2_3.webp",
        /*"/images/products/peque/watchUltra2_4.webp",*/
        ],
        colores: {
        "#1f2324": { nombre: "Malla Negra y naranja", stock: 3 },
        
        }
    },
    {
        id: 9,
        nombre: "Cable Lightning",
        precioOriginal: 4500,
        descuento: 0,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Cables",
        descripcion: "Cable alternativo de alta calidad diseñado para ofrecer una carga eficiente y una transferencia de datos rápida y segura. Es plenamente compatible con todos los modelos de iPhone, iPad y accesorios con puerto Lightning, garantizando una conexión estable y un rendimiento óptimo en el hogar, la oficina o durante viajes gracias a su diseño ligero y resistente. La caja incluye únicamente el cable de carga (no incluye el adaptador). Cuenta con 30 días de garantía del vendedor (válida únicamente si el producto se entrega en las mismas condiciones recibidas, excluyendo daños por tirones, mal uso o manipulación indebida).",
        imgDesktop: [
        "/images/products/grande/cableL1.webp",
        "/images/products/grande/cableL2.webp",
        ],
        imgMobile: [
        "/images/products/peque/cableL1.webp",
        "/images/products/peque/cableL2.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 40 },
        }
    },
    {
        id: 10,
        nombre: "Cable Usb-c",
        precioOriginal: 4500,
        descuento: 10,
        get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Cables",
        descripcion: "Cable alternativo de alta calidad diseñado para soportar carga rápida y una transferencia de datos de alta velocidad de manera eficiente y segura. Es plenamente compatible con todos los modelos de iPhone (series 15 y superiores), iPad, MacBook y cualquier dispositivo con puerto USB-C, garantizando una conectividad estable y un rendimiento óptimo tanto en el hogar como en la oficina o durante viajes. La caja incluye únicamente el cable de carga(no incluye el adaptador). Cuenta con 30 días de garantía del vendedor (válida únicamente si el producto se entrega en las mismas condiciones recibidas, excluyendo daños por tirones, mal uso o manipulación indebida).",
        imgDesktop: [
        "/images/products/grande/cableC1.webp",
        "/images/products/grande/cableC2.webp",
        ],
        imgMobile: [
        "/images/products/peque/cableC1.webp",
        "/images/products/peque/cableC2.webp",
        ],
        colores: {
        "#FFFFFF": { nombre: "Blanco", stock: 88 },
        }
    },



    /*FUNDAS DE SILICONA*/
    {
        id: 11,
        nombre: "Funda iPhone 11",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/11/fundaSilicona11_${i + 1}.webp`),
            
        colores: {
            "#000000": { id: 1, nombre: "Negro", stock: 3 },
            "#e6d4c3": { id: 2, nombre: "Arena Rosa / Beige", stock: 3 },
            "#e1ac01": { id: 3, nombre: "Amarillo Mostaza", stock: 2 },
            "#111d36": { id: 4, nombre: "Azul Marino", stock: 2 },
            "#b683a7": { id: 5, nombre: "Rosa Viejo / Mauve", stock: 1 },
            "#a1b3c3": { id: 6, nombre: "Gris Celeste", stock: 1 },
            "#d1c3e8": { id: 7, nombre: "Verde Agua / Menta", stock: 1 },
            "#ff7e4f": { id: 8, nombre: "Naranja / Coral", stock: 1 },
            "#492d80": { id: 9, nombre: "Violeta Oscuro", stock: 1 },
            "#d32f2f": { id: 10, nombre: "Rojo", stock: 1 }
        }
    },
    {
        id: 12,
        nombre: "Funda iPhone 12-12 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/12and12pro/fundaSilicona12_${i + 1}.webp`),
        colores: {
            "#ff1393": { id: 1, nombre: "Rosa Chicle / Fucsia Vivo", stock: 1 },
            "#c1185b": { id: 2, nombre: "Rosa Oscuro / Frambuesa", stock: 1 },
            "#a0522d": { id: 3, nombre: "Marrón Terracota / Suela", stock: 1 },
            "#3a3b3b": { id: 4, nombre: "Gris Oscuro / Espacial", stock: 1 }
        }
    },
    {
        id: 13,
        nombre: "Funda iPhone 13",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/13/fundaSilicona13_${i + 1}.webp`),
        colores: {
            "#1a1a1a": { id: 1, nombre: "Negro / Gris Oscuro", stock: 7 },
            "#4b521f": { id: 2, nombre: "Verde Militar / Oscuro", stock: 4 },
            "#ff007e": { id: 3, nombre: "Fucsia / Rosa Intenso", stock: 3 },
            "#80001f": { id: 4, nombre: "Rojo Oscuro / Bordó", stock: 3 },
            "#00bfff": { id: 5, nombre: "Celeste / Azul Brillante", stock: 2 },
            "#fff9a5": { id: 6, nombre: "Amarillo Pastel", stock: 2 },
            "#dfdfdf": { id: 7, nombre: "Transparente / Esmerilado", stock: 1 },
            "#7e00ff": { id: 8, nombre: "Violeta", stock: 1 },
            "#0f1d36": { id: 9, nombre: "Azul Marino", stock: 1 },
            "#3fdfcf": { id: 10, nombre: "Azul Turquesa", stock: 1 }
        }
    },
    {
        id: 14,
        nombre: "Funda iPhone 13 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/13pro/fundaSilicona13Pro_${i + 1}.webp`),
        colores: {
            "#1a1a1a": { id: 1, nombre: "Negro / Gris Oscuro", stock: 12 },
            "#4b521f": { id: 2, nombre: "Verde Oscuro / Militar", stock: 5 },
            "#318ce6": { id: 3, nombre: "Azul Francia / Jeans", stock: 4 },
            "#bf3f00": { id: 4, nombre: "Marrón Terracota / Ladrillo", stock: 3 },
            "#ff007e": { id: 5, nombre: "Fucsia / Rosa Intenso", stock: 3 },
            "#e1ac01": { id: 6, nombre: "Amarillo Ocre / Mostaza", stock: 1 },
            "#f4f4f4": { id: 7, nombre: "Blanco / Tiza", stock: 2 },
            "#e6d4c3": { id: 8, nombre: "Beige / Arena Rosa", stock: 2 },
            "#b683a7": { id: 9, nombre: "Rosa Viejo / Mauve", stock: 1 },
            "#492d80": { id: 10, nombre: "Violeta Oscuro", stock: 1 }
        }
    },
    {
        id: 15,
        nombre: "Funda iPhone 13 Pro Max",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/13promax/fundaSilicona13ProMax_${i + 1}.webp`),
        colores: {
            "#000000": { id: 1, nombre: "Negro", stock: 5 },
            "#0046aa": { id: 2, nombre: "Azul Eléctrico / Azul Cobalto", stock: 1 }
        }
    },
    {
        id: 16,
        nombre: "Funda iPhone 14 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/14pro/fundaSilicona14Pro_${i + 1}.webp`),
        colores: {
            "#1a1a1a": { id: 1, nombre: "Negro / Gris Oscuro", stock: 8 },
            "#4b521f": { id: 2, nombre: "Verde Militar / Oscuro", stock: 8 },
            "#fff9a5": { id: 3, nombre: "Amarillo Pastel / Claro", stock: 3 },
            "#bf3f00": { id: 4, nombre: "Marrón Terracota / Ladrillo", stock: 3 },
            "#31cd31": { id: 5, nombre: "Verde Loro / Manzana", stock: 1 },
            "#3fdfcf": { id: 6, nombre: "Azul Turquesa", stock: 1 },
            "#ff007e": { id: 7, nombre: "Fucsia / Rosa Intenso", stock: 1 },
            "#00bfff": { id: 8, nombre: "Celeste / Azul Brillante", stock: 1 },
            "#acd8e6": { id: 9, nombre: "Azul Pastel / Celeste Claro", stock: 1 },
            "#ff7e4f": { id: 10, nombre: "Salmón / Coral", stock: 1 }
        }
    },
    {
        id: 17,
        nombre: "Funda iPhone 14 Pro Max",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/14promax/fundaSilicona14ProMax_${i + 1}.webp`),
        colores: {
            "#111d36": { id: 1, nombre: "Azul Marino / Oscuro", stock: 4 },
            "#ff007e": { id: 2, nombre: "Fucsia / Rosa Intenso", stock: 2 },
            "#4682b3": { id: 3, nombre: "Azul Acero / Gris Azulado", stock: 1 },
            "#ffbfca": { id: 4, nombre: "Rosa Pastel", stock: 1 },
            "#008080": { id: 5, nombre: "Azul Petrolero / Turquesa Oscuro", stock: 1 },
            "#2d8a56": { id: 6, nombre: "Verde Azulado / Opaco", stock: 1 },
            "#3a3b3b": { id: 7, nombre: "Gris Oscuro", stock: 1 }
        }
    },
    {
        id: 18,
        nombre: "Funda iPhone 15",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/15/fundaSilicona15_${i + 1}.webp`),
        colores: {
            "#ff3b2f": { id: 1, nombre: "Rojo Vivo / Coral Intenso", stock: 3 },
            "#a0522d": { id: 2, nombre: "Marrón Suela / Terracota", stock: 2 },
            "#fff9a5": { id: 3, nombre: "Amarillo Pastel / Claro", stock: 1 },
            "#8ebc8e": { id: 4, nombre: "Verde Oliva / Claro", stock: 1 },
            "#0046aa": { id: 5, nombre: "Azul Eléctrico", stock: 1 },
            "#80001f": { id: 6, nombre: "Rojo Oscuro / Bordó", stock: 1 },
            "#ffbfca": { id: 7, nombre: "Rosa Pastel", stock: 1 },
            "#000000": { id: 8, nombre: "Negro", stock: 1 },
            "#ffa079": { id: 9, presidential: null, nombre: "Naranja / Coral Claro", stock: 1 },
            "#ff007e": { id: 10, nombre: "Fucsia / Rosa Intenso", stock: 1 }
        }
    },
    {
        id: 19,
        nombre: "Funda iPhone 15 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/15pro/fundaSilicona15Pro_${i + 1}.webp`),
        colores: {
            "#1a1a1a": { id: 1, nombre: "Negro / Gris Oscuro", stock: 2 },
            "#ff007e": { id: 2, nombre: "Fucsia / Rosa Intenso", stock: 2 },
            "#ff0000": { id: 3, nombre: "Rojo Vivo", stock: 2 },
            "#7b3f00": { id: 4, nombre: "Marrón Chocolate", stock: 1 },
            "#0046aa": { id: 5, nombre: "Azul Francia / Cobalto", stock: 1 },
            "#492d80": { id: 6, nombre: "Violeta Oscuro / Ciruela", stock: 1 },
            "#c3af90": { id: 7, nombre: "Beige Oscuro / Caqui", stock: 1 },
            "#004b23": { id: 8, nombre: "Verde Pino / Oscuro", stock: 1 }
        }
    },
    /*
    {
        id: 20,
        nombre: "Funda iPhone 15 Pro Max",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/15promax/fundaSilicona15ProMax_${i + 1}.webp`),
        colores: {}//no hay fundas para 15 promax
    },
    */
    {

        id: 21,
        nombre: "Funda iPhone 16",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/16/fundaSilicona16_${i + 1}.webp`),
        colores: {
            "#e1ac01": { id: 1, nombre: "Fucsia / Rosa Intenso", stock: 1 },
            "#0046aa": { id: 2, nombre: "Azul Francia / Eléctrico", stock: 2 },
            "#004b23": { id: 3, nombre: "Verde Inglés", stock: 1 },
            "#111d36": { id: 4, nombre: "Azul Noche / Oscuro", stock: 1 },
            "#bcb5d4": { id: 5, nombre: "Gris Lavanda", stock: 1 },
            "#ffbfca": { id: 6, nombre: "Rosa Pastel", stock: 1 },
            "#31cd31": { id: 7, nombre: "Verde Loro / Manzana", stock: 1 },
            "#ff7e4f": { id: 8, nombre: "Naranja / Coral", stock: 1 },
            "#ff0000": { id: 9, nombre: "Rojo Vivo", stock: 1 },
            "#ccff00": { id: 10, nombre: "Negro / Gris Oscuro", stock: 1 }
        }
    },
    {
        id: 22,
        nombre: "Funda iPhone 16 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/16pro/fundaSilicona16Pro_${i + 1}.webp`),
        colores: {
            "#d1c3e8": { id: 1, nombre: "Lila / Violeta Claro", stock: 4 },
            "#1a1a1a": { id: 2, nombre: "Negro / Gris Oscuro", stock: 4 },
            "#111d36": { id: 3, nombre: "Azul Marino / Oscuro", stock: 4 },
            "#4b521f": { id: 4, nombre: "Verde Militar / Oscuro", stock: 3 },
            "#acd8e6": { id: 5, nombre: "Celeste Pastel / Claro", stock: 2 },
            "#ff7e4f": { id: 6, nombre: "Coral / Naranja Salmón", stock: 3 },
            "#0046aa": { id: 7, nombre: "Azul Eléctrico / Francia", stock: 2 },
            "#dff2f0": { id: 8, nombre: "Verde Agua / Menta Claro", stock: 2 },
            "#f4f4f4": { id: 9, nombre: "Blanco / Tiza", stock: 2 },
            "#e1ac01": { id: 10, nombre: "Amarillo Ocre / Mostaza", stock: 2 }
        }
    },
    {
        id: 23,
        nombre: "Funda iPhone 16 Pro Max",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/16promax/fundaSilicona16ProMax_${i + 1}.webp`),
        colores: {
            "#000000": { id: 1, nombre: "Negro", stock: 2 },
            "#0046aa": { id: 2, nombre: "Azul Francia / Eléctrico", stock: 2 },
            "#3fdfcf": { id: 3, nombre: "Azul Turquesa / Claro", stock: 1 },
            "#492d80": { id: 4, nombre: "Violeta Oscuro", stock: 1 },
            "#a3e4d6": { id: 5, nombre: "Verde Agua / Menta", stock: 1 },
            "#ff7e4f": { id: 6, nombre: "Naranja / Coral", stock: 1 },
            "#ff0000": { id: 7, nombre: "Rojo Vivo", stock: 1 },
            "#d1c3e8": { id: 8, nombre: "Lila / Violeta Claro", stock: 1 },
            "#e1ac01": { id: 9, nombre: "Amarillo Ocre", stock: 1 },
            "#ffbfca": { id: 10, nombre: "Rosa Pastel", stock: 1 }
        }
    },
    {
        id: 24,
        nombre: "Funda iPhone 17",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/17/fundaSilicona17_${i + 1}.webp`),
        colores: {
            "#acd8e6": { id: 1, nombre: "Celeste / Azul Claro", stock: 2 },
            "#ffbfca": { id: 2, nombre: "Rosa Pastel / Chicle", stock: 1 },
            "#d1c3e8": { id: 3, nombre: "Lila / Violeta Claro", stock: 1 },
            "#d1691d": { id: 4, nombre: "Naranja Opaco / Suela", stock: 1 },
            "#0046aa": { id: 5, nombre: "Azul Francia", stock: 1 },
            "#ff0000": { id: 6, nombre: "Rojo Vivo", stock: 1 },
            "#bf3f00": { id: 7, nombre: "Marrón Terracota / Ladrillo", stock: 1 },
            "#492d80": { id: 8, nombre: "Violeta Oscuro", stock: 1 }
        }
    },
    {
        id: 25,
        nombre: "Funda iPhone 17 Pro",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/17pro/fundaSilicona17Pro_${i + 1}.webp`),
        colores: {
            "#ffbfca": { id: 1, nombre: "Rosa Pastel / Chicle", stock: 2 },
            "#546b2f": { id: 2, nombre: "Verde Oliva / Seco", stock: 2 },
            "#f4f4f4": { id: 3, nombre: "Blanco / Gris Claro", stock: 1 },
            "#ff007e": { id: 4, nombre: "Fucsia / Rosa Intenso", stock: 1 },
            "#ff0000": { id: 5, nombre: "Rojo Vivo", stock: 1 },
            "#111d36": { id: 6, nombre: "Azul Noche / Oscuro", stock: 1 },
            "#acd8e6": { id: 7, nombre: "Celeste / Azul Claro", stock: 1 },
            "#d1c3e8": { id: 8, nombre: "Lila / Violeta Claro", stock: 1 },
            "#e6d4c3": { id: 9, nombre: "Beige / Arena", stock: 1 },
            "#1a1a1a": { id: 10, nombre: "Negro / Gris Oscuro", stock: 1 }
        }
    },
    {
        id: 26,
        nombre: "Funda iPhone 17 Pro Max",
        precioOriginal: 7000,
        descuento: 0,
        get precioOferta() {
            if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
            return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
        },
        categoria: "Funda de silicona",
        descripcion: "Funda de alta calidad de silicona, tenemos diferentes colores disponibles, es material de alta durabilidad.",
        imgAll: Array.from({ length: 10 }, (_, i) => `/images/products/fundas/17promax/fundaSilicona17ProMax_${i + 1}.webp`),
        colores: {
            "#1a1a1a": { id: 1, nombre: "Negro / Gris Oscuro", stock: 4 },
            "#ff007e": { id: 2, nombre: "Fucsia / Rosa Intenso", stock: 4 },
            "#80001f": { id: 3, nombre: "Bordó / Vino Oscuro", stock: 3 },
            "#111d36": { id: 4, nombre: "Azul Noche / Oscuro", stock: 1 },
            "#0046aa": { id: 5, nombre: "Azul Francia", stock: 1 },
            "#acd8e6": { id: 6, nombre: "Celeste / Azul Claro", stock: 1 },
            "#492d80": { id: 7, nombre: "Violeta Oscuro", stock: 1 }
        }
    },
    












// CRYSTAL CASE
{
    id: 27,
    nombre: "Crystal Case iPhone 17",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Crystal case",
    descripcion: "Funda Crystal Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/crystal/17_${i + 1}.webp`),
    colores: {
        "#eeeadd": { id: 1, nombre: "Beige Pálido", stock: 1 },
        "#c8c4db": { id: 2, nombre: "Lavanda Grisáceo", stock: 1 },
        "#938d81": { id: 3, nombre: "Gris Cálido", stock: 1 }
    }
},
{
    id: 28,
    nombre: "Crystal Case iPhone 17 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Crystal Case",
    descripcion: "Funda Crystal Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/crystal/17pro_${i + 1}.webp`),
    colores: {
        "#fbaac1": { id: 1, nombre: "Rosa Pastel", stock: 1 },
        "#8c4b2d": { id: 2, nombre: "Marrón Arcilla", stock: 1 },
        "#adb8b2": { id: 3, nombre: "Verde Grisáceo", stock: 1 }
    }
},

// MAGSAFE MATE CASE
{
    id: 29,
    nombre: "Magsafe Mate iPhone 13",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "MagSafe Mate Case",
    descripcion: "Funda Magsafe Mate Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 5 }, (_, i) => `/images/products/magSafe/13_${i + 1}.webp`),
    colores: {
        "#87a78f": { id: 1, nombre: "Verde Salvia", stock: 1 },
        "#9b9fa1": { id: 2, nombre: "Gris Medio", stock: 0 },
        "#c3bcdd": { id: 3, nombre: "Lavanda Claro", stock: 0 },
        "#465f7d": { id: 4, nombre: "Azul Profundo", stock: 0 },
        "#e5d3d1": { id: 5, nombre: "Rosa Pálido", stock: 0 }
    }
},
{
    id: 30,
    nombre: "Magsafe Mate iPhone 15 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "MagSafe Mate Case",
    descripcion: "Funda Magsafe Mate Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 4 }, (_, i) => `/images/products/magSafe/15pro_${i + 1}.webp`),
    colores: {
        "#88a68e": { id: 1, nombre: "Verde Salvia", stock: 2 },
        "#9a9da0": { id: 2, nombre: "Gris Medio", stock: 1 },
        "#d4bcb8": { id: 3, nombre: "Rosa Viejo", stock: 1 },
        "#47607b": { id: 4, nombre: "Azul Profundo", stock: 2 }
    }
},
/* NO HAY STOCK
{
    id: 31,
    nombre: "Magsafe Mate iPhone 16 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "MagSafe Mate Case",
    descripcion: "Funda Magsafe Mate Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 1 }, (_, i) => `/images/products/magSafe/16pro_${i + 1}.webp`),
    colores: {
        "#9ca0a2": { id: 1, nombre: "Gris Plata", stock: 0 }
    }
},
*/
// SPACE CASE
{
    id: 32,
    nombre: "Space Case iPhone 16",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Space Case",
    descripcion: "Funda Space Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 4 }, (_, i) => `/images/products/space/16_${i + 1}.webp`),
    colores: {
        "#c9e47d": { id: 1, nombre: "Verde Lima", stock: 1 },
        "#4d8ab6": { id: 2, nombre: "Azul Acero", stock: 1 },
        "#ff9adc": { id: 3, nombre: "Rosa Chicle", stock: 1 },
        "#f1f5f8": { id: 4, nombre: "Blanco Hielo", stock: 1 }
    }
},
{
    id: 33,
    nombre: "Space Case iPhone 15 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Space Case",
    descripcion: "Funda Space Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/space/15pro_${i + 1}.webp`),
    colores: {
        "#ff9adc": { id: 1, nombre: "Rosa Chicle", stock: 3 },
        "#f1f5f8": { id: 2, nombre: "Blanco Hielo", stock: 2 }
    }
},
{
    id: 34,
    nombre: "Space Case iPhone 16 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Space Case",
    descripcion: "Funda Space Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/space/16pro_${i + 1}.webp`),
    colores: {
        "#eff3f6": { id: 1, nombre: "Blanco Humo", stock: 1 },
        "#5d5f62": { id: 2, nombre: "Gris Grafito", stock: 0 }
    }
},

// TECH WOVEN CASE
/*
HAY UN ERROR CON ESTAS, ME FALTAN LAS IMAGENES
{
    id: 35,
    nombre: "Tech Woven iPhone 17",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Tech Woven Case",
    descripcion: "Funda Tech Woven Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/techWoven/17_${i + 1}.webp`),
    colores: {
        "#333f4d": { id: 1, nombre: "Azul Noche", stock: 1 },
        "#764536": { id: 2, nombre: "Marrón Cuero", stock: 1 },
        "#58643e": { id: 3, nombre: "Verde Musgo", stock: 2 }
    }
},
*/
{
    id: 36,
    nombre: "Tech Woven iPhone 17 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Tech Woven Case",
    descripcion: "Funda Tech Woven Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 4 }, (_, i) => `/images/products/techWoven/17pro_${i + 1}.webp`),
    colores: {
        "#333f4d": { id: 1, nombre: "Azul Noche", stock: 0 },
        "#764536": { id: 2, nombre: "Marrón Cuero", stock: 1 },
        "#58643e": { id: 3, nombre: "Verde Musgo", stock: 2 },
        "#3e3e3e": { id: 4, nombre: "Gris Oscuro", stock: 1 }
    }
},
{
    id: 37,
    nombre: "Tech Woven iPhone 17 Pro Max",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Tech Woven Case",
    descripcion: "Funda Tech Woven Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/techWoven/17promax_${i + 1}.webp`),
    colores: {
        "#3e3e3e": { id: 1, nombre: "Gris Oscuro", stock: 3 },
        "#764536": { id: 2, nombre: "Marrón Cuero", stock: 1 }
    }
},

// HADA CASE
{
    id: 38,
    nombre: "Hada Case iPhone 13-14",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Hada Case",
    descripcion: "Funda Hada Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/hada/13-14_${i + 1}.webp`),
    colores: {
        "#8a2285": { id: 1, nombre: "Violeta Intenso", stock: 1 },
        "#3c3a39": { id: 2, nombre: "Gris Carbón", stock: 1 },
        "#6da8d9": { id: 3, nombre: "Azul Cielo", stock: 1 }
    }
},
{
    id: 39,
    nombre: "Hada Case iPhone 13 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria:  "Hada Case",
    descripcion: "Funda Hada Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/hada/13pro_${i + 1}.webp`),
    colores: {
        "#92308f": { id: 1, nombre: "Violeta", stock: 1 },
        "#393834": { id: 2, nombre: "Gris Carbón", stock: 0 },
        "#ea96b0": { id: 3, nombre: "Rosa Coral", stock: 1 }
    }
},
{
    id: 40,
    nombre: "Hada Case iPhone 15 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria:  "Hada Case",
    descripcion: "Funda Hada Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/hada/15pro_${i + 1}.webp`),
    colores: {
        "#dd668b": { id: 1, nombre: "Rosa Frambuesa", stock: 0 },
        "#d0cecf": { id: 2, nombre: "Gris Claro", stock: 0 },
        "#912c8e": { id: 3, nombre: "Violeta Oscuro", stock: 1 }
    }
},

// SWEET CASE
{
    id: 41,
    nombre: "Sweet Case iPhone 14 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Sweet Case",
    descripcion: "Funda Sweet Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/sweet/14pro_${i + 1}.webp`),
    colores: {
        "#798f8d": { id: 1, nombre: "Verde Azulado", stock: 0 },
        "#252525": { id: 2, nombre: "Negro Mate", stock: 2 }
    }
},
{
    id: 42,
    nombre: "Sweet Case iPhone 15 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Sweet Case",
    descripcion: "Funda Sweet Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/sweet/15pro_${i + 1}.webp`),
    colores: {
        "#c08e59": { id: 1, nombre: "Marrón Arena", stock: 1 },
        "#272226": { id: 2, nombre: "Negro Carbón", stock: 1 },
        "#8d6870": { id: 3, nombre: "Rosa Viejo", stock: 1 }
    }
},
{
    id: 43,
    nombre: "Sweet Case iPhone 16 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Sweet Case",
    descripcion: "Funda Sweet Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/sweet/16pro_${i + 1}.webp`),
    colores: {
        "#c9c9c7": { id: 1, nombre: "Gris Piedra", stock: 1 },
        "#8e6971": { id: 2, nombre: "Rosa Viejo", stock: 1 },
        "#798f8d": { id: 3, nombre: "Verde Azulado", stock: 1 }
    }
},

// MAT CASE
{
    id: 44,
    nombre: "Mat Case iPhone 11",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/mat/11_${i + 1}.webp`),
    colores: {
        "#222953": { id: 1, nombre: "Azul Marino", stock: 1 },
        "#d6bebf": { id: 2, nombre: "Rosa Pálido", stock: 0 },
        "#807c72": { id: 3, nombre: "Gris Marron", stock: 1 }
    }
},
{
    id: 45,
    nombre: "Mat Case iPhone 12-12 Pro",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/mat/12_${i + 1}.webp`),
    colores: {
        "#222953": { id: 1, nombre: "Azul Marino", stock: 1 },
        "#d6bebf": { id: 2, nombre: "Rosa Pálido", stock: 1 },
        "#e4e2e0": { id: 3, nombre: "Blanco Perla", stock: 1 }
    }
},
{
    id: 46,
    nombre: "Mat Case iPhone 14",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/mat/14_${i + 1}.webp`),
    colores: {
        "#0c0c0c": { id: 1, nombre: "Negro", stock: 1 },
        "#dcc0c5": { id: 2, nombre: "Rosa Viejo", stock: 1 },
        "#e6e5e1": { id: 3, nombre: "Blanco", stock: 1 }
    }
},
{
    id: 47,
    nombre: "Mat Case iPhone 15",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/mat/15_${i + 1}.webp`),
    colores: {
        "#222953": { id: 1, nombre: "Azul Marino", stock: 2 },
        "#807c72": { id: 2, nombre: "Gris", stock: 1 }
    }
},
/*  ME FALTA LAS IMAGENES
{
    id: 48,
    nombre: "Mat Case iPhone 15 Pro Max",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/mat/  15promax_${i + 1}.webp`),
    colores: {
        "#0c0c0c": { id: 1, nombre: "Negro Azabache", stock: 1 },
        "#dcc0c5": { id: 2, nombre: "Rosa Viejo", stock: 1 },
        "#e6e5e1": { id: 3, nombre: "Blanco Hueso", stock: 1 }
    }
},
*/
{
    id: 49,
    nombre: "Mat Case iPhone 16",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/mat/16_${i + 1}.webp`),
    colores: {
        "#222953": { id: 1, nombre: "Azul Marino", stock: 1 },
        "#0c0c0c": { id: 2, nombre: "Negro", stock: 1 },
        "#e6e5e1": { id: 3, nombre: "Blanco", stock: 1 }
    }
},
{
    id: 50,
    nombre: "Mat Case iPhone 16 Pro Max",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Mat case",
    descripcion: "Funda Mat Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 2 }, (_, i) => `/images/products/mat/16promax_${i + 1}.webp`),
    colores: {
        "#222953": { id: 1, nombre: "Azul Marino", stock: 0 },
        "#e4e2e0": { id: 2, nombre: "Blanco Perla", stock: 2 }
    }
},

/*
// METALIC CASE
{
    id: 51,
    nombre: "Metalic Case iPhone 13",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Funda de silicona",
    descripcion: "Funda Metalic Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/metalic/metalic13_${i + 1}.webp`),
    colores: {
        "#8fcfcf": { id: 1, nombre: "Turquesa Metálico", stock: 1 },
        "#465b8e": { id: 2, nombre: "Azul Eléctrico", stock: 1 },
        "#454643": { id: 3, nombre: "Gris Oliva", stock: 1 }
    }
},
{
    id: 52,
    nombre: "Metalic Case iPhone 13 Pro Max",
    precioOriginal: 10000,
    descuento: 0,
    get precioOferta() {
        if (!this.descuento || this.descuento <= 0) return this.precioOriginal;
        return this.precioOriginal - (this.precioOriginal * (this.descuento / 100));
    },
    categoria: "Funda de silicona",
    descripcion: "Funda Metalic Case de alta calidad, disponible en diferentes colores.",
    imgAll: Array.from({ length: 3 }, (_, i) => `/images/products/metalic/metalic13promax_${i + 1}.webp`),
    colores: {
        "#c7accb": { id: 1, nombre: "Lavanda Metálico", stock: 1 },
        "#6f5573": { id: 2, nombre: "Violeta Metálico", stock: 1 },
        "#434441": { id: 3, nombre: "Gris Oliva", stock: 1 }
    }
},
*/

    ];
