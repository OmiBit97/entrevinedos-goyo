export interface EstateSpace {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export interface EventServiceCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
  link: string;
}

export const HOME_CONTENT = {
  heroTitle: 'Bienvenidos a Finca Entreviñedos',
  heroSubtitle:
    'En pleno corazón de la Ribera del Duero, te ofrecemos descanso rodeado de viñas, historia y experiencias únicas para vivir y recordar',
  heroCta: 'Explora nuestros alojamientos',
  heroScrollLabel: 'DESLIZA HACIA ABAJO',
  roomsSection: {
    eyebrow: 'Tu estancia, a tu manera',
    title: 'Nuestros alojamientos',
    subtitle: 'Descubre todos nuestros alojamientos y elige el que mas se adapte a tí.',
    altTitle: 'Descansa con nosotros',
    altDescription:
      'Desde acogedores alojamientos entre viñedos hasta estancias con vistas al imponente castillo de Peñafiel, cada espacio en Finca Entreviñedos está diseñado y pensado para combinar comodidad y encanto.',
    cta: 'Ver todos los alojamientos',
  },
  gallerySection: {
    eyebrow: 'Galeria de fotos',
    title: 'Descubre la finca',
    images: [
      '/media/1kXoRxeI0J7G0f7OHBh2MJtTe34.jpg',
      '/media/b1tJ3CjSoNFGhPJgnHA6Lm9Sk.webp',
      '/media/vKNLSsIg8ed1Bv4OxysHNUILWl0.webp',
      '/media/GcX15oGLXMqXxyQkDp8IVfoBk4.webp',
      '/media/RoHj6fWY7IhT29Ptil72hh1uY.webp',
      '/media/zDe6lDCuyiYGvMF7MS4DvGiPZs.webp',
      '/media/cJEWcuxoX7xM3LrObV6p82HdAI.webp',
      '/media/zE8DAkikiIrGA2lcCNtZPQjwns.webp',
      '/media/eWif1u5lqYmZzsmvNSchNcvgSs.webp',
      '/media/a2CBYtwP5bzjstu7WYchp4a27pE.jpeg',
      '/media/G7qisyNspGaLmv8UaP0N4m125w.webp',
      '/media/AtZczS0HHR8URlye6MBezwqf5cY.webp',
      '/media/GihJuchyNtPQCbsZSg4GWWh0.webp',
      '/media/mILzpgQDSp1be8BqwmX2MUc71bg.webp',
      '/media/op4lnsKrZ8ID8tNP9PbDCyC158.webp',
      '/media/2fQEyuzv6s1gDW4vxAzOdpBt9Q.webp',
      '/media/2Qa9ePUsgwmGP0MSASF9tb8.webp',
      '/media/mnKyih2txPWiu3ZSgjrE6EaSdk.webp',
      '/media/XzfYh04RcmP2EHrpczWFHn7S30.jpg',
      '/media/Ev2AA683m1ULa6KoDwaspZBLig.webp',
      '/media/haaHS41qtHavBK4afvkTQrcLx0.webp',
      '/media/rSf5zUDvUv9hw8BACapo8ycNE.webp',
      '/media/iKaQ8MWTy4N5W4sAU0LLCAqyjc.webp',
      '/media/XyhKnoXWpCQAHetnPx2yNJD5c.webp',
      '/media/4lBYIPNcQwuEGIr9EXIE6skPzhM.webp',
      '/media/aDllghLi8tQgxNcwjb7v3aiaq8.webp',
      '/media/JDe6XHnJw5gmYTySQDGtz7J8s7Y.webp',
      '/media/1kzgCRMyVvCusLSPzBgmiAvV4o.webp',
      '/media/i7jevw9YHzKC8F4n3JLGIADU.webp',
      '/media/qEhRjxsT9hIhSCQLDkX8lIjZpd4.webp',
    ],
  },
  servicesSection: {
    eyebrow: 'Servicios & Comodidades',
    title: 'Descubre el encanto de Finca Entreviñedos',
    description:
      'Todas nuestras instalaciones están pensadas y diseñadas para el disfrute de tu estancia en pleno corazón de la Ribera del Duero',
    cta: 'Ver todo',
    items: [
      {
        id: 'piscina',
        title: 'La Piscina',
        description:
          'Disfruta de nuestra piscina descubierta con las impresionantes vistas al castillo de Peñafiel. *Disponibilidad según temporada',
        image: '/media/1kzgCRMyVvCusLSPzBgmiAvV4o.webp',
      },
      {
        id: 'catas-magicas',
        title: 'Catas Mágicas',
        description:
          'Es una cata que viene acompañada de magia y sensaciones que movilizan el alma.',
        image: '/media/Yu4HPZCdO6AcaZSnk9Lcva4AE.jpg',
      },
      {
        id: 'celebraciones',
        title: 'Celebraciones',
        description: 'Celebra con nosotros tus eventos más importantes.',
        image: '/media/a0POn2fWeb0onhHABBmqm8BN054.jpg',
      },
      {
        id: 'vistas',
        title: 'Impresionantes vistas',
        description: 'Disfruta del imponente castillo de Peñafiel desde nuestros alojamientos',
        image: '/media/UGoXkNQ0uW02p00CM37vdt4vc.jpeg',
      },
      {
        id: 'vinos-catas',
        title: 'Vinos y Catas',
        description: 'Disfruta de nuestros vinos en un entorno idilico',
        image: '/media/OeikHNEGSmRZ8LCkNHnM04EWx0.jpeg',
      },
    ],
  },
  eventsSection: {
    eyebrow: 'Eventos y servicios',
    title: 'Celebra tu evento en Finca Entreviñedos',
    subtitle: 'Vive momentos inolvidables con los tuyos',
    cta: 'Ver todo',
    items: [
      {
        id: 'bodas',
        title: 'Celebra tu boda',
        description: 'Celebra el dia mas especial de tu vida en Finca Entreviñedos y disfruta.',
        ctaLabel: 'Consultar presupuesto y disponibilidad',
        image: '/media/a0POn2fWeb0onhHABBmqm8BN054.jpg',
        link: '/eventos',
      },
      {
        id: 'catas',
        title: 'Catas con magia',
        description:
          'Ven a nuestras catas de vino con magia y disfruta de una experiencia única en la Ribera del Duero.',
        ctaLabel: 'Contacta para informarte',
        image: '/media/Yu4HPZCdO6AcaZSnk9Lcva4AE.jpg',
        link: '/catas',
      },
      {
        id: 'bicicletas',
        title: 'Alquiler de Bicicletas',
        description:
          'Alquila con nosotros una bicicleta para explorar Peñafiel a golpe de pedal.',
        ctaLabel: 'Consulta precios y disponibilidad',
        image: '/media/xHw5c4b3F9eH2CfUnZH9m014Wc.jpeg',
        link: '/eventos#bicicletas',
      },
      {
        id: 'catering',
        title: 'Catering para tus eventos',
        description:
          'Contamos con servicio de catering profesional para cualquier tipo de celebración',
        ctaLabel: 'Consultar condiciones con Finca Entreviñedos',
        image: '/media/76rm4z5Dl6mKodPumrQZNPRHY4.jpg',
        link: '/eventos#catering',
      },
    ] as EventServiceCard[],
  },
  contactBanner: {
    title: 'Contáctanos',
    description:
      '¿Quieres reservar nuestros alojamientos o simplemente quieres más información acerca de nuestra finca y bodega? Contacta con nosotros.',
  },
};

export const LA_FINCA_DATA = {
  title: 'Descubre Finca Entreviñedos',
  heroImages: [
    '/media/8Q1rQJ1Z6QtN6oj0zxtv6F8evSY.jpeg',
    '/media/E9OCe0hUHd28BXc9F3viGRPHQ8.jpeg',
    '/media/1kzgCRMyVvCusLSPzBgmiAvV4o.webp',
  ],
  introTitle: 'Zonas Comunes',
  introText:
    'Descubre los espacios pensados para compartir, descansar y disfrutar del entorno en buena compañía. Nuestras zonas comunes combinan naturaleza y comodidad para que puedas relajarte, leer, conversar o simplemente dejar pasar el tiempo con una copa de vino y buenas vistas. Cada área está cuidada con detalle para que te sientas libre de disfrutarla como si fuera tu propia finca.',
  spaces: [
    {
      id: 'barbacoas',
      title: 'Barbacoas',
      paragraphs: [
        'Disponemos de áreas de barbacoa y merenderos integradas en el paisaje, ideales para compartir una comida al aire libre con familia o amigos. Son espacios amplios y cómodos donde disfrutar de un rato agradable en un entorno natural',
      ],
      image: '/media/EmjftXZZPS1lClW3Xoi7XTIQQg.jpg',
    },
    {
      id: 'columpios',
      title: 'Zona de columpios',
      paragraphs: [
        'Contamos con un espacio con columpios dentro de la finca para que los más pequeños puedan jugar al aire libre. Un lugar seguro donde los niños pueden divertirse mientras los adultos disfrutan del entorno.',
      ],
      image: '/media/EagLXVKba1mgw25bO4OFz3bmc.jpeg',
    },
    {
      id: 'vistas',
      title: 'Vistas de la finca',
      paragraphs: [
        'En el exterior hay varios espacios donde descansar. Puedes sentarte, leer o disfrutar de las vistas. Son zonas tranquilas para conversar o tomar algo al aire libre.',
      ],
      image: '/media/O8n6O2M4sZVuq1yW9pFoyCRRpo.jpeg',
    },
    {
      id: 'piscina',
      title: 'Piscina',
      paragraphs: [
        'Disfruta de nuestra piscina exterior, ubicada en un entorno tranquilo y con vistas a la finca. Desde la zona de descanso podrás contemplar el castillo mientras te relajas. Un espacio cómodo y agradable para los días de verano.',
      ],
      image: '/media/1kzgCRMyVvCusLSPzBgmiAvV4o.webp',
    },
    {
      id: 'vinedo',
      title: 'El Viñedo',
      paragraphs: [
        'En la Finca Entreviñedos, el viñedo es el eje de nuestro trabajo. Cuidamos cada cepa en un entorno con suelos ricos y un clima óptimo para la vid.',
        'Puedes pasear entre las hileras y conocer de cerca cómo se cultiva cada racimo, parte esencial de la tradición y del trabajo de Bodegas Marcos. Es un espacio que refleja nuestro origen y nuestro compromiso con la calidad en cada botella.',
      ],
      image: '/media/TJGZZvLn5ev3UkjjnRWPLawSteo.jpg',
    },
  ] as EstateSpace[],
  galleryTitle: 'Imagenes de Finca Entreviñedos',
  gallerySubtitle: 'En esta galería podras conocer nuestra finca en profundidad',
  galleryImages: [
    '/media/j4NdMvUzHXu4AMgfi5shZ4D8qVM.jpg',
    '/media/UVRsFuOnBKlJIsOjqBKldLqXd4.jpg',
    '/media/twueIzSpzDpCMv1WKEkON3w6Zyw.webp',
    '/media/vFUdCTXSGBKB4wPcQeYicNRDoo.webp',
    '/media/vlK4SVxHlADSKkzB9E705UHPPw.jpg',
    '/media/FTUxZdwDip2AFulVHj1Fjisznc.jpg',
    '/media/titIlvNrxS25w9xOdGKE6grl3O0.jpeg',
    '/media/U3lbwqCDoUTSCagDyE1URELTA.jpg',
    '/media/FZPfwCPS0Ph1NkX7KTXbEH7mEc0.jpeg',
  ],
  ctaReserve: 'Reserva en nuestra finca',
};

export const EVENTS_DATA = {
  eyebrow: 'Finca Entreviñedos',
  title: 'Celebra tu evento con nosotros',
  heroImages: [
    '/media/C0ADFheT5Wdf87TFjZsHl5HN0Dk.jpg',
    '/media/7X4iFQxzf05fFc3jGZb30gR8Ro.jpg',
    '/media/PUMEdnNzhawWbcyH8CsleGqe8.jpg',
  ],
  sectionEyebrow: 'SERVICIOS Y EVENTOS',
  sectionTitle: 'Descubre los servicios y eventos disponibles en Finca Entreviñedos',
  categories: [
    {
      id: 'bodas',
      title: 'Bodas',
      description:
        'Celebra tu boda rodeado de viñedos, en un entorno natural y elegante. Ceremonia, banquete y fiesta en un mismo lugar, con todo cuidado al detalle. Vive un día único entre naturaleza, vino y atardeceres inolvidables.',
      image: '/media/2Oh0NEx0setgoKKAPZRxHcYeW4.jpg',
    },
    {
      id: 'celebraciones',
      title: 'Fiestas y celebraciones',
      description:
        'Cumpleaños, aniversarios o reuniones familiares: cualquier ocasión es especial en nuestra finca. Espacios interiores y exteriores, ambiente relajado y vistas entre viñedos para disfrutar y brindar.',
      image: '/media/p45AgoXOUsy97RLLD9fzaC04M.jpg',
    },
    {
      id: 'bicicletas',
      title: 'Alquiler de bicicletas',
      description: 'Alquila con nosotros una bicicleta para explorar Peñafiel a golpe de pedal.',
      image: '/media/0gWV2ZTy288I3ExkxNyRJkSIutA.jpeg',
    },
    {
      id: 'catering',
      title: 'Servicio de Catering',
      description: 'Disfruta en nuestra bodega de nuestro servicio personalizado de catering.',
      image: '/media/76rm4z5Dl6mKodPumrQZNPRHY4.jpg',
    },
  ],
  galleryTitle: 'Galeria de Eventos',
  gallerySubtitle: 'Descubre los eventos celebrados en Finca Entreviñedos',
  galleryImages: [
    '/media/twueIzSpzDpCMv1WKEkON3w6Zyw.webp',
    '/media/RytQENLRzC33Eq7dLsPb4YuCqw.webp',
    '/media/E5cbAZRIZN6vxci7Hb52hL8lLBo.jpeg',
    '/media/rTzTfxLFWxbHU5elZ3SZ9I5No.webp',
    '/media/KMYfkdpTAx3zeSDfUBpY8WL80yE.webp',
    '/media/KY3snIzuxXscUaqzdorw5DWm4vo.webp',
  ],
  servicesTitle: 'Servicios',
  servicesSubtitle:
    'Todas nuestras instalaciones están pensadas y diseñadas para el disfrute de tu estancia en pleno corazón de la Ribera del Duero',
  cateringDetail: {
    title: 'Servicio de Catering',
    blocks: [
      {
        heading: 'Pinchos variados',
        text: 'Ofrecemos un catering selecto de pinchos variados que combina la intensidad del lechazo y el pollo especiado con la frescura dulce de las brochetas de frutas de temporada.',
        image: '/media/HnXIjR5BU6KajJmQiKtSo2MTmeE.jpg',
      },
      {
        heading: 'Menús personalizados',
        text: 'Ofrecemos un servicio de menús personalizados que se adaptan a todas tus necesidades, garantizando calidad, creatividad y la máxima flexibilidad en cada propuesta.',
        image: '/media/edgDTKB2btudDhTDN81w98pTREg.jpg',
      },
      {
        heading: 'Servicio Profesional',
        text: 'Cuidamos cada detalle de la puesta en escena para crear una atmósfera única, desde la decoración elegante de las mesas y estaciones, hasta el servicio atento y profesional de nuestro equipo de camareros. Ofrecemos una experiencia visual y de servicio de alto nivel. Más allá de la comida, garantizamos una ejecución profesional y un servicio impecable en cada detalle, asegurando el éxito y la tranquilidad total de tu evento.',
        image: '/media/OnxrT1dlPHciWo4vP9reU1jYy5Y.jpg',
      },
    ],
  },
  bicycleDetail: {
    eyebrow: 'Alquiler de bicicletas',
    title: 'Alquiler de Bicicletas',
    description:
      'Alquila tu bicicleta y sumérgete en el paisaje de la Ribera del Duero. Te ofrecemos la libertad total para explorar los viñedos, castillos y rutas de Peñafiel a tu propio ritmo. Elige tu modelo y empieza a disfrutar.',
    image: '/media/gJmuiJ3pWiiXeyfJ2ufe29uKnGM.jpg',
  },
  contactHeading: 'Contacta para tu evento',
  contactSubtitle: 'Rellena este formulario o llámanos para informarte sobre estos servicios.',
  sideImage: '/media/Jsw842BGcfpAJO44h8PyCfOhbCU.jpeg',
};
