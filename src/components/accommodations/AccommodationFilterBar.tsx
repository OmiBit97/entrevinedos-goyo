import React from 'react';
import { Accessibility, RotateCcw, Users } from 'lucide-react';

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
  const hasActiveFilter =
    filters.location !== 'all' ||
    filters.guests !== 'all' ||
    filters.pmrOnly ||
    filters.twoBathroomsOnly;

  return (
    <div className="flex flex-col gap-3 border-b border-[#D8CFC2] pb-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Pestañas mínimas de entorno */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: 'all', label: 'Todas (10)' },
          { id: 'finca', label: 'Entre Viñedos (8)' },
          { id: 'muralla', label: 'La Muralla (2)' },
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
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              filters.location === opt.id
                ? 'bg-[#4A1521] text-[#F6F3EE] shadow-sm'
                : 'border border-[#D8CFC2] bg-white/80 text-[#1A1615] hover:border-[#9A7B56]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Controles compactos a la derecha */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-1.5 rounded-full border border-[#D8CFC2] bg-white/80 px-3 py-1.5 text-xs text-[#1A1615]">
          <Users className="h-3.5 w-3.5 text-[#9A7B56]" />
          <select
            aria-label="Filtrar por capacidad"
            value={filters.guests}
            onChange={(e) =>
              onChange({
                ...filters,
                guests: e.target.value as AccommodationFilters['guests'],
              })
            }
            className="bg-transparent text-xs font-medium text-[#1A1615] focus:outline-none cursor-pointer"
          >
            <option value="all">Cualquier capacidad</option>
            <option value="2-4">2–4 personas</option>
            <option value="4-6">4–6 personas</option>
            <option value="6-8">6–8 personas</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => onChange({ ...filters, pmrOnly: !filters.pmrOnly })}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
            filters.pmrOnly
              ? 'bg-[#4A1521] text-[#F6F3EE]'
              : 'border border-[#D8CFC2] bg-white/80 text-[#1A1615] hover:border-[#9A7B56]'
          }`}
        >
          <Accessibility className="h-3.5 w-3.5" />
          PMR
        </button>

        <span className="font-technical text-[11px] text-[#5C5349] px-1">
          {totalMatching} {totalMatching === 1 ? 'estancia' : 'estancias'}
        </span>

        {hasActiveFilter && (
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
            aria-label="Restablecer filtros"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#4A1521] hover:bg-[#EAE3D9] transition cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
