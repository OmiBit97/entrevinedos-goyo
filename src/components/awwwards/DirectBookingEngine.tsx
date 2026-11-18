import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  KeyRound,
  MapPin,
  Maximize2,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Wine,
  X,
  Zap,
} from 'lucide-react';
import { ACCOMMODATIONS, type Accommodation } from '../../data/accommodations';
import { SITE_METADATA } from '../../data/siteMetadata';
import { OptimizedImage } from '../ui/OptimizedImage';

type EnvironmentOption = 'all' | 'finca' | 'muralla';
type PaymentMethod = 'card-sim' | 'bizum-sim' | 'at-property';

export interface DirectBookingEngineProps {
  defaultOpen?: boolean;
  initialEnvironment?: EnvironmentOption;
  initialHouseSlug?: string;
  variant?: 'hero' | 'page';
}

function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDefaultDates(): { checkIn: string; checkOut: string } {
  const now = new Date();
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);
  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);
  return {
    checkIn: formatIsoDate(friday),
    checkOut: formatIsoDate(sunday),
  };
}

function computeNights(inDate: string, outDate: string): number {
  if (!inDate || !outDate) return 2;
  const start = new Date(`${inDate}T12:00:00`);
  const end = new Date(`${outDate}T12:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff >= 1 ? diff : 2;
}

function getSimulatedNightlyRate(acc: Accommodation): number {
  const ratesBySlug: Record<string, number> = {
    malbec: 175,
    merlot: 175,
    'bodegas-marcos': 240,
    tempranillo: 195,
    verdejo: 130,
    garnacha: 130,
    'cabernet-sauvignon': 175,
    albillo: 135,
    'la-muralla-i': 225,
    'la-muralla-ii': 280,
  };
  return ratesBySlug[acc.slug] ?? Math.max(130, Math.min(280, Math.round(acc.areaSqm * 2.4)));
}

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; detail: string }[] = [
  {
    id: 'card-sim',
    label: 'Tarjeta Bancaria Simulada · **** 4242',
    detail: 'Solo garantía sin cargo inmediato',
  },
  {
    id: 'bizum-sim',
    label: 'Bizum / Transferencia Simulada',
    detail: 'Confirmación instantánea en modo prueba',
  },
  {
    id: 'at-property',
    label: 'Pago en Finca a la llegada',
    detail: 'Abono directo en recepción al realizar check-in',
  },
];

export const DirectBookingEngine: React.FC<DirectBookingEngineProps> = ({
  defaultOpen = false,
  initialEnvironment = 'all',
  initialHouseSlug,
  variant = 'hero',
}) => {
  const defaults = useMemo(() => getDefaultDates(), []);
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState<number>(4);
  const [hasInfantCrib, setHasInfantCrib] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<EnvironmentOption>(initialEnvironment);

  const [panelOpen, setPanelOpen] = useState<boolean>(defaultOpen);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedHouseSlug, setSelectedHouseSlug] = useState<string | null>(
    initialHouseSlug || null,
  );
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Extras
  const [extraTasting, setExtraTasting] = useState<boolean>(false);
  const [extraLateCheckout, setExtraLateCheckout] = useState<boolean>(false);

  // Datos del huésped (Paso 2)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalSlot, setArrivalSlot] = useState<'12:00-14:00' | '17:00-22:00'>('17:00-22:00');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card-sim');
  const [notes, setNotes] = useState('');

  // Localizador simulado (Paso 3)
  const [locatorCode, setLocatorCode] = useState('');

  useEffect(() => {
    setEnvironment(initialEnvironment);
  }, [initialEnvironment]);

  useEffect(() => {
    if (initialHouseSlug) {
      const target = ACCOMMODATIONS.find((a) => a.slug === initialHouseSlug);
      if (target) {
        setSelectedHouseSlug(target.slug);
        if (guests > target.maxGuests) {
          setGuests(Math.min(4, target.maxGuests));
        }
        setPanelOpen(true);
      }
    }
  }, [initialHouseSlug]);

  const nights = useMemo(() => computeNights(checkIn, checkOut), [checkIn, checkOut]);

  const availableHouses = useMemo(() => {
    return ACCOMMODATIONS.filter((acc) => {
      if (environment !== 'all' && acc.location !== environment) return false;
      if (guests > 8) return acc.location === 'muralla' || acc.maxGuests >= 6;
      return guests >= 1 && guests <= acc.maxGuests;
    });
  }, [environment, guests]);

  const selectedHouse = useMemo(
    () =>
      ACCOMMODATIONS.find((a) => a.slug === selectedHouseSlug) ||
      availableHouses[0] ||
      ACCOMMODATIONS[0],
    [selectedHouseSlug, availableHouses],
  );

  const nightlyRate = getSimulatedNightlyRate(selectedHouse);
  const staySubtotal = nightlyRate * nights;
  const tastingCost = extraTasting ? 25 * guests : 0;
  const lateCheckoutCost = extraLateCheckout ? 30 : 0;
  const totalPrice = staySubtotal + tastingCost + lateCheckoutCost;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
    if (!selectedHouseSlug || !availableHouses.some((h) => h.slug === selectedHouseSlug)) {
      setSelectedHouseSlug(availableHouses[0]?.slug ?? ACCOMMODATIONS[0].slug);
    }
    setPanelOpen(true);
    window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  };

  const handleCheckInChange = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);
    if (nextCheckIn && checkOut && nextCheckIn >= checkOut) {
      const next = new Date(`${nextCheckIn}T12:00:00`);
      next.setDate(next.getDate() + 2);
      setCheckOut(formatIsoDate(next));
    }
  };

  const fillDemoData = () => {
    setFullName('Elena García Mendoza');
    setEmail('elena.garcia@ejemplo.es');
    setPhone('+34 625 000 111');
    setArrivalSlot('17:00-22:00');
    setPaymentMethod('card-sim');
    setNotes('Reserva de prueba interactiva · Llegada aproximada a las 18:30 h.');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setLocatorCode(`FEV-${new Date().getFullYear()}-${randomNum}`);
    setStep(3);
  };

  return (
    <div className="mx-auto w-full max-w-6xl text-left">
      {/* BARRA DE BÚSQUEDA DIRECTA */}
      <form
        onSubmit={handleSearchSubmit}
        className={`rounded-3xl border border-[#C5A572]/45 bg-[#141110]/90 p-3.5 sm:p-5 backdrop-blur-xl ${
          variant === 'page' ? 'shadow-xl' : 'shadow-[0_24px_60px_rgba(0,0,0,0.45)]'
        }`}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-12 xl:items-end">
          {/* Fecha de Entrada */}
          <label className="min-w-0 xl:col-span-3 block rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 focus-within:border-[#C5A572]">
            <span className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#C5A572]">
              <Calendar className="h-3 w-3 shrink-0" />
              Entrada (Check-In)
            </span>
            <input
              type="date"
              required
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="mt-1 w-full bg-transparent font-technical text-xs sm:text-sm text-[#F6F3EE] focus:outline-none [color-scheme:dark]"
            />
          </label>

          {/* Fecha de Salida */}
          <label className="min-w-0 xl:col-span-3 block rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 focus-within:border-[#C5A572]">
            <span className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#C5A572]">
              <Calendar className="h-3 w-3 shrink-0" />
              Salida ({nights} {nights === 1 ? 'noche' : 'noches'})
            </span>
            <input
              type="date"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 w-full bg-transparent font-technical text-xs sm:text-sm text-[#F6F3EE] focus:outline-none [color-scheme:dark]"
            />
          </label>

          {/* Huéspedes */}
          <label className="min-w-0 xl:col-span-2 block rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 focus-within:border-[#C5A572]">
            <span className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#C5A572]">
              <Users className="h-3 w-3 shrink-0" />
              Huéspedes
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 w-full bg-transparent font-technical text-xs sm:text-sm text-[#F6F3EE] focus:outline-none cursor-pointer [&>option]:bg-[#141110]"
            >
              {[2, 4, 6, 8, 12, 16].map((n) => (
                <option key={n} value={n}>
                  {n === 16 ? 'Hasta 16' : `${n} Personas`}
                </option>
              ))}
            </select>
          </label>

          {/* Entorno */}
          <label className="min-w-0 xl:col-span-2 block rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 focus-within:border-[#C5A572]">
            <span className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.18em] text-[#C5A572]">
              <MapPin className="h-3 w-3 shrink-0" />
              Entorno
            </span>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as EnvironmentOption)}
              className="mt-1 w-full bg-transparent font-technical text-xs sm:text-sm text-[#F6F3EE] focus:outline-none cursor-pointer [&>option]:bg-[#141110]"
            >
              <option value="all">Toda la Finca</option>
              <option value="finca">Entre Viñedos</option>
              <option value="muralla">La Muralla</option>
            </select>
          </label>

          {/* CTA Buscar Disponibilidad */}
          <div className="sm:col-span-2 xl:col-span-2 min-w-0">
            <button
              type="submit"
              className="flex h-full min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#4A1521] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-lg transition hover:bg-[#631D2C] cursor-pointer"
            >
              <span>Disponibilidad</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#C5A572]" />
            </button>
          </div>
        </div>

        {/* Sub-barra de confianza e info rápida */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-[#D8CFC2]/80">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[#C5A572]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Motor directo propio · Sin comisiones · Simulación interactiva
            </span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasInfantCrib}
                onChange={(e) => setHasInfantCrib(e.target.checked)}
                className="accent-[#C5A572]"
              />
              <span>Viajo con menor &lt; 2 años (Cuna gratis)</span>
            </label>
          </div>
          {panelOpen && (
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="inline-flex items-center gap-1 font-technical text-[10px] uppercase tracking-wider text-[#C5A572] hover:text-white cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Cerrar motor
            </button>
          )}
        </div>
      </form>

      {/* =========================================================================
          PANEL INTERACTIVO IN-SITU DEL MOTOR INTERNO (PASOS 1 · 2 · 3)
          ========================================================================= */}
      {panelOpen && (
        <div
          ref={panelRef}
          id="motor-reserva-interno"
          className="scroll-mt-24 mt-4 overflow-hidden rounded-3xl border border-[#C5A572]/40 bg-[#F6F3EE] text-[#1A1615] shadow-2xl"
        >
          {/* Cabecera del Motor con Progreso */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CFC2] bg-[#EAE3D9]/75 px-5 sm:px-7 py-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#4A1521]">
                Reserva Directa Finca Entreviñedos
              </span>
              <span className="hidden sm:inline text-[#9A7B56]">·</span>
              <span className="font-technical display-numeral text-xs text-[#5C5349]">
                {checkIn} → {checkOut} ({nights} {nights === 1 ? 'noche' : 'noches'}) · {guests} pers.
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-technical text-[10px] font-semibold ${
                    step === n
                      ? 'bg-[#4A1521] text-[#F6F3EE]'
                      : step > n
                        ? 'bg-[#C5A572] text-[#141110]'
                        : 'border border-[#D8CFC2] bg-white text-[#5C5349]'
                  }`}
                >
                  {step > n ? '✓' : n}
                </span>
              ))}
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar resultados de reserva"
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CFC2] bg-white text-[#1A1615] hover:border-[#4A1521] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PASO 1: SELECCIÓN DE ESTANCIA + EXTRAS */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-6 p-4 sm:p-7 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-3 lg:max-h-[460px] lg:overflow-y-auto lg:pr-1">
                <p className="font-technical text-[11px] uppercase tracking-[0.18em] text-[#5C5349]">
                  Estancias disponibles para tus fechas ({availableHouses.length})
                </p>

                {availableHouses.map((house) => {
                  const rate = getSimulatedNightlyRate(house);
                  const stayTotal = rate * nights;
                  const isSelected = house.slug === selectedHouse.slug;
                  return (
                    <div
                      key={house.slug}
                      onClick={() => setSelectedHouseSlug(house.slug)}
                      className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border p-3.5 transition cursor-pointer ${
                        isSelected
                          ? 'border-[#4A1521] bg-white shadow-md ring-1 ring-[#4A1521]/20'
                          : 'border-[#D8CFC2] bg-white/75 hover:border-[#9A7B56]'
                      }`}
                    >
                      <OptimizedImage
                        src={house.heroImage}
                        alt={house.name}
                        aspectClassName="aspect-[16/10] sm:h-24 sm:w-32 shrink-0 rounded-xl"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-editorial text-xl font-semibold text-[#1A1615]">
                            {house.name.replace(/^\d+\.\s*/, '')}
                          </h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-technical text-[10px] text-emerald-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Disponible
                          </span>
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-technical text-[11px] text-[#5C5349]">
                          <span className="inline-flex items-center gap-1">
                            <Maximize2 className="h-3 w-3 text-[#9A7B56]" />
                            {house.areaLabel}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3 w-3 text-[#9A7B56]" />
                            {house.capacityLabel}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <BedDouble className="h-3 w-3 text-[#9A7B56]" />
                            {house.roomsLabel}
                          </span>
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#D8CFC2]/70">
                        <div className="text-left sm:text-right">
                          <p className="font-technical display-numeral text-xs text-[#9A7B56]">
                            {rate} € / noche
                          </p>
                          <p className="font-editorial text-2xl font-semibold text-[#4A1521]">
                            {stayTotal} €
                          </p>
                        </div>
                        <span
                          className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 font-technical text-[10px] uppercase tracking-wider ${
                            isSelected
                              ? 'bg-[#4A1521] text-[#F6F3EE]'
                              : 'border border-[#D8CFC2] text-[#1A1615]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-3 w-3" /> Seleccionada
                            </>
                          ) : (
                            'Elegir'
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resumen Lateral + Extras en Paso 1 */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#D8CFC2] bg-white p-5 space-y-5">
                <div className="space-y-4">
                  <div>
                    <p className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#9A7B56]">
                      Tu Estancia Seleccionada
                    </p>
                    <h4 className="font-editorial text-2xl font-semibold text-[#1A1615]">
                      {selectedHouse.name.replace(/^\d+\.\s*/, '')}
                    </h4>
                    <p className="text-xs text-[#5C5349]">{selectedHouse.locationLabel}</p>
                  </div>

                  {/* Extras Enológicos */}
                  <div className="space-y-2.5 border-y border-[#D8CFC2] py-4">
                    <p className="font-technical text-[10px] uppercase tracking-[0.18em] text-[#4A1521]">
                      Personaliza tu experiencia en Peñafiel
                    </p>

                    <label className="flex items-start justify-between gap-3 rounded-xl border border-[#D8CFC2] bg-[#F6F3EE]/60 p-3 cursor-pointer hover:border-[#9A7B56]">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={extraTasting}
                          onChange={(e) => setExtraTasting(e.target.checked)}
                          className="mt-1 accent-[#4A1521]"
                        />
                        <div>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1615]">
                            <Wine className="h-3.5 w-3.5 text-[#4A1521]" />
                            Cata de Vino con Magia · Bodegas Marcos
                          </span>
                          <p className="text-[11px] text-[#5C5349]">
                            Paseo entre viñas + magia en directo + 3 vinos (25€/pers.)
                          </p>
                        </div>
                      </div>
                      <span className="font-technical text-xs font-semibold text-[#4A1521]">
                        +{25 * guests}€
                      </span>
                    </label>

                    <label className="flex items-start justify-between gap-3 rounded-xl border border-[#D8CFC2] bg-[#F6F3EE]/60 p-3 cursor-pointer hover:border-[#9A7B56]">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={extraLateCheckout}
                          onChange={(e) => setExtraLateCheckout(e.target.checked)}
                          className="mt-1 accent-[#4A1521]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#1A1615]">
                            Late Check-Out hasta las 14:00 h
                          </span>
                          <p className="text-[11px] text-[#5C5349]">
                            Disfruta de tu última mañana sin prisas
                          </p>
                        </div>
                      </div>
                      <span className="font-technical text-xs font-semibold text-[#4A1521]">
                        +30€
                      </span>
                    </label>

                    {hasInfantCrib && (
                      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs text-emerald-900">
                        <span>Cuna para menor de 2 años incluida</span>
                        <span className="font-technical font-semibold">0 €</span>
                      </div>
                    )}
                  </div>

                  {/* Desglose Económico */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#5C5349]">
                      <span>
                        {nightlyRate} € × {nights} {nights === 1 ? 'noche' : 'noches'}
                      </span>
                      <span className="font-technical">{staySubtotal} €</span>
                    </div>
                    {extraTasting && (
                      <div className="flex justify-between text-[#5C5349]">
                        <span>Cata con Magia ({guests} pers.)</span>
                        <span className="font-technical">{tastingCost} €</span>
                      </div>
                    )}
                    {extraLateCheckout && (
                      <div className="flex justify-between text-[#5C5349]">
                        <span>Late Check-Out 14:00h</span>
                        <span className="font-technical">{lateCheckoutCost} €</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between border-t border-[#D8CFC2] pt-2.5">
                      <span className="font-semibold text-[#1A1615]">Total Estancia (IVA incl.)</span>
                      <span className="font-editorial text-3xl font-semibold text-[#4A1521]">
                        {totalPrice} €
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#F6F3EE] transition hover:bg-[#631D2C] cursor-pointer"
                  >
                    Continuar a Datos del Huésped
                    <ArrowRight className="h-4 w-4 text-[#C5A572]" />
                  </button>
                  <Link
                    to={`/alojamientos/${selectedHouse.slug}`}
                    className="block text-center text-[11px] font-medium text-[#5C5349] underline underline-offset-4 hover:text-[#4A1521]"
                  >
                    Ver ficha fotográfica completa de {selectedHouse.name.replace(/^\d+\.\s*/, '')}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: FORMULARIO DATOS DEL HUÉSPED + GARANTÍA SIMULADA */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="p-5 sm:p-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-wider text-[#5C5349] hover:text-[#4A1521] cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Cambiar estancia o extras
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={fillDemoData}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#9A7B56] bg-white px-3.5 py-1.5 font-technical text-[11px] font-medium text-[#4A1521] transition hover:bg-[#EAE3D9] cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5 text-[#C5A572]" />
                    Rellenar con datos de prueba (1 clic)
                  </button>
                  <span className="font-editorial text-2xl font-semibold text-[#4A1521]">
                    Total: {totalPrice} €
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">
                    Nombre y Apellidos *
                  </span>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Elena García"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-white px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">
                    Correo Electrónico *
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-white px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">
                    Teléfono de Contacto *
                  </span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-white px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">
                    Franja de Check-In Prevista
                  </span>
                  <select
                    value={arrivalSlot}
                    onChange={(e) =>
                      setArrivalSlot(e.target.value as '12:00-14:00' | '17:00-22:00')
                    }
                    className="w-full rounded-xl border border-[#D8CFC2] bg-white px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  >
                    <option value="12:00-14:00">Mañana · 12:00 a 14:00 h</option>
                    <option value="17:00-22:00">Tarde · 17:00 a 22:00 h</option>
                  </select>
                </label>
              </div>

              {/* Método de garantía simulado */}
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#1A1615]">
                  <CreditCard className="h-3.5 w-3.5 text-[#4A1521]" />
                  Método de Garantía / Pago Simulado
                </span>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                        paymentMethod === opt.id
                          ? 'border-[#4A1521] bg-white shadow-sm ring-1 ring-[#4A1521]/25'
                          : 'border-[#D8CFC2] bg-white/60 hover:border-[#9A7B56]'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#1A1615]">{opt.label}</p>
                      <p className="mt-0.5 text-[11px] text-[#5C5349]">{opt.detail}</p>
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#1A1615]">
                  Peticiones Especiales (opcional)
                </span>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="¿Celebración especial, alergias en el aperitivo, horario aproximado de llegada...?"
                  className="w-full rounded-xl border border-[#D8CFC2] bg-white px-4 py-2.5 text-sm focus:border-[#4A1521] focus:outline-none"
                />
              </label>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D8CFC2] pt-4">
                <p className="text-xs text-[#5C5349]">
                  Reserva directa garantizada en{' '}
                  <strong>{selectedHouse.name.replace(/^\d+\.\s*/, '')}</strong> del {checkIn} al{' '}
                  {checkOut}. (Simulación local sin cargo bancario real).
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1521] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C] cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#C5A572]" />
                  Confirmar Reserva Directa · {totalPrice} €
                </button>
              </div>
            </form>
          )}

          {/* PASO 3: CONFIRMACIÓN CON LOCALIZADOR Y DESBLOQUEO PRIVADO DE HUÉSPEDES */}
          {step === 3 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <div>
                    <p className="font-technical text-[10px] uppercase tracking-[0.2em] text-emerald-800">
                      Solicitud de Reserva Confirmada (Modo Simulación)
                    </p>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1615]">
                      ¡Te esperamos en Peñafiel, {fullName || 'Huésped'}!
                    </h3>
                  </div>
                </div>
                <div className="rounded-xl border border-[#D8CFC2] bg-white px-4 py-2 text-center">
                  <span className="block font-technical text-[9px] uppercase tracking-widest text-[#9A7B56]">
                    Localizador Directo
                  </span>
                  <span className="font-technical text-base font-bold text-[#4A1521]">
                    {locatorCode}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-[#D8CFC2] bg-white p-5 text-xs">
                <div>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                    Estancia
                  </span>
                  <p className="mt-1 font-editorial text-lg font-semibold text-[#1A1615]">
                    {selectedHouse.name.replace(/^\d+\.\s*/, '')}
                  </p>
                  <p className="text-[#5C5349]">{selectedHouse.locationLabel}</p>
                </div>
                <div>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                    Fechas
                  </span>
                  <p className="mt-1 font-technical font-semibold text-[#1A1615]">
                    {checkIn} → {checkOut}
                  </p>
                  <p className="text-[#5C5349]">Llegada prevista: {arrivalSlot} h</p>
                </div>
                <div>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                    Huéspedes &amp; Extras
                  </span>
                  <p className="mt-1 font-semibold text-[#1A1615]">
                    {guests} personas {hasInfantCrib ? '+ Cuna' : ''}
                  </p>
                  <p className="text-[#5C5349]">
                    {[
                      extraTasting ? 'Cata con Magia' : null,
                      extraLateCheckout ? 'Late Check-Out 14h' : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'Solo alojamiento'}
                  </p>
                </div>
                <div>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                    Importe Total
                  </span>
                  <p className="mt-1 font-editorial text-2xl font-semibold text-[#4A1521]">
                    {totalPrice} €
                  </p>
                  <p className="text-[#5C5349]">{email || SITE_METADATA.contact.email}</p>
                </div>
              </div>

              {/* Tarjeta Exclusiva Desbloqueada al Confirmar Reserva */}
              <div className="rounded-2xl border border-[#C5A572]/60 bg-[#141110] p-5 text-[#F6F3EE]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="inline-flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572]">
                      <KeyRound className="h-3.5 w-3.5" />
                      Acceso Privado Desbloqueado para Huéspedes con Reserva
                    </p>
                    <p className="mt-1 text-xs text-[#D8CFC2]/85">
                      Al confirmar tu estancia ya puedes acceder a la guía de llegada, código de
                      cancela peatonal y contraseña Wi-Fi de la finca.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={selectedHouse.location === 'muralla' ? '/muralla' : '/huespedes'}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#C5A572] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#141110] hover:bg-[#d8b885]"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      Portal Huéspedes
                    </Link>
                    <Link
                      to="/check-in"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white hover:border-[#C5A572]"
                    >
                      Guía Check-In
                    </Link>
                    {selectedHouse.location === 'finca' && (
                      <Link
                        to="/clave-wifi"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white hover:border-[#C5A572]"
                      >
                        <Wifi className="h-3.5 w-3.5 text-[#C5A572]" />
                        Wi-Fi
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C5349]">
                <p>
                  {SITE_METADATA.contact.addressLine1} · Atención directa:{' '}
                  <a
                    href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                    className="font-semibold text-[#4A1521] hover:underline"
                  >
                    {SITE_METADATA.contact.primaryPhoneFormatted}
                  </a>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1615] px-4 py-2 font-medium text-[#1A1615] hover:bg-[#1A1615] hover:text-white cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Imprimir resguardo
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#4A1521] px-4 py-2 font-medium text-[#F6F3EE] hover:bg-[#631D2C] cursor-pointer"
                  >
                    Realizar otra consulta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
