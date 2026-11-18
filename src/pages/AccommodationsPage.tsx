import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CalendarCheck, Compass, MapPin, ShieldCheck } from 'lucide-react';
import { ALOJAMIENTOS_PAGE_COPY, type Accommodation } from '../data/accommodations';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { AwwwardsAccommodationShowcase } from '../components/awwwards/AwwwardsAccommodationShowcase';
import { DirectBookingEngine } from '../components/awwwards/DirectBookingEngine';

export const AccommodationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const bookingSectionRef = useRef<HTMLElement | null>(null);

  const paramCasa = searchParams.get('casa') || undefined;
  const paramCheckIn = searchParams.get('checkIn') || undefined;
  const paramCheckOut = searchParams.get('checkOut') || undefined;
  const paramGuests = searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined;
  const paramEnv = searchParams.get('env');
  const paramCrib = searchParams.get('crib') === '1';

  const initialEnv: 'all' | 'finca' | 'muralla' =
    paramEnv === 'finca' || paramEnv === 'muralla' ? paramEnv : 'all';

  const [selectedCasaSlug, setSelectedCasaSlug] = useState<string | undefined>(paramCasa);

  useEffect(() => {
    if (paramCasa) {
      setSelectedCasaSlug(paramCasa);
    }
  }, [paramCasa]);

  useEffect(() => {
    if (hash === '#reservar' || paramCasa || paramCheckIn) {
      const timer = window.setTimeout(() => {
        bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [hash, paramCasa, paramCheckIn]);

  const scrollToBooking = (house?: Accommodation) => {
    if (house) {
      setSelectedCasaSlug(house.slug);
    }
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* Hero Editorial Alojamientos */}
      <section className="relative flex min-h-[50vh] sm:min-h-[58vh] items-end overflow-hidden bg-[#141110] pt-28 sm:pt-32 pb-12 sm:pb-14 text-[#F6F3EE]">
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
            <button
              type="button"
              onClick={() => scrollToBooking()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] shadow-lg transition hover:bg-[#631D2C] cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4 text-[#C5A572]" />
              Reservar Alojamiento
            </button>
            <Link
              to="/mapa-finca"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#C5A572]/60 bg-[#141110]/60 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] backdrop-blur transition hover:bg-[#C5A572] hover:text-[#141110]"
            >
              <Compass className="h-4 w-4 shrink-0" />
              Mapa 3D de la Finca
            </Link>
          </div>
        </div>
      </section>

      {/* Motor Intuitivo de Reserva Directa en Alojamientos */}
      <section
        id="reservar"
        ref={bookingSectionRef}
        className="scroll-mt-24 border-b border-[#D8CFC2] bg-[#EAE3D9]/55 py-10 sm:py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#4A1521]">
                Reserva Directa · Paso a Paso
              </p>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
                Elige fechas, estancia y confirma en 1 minuto
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#5C5349]">
              <ShieldCheck className="h-4 w-4 text-[#9A7B56]" />
              Sin comisiones · Mejor precio garantizado
            </span>
          </div>

          <DirectBookingEngine
            defaultOpen
            variant="page"
            initialEnvironment={initialEnv}
            initialHouseSlug={selectedCasaSlug}
            initialCheckIn={paramCheckIn}
            initialCheckOut={paramCheckOut}
            initialGuests={paramGuests}
            initialHasCrib={paramCrib}
          />
        </div>
      </section>

      {/* Catálogo Visual Interactivo de las 10 Estancias */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:px-8">
        <div className="mb-8">
          <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#9A7B56]">
            Nuestras 10 Estancias en Peñafiel
          </p>
          <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
            Explora cada casa al detalle
          </h2>
        </div>

        <AwwwardsAccommodationShowcase onBookHouse={(house) => scrollToBooking(house)} />

        {/* Introducción y Cartografía 3D */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center border-t border-[#D8CFC2] pt-12">
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
      </section>
    </main>
  );
};
