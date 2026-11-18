import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Phone, Users, X } from 'lucide-react';
import { ACCOMMODATIONS } from '../../data/accommodations';
import { SITE_METADATA } from '../../data/siteMetadata';
import { OptimizedImage } from '../ui/OptimizedImage';

interface QuickBookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickBookingDrawer: React.FC<QuickBookingDrawerProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<number>(4);
  const [zone, setZone] = useState<'all' | 'finca' | 'muralla'>('all');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const matchingHouses = useMemo(() => {
    return ACCOMMODATIONS.filter((acc) => {
      if (zone !== 'all' && acc.location !== zone) return false;
      if (guests > 8) return acc.location === 'muralla' || acc.maxGuests >= 6;
      return guests >= 1 && guests <= acc.maxGuests;
    });
  }, [guests, zone]);

  const buildBookingUrl = (casaSlug?: string) => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', String(guests));
    if (zone !== 'all') params.set('env', zone);
    if (casaSlug) params.set('casa', casaSlug);
    return `/alojamientos?${params.toString()}#reservar`;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Conserje de Reserva de Alojamientos"
      className="fixed inset-0 z-50 flex justify-end bg-[#141110]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-dvh w-full max-w-xl flex-col justify-between overflow-y-auto bg-[#F6F3EE] text-[#1A1615] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-[#D8CFC2] px-4 sm:px-6 py-4 sm:py-5 bg-[#EAE3D9]/50">
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-[0.22em] text-[#9A7B56]">
                Conserje de Estancias · Peñafiel
              </p>
              <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#1A1615]">
                Reserva tu Alojamiento
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel de reserva"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8CFC2] bg-[#F6F3EE] text-[#1A1615] transition hover:border-[#4A1521] hover:text-[#4A1521] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Controles de Selección sin fricción */}
          <div className="space-y-4 sm:space-y-5 border-b border-[#D8CFC2] p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#5C5349]">
                  <Calendar className="h-3.5 w-3.5 text-[#4A1521]" />
                  Fecha de Entrada
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="min-h-[44px] w-full rounded-xl border border-[#D8CFC2] bg-white px-3.5 py-2.5 text-sm text-[#1A1615] focus:border-[#4A1521] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#5C5349]">
                  <Calendar className="h-3.5 w-3.5 text-[#4A1521]" />
                  Fecha de Salida
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="min-h-[44px] w-full rounded-xl border border-[#D8CFC2] bg-white px-3.5 py-2.5 text-sm text-[#1A1615] focus:border-[#4A1521] focus:outline-none"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#5C5349]">
                  <Users className="h-3.5 w-3.5 text-[#4A1521]" />
                  Huéspedes
                </span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="min-h-[44px] w-full rounded-xl border border-[#D8CFC2] bg-white px-3.5 py-2.5 text-sm text-[#1A1615] focus:border-[#4A1521] focus:outline-none cursor-pointer"
                >
                  {[2, 4, 6, 8, 12, 16].map((num) => (
                    <option key={num} value={num}>
                      {num === 16 ? 'Hasta 16 (Muralla I+II)' : `${num} personas`}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#5C5349]">
                  <MapPin className="h-3.5 w-3.5 text-[#4A1521]" />
                  Entorno
                </span>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as 'all' | 'finca' | 'muralla')}
                  className="min-h-[44px] w-full rounded-xl border border-[#D8CFC2] bg-white px-3.5 py-2.5 text-sm text-[#1A1615] focus:border-[#4A1521] focus:outline-none cursor-pointer"
                >
                  <option value="all">Toda la Finca (10)</option>
                  <option value="finca">Entre Viñedos (8)</option>
                  <option value="muralla">La Muralla (2)</option>
                </select>
              </label>
            </div>
          </div>

          {/* Listado Recomendado */}
          <div className="p-4 sm:p-6 space-y-3">
            <p className="font-technical text-[11px] uppercase tracking-[0.18em] text-[#5C5349]">
              Estancias recomendadas ({matchingHouses.length})
            </p>
            {matchingHouses.map((house) => (
              <div
                key={house.slug}
                className="flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl border border-[#D8CFC2] bg-white p-3 transition hover:border-[#9A7B56]"
              >
                <OptimizedImage
                  src={house.heroImage}
                  alt={house.name}
                  aspectClassName="h-20 w-20 sm:w-24 shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-editorial text-lg font-semibold text-[#1A1615]">
                    {house.name}
                  </h3>
                  <p className="font-technical text-[11px] text-[#9A7B56]">
                    {house.areaLabel} · {house.capacityLabel} · {house.roomsLabel}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <Link
                      to={`/alojamientos/${house.slug}`}
                      onClick={onClose}
                      className="text-xs font-medium text-[#1A1615] underline underline-offset-4 hover:text-[#4A1521]"
                    >
                      Ver ficha
                    </Link>
                    <Link
                      to={buildBookingUrl(house.slug)}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 rounded-full bg-[#4A1521] px-3 py-1.5 text-[11px] font-medium text-[#F6F3EE] hover:bg-[#631D2C]"
                    >
                      Reservar
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer de acción directa */}
        <div className="border-t border-[#D8CFC2] bg-[#EAE3D9]/70 p-4 sm:p-6 space-y-3">
          <Link
            to={buildBookingUrl()}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4A1521] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
          >
            Continuar reserva en Alojamientos
            <ArrowRight className="h-4 w-4 text-[#C5A572]" />
          </Link>
          <a
            href={`tel:${SITE_METADATA.contact.primaryPhone}`}
            className="flex flex-wrap items-center justify-center gap-2 text-center text-xs text-[#5C5349] hover:text-[#4A1521]"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>
              Atención directa: {SITE_METADATA.contact.primaryPhoneFormatted} |{' '}
              {SITE_METADATA.contact.secondaryPhoneFormatted}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
