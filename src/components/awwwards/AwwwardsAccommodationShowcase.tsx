import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accessibility,
  ArrowUpRight,
  BedDouble,
  Expand,
  MapPin,
  Maximize2,
  Sparkles,
  Users,
} from 'lucide-react';
import { ACCOMMODATIONS, type Accommodation } from '../../data/accommodations';
import {
  AccommodationFilterBar,
  type AccommodationFilters,
} from '../accommodations/AccommodationFilterBar';
import { LightboxGallery } from '../accommodations/LightboxGallery';
import { OptimizedImage } from '../ui/OptimizedImage';

interface AwwwardsAccommodationShowcaseProps {
  onBookHouse?: (house: Accommodation) => void;
}

export const AwwwardsAccommodationShowcase: React.FC<AwwwardsAccommodationShowcaseProps> = ({
  onBookHouse,
}) => {
  const [filters, setFilters] = useState<AccommodationFilters>({
    location: 'all',
    guests: 'all',
    pmrOnly: false,
    twoBathroomsOnly: false,
  });
  const [selectedSlug, setSelectedSlug] = useState<string>(ACCOMMODATIONS[0].slug);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [lightboxState, setLightboxState] = useState<{
    images: string[];
    title: string;
    index: number | null;
  }>({ images: [], title: '', index: null });

  const filtered = useMemo(() => {
    return ACCOMMODATIONS.filter((acc) => {
      if (filters.location !== 'all' && acc.location !== filters.location) return false;
      if (filters.pmrOnly && !acc.isPmrAdapted) return false;
      if (filters.twoBathroomsOnly && acc.bathroomsCount < 2) return false;
      if (filters.guests === '2-4' && acc.minGuests > 2) return false;
      if (filters.guests === '4-6' && (acc.maxGuests < 4 || acc.minGuests > 6)) return false;
      if (filters.guests === '6-8' && acc.maxGuests < 6) return false;
      return true;
    });
  }, [filters]);

  const activeHouse: Accommodation = useMemo(() => {
    const found = filtered.find((a) => a.slug === selectedSlug);
    return found || filtered[0] || ACCOMMODATIONS[0];
  }, [filtered, selectedSlug]);

  const atelierGallery = activeHouse.gallery.slice(0, 5);
  const safePhotoIdx = activePhotoIdx < atelierGallery.length ? activePhotoIdx : 0;

  const selectHouse = (slug: string) => {
    setSelectedSlug(slug);
    setActivePhotoIdx(0);
  };

  return (
    <div className="space-y-8">
      {/* Barra de Filtros */}
      <AccommodationFilterBar
        filters={filters}
        totalMatching={filtered.length}
        onChange={setFilters}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[#D8CFC2] bg-white p-10 text-center">
          <p className="font-editorial text-2xl text-[#1A1615]">
            Ninguna estancia coincide exactamente con todos los filtros combinados.
          </p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                location: 'all',
                guests: 'all',
                pmrOnly: false,
                twoBathroomsOnly: false,
              })
            }
            className="mt-4 rounded-full bg-[#4A1521] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] cursor-pointer"
          >
            Ver los 10 Alojamientos
          </button>
        </div>
      ) : (
        /* =========================================================================
           ATELIER INTERACTIVO (Selector Visual con Miniaturas + Escenario Sticky)
           ========================================================================= */
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12 lg:items-start">
          {/* Selector Visual Grid en Móvil y Tablet (< lg) sin scroll oculto */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 lg:hidden">
            {filtered.map((house) => {
              const isSelected = house.slug === activeHouse.slug;
              return (
                <button
                  key={house.slug}
                  type="button"
                  onClick={() => selectHouse(house.slug)}
                  className={`flex items-center gap-2 rounded-xl border p-2 text-left transition cursor-pointer min-w-0 ${
                    isSelected
                      ? 'border-[#4A1521] bg-[#141110] text-[#F6F3EE] shadow-sm'
                      : 'border-[#D8CFC2] bg-white text-[#1A1615] hover:border-[#9A7B56]'
                  }`}
                >
                  <img
                    src={house.heroImage}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-10 w-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-editorial text-sm font-semibold leading-tight truncate">
                      {house.name.replace(/^\d+\.\s*/, '')}
                    </p>
                    <p
                      className={`font-technical text-[10px] truncate ${
                        isSelected ? 'text-[#C5A572]' : 'text-[#5C5349]'
                      }`}
                    >
                      {house.capacityLabel.replace(' Personas', ' pax')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Columna Izquierda (Desktop): Tarjetas Visuales del Atelier */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-2.5">
            {filtered.map((house) => {
              const isSelected = house.slug === activeHouse.slug;
              return (
                <button
                  key={house.slug}
                  type="button"
                  onMouseEnter={() => selectHouse(house.slug)}
                  onClick={() => selectHouse(house.slug)}
                  data-cursor="EXPLORAR"
                  className={`group flex w-full items-center justify-between gap-3.5 rounded-2xl border p-3 text-left transition-all duration-300 ease-atelier cursor-pointer ${
                    isSelected
                      ? 'border-[#4A1521] bg-[#141110] text-[#F6F3EE] shadow-lg translate-x-1'
                      : 'border-[#D8CFC2] bg-white text-[#1A1615] hover:border-[#9A7B56] hover:bg-[#EAE3D9]/45'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-black/10">
                      <img
                        src={house.heroImage}
                        alt={house.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-editorial text-2xl font-medium tracking-tight truncate">
                        {house.name.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <p
                        className={`mt-0.5 flex flex-wrap items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.12em] ${
                          isSelected ? 'text-[#C5A572]' : 'text-[#5C5349]'
                        }`}
                      >
                        <span>{house.location === 'muralla' ? 'La Muralla' : 'Entre Viñedos'}</span>
                        <span>·</span>
                        <span>{house.areaLabel}</span>
                        <span>·</span>
                        <span>{house.capacityLabel}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 pr-1">
                    {house.isPmrAdapted && (
                      <span
                        title="Adaptado PMR"
                        className={`rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-wider ${
                          isSelected
                            ? 'bg-[#C5A572] text-[#141110]'
                            : 'bg-[#4A1521] text-[#F6F3EE]'
                        }`}
                      >
                        PMR
                      </span>
                    )}
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isSelected
                          ? 'text-[#C5A572] translate-x-0.5 -translate-y-0.5'
                          : 'text-[#9A7B56] opacity-40 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Columna Derecha: Escenario Cinematográfico Sticky de la Estancia Activa */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <article className="overflow-hidden rounded-3xl border border-[#D8CFC2] bg-white shadow-xl">
              {/* Visor Principal de 5 Fotos */}
              <div className="relative bg-[#141110]">
                <OptimizedImage
                  src={atelierGallery[safePhotoIdx] || activeHouse.heroImage}
                  alt={`${activeHouse.name} - vista principal`}
                  aspectClassName="aspect-[16/10]"
                  priority
                  className="cursor-zoom-in"
                  onClick={() =>
                    setLightboxState({
                      images: activeHouse.gallery,
                      title: activeHouse.name,
                      index: safePhotoIdx,
                    })
                  }
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-4 sm:p-5 bg-gradient-to-b from-[#141110]/70 to-transparent">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A572]/50 bg-[#141110]/75 px-3.5 py-1 font-technical text-[10px] uppercase tracking-[0.18em] text-[#C5A572] backdrop-blur-md">
                    <MapPin className="h-3 w-3" />
                    {activeHouse.location === 'muralla' ? 'Casco Histórico' : 'Entre Viñedos'}
                  </span>

                  <div className="flex items-center gap-2">
                    {activeHouse.isPmrAdapted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#4A1521] px-3 py-1 font-technical text-[10px] uppercase tracking-wider text-[#F6F3EE]">
                        <Accessibility className="h-3 w-3" />
                        Adaptado PMR
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxState({
                          images: activeHouse.gallery,
                          title: activeHouse.name,
                          index: safePhotoIdx,
                        })
                      }
                      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#141110]/75 px-3 py-1 font-technical text-[10px] uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-[#4A1521] cursor-pointer"
                    >
                      <Expand className="h-3 w-3 text-[#C5A572]" />
                      {activeHouse.gallery.length} fotos
                    </button>
                  </div>
                </div>

                {/* Tira Proporcional de Miniaturas (encaja al 100% sin cortes) */}
                {atelierGallery.length > 1 && (
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2 border-t border-white/10 bg-[#141110] p-2 sm:p-3">
                    {atelierGallery.map((imgUrl, idx) => (
                      <button
                        key={imgUrl + idx}
                        type="button"
                        onClick={() => setActivePhotoIdx(idx)}
                        data-cursor="FOTO"
                        aria-label={`Ver fotografía ${idx + 1} de ${activeHouse.name}`}
                        className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg border-2 transition cursor-pointer ${
                          idx === safePhotoIdx
                            ? 'border-[#C5A572] opacity-100'
                            : 'border-transparent opacity-50 hover:opacity-90'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Ficha Técnica Editorial */}
              <div className="p-5 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.2em] text-[#9A7B56]">
                      <MapPin className="h-3 w-3 text-[#4A1521]" />
                      {activeHouse.locationLabel}
                    </p>
                    <h3 className="mt-1 font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
                      {activeHouse.name.replace(/^\d+\.\s*/, '')}
                    </h3>
                  </div>
                  <span className="rounded-full border border-[#D8CFC2] bg-[#F6F3EE] px-3.5 py-1 font-technical text-xs text-[#4A1521]">
                    {activeHouse.roomsLabel}
                  </span>
                </div>

                <p className="text-sm sm:text-[15px] leading-relaxed text-[#5C5349]">
                  {activeHouse.shortDescription}
                </p>

                {/* Blueprint especificaciones */}
                <div className="grid grid-cols-2 sm:grid-cols-12 gap-3 rounded-2xl border border-[#D8CFC2] bg-[#F6F3EE] p-3.5 sm:p-4">
                  <div className="sm:col-span-3 min-w-0">
                    <span className="flex items-center gap-1 font-technical text-[9px] uppercase tracking-widest text-[#9A7B56]">
                      <Maximize2 className="h-3 w-3 shrink-0 text-[#4A1521]" />
                      Superficie
                    </span>
                    <p className="mt-1 font-editorial text-lg font-semibold text-[#1A1615]">
                      {activeHouse.areaLabel}
                    </p>
                  </div>
                  <div className="sm:col-span-4 min-w-0">
                    <span className="flex items-center gap-1 font-technical text-[9px] uppercase tracking-widest text-[#9A7B56]">
                      <Users className="h-3 w-3 shrink-0 text-[#4A1521]" />
                      Capacidad
                    </span>
                    <p className="mt-1 font-editorial text-lg font-semibold text-[#1A1615]">
                      {activeHouse.capacityLabel}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-5 min-w-0">
                    <span className="flex items-center gap-1 font-technical text-[9px] uppercase tracking-widest text-[#9A7B56]">
                      <BedDouble className="h-3 w-3 shrink-0 text-[#4A1521]" />
                      Distribución de Camas
                    </span>
                    <p className="mt-1 font-editorial text-base font-semibold leading-snug text-[#1A1615]">
                      {activeHouse.bedsLabel}
                    </p>
                  </div>
                </div>

                {/* Chips de Servicios */}
                <div className="flex flex-wrap gap-2">
                  {activeHouse.amenities.slice(0, 6).map((am) => (
                    <span
                      key={am.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D8CFC2] bg-[#EAE3D9]/45 px-3 py-1 text-[11px] font-medium text-[#1A1615]"
                    >
                      <img
                        src={am.iconUrl}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-3.5 w-3.5 object-contain opacity-80"
                      />
                      {am.label}
                    </span>
                  ))}
                  {activeHouse.amenities.length > 6 && (
                    <span className="inline-flex items-center rounded-full bg-[#EAE3D9]/70 px-3 py-1 font-technical text-[10px] text-[#5C5349]">
                      +{activeHouse.amenities.length - 6} más
                    </span>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to={`/alojamientos/${activeHouse.slug}`}
                    data-cursor="VER FICHA"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#1A1615] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1615] transition hover:bg-[#1A1615] hover:text-[#F6F3EE]"
                  >
                    Descubrir Estancia Completa
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {onBookHouse ? (
                    <button
                      type="button"
                      onClick={() => onBookHouse(activeHouse)}
                      data-cursor="RESERVAR"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C] cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A572]" />
                      Reservar esta Estancia
                    </button>
                  ) : (
                    <Link
                      to={`/alojamientos?casa=${activeHouse.slug}#reservar`}
                      data-cursor="RESERVAR"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C]"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A572]" />
                      Reservar esta Estancia
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      <LightboxGallery
        images={lightboxState.images}
        activeIndex={lightboxState.index}
        title={lightboxState.title}
        onClose={() => setLightboxState((prev) => ({ ...prev, index: null }))}
        onChangeIndex={(idx) => setLightboxState((prev) => ({ ...prev, index: idx }))}
      />
    </div>
  );
};
