export interface NavRouteNode {
  path: string;
  label: string;
  category: 'public' | 'accommodation' | 'booking' | 'concierge' | 'legal';
  inMainNav?: boolean;
  description?: string;
}

export const NAVIGATION_TREE: NavRouteNode[] = [
  // Navegación Principal Pública
  { path: '/', label: 'Inicio', category: 'public', inMainNav: true },
  { path: '/alojamientos', label: 'Alojamientos', category: 'public', inMainNav: true },
  { path: '/lafinca', label: 'La Finca', category: 'public', inMainNav: true },
  { path: '/catas', label: 'Catas', category: 'public', inMainNav: true },
  { path: '/bodega', label: 'La Bodega', category: 'public', inMainNav: true },
  { path: '/eventos', label: 'Eventos', category: 'public', inMainNav: true },
  { path: '/contacto', label: 'Contacto', category: 'public', inMainNav: true },

  // 10 Alojamientos (Colección CMS)
  { path: '/alojamientos/malbec', label: '1. Malbec', category: 'accommodation' },
  { path: '/alojamientos/merlot', label: '2. Merlot', category: 'accommodation' },
  { path: '/alojamientos/bodegas-marcos', label: '3. Bodegas Marcos', category: 'accommodation' },
  { path: '/alojamientos/tempranillo', label: '4. Tempranillo', category: 'accommodation' },
  { path: '/alojamientos/verdejo', label: '5. Verdejo', category: 'accommodation' },
  { path: '/alojamientos/garnacha', label: '6. Garnacha', category: 'accommodation' },
  { path: '/alojamientos/cabernet-sauvignon', label: '7. Cabernet Sauvignon', category: 'accommodation' },
  { path: '/alojamientos/albillo', label: '8. Albillo', category: 'accommodation' },
  { path: '/alojamientos/la-muralla-i', label: 'La Muralla I', category: 'accommodation' },
  { path: '/alojamientos/la-muralla-ii', label: 'La Muralla II', category: 'accommodation' },

  // Motor de Reservas y Confirmación
  { path: '/reserva-finca', label: 'Reserva en la Finca', category: 'booking' },
  { path: '/reserva-muralla', label: 'Reserva en La Muralla', category: 'booking' },
  { path: '/confirmacion.html', label: 'Confirmación de Reserva', category: 'booking' },

  // Portal Digital de Huéspedes (11 rutas descubiertas por REA)
  { path: '/huespedes', label: 'Portal Huéspedes (Finca)', category: 'concierge' },
  { path: '/muralla', label: 'Portal Huéspedes (La Muralla)', category: 'concierge' },
  { path: '/check-in', label: 'Guía Digital Check-In', category: 'concierge' },
  { path: '/normas', label: 'Normas del Alojamiento', category: 'concierge' },
  { path: '/clave-wifi', label: 'Clave Wi-Fi', category: 'concierge' },
  { path: '/restauracion', label: 'Bares y Restaurantes', category: 'concierge' },
  { path: '/tiendas', label: 'Supermercados y Tiendas', category: 'concierge' },
  { path: '/transporte', label: 'Taxis y Autobuses', category: 'concierge' },
  { path: '/penafiel', label: 'Mapa de Peñafiel', category: 'concierge' },
  { path: '/catas-marcos', label: 'Catas de Vino con Magia', category: 'concierge' },
  { path: '/catering', label: 'Catering Personalizado', category: 'concierge' },

  // Políticas Legales
  { path: '/cookies', label: 'Política de Cookies', category: 'legal' },
  { path: '/politica-privacidad', label: 'Política de Privacidad', category: 'legal' },
];

export const MAIN_NAV_LINKS = NAVIGATION_TREE.filter((item) => item.inMainNav);
