import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, ExternalLink, Phone, ShieldCheck } from 'lucide-react';
import { SITE_METADATA } from '../data/siteMetadata';
import { DirectBookingEngine } from '../components/awwwards/DirectBookingEngine';

interface BookingPortalPageProps {
  mode: 'finca' | 'muralla' | 'confirmacion';
}

export const BookingPortalPage: React.FC<BookingPortalPageProps> = ({ mode }) => {
  const [searchParams] = useSearchParams();
  const casaSlug = searchParams.get('casa') || undefined;
  const paramCheckIn = searchParams.get('checkIn') || undefined;
  const paramCheckOut = searchParams.get('checkOut') || undefined;
  const paramGuests = searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined;
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const [showExternalWidget, setShowExternalWidget] = useState(mode === 'confirmacion');

  const isMuralla = mode === 'muralla';
  const isConfirmation = mode === 'confirmacion';

  useEffect(() => {
    if (!showExternalWidget && !isConfirmation) return;
    const host = widgetContainerRef.current;
    if (!host) return;
    host.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    if (isConfirmation) {
      script.src = SITE_METADATA.bookingWidget.confirmBudgetScriptUrl;
    } else {
      script.src = SITE_METADATA.bookingWidget.scriptUrl;
      script.setAttribute('id_elemento', SITE_METADATA.bookingWidget.idCasa);
      script.setAttribute('tipo_elemento', '1');
      script.setAttribute('idw', SITE_METADATA.bookingWidget.idw);
      script.setAttribute('w_type', 'ficha');
      script.setAttribute('w_contenido', 'simple');
      script.setAttribute('w_param', 'getURL');
      script.setAttribute('tews_visualfilteroccupancy', '1');
      script.setAttribute('paramhash', SITE_METADATA.bookingWidget.paramHash);
    }
    host.appendChild(script);

    return () => {
      host.innerHTML = '';
    };
  }, [isConfirmation, mode, showExternalWidget]);

  return (
    <main className="min-h-screen bg-[#F6F3EE] pt-24 sm:pt-28 pb-16 sm:pb-20 text-[#1A1615]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 border-b border-[#D8CFC2] pb-6">
          <div>
            <Link
              to="/alojamientos"
              className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-[0.16em] text-[#5C5349] hover:text-[#4A1521]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Alojamientos
            </Link>
            <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
              {isConfirmation
                ? 'Confirmación de Reserva'
                : isMuralla
                  ? 'Reserva en La Muralla (Casco Histórico)'
                  : 'Reserva en Finca Entreviñedos'}
            </h1>
            <p className="mt-1.5 text-sm text-[#5C5349]">
              {isMuralla
                ? 'Muralla I y Muralla II en el centro histórico de Peñafiel (capacidad conjunta hasta 16 personas).'
                : '8 estancias exclusivas entre viñedos con vistas al Castillo de Peñafiel y acceso a piscina de temporada.'}
            </p>
          </div>

          {!isConfirmation && (
            <button
              type="button"
              onClick={() => setShowExternalWidget((prev) => !prev)}
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#D8CFC2] bg-white px-4 py-2 font-technical text-[11px] uppercase tracking-wider text-[#5C5349] transition hover:border-[#4A1521] hover:text-[#4A1521] cursor-pointer"
            >
              <span>
                {showExternalWidget ? 'Volver al Motor Directo' : 'Calendario Externo MisterPlan'}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </button>
          )}
        </div>

        {/* Motor Propio Directo en Primer Plano */}
        {!isConfirmation && !showExternalWidget && (
          <div className="mt-6">
            <DirectBookingEngine
              defaultOpen
              variant="page"
              initialEnvironment={isMuralla ? 'muralla' : 'finca'}
              initialHouseSlug={casaSlug}
              initialCheckIn={paramCheckIn}
              initialCheckOut={paramCheckOut}
              initialGuests={paramGuests}
            />
          </div>
        )}

        {/* Contenedor Oficial del Motor Externo MisterPlan (Opcional / Confirmación) */}
        {(showExternalWidget || isConfirmation) && (
          <div className="mt-6 sm:mt-8 rounded-2xl border border-[#D8CFC2] bg-white p-4 sm:p-6 md:p-8 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CFC2]/70 pb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A1521]">
                <CalendarCheck className="h-4 w-4 shrink-0" />
                <span>Motor Oficial de Disponibilidad MisterPlan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5C5349]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#9A7B56]" />
                <span>Sin comisiones de intermediarios · Mejor precio garantizado</span>
              </div>
            </div>

            <div
              ref={widgetContainerRef}
              id="rpsv_IncWidgetFicha"
              className="min-h-[520px] sm:min-h-[640px] w-full overflow-x-auto"
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#D8CFC2]/70 pt-5 text-xs text-[#5C5349]">
              <p>
                ¿Prefieres asistencia personalizada para grupos, bodas o reservas múltiples?
              </p>
              <a
                href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                className="inline-flex items-center gap-1.5 font-semibold text-[#4A1521] hover:underline"
              >
                <Phone className="h-3.5 w-3.5" />
                {SITE_METADATA.contact.primaryPhoneFormatted} |{' '}
                {SITE_METADATA.contact.secondaryPhoneFormatted}
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
