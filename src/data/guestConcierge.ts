export interface ConciergeTile {
  title: string;
  subtitle: string;
  route: string;
  includeInMuralla: boolean;
}

export interface RestaurantItem {
  name: string;
  phone: string;
  url: string;
  image: string;
}

export interface ShopItem {
  name: string;
  image: string;
}

export interface TransportItem {
  name: string;
  phone: string;
  detail?: string;
  url?: string;
}

export interface CheckInSubStep {
  code: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  extraImage?: string;
  extraImageAlt?: string;
  hasGateCodeReveal?: boolean;
}

export interface CheckInStep {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  subItems: CheckInSubStep[];
}

export const GUEST_PORTAL_DATA = {
  fincaWelcomeTitle: 'Bienvenido a Finca Entreviñedos de Bodegas Marcos',
  murallaWelcomeTitle: 'Bienvenido a alojamientos Muralla I y Muralla II de Bodegas Marcos',
  welcomeSubtitleEn: 'Welcome to Finca Entreviñedos by Bodegas Marcos',
  tiles: [
    {
      title: 'CATAS DE VINO CON MAGIA',
      subtitle: 'Wine tastings with magic',
      route: '/catas-marcos',
      includeInMuralla: true,
    },
    {
      title: 'NORMAS DEL ALOJAMIENTO',
      subtitle: 'Guest Rules',
      route: '/normas',
      includeInMuralla: true,
    },
    {
      title: 'CLAVE WIFI',
      subtitle: 'Wifi Password',
      route: '/clave-wifi',
      includeInMuralla: false,
    },
    {
      title: 'GUÍA CHECK-IN DIGITAL',
      subtitle: 'Interactive Arrival Guide',
      route: '/check-in',
      includeInMuralla: true,
    },
    {
      title: 'ALQUILER DE BICICLETAS',
      subtitle: 'Bicycle hire',
      route: '/eventos#bicicletas',
      includeInMuralla: true,
    },
    {
      title: 'BARES Y RESTAURANTES',
      subtitle: 'Bar & Restaurants',
      route: '/restauracion',
      includeInMuralla: true,
    },
    {
      title: 'SUPERMERCADOS Y TIENDAS DE ALIMENTACIÓN',
      subtitle: 'Shops & Supermarkets',
      route: '/tiendas',
      includeInMuralla: true,
    },
    {
      title: 'CATERING PERSONALIZADO',
      subtitle: 'Bespoke catering service',
      route: '/catering',
      includeInMuralla: true,
    },
    {
      title: 'MAPA DE PEÑAFIEL',
      subtitle: 'Peñafiel Map',
      route: '/penafiel',
      includeInMuralla: true,
    },
    {
      title: 'NUESTRA PÁGINA WEB',
      subtitle: 'Finca Entreviñedos',
      route: '/',
      includeInMuralla: true,
    },
    {
      title: 'TAXIS Y AUTOBUSES',
      subtitle: 'Taxi and Bus services',
      route: '/transporte',
      includeInMuralla: true,
    },
  ] as ConciergeTile[],
  wifi: {
    title: 'CLAVE WIFI',
    subtitle: 'Wifi Password',
    networkLabel: 'Red Wifi | Wifi Network',
    ssid: 'FINCA_ENTREVINEDOS',
    instruction: 'Haz click para copiar la contraseña e introducirla',
    password: 'Desde1926',
  },
  restaurants: {
    title: 'GASTRONOMÍA LOCAL',
    subtitle: 'Local Cuisine',
    items: [
      {
        name: 'Mesón El Corralillo',
        phone: '983 880 733',
        url: 'https://share.google/XQuKc9tg71kHwK19B',
        image: 'https://framerusercontent.com/images/prVzjYkxEzGwYIRGhLDRLmU3w.webp',
      },
      {
        name: 'Asados Don José',
        phone: '983 880 158',
        url: 'https://share.google/R939caDj8SNzDfIlM',
        image: 'https://framerusercontent.com/images/m7UqOXwmkjnypksqaNutw2nPAlI.webp',
      },
      {
        name: 'Taberna La Perla',
        phone: '983 881 212',
        url: 'https://www.tripadvisor.es/Restaurant_Review-g1026109-d11671959-Reviews-Taberna_La_Perla-Penafiel_Province_of_Valladolid_Castile_and_Leon.html',
        image: 'https://framerusercontent.com/images/7jvivo3aLVOwAnBzFtdcUoW09s.jpg',
      },
      {
        name: 'Asador Molino de Palacios',
        phone: '646 203 770',
        url: 'https://share.google/M7cALpZ2EKu8zhV6L',
        image: 'https://framerusercontent.com/images/gMpnbdQTWOS0d2OTdooBbdTDV9o.webp',
      },
      {
        name: 'Bar Los Cisnes',
        phone: '635 879 784',
        url: 'https://share.google/pD7dybxNVyfbA3wPp',
        image: 'https://framerusercontent.com/images/5vQZPzyYD46rVELz59km6l1nX2U.webp',
      },
      {
        name: 'Restaurante Asados Mauro',
        phone: '679 016 161',
        url: 'https://share.google/lZ1V0oXzwsnfoDVP2',
        image: 'https://framerusercontent.com/images/D5MzNAFvXmh1rFqiZtOXSAZAyiA.webp',
      },
      {
        name: 'Restaurante Curioso',
        phone: '682 399 970',
        url: 'https://share.google/mcOFVzrzh9yyfPHnb',
        image: 'https://framerusercontent.com/images/u1mADNpGx2UunWF2mZVdXcYtPI.jpeg',
      },
      {
        name: 'El Lagar de San Vicente',
        phone: '679 016 161',
        url: 'https://share.google/UPpPP2HRltI7ycYnk',
        image: 'https://framerusercontent.com/images/8NHpKYU2KDBMgal8nE4aTanfE.jpg',
      },
      {
        name: 'Restaurante El Barco de Bolas',
        phone: '983 881 748',
        url: 'https://share.google/HODa9fMceOYDncIEg',
        image: 'https://framerusercontent.com/images/XNTaee6aGEra0hnty95ajuHN8.webp',
      },
    ] as RestaurantItem[],
  },
  shops: {
    title: 'SUPERMERCADOS Y TIENDAS DE ALIMENTACIÓN',
    subtitle: 'Shops & Supermarkets',
    items: [
      {
        name: 'Supermercado Lupa',
        image: 'https://framerusercontent.com/images/S587BM5MqMNDEbDySoDfqUhWxyw.jpg',
      },
      {
        name: 'Supermercado Día',
        image: 'https://framerusercontent.com/images/fgOYIQcL3T9chSyqLMd6BcT90w.jpg',
      },
      {
        name: 'Supermercado Agropal',
        image: 'https://framerusercontent.com/images/lyHdhRhkRLvCG26xHjp9tdUTE8.png',
      },
      {
        name: 'La Compra',
        image: 'https://framerusercontent.com/images/hF0suvNQ1ZElwR8G2W94P95L7zM.jpg',
      },
      {
        name: 'El Coso',
        image: 'https://framerusercontent.com/images/S587BM5MqMNDEbDySoDfqUhWxyw.jpg',
      },
    ] as ShopItem[],
  },
  transport: {
    title: 'TAXIS Y AUTOBUSES',
    subtitle: 'Taxi and bus services',
    heroImage: 'https://framerusercontent.com/images/VEO8dYWGZRRJczzHLs1njRWNQ.jpg',
    items: [
      { name: 'Taxi Rafael Maroto', phone: '630 91 70 20' },
      { name: 'Taxi Victor', phone: '696 220 582' },
      { name: 'Taxi Abel', phone: '655 457 040' },
      { name: 'Taxi Eduardo', phone: '630 214 724' },
      {
        name: 'Autocares | Valladolid - Peñafiel - Aranda de Duero',
        phone: '983 881 748',
        url: 'https://www.autocareslaregional.com/',
      },
    ] as TransportItem[],
  },
  penafielMap: {
    title: 'MAPA DE PEÑAFIEL',
    subtitle: 'Peñafiel Map',
    image: 'https://framerusercontent.com/images/sbEeBBJdwSgV5v16YwV7EVZq0DM.jpg',
  },
  catasMarcosQuick: {
    title: 'CATAS DE VINO CON MAGIA',
    subtitle: 'Wine tastings with magic',
    heading: 'Cata de vino en Bodegas Marcos',
    description: 'Única cata de la Ribera del Duero en la que se ameniza con la magia del vino.',
    tagline: 'Que no te lo cuenten, ¡Vívelo!',
    cta: 'Más Información',
    image: 'https://framerusercontent.com/images/GJWz6m9etUUyfSKBijOwiyj0E.jpeg',
  },
  cateringQuick: {
    title: 'SERVICIO DE CATERING',
    subtitle: 'Bespoke catering service',
    heading: 'Catering',
    description: 'Disfruta de nuestro exclusivo servicio de catering en nuestra Finca.',
    cards: [
      {
        title: 'Pinchos Variados',
        subtitle: 'Lechazo, pollo, etc',
        image: 'https://framerusercontent.com/images/HnXIjR5BU6KajJmQiKtSo2MTmeE.jpg',
      },
      {
        title: 'Menús',
        subtitle: 'Menús personalizados',
        image: 'https://framerusercontent.com/images/edgDTKB2btudDhTDN81w98pTREg.jpg',
      },
      {
        title: 'Servicio',
        subtitle: 'Equipo profesional',
        image: 'https://framerusercontent.com/images/OnxrT1dlPHciWo4vP9reU1jYy5Y.jpg',
      },
    ],
    cta: 'Más Información sobre el catering',
  },
  checkInGuide: {
    badge: 'Guía de Huésped Digital',
    title: '¡Bienvenidos a Finca Entreviñedos!',
    subtitle:
      'Esta guía interactiva reúne los pasos esenciales y recomendaciones clave para entender fácilmente cada detalle y disfrutar al máximo de tu estancia. Despliega las secciones y toca las fotos para ampliarlas.',
    gateCode: '4821',
    mapsUrl: 'https://share.google/lm4pvB3FAUlTWu3Ah',
    footerTitle: '¡Que disfrutes de una estancia reparadora!',
    steps: [
      {
        number: '1',
        id: 'step-1',
        title: 'Puertas y código de entrada/salida',
        subtitle: 'Acceso principal y control de puerta peatonal',
        subItems: [
          {
            code: '1.1',
            title: 'Teclado Numérico Exterior',
            description:
              'Al llegar a la puerta peatonal, verás el teclado metálico situado en el lado izquierdo de la puerta.',
            image:
              'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
            imageAlt: 'Teclado numérico',
          },
          {
            code: '1.2',
            title: 'Introducción de Código',
            description: 'Introduce el código de acceso en el teclado numérico para abrir la puerta.',
            image:
              'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
            imageAlt: 'Teclado de apertura',
            hasGateCodeReveal: true,
          },
          {
            code: '1.3',
            title: 'Puerta Peatonal',
            description:
              'La puerta peatonal abrirá lentamente hacia el interior de la propiedad. Espera a que complete el recorrido antes de avanzar.',
            image:
              'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
            imageAlt: 'Puerta peatonal',
          },
          {
            code: '1.4',
            title: 'Salida y Cierre Automatizado',
            description:
              'Al salir de la finca encontrarás un botón a la altura de la ventana del vehículo. Solo tienes que pulsarlo sin bajarte del coche para que la puerta se abra y, tras cruzarla, se cerrará de manera totalmente automática.',
          },
        ],
      },
      {
        number: '2',
        id: 'step-2',
        title: 'Contenedores Basura',
        subtitle: 'Ubicación y clasificación de residuos',
        subItems: [
          {
            code: '2.1',
            title: 'Contenedor',
            description:
              'A pocos metros de la verja principal (fuera de la finca) están los contenedores.',
          },
        ],
      },
      {
        number: '3',
        id: 'step-3',
        title: 'Aparcamiento',
        subtitle: 'Normas e instrucciones del aparcamiento',
        subItems: [
          {
            code: '3.1',
            title: 'Localiza tu aparcamiento',
            description:
              'NO ocupes otra plaza y aparca según las indicaciones de los letreros disponibles en toda la finca.',
          },
          {
            code: '3.2',
            title: 'Disposición del aparcamiento',
            description:
              'Estaciona tu vehículo aparcando en batería y en paralelo según la disposición delimitada de las plazas.',
          },
        ],
      },
      {
        number: '4',
        id: 'step-4',
        title: 'Alojamiento, estancia y llaves',
        subtitle: 'Entrega de llaves y estancia',
        subItems: [
          {
            code: '4.1',
            title: 'Letrero y localización de tu alojamiento',
            description:
              'Cada alojamiento dispone de su propio letrero. Fíjate en el número de la derecha y el nombre del mismo que se te facilitará a la hora de realizar la reserva.',
          },
          {
            code: '4.2',
            title: 'Recogida de llaves',
            description: 'Sigue las instrucciones para coger las llaves.',
          },
          {
            code: '4.3',
            title: 'Luz',
            description: 'Introduzca la tarjeta en el tarjetero para tener luz en la estancia.',
          },
          {
            code: '4.4',
            title: 'QR con WIFI y normas',
            description:
              'Al lado de la puerta encontrarás un código QR con toda la información: Wi-Fi, normas de la casa, supermercados, restaurantes, taxis, etc. El agua de la finca es totalmente potable.',
          },
          {
            code: '4.5',
            title: 'Ropa de cama para sofás cama',
            description:
              'En los canapés abatibles de las camas encontrarás las sábanas y almohadas destinadas al uso del sofá cama, además de la tabla de planchar y el tendedero.',
          },
        ],
      },
      {
        number: '5',
        id: 'step-5',
        title: 'Piscina / Duchas / Servicios',
        subtitle: 'Puerta de la piscina, normas de uso, horarios...',
        subItems: [
          {
            code: '5.1',
            title: 'Puerta Piscina y servicios',
            description: 'Puerta de entrada a la piscina, zona de ducha y servicio.',
          },
          {
            code: '5.2',
            title: 'Normas de la piscina',
            description:
              'En el cartel informativo a la entrada del recinto podrás consultar todas las normas de uso de la piscina, higiene y horarios.',
          },
        ],
      },
    ] as CheckInStep[],
  },
};
