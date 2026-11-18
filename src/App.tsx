import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { WebGLProvider } from './webgl/WebGLContext';
import { EditionProvider } from './context/EditionContext';
import { LuxuryHeader } from './components/layout/LuxuryHeader';
import { LuxuryFooter } from './components/layout/LuxuryFooter';
import { QuickBookingDrawer } from './components/layout/QuickBookingDrawer';
import { HomePage } from './pages/HomePage';
import { AccommodationsPage } from './pages/AccommodationsPage';
import { AccommodationDetailPage } from './pages/AccommodationDetailPage';
import { EstatePage } from './pages/EstatePage';
import { WineryPage } from './pages/WineryPage';
import { TastingsPage } from './pages/TastingsPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPortalPage } from './pages/BookingPortalPage';
import { GuestConciergePage } from './pages/GuestConciergePage';
import { LegalPage } from './pages/LegalPage';

const InteractiveMapPage = lazy(() => import('./pages/InteractiveMapPage'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

const NotFoundPage: React.FC = () => (
  <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#F6F3EE] px-6 pt-28 text-center text-[#1A1615]">
    <p className="font-technical text-xs uppercase tracking-[0.24em] text-[#9A7B56]">404</p>
    <h1 className="mt-2 font-editorial text-5xl font-medium">Estancia no encontrada</h1>
    <p className="mt-3 max-w-md text-sm text-[#5C5349]">
      La ruta solicitada no está disponible. Regresa al inicio o explora nuestros 10 alojamientos
      en Peñafiel.
    </p>
    <div className="mt-7 flex gap-3">
      <Link
        to="/"
        className="rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE]"
      >
        Volver al Inicio
      </Link>
      <Link
        to="/alojamientos"
        className="rounded-full border border-[#1A1615] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1615]"
      >
        Ver Alojamientos
      </Link>
    </div>
  </main>
);

function AppContent() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();
  const isFullScreenMap = pathname === '/mapa-finca' || pathname === '/alojamientos/mapa';

  return (
    <div className="flex min-h-screen flex-col">
      {!isFullScreenMap && <LuxuryHeader onOpenBooking={() => setBookingOpen(true)} />}
      <div className="flex-1">
        <Routes>
          {/* Rutas Públicas Principales */}
          <Route path="/" element={<HomePage onOpenBooking={() => setBookingOpen(true)} />} />
          <Route path="/alojamientos" element={<AccommodationsPage />} />
          <Route
            path="/mapa-finca"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center bg-[#141110] font-technical text-xs uppercase tracking-[0.2em] text-[#C5A572]">
                    Cargando mapa interactivo 3D...
                  </div>
                }
              >
                <InteractiveMapPage />
              </Suspense>
            }
          />
          <Route
            path="/alojamientos/mapa"
            element={
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center bg-[#141110] font-technical text-xs uppercase tracking-[0.2em] text-[#C5A572]">
                    Cargando mapa interactivo 3D...
                  </div>
                }
              >
                <InteractiveMapPage />
              </Suspense>
            }
          />
          <Route path="/alojamientos/:slug" element={<AccommodationDetailPage />} />
          <Route path="/lafinca" element={<EstatePage />} />
          <Route path="/bodega" element={<WineryPage />} />
          <Route path="/catas" element={<TastingsPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/contacto" element={<ContactPage />} />

          {/* Motor de Reservas y Confirmación */}
          <Route path="/reserva-finca" element={<BookingPortalPage mode="finca" />} />
          <Route path="/reserva-muralla" element={<BookingPortalPage mode="muralla" />} />
          <Route path="/confirmacion.html" element={<BookingPortalPage mode="confirmacion" />} />
          <Route path="/confirmacion" element={<BookingPortalPage mode="confirmacion" />} />

          {/* Portal Digital de Huéspedes (11 rutas descubiertas por REA) */}
          <Route path="/huespedes" element={<GuestConciergePage view="huespedes" />} />
          <Route path="/muralla" element={<GuestConciergePage view="muralla" />} />
          <Route path="/check-in" element={<GuestConciergePage view="check-in" />} />
          <Route path="/normas" element={<GuestConciergePage view="normas" />} />
          <Route path="/clave-wifi" element={<GuestConciergePage view="clave-wifi" />} />
          <Route path="/restauracion" element={<GuestConciergePage view="restauracion" />} />
          <Route path="/tiendas" element={<GuestConciergePage view="tiendas" />} />
          <Route path="/transporte" element={<GuestConciergePage view="transporte" />} />
          <Route path="/penafiel" element={<GuestConciergePage view="penafiel" />} />
          <Route path="/catas-marcos" element={<GuestConciergePage view="catas-marcos" />} />
          <Route path="/catering" element={<GuestConciergePage view="catering" />} />

          {/* Legales */}
          <Route path="/cookies" element={<LegalPage type="cookies" />} />
          <Route path="/politica-privacidad" element={<LegalPage type="privacidad" />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isFullScreenMap && <LuxuryFooter />}
      <QuickBookingDrawer isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <EditionProvider>
      <WebGLProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </WebGLProvider>
    </EditionProvider>
  );
}

export default App;
