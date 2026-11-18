import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Compass, Menu, Phone, X } from 'lucide-react';
import { MAIN_NAV_LINKS } from '../../data/navigationTree';
import { ACCOMMODATIONS } from '../../data/accommodations';
import { SITE_METADATA } from '../../data/siteMetadata';

interface LuxuryHeaderProps {
  onOpenBooking: () => void;
}

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({ onOpenBooking }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [housesOpen, setHousesOpen] = useState(false);

  const hasDarkHero =
    location.pathname === '/' ||
    location.pathname === '/alojamientos' ||
    location.pathname === '/lafinca' ||
    location.pathname === '/catas' ||
    location.pathname === '/bodega' ||
    location.pathname === '/eventos';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHousesOpen(false);
  }, [location.pathname]);

  const useLightText = hasDarkHero && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || !hasDarkHero || mobileOpen
          ? 'border-b border-[#D8CFC2]/80 bg-[#F6F3EE]/95 text-[#1A1615] backdrop-blur-md shadow-sm'
          : 'bg-gradient-to-b from-[#141110]/80 via-[#141110]/40 to-transparent text-[#F6F3EE]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2.5 sm:gap-4 px-3.5 py-3 sm:px-6 sm:py-3.5 md:px-8">
        {/* Marca */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <img
            src={SITE_METADATA.assets.logoLight}
            alt="Finca Entreviñedos"
            className={`h-6 sm:h-8 w-auto transition-all ${
              useLightText ? 'brightness-0 invert' : 'brightness-0'
            }`}
          />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden items-center lg:gap-3.5 xl:gap-6 lg:flex" aria-label="Navegación principal">
          {MAIN_NAV_LINKS.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            if (item.path === '/alojamientos') {
              return (
                <div
                  key={item.path}
                  className="relative shrink-0"
                  onMouseEnter={() => setHousesOpen(true)}
                  onMouseLeave={() => setHousesOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive
                        ? useLightText
                          ? 'text-[#C5A572]'
                          : 'text-[#4A1521]'
                        : useLightText
                          ? 'text-[#F6F3EE]/90 hover:text-[#C5A572]'
                          : 'text-[#1A1615]/85 hover:text-[#4A1521]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>

                  {housesOpen && (
                    <div className="absolute left-0 top-full pt-3">
                      <div className="w-[460px] rounded-2xl border border-[#D8CFC2] bg-[#F6F3EE] p-5 text-[#1A1615] shadow-2xl">
                        <div className="mb-3 flex items-center justify-between border-b border-[#D8CFC2] pb-2">
                          <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#9A7B56]">
                            Nuestras 10 Estancias en Peñafiel
                          </span>
                          <Link
                            to="/alojamientos"
                            className="text-xs font-medium text-[#4A1521] hover:underline"
                          >
                            Explorar todas →
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ACCOMMODATIONS.map((acc) => (
                            <Link
                              key={acc.slug}
                              to={`/alojamientos/${acc.slug}`}
                              className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition hover:bg-[#EAE3D9]"
                            >
                              <span className="font-medium text-[#1A1615]">
                                {acc.name.replace(/^\d+\.\s*/, '')}
                              </span>
                              <span className="font-technical text-[10px] text-[#9A7B56]">
                                {acc.capacityLabel.replace(' Personas', 'p')}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-[#D8CFC2] pt-3">
                          <Link
                            to="/mapa-finca"
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#141110] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#C5A572] transition hover:bg-[#4A1521] hover:text-[#F6F3EE]"
                          >
                            <Compass className="h-3.5 w-3.5" />
                            Ver mapa interactivo de la finca
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  isActive
                    ? useLightText
                      ? 'text-[#C5A572]'
                      : 'text-[#4A1521]'
                    : useLightText
                      ? 'text-[#F6F3EE]/90 hover:text-[#C5A572]'
                      : 'text-[#1A1615]/85 hover:text-[#4A1521]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones Derecha Desktop */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE_METADATA.contact.primaryPhone}`}
            className={`hidden xl:inline-flex items-center gap-1.5 whitespace-nowrap font-technical text-xs transition ${
              useLightText
                ? 'text-[#F6F3EE]/90 hover:text-[#C5A572]'
                : 'text-[#5C5349] hover:text-[#4A1521]'
            }`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {SITE_METADATA.contact.primaryPhone}
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            data-cursor="RESERVAR"
            className="whitespace-nowrap rounded-full bg-[#4A1521] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C] cursor-pointer"
          >
            Reservar Estancia
          </button>
        </div>

        {/* Botón Menú Móvil / Tablet */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenBooking}
            className="whitespace-nowrap rounded-full bg-[#4A1521] px-3 sm:px-3.5 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F6F3EE] cursor-pointer"
          >
            Reservar
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border cursor-pointer ${
              useLightText
                ? 'border-white/30 bg-black/25 text-white'
                : 'border-[#D8CFC2] bg-white text-[#1A1615]'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil / Tablet Desplegable */}
      {mobileOpen && (
        <div className="border-t border-[#D8CFC2] bg-[#F6F3EE] px-4 sm:px-6 py-5 text-[#1A1615] lg:hidden max-h-[calc(100dvh-64px)] overflow-y-auto shadow-2xl">
          <nav className="flex flex-col gap-2">
            {MAIN_NAV_LINKS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between border-b border-[#D8CFC2]/60 py-2.5 font-editorial text-xl sm:text-2xl font-medium ${
                    isActive ? 'text-[#4A1521]' : 'text-[#1A1615]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#4A1521]" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5">
            <p className="mb-2 font-technical text-[10px] uppercase tracking-[0.2em] text-[#9A7B56]">
              Nuestras Estancias en Peñafiel
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {ACCOMMODATIONS.map((acc) => (
                <Link
                  key={acc.slug}
                  to={`/alojamientos/${acc.slug}`}
                  className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#D8CFC2] bg-white px-3 py-2 text-xs font-medium text-[#1A1615] hover:border-[#9A7B56]"
                >
                  <span>{acc.name.replace(/^\d+\.\s*/, '')}</span>
                  <span className="font-technical text-[10px] text-[#9A7B56]">
                    {acc.capacityLabel.replace(' Personas', ' pax')}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <Link
              to="/mapa-finca"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#4A1521]/30 bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#4A1521] transition hover:bg-[#EAE3D9]"
            >
              <Compass className="h-4 w-4" />
              Ver mapa interactivo de la finca
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full rounded-full bg-[#4A1521] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] cursor-pointer"
            >
              Reservar Estancia
            </button>
            <a
              href={`tel:${SITE_METADATA.contact.primaryPhone}`}
              className="flex items-center justify-center gap-2 py-2 font-technical text-xs text-[#4A1521]"
            >
              <Phone className="h-3.5 w-3.5" />
              {SITE_METADATA.contact.primaryPhoneFormatted}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
