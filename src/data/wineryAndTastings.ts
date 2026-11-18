export interface TerroirPillar {
  id: string;
  title: string;
  description: string[];
  image: string;
  imageAlt: string;
}

export interface WineRange {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface TastingStep {
  number: string;
  title: string;
  description: string;
}

export interface TastingNarrativeBlock {
  id: string;
  subtitle: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export const WINERY_DATA = {
  eyebrow: 'Esencia del vino',
  title: 'La Bodega',
  heroImages: [
    'https://framerusercontent.com/images/fAuQfYB4GmL4CDjHdAl4bFwSMs.jpg',
    'https://framerusercontent.com/images/S1efwolLgMlxCOnI73MPou6qOo.jpg',
    'https://framerusercontent.com/images/i7EKYJh4PHW6iosRZbEoR94pBUI.jpg',
  ],
  storyHeading: 'Nuestra historia',
  storyParagraphs: [
    'Bodegas Marcos es una empresa dedicada a la producción y distribución de vinos de alta calidad. Ubicados en la región vinícola más prestigiosa del país, nuestros expertos enólogos y viticultores se dedican a cultivar y cosechar las mejores uvas para crear vinos de renombre.',
    'Nuestro compromiso con la calidad comienza en los viñedos, donde trabajamos con técnicas tradicionales y respetuosas con el medio ambiente para producir uvas sanas con un gran sabor. Después de la cosecha, nuestro equipo de expertos utiliza técnicas de vinificación innovadoras para producir vinos que reflejan la personalidad única de la tierra y el clima donde se cultivaron las uvas.',
    'En nuestras bodegas, ofrecemos una amplia selección de vinos que van desde vinos jóvenes y frescos hasta vinos de guarda de alta gama. Todos nuestros vinos son elaborados con uvas seleccionadas cuidadosamente y pasan por rigurosos controles de calidad para asegurar que cumplen con nuestros requisitos y estándares.',
    'Además de nuestra selección de vinos, ofrecemos visitas guiadas a nuestras bodegas para que nuestros invitados puedan aprender sobre la historia y la cultura de la región vinícola y disfrutar de una experiencia de cata única. También ofrecemos servicios de venta y envío de vinos a nivel nacional e internacional.',
    'En Bodegas Marcos, estamos comprometidos con la excelencia en cada paso del proceso de producción de nuestros vinos. Ya sea que esté buscando una botella para disfrutar en una cena especial o para agregar a su colección personal, nuestros vinos son la elección perfecta para los amantes del buen vino.',
  ],
  characteristicsHeading: 'Caracteristicas',
  terroirPillars: [
    {
      id: 'vendimia',
      title: 'La vendimia',
      description: [
        'Se realiza cuando la uva se encuentra en el punto óptimo de maduración, a mano y en cajas de 20 kilos para cuidar su transporte hasta la bodega donde se seleccionan los racimos.',
      ],
      image: 'https://framerusercontent.com/images/6Ei4yEvVxXTbB6bXjB2tkcnNBeY.jpg',
      imageAlt: 'La vendimia manual en cajas de 20 kilos en Bodegas Marcos',
    },
    {
      id: 'suelo',
      title: 'El suelo',
      description: [
        'Los suelos predominantes son los calcáreo pedregosos y algo de tierra arcillosa roja. Ideales para el cultivo de la vid que tanto destaca en nuestra Ribera del Duero, y en particular en Peñafiel.',
      ],
      image: 'https://framerusercontent.com/images/Ux6VLLYuNPTiF8N11NNyQA7wqI.jpg',
      imageAlt: 'Vino Marcos sobre terroir calcáreo pedregoso',
    },
    {
      id: 'clima',
      title: 'El Clima',
      description: [
        'La climatología se caracteriza por una pluviometría moderada baja de rigurosos inviernos fríos, veranos cálidos y secos, y amplios contrastes térmicos. Un clima perfecto para nuestros viñedos',
      ],
      image: 'https://framerusercontent.com/images/5PnL8cVRjrsR0q4UwR9NrvfpPs.jpeg',
      imageAlt: 'Clima continental extremo de la Ribera del Duero',
    },
    {
      id: 'vinedos',
      title: 'Los Viñedos',
      description: [
        'Nuestros viñedos están situados en una tierra excepcional para el nacimiento de unos vinos de extraordinaria calidad. Sus tierras son únicas con suaves laderas con largas horas de sol.',
        'El equipo de enólogos se encarga de realizar un pormenorizado trabajo para conseguir un vino de excelencia que acompaña las catas y mesas de todo el mundo.',
      ],
      image: 'https://framerusercontent.com/images/a2CBYtwP5bzjstu7WYchp4a27pE.jpeg',
      imageAlt: 'Viñedos en suaves laderas en Peñafiel',
    },
    {
      id: 'uva',
      title: 'La Uva',
      description: [
        'La climatología se caracteriza por una pluviometría moderada baja de rigurosos inviernos fríos, veranos cálidos y secos, y amplios contrastes térmicos. Un clima perfecto para nuestros viñedos.',
      ],
      image: 'https://framerusercontent.com/images/K2dd8LdnQXqBt6EjLM51be4Eps.jpg',
      imageAlt: 'Selección de uva de Ribera del Duero',
    },
  ] as TerroirPillar[],
  winesSection: {
    eyebrow: 'Nuestra exclusiva variedad de vinos.',
    title: 'Nuestros vinos',
    subtitle: 'Descubre todos nuestros vinos',
    summaryCardTitle: 'Vinos',
    summaryCardDescription:
      'Disfruta de nuestra gama de vinos de reserva, crianza y vendimia seleccionada.',
    summaryImage: 'https://framerusercontent.com/images/psqLXGaeWGbaRFAKxOZDmCYT0.jpg',
    ranges: [
      {
        id: 'reserva',
        name: 'Reserva',
        subtitle: 'Envejecimiento mínimo 36 meses',
        description:
          'Mínimo 36 meses de envejecimiento, con 12 en barrica. Complejidad, estructura y una evolución sedosa. Un clásico de la Ribera del Duero.',
        image: 'https://framerusercontent.com/images/EZ48KDSbsk3dTH23cpmrOtRdQQ.jpeg',
      },
      {
        id: 'crianza',
        name: 'Crianza',
        subtitle: 'Mínimo 12 meses en barrica',
        description:
          'Mínimo 12 meses en barrica. Intensidad afrutada y notas especiadas de roble. Ideal para un disfrute joven y elegante.',
        image: 'https://framerusercontent.com/images/kvJVk6jFv0B9eQThh9SML8V2Psw.jpeg',
      },
      {
        id: 'vendimia-seleccionada',
        name: 'Vendimia Seleccionada',
        subtitle: 'Máxima expresión del terruño',
        description:
          'Vinos que provienen de uvas de la mejor calidad de una añada destacada. Máxima expresión del terruño y potencial de guarda.',
        image: 'https://framerusercontent.com/images/qZVi9IFrYXLeODAKsEhSiTNeTw.jpeg',
      },
    ] as WineRange[],
  },
  galleryTitle: 'Nuestra bodega',
  gallerySubtitle: 'En esta galería podras conocer nuestra Bodega de una forma más gráfica.',
  galleryImages: [
    'https://framerusercontent.com/images/EZ48KDSbsk3dTH23cpmrOtRdQQ.jpeg',
    'https://framerusercontent.com/images/YJrPE13zo8MwsS1bYRolj97VlaY.png',
    'https://framerusercontent.com/images/kvJVk6jFv0B9eQThh9SML8V2Psw.jpeg',
    'https://framerusercontent.com/images/qZVi9IFrYXLeODAKsEhSiTNeTw.jpeg',
    'https://framerusercontent.com/images/juaV1gPjRWa02jhsUkrwHPsiv8A.jpeg',
  ],
};

export const TASTINGS_DATA = {
  eyebrow: 'Descubre más',
  title: 'Catas en Bodegas Marcos',
  heroImage: 'https://framerusercontent.com/images/9q0keEhpzKbAytb9pJp8VJOqnM.png',
  secondaryHeroImage: 'https://framerusercontent.com/images/g6eNUmTFFQKfzriq8irr45DJY.png',
  sectionHeading: 'Catas de Bodegas Marcos',
  intro:
    'En Finca Entreviñedos – Bodegas Marcos, te invitamos a disfrutar de una experiencia diferente en pleno corazón de la Ribera del Duero. Una cata premium donde el buen vino se une a la diversión, la magia y el encanto de una finca con personalidad propia.',
  priceTag: 'Cata Premium – 25€/persona · Duración aproximada: 90 min',
  pricePerPerson: 25,
  durationMinutes: 90,
  includesLabel: 'Incluye:',
  steps: [
    {
      number: '1',
      title: '1- Paseo entre viñedos:',
      description:
        'Comenzamos con una caminata relajada por nuestras viñas, donde descubrirás el estado fenológico actual de las cepas y curiosidades sobre su cuidado.',
    },
    {
      number: '2',
      title: '2- Visita guiada a la bodega + espectáculo de magia en directo:',
      description:
        'Te contamos de forma cercana y entretenida cómo elaboramos nuestros vinos blancos, rosados y tintos... mientras un mago profesional convierte la visita en un show divertido, original y totalmente participativo. Una cata con magia única en Ribera del Duero.',
    },
    {
      number: '3',
      title: '3- Degustación de 3 vinos + aperitivo local:',
      description:
        'Cerramos la experiencia con tres vinos seleccionados y un aperitivo con productos típicos de la zona.',
    },
  ] as TastingStep[],
  kidsNote: {
    title: 'Para los más pequeños',
    description:
      'También son bienvenidos. Disfrutarán del show de magia, formarán parte de él y brindarán con su propio "vino especial" (mosto).',
  },
  closingCallout: 'Reserva tu cata con magia y vive Ribera del Duero de una forma diferente.',
  ctaLabel: 'Reserva tu Cata Aquí',
  narrativeBlocks: [
    {
      id: 'brindis',
      subtitle: 'Catas Mágicas',
      title: 'Brindis con Sentido',
      paragraphs: [
        'Nuestra Cata Premium se vive en un ambiente distendido, donde el vino se convierte en el hilo conductor de una experiencia llena de interacción y buen humor. No es una cata para observar en silencio, sino para participar, comentar y disfrutar entre copas.',
        'Cada grupo vive su propia dinámica: se brindan anécdotas, se despiertan los sentidos y se descubren matices del vino de una forma fácil y entretenida. Aquí el protagonismo lo tienen las personas y los momentos compartidos.',
      ],
      image: 'https://framerusercontent.com/images/juaV1gPjRWa02jhsUkrwHPsiv8A.jpeg',
    },
    {
      id: 'grupo',
      subtitle: 'Experiencia compartida',
      title: 'Disfruta en grupo',
      paragraphs: [
        'Pensada para quienes quieren algo más que una visita típica a bodega, nuestra propuesta combina vino, cercanía y un toque inesperado que hace que cada grupo lo viva como algo único. El ambiente es relajado y familiar, ideal para celebrar, aprender y disfrutar sin prisas.',
        'Adaptamos la experiencia al ritmo del grupo para que todos se sientan cómodos, desde los más curiosos hasta los que ya tienen experiencia en el mundo del vino. La idea es sencilla: pasarlo bien mientras se descubre la Ribera del Duero desde dentro.',
      ],
      image: 'https://framerusercontent.com/images/HQ9qrXOymzYasS7b1PmVQTYOJ4.jpeg',
    },
    {
      id: 'magia',
      subtitle: 'De barrica a la copa',
      title: 'La Magia de la Cata',
      paragraphs: [
        'Durante la cata probamos vinos directamente desde barrica, acompañados de explicaciones claras y ligeras que permiten entender la evolución del vino sin tecnicismos. Cada copa abre una conversación y invita a mirar el vino con otros ojos.',
        'Y porque nos gusta sorprender, en medio de la experiencia aparecen momentos inesperados que rompen el guion y hacen que la visita no solo se recuerde por el vino, sino por la emoción compartida en grupo.',
      ],
      image: 'https://framerusercontent.com/images/M0PMg5TnIMsQoigZqOQQTxxzkFw.jpeg',
    },
  ] as TastingNarrativeBlock[],
  galleryTitle: 'Galeria de Imagenes',
  gallerySubtitle:
    'En esta galería podras conocer mejor la dinámica de nuestras catas con magia únicas en la Ribera del Duero',
  galleryImages: [
    'https://framerusercontent.com/images/juaV1gPjRWa02jhsUkrwHPsiv8A.jpeg',
    'https://framerusercontent.com/images/HQ9qrXOymzYasS7b1PmVQTYOJ4.jpeg',
    'https://framerusercontent.com/images/M0PMg5TnIMsQoigZqOQQTxxzkFw.jpeg',
    'https://framerusercontent.com/images/pHVTzSqrhHX3yeo0PiQcC8Yu9SQ.jpeg',
    'https://framerusercontent.com/images/7x7hAa3JKeBpnbbx1Ge3kwjPG14.jpeg',
    'https://framerusercontent.com/images/qZVi9IFrYXLeODAKsEhSiTNeTw.jpeg',
    'https://framerusercontent.com/images/us3RunrmeCOGOCvSN3P4UFRSJm4.jpeg',
  ],
  formHeading: 'Reserva a través de este formulario',
  formDisclaimer:
    '*El envío de formulario no es una confirmación de reserva. La confirmación de la reserva será validada mediante un email de confirmación por parte de Finca Entreviñedos.',
};
