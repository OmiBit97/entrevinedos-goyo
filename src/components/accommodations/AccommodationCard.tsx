import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accessibility,
  ArrowUpRight,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
} from 'lucide-react';
import type { Accommodation } from '../../data/accommodations';
import { OptimizedImage } from '../ui/OptimizedImage';

interface AccommodationCardProps {
  accommodation: Accommodation;
  priority?: boolean;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  priority = false,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const previewImages = accommodation.gallery.slice(0, 5);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSlideIdx((prev) => (prev + 1) % previewImages.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSlideIdx((prev) => (prev - 1 + previewImages.length) % previewImages.length);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8CFC2] bg-[#F6F3EE] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#9A7B56] hover:shadow-xl">
      {/* Visor Fotográfico con carrusel rápido */}
      <div className="relative overflow-hidden">
        <Link to={`/alojamientos/${accommodation.slug}`} className="block">
          <OptimizedImage
            src={previewImages[slideIdx] || accommodation.heroImage}
            alt={accommodation.shortDescription}
            aspectClassName="aspect-[16/10]"
            priority={priority}
            className="group-hover:scale-[1.03]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
          <span className="rounded-full border border-white/25 bg-[#141110]/70 px-3 py-1 font-technical text-[10px] uppercase tracking-[0.16em] text-[#F6F3EE] backdrop-blur-md">
            {accommodation.location === 'muralla' ? 'Alojamientos Muralla' : 'Entreviñedos'}
          </span>

          {accommodation.isPmrAdapted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#4A1521] px-2.5 py-1 text-[10px] font-medium text-[#F6F3EE] shadow">
              <Accessibility className="h-3 w-3" />
              Adaptado PMR
            </span>
          )}
        </div>

        {previewImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label={`Imagen anterior de ${accommodation.name}`}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#141110]/65 text-white opacity-100 lg:opacity-0 transition-opacity lg:group-hover:opacity-100 hover:bg-[#4A1521] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={`Imagen siguiente de ${accommodation.name}`}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#141110]/65 text-white opacity-100 lg:opacity-0 transition-opacity lg:group-hover:opacity-100 hover:bg-[#4A1521] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {previewImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === slideIdx ? 'w-5 bg-[#C5A572]' : 'w-1.5 bg-white/55'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Información Editorial de la Estancia */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#1A1615] group-hover:text-[#4A1521] transition-colors">
              <Link to={`/alojamientos/${accommodation.slug}`}>{accommodation.name}</Link>
            </h3>
            <span className="font-technical text-xs font-medium text-[#9A7B56]">
              {accommodation.roomsLabel}
            </span>
          </div>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#5C5349]">
            {accommodation.shortDescription}
          </p>

          {/* Especificaciones Técnicas */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-y border-[#D8CFC2]/80 py-3">
            <div className="flex items-center gap-1.5 text-xs text-[#1A1615]">
              <Maximize2 className="h-3.5 w-3.5 shrink-0 text-[#9A7B56]" />
              <span className="font-technical">{accommodation.areaLabel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#1A1615]">
              <Users className="h-3.5 w-3.5 shrink-0 text-[#9A7B56]" />
              <span>{accommodation.capacityLabel}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-start sm:items-center gap-1.5 border-t sm:border-t-0 border-[#D8CFC2]/60 pt-2 sm:pt-0 text-xs text-[#1A1615]">
              <BedDouble className="mt-0.5 sm:mt-0 h-3.5 w-3.5 shrink-0 text-[#9A7B56]" />
              <span className="sm:truncate" title={accommodation.bedsLabel}>
                {accommodation.bedsLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <Link
            to={`/alojamientos/${accommodation.slug}`}
            className="flex-1 rounded-full border border-[#1A1615] px-4 py-3 sm:py-2.5 text-center text-xs font-medium uppercase tracking-[0.14em] text-[#1A1615] transition hover:bg-[#1A1615] hover:text-[#F6F3EE]"
          >
            Ver Estancia
          </Link>
          <Link
            to={`${accommodation.bookingRoute}?casa=${accommodation.slug}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4A1521] px-4 py-3 sm:py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
          >
            Reservar
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
