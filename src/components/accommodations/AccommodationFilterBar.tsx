import React from 'react';
import { Accessibility, MapPin, Sparkles, Users } from 'lucide-react';

export interface AccommodationFilters {
  location: 'all' | 'finca' | 'muralla';
  guests: 'all' | '2-4' | '4-6' | '6-8';
  pmrOnly: boolean;
  twoBathroomsOnly: boolean;
}

interface AccommodationFilterBarProps {
  filters: AccommodationFilters;
  totalMatching: number;
  onChange: (next: AccommodationFilters) => void;
}

export const AccommodationFilterBar: React.FC<AccommodationFilterBarProps> = ({
  filters,
  totalMatching,
  onChange,
}) => {
  return (
    <div className="rounded-2xl border border-[#D8CFC2] bg-[#EAE3D9]/65 p-4 sm:p-6 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-12 xl:items-start">
        {/* Selector de Entorno */}
        <div className="space-y-2 md:col-span-2 xl:col-span-5">
          <span className="flex items-center gap-1.5 font-technical text-[11px] uppercase tracking-[0.18em] text-[#5C5349]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#4A1521]" />
            Entorno de Estancia
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'Todas las Estancias (10)' },
              { id: 'finca', label: 'Finca entre Viñedos (1–8)' },
              { id: 'muralla', label: 'Casco Histórico · La Muralla (I & II)' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    location: opt.id as AccommodationFilters['location'],
                  })
                }
                className={`rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  filters.location === opt.id
                    ? 'bg-[#4A1521] text-[#F6F3EE] shadow-sm'
                    : 'border border-[#D8CFC2] bg-[#F6F3EE] text-[#1A1615] hover:border-[#9A7B56]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Capacidad */}
        <div className="space-y-2 xl:col-span-4">
          <span className="flex items-center gap-1.5 font-technical text-[11px] uppercase tracking-[0.18em] text-[#5C5349]">
            <Users className="h-3.5 w-3.5 shrink-0 text-[#4A1521]" />
            Capacidad de Huéspedes
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'Cualquier capacidad' },
              { id: '2-4', label: '2 a 4 Personas' },
              { id: '4-6', label: '4 a 6 Personas' },
              { id: '6-8', label: '6 a 8 Personas' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    guests: opt.id as AccommodationFilters['guests'],
                  })
                }
                className={`rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  filters.guests === opt.id
                    ? 'bg-[#1A1615] text-[#F6F3EE]'
                    : 'border border-[#D8CFC2] bg-[#F6F3EE] text-[#1A1615] hover:border-[#9A7B56]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Atributos Especiales */}
        <div className="space-y-2 xl:col-span-3">
          <span className="flex items-center gap-1.5 font-technical text-[11px] uppercase tracking-[0.18em] text-[#5C5349]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#4A1521]" />
            Confort Específico
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...filters, pmrOnly: !filters.pmrOnly })}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                filters.pmrOnly
                  ? 'bg-[#4A1521] text-[#F6F3EE]'
                  : 'border border-[#D8CFC2] bg-[#F6F3EE] text-[#1A1615] hover:border-[#9A7B56]'
              }`}
            >
              <Accessibility className="h-3.5 w-3.5" />
              Adaptado PMR
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({ ...filters, twoBathroomsOnly: !filters.twoBathroomsOnly })
              }
              className={`rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                filters.twoBathroomsOnly
                  ? 'bg-[#4A1521] text-[#F6F3EE]'
                  : 'border border-[#D8CFC2] bg-[#F6F3EE] text-[#1A1615] hover:border-[#9A7B56]'
              }`}
            >
              2 Baños / Suite
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D8CFC2]/80 pt-3.5">
        <p className="text-xs text-[#5C5349]">
          Mostrando <strong className="font-semibold text-[#1A1615]">{totalMatching}</strong>{' '}
          {totalMatching === 1 ? 'alojamiento disponible' : 'alojamientos disponibles'} con tus
          criterios.
        </p>
        {(filters.location !== 'all' ||
          filters.guests !== 'all' ||
          filters.pmrOnly ||
          filters.twoBathroomsOnly) && (
          <button
            type="button"
            onClick={() =>
              onChange({
                location: 'all',
                guests: 'all',
                pmrOnly: false,
                twoBathroomsOnly: false,
              })
            }
            className="text-xs font-medium text-[#4A1521] underline underline-offset-4 hover:text-[#631D2C] cursor-pointer"
          >
            Restablecer filtros
          </button>
        )}
      </div>
    </div>
  );
};
