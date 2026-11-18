import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Compass, MapPin } from 'lucide-react';
import { ALOJAMIENTOS_PAGE_COPY } from '../data/accommodations';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { AwwwardsAccommodationShowcase } from '../components/awwwards/AwwwardsAccommodationShowcase';

export const AccommodationsPage: React.FC = () => {
  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* Hero Editorial Alojamientos */}
      <section className="relative flex min-h-[54vh] sm:min-h-[64vh] items-end overflow-hidden bg-[#141110] pt-28 sm:pt-32 pb-12 sm:pb-16 text-[#F6F3EE]">
        <div className="absolute inset-0">
          <OptimizedImage
            src={ALOJAMIENTOS_PAGE_COPY.heroImages[0]}
            alt="Alojamientos Finca Entreviñedos en Peñafiel"
            aspectClassName="h-full w-full"
            priority
            className="opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/45 to-[#141110]/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="inline-flex items-center gap-2 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C5A572]">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {ALOJAMIENTOS_PAGE_COPY.subtitle}
          </p>
          <h1 className="mt-3 font-editorial text-4xl sm:text-5xl font-medium md:text-6xl lg:text-7xl">
            {ALOJAMIENTOS_PAGE_COPY.title}
          </h1>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl border-t border-white/15 pt-5">
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                Estancias
              </p>
              <p className="font-editorial text-xl sm:text-2xl font-medium">10 Casas</p>
            </div>
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                Superficie
              </p>
              <p className="font-editorial text-xl sm:text-2xl font-medium">30–120 m²</p>
            </div>
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                Capacidad
              </p>
              <p className="font-editorial text-xl sm:text-2xl font-medium">2–16 Huéspedes</p>
            </div>
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                Canal
              </p>
              <p className="font-editorial text-xl sm:text-2xl font-medium">Reserva Directa</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              to="/mapa-finca"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#C5A572] px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#141110] shadow-lg transition hover:bg-[#d8b885]"
            >
              <Compass className="h-4 w-4 shrink-0" />
              Ver mapa interactivo de la finca
            </Link>
            <Link
              to="/reserva-finca"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] shadow-lg transition hover:bg-[#631D2C]"
            >
              <CalendarCheck className="h-4 w-4 text-[#C5A572]" />
              {ALOJAMIENTOS_PAGE_COPY.reserveFincaLabel}
            </Link>
            <Link
              to="/reserva-muralla"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#C5A572]/60 bg-[#141110]/60 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] backdrop-blur transition hover:bg-[#C5A572] hover:text-[#141110]"
            >
              {ALOJAMIENTOS_PAGE_COPY.reserveMurallaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Introducción Completa + Acceso Mapa Interactivo + Atelier Interactivo */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            {ALOJAMIENTOS_PAGE_COPY.introParagraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-[#5C5349]">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3">
            <OptimizedImage
              src={ALOJAMIENTOS_PAGE_COPY.heroImages[1]}
              alt="Zonas exteriores y piscina en Finca Entreviñedos"
              aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
            />
            <OptimizedImage
              src={ALOJAMIENTOS_PAGE_COPY.heroImages[2]}
              alt="Interior arquitectónico de nuestros alojamientos"
              aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
            />
          </div>
        </div>

        {/* Cartografía Espacial 3D Dedicada */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-[#C5A572]/40 bg-[#141110] p-6 sm:p-8 text-[#F6F3EE] shadow-xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="inline-flex items-center gap-2 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C5A572]">
                <Compass className="h-3.5 w-3.5" />
                Cartografía 3D a Pantalla Completa · Móvil &amp; Desktop
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium">
                Explora la ubicación exacta de cada villa, bodega y piscina
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#D8CFC2]/85">
                Abre nuestro mapa espacial interactivo en una página independiente con gestos táctiles, vista 3D panorámica o plano cenital, luz solar de amanecer a noche y tour guiado por las 10 estancias.
              </p>
            </div>
            <Link
              to="/mapa-finca"
              className="inline-flex w-full md:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-[#C5A572] px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#141110] shadow-lg transition hover:bg-[#d8b885]"
            >
              <Compass className="h-4 w-4 shrink-0" />
              Ver mapa interactivo de la finca
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 pb-12">
          <AwwwardsAccommodationShowcase />
        </div>
      </section>
    </main>
  );
};
