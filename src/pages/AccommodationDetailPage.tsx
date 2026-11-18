import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Accessibility,
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  Maximize2,
  Phone,
  Users,
} from 'lucide-react';
import {
  ACCOMMODATIONS,
  ESTATE_DISCOVERY_CAROUSEL_IMAGES,
} from '../data/accommodations';
import { FAQS, USAGE_POLICIES } from '../data/faqsAndPolicies';
import { SITE_METADATA } from '../data/siteMetadata';
import { AccommodationCard } from '../components/accommodations/AccommodationCard';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { EditorialAccordion } from '../components/ui/EditorialAccordion';
import { OptimizedImage } from '../components/ui/OptimizedImage';

export const AccommodationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIdx = ACCOMMODATIONS.findIndex((a) => a.slug === slug);
  const safeIdx = currentIdx >= 0 ? currentIdx : 0;
  const accommodation = ACCOMMODATIONS[safeIdx] || ACCOMMODATIONS[0];
  const nextHouse = ACCOMMODATIONS[(safeIdx + 1) % ACCOMMODATIONS.length];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const otherHouses = useMemo(
    () => ACCOMMODATIONS.filter((a) => a.slug !== accommodation.slug).slice(0, 3),
    [accommodation.slug],
  );

  const policyItems = useMemo(
    () =>
      USAGE_POLICIES.map((p) => ({
        id: p.id,
        title: p.title,
        paragraphs: p.paragraphs,
      })),
    [],
  );

  const faqItems = useMemo(
    () =>
      FAQS.map((f, idx) => ({
        id: `detail-faq-${idx}`,
        title: f.question,
        paragraphs: f.answer,
        badge: String(idx + 1).padStart(2, '0'),
      })),
    [],
  );

  return (
    <main className="bg-[#F6F3EE] pt-20 sm:pt-24 pb-24 lg:pb-0 text-[#1A1615]">
      {/* Breadcrumb y Cabecera */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 sm:py-6 md:px-8">
        <Link
          to="/alojamientos"
          className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-[0.16em] text-[#5C5349] hover:text-[#4A1521] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a todos los alojamientos
        </Link>

        <div className="mt-4 sm:mt-5 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAE3D9] px-3 sm:px-3.5 py-1 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#4A1521]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {accommodation.locationLabel}
              </span>
              {accommodation.isPmrAdapted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4A1521] px-3 sm:px-3.5 py-1 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#F6F3EE]">
                  <Accessibility className="h-3.5 w-3.5 shrink-0" />
                  Adaptado PMR
                </span>
              )}
            </div>

            <h1 className="mt-3 font-editorial text-3xl sm:text-5xl font-medium text-[#1A1615] md:text-6xl">
              {accommodation.name}
            </h1>
            <p className="mt-2.5 sm:mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-[#5C5349]">
              {accommodation.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/alojamientos?casa=${accommodation.slug}#reservar`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C]"
            >
              <CalendarCheck className="h-4 w-4 text-[#C5A572]" />
              Reservar {accommodation.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Mosaico Fotográfico Hero de la Estancia */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="relative md:col-span-8">
            <OptimizedImage
              src={accommodation.gallery[0] || accommodation.heroImage}
              alt={`${accommodation.name} vista principal`}
              aspectClassName="aspect-[16/11] sm:aspect-[16/10] rounded-2xl border border-[#D8CFC2]"
              priority
              onClick={() => setLightboxIdx(0)}
            />
            {accommodation.gallery.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIdx(0)}
                className="md:hidden absolute bottom-3 right-3 rounded-full bg-[#141110]/85 px-3.5 py-1.5 font-technical text-[10px] uppercase tracking-wider text-[#F6F3EE] backdrop-blur cursor-pointer"
              >
                Ver {accommodation.gallery.length} fotos
              </button>
            )}
          </div>
          <div className="hidden md:grid grid-cols-1 gap-3 md:col-span-4">
            {accommodation.gallery.slice(1, 3).map((img, i) => (
              <div key={img} className="relative">
                <OptimizedImage
                  src={img}
                  alt={`${accommodation.name} fotografía ${i + 2}`}
                  aspectClassName="aspect-[16/9.7] rounded-2xl border border-[#D8CFC2]"
                  onClick={() => setLightboxIdx(i + 1)}
                />
                {i === 1 && accommodation.gallery.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setLightboxIdx(0)}
                    className="absolute bottom-3 right-3 rounded-full bg-[#141110]/85 px-4 py-1.5 font-technical text-[11px] uppercase tracking-wider text-[#F6F3EE] backdrop-blur hover:bg-[#4A1521] cursor-pointer"
                  >
                    Ver {accommodation.gallery.length} fotos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fila de miniaturas táctiles en móvil */}
        {accommodation.gallery.length > 1 && (
          <div className="mt-2.5 grid grid-cols-4 gap-2 md:hidden">
            {accommodation.gallery.slice(1, 5).map((img, idx) => (
              <OptimizedImage
                key={img + idx}
                src={img}
                alt={`${accommodation.name} vista ${idx + 2}`}
                aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
                onClick={() => setLightboxIdx(idx + 1)}
              />
            ))}
          </div>
        )}

        {/* Barra de Especificaciones Técnicas */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#D8CFC2] bg-[#EAE3D9]/55 p-4 sm:p-6 md:grid-cols-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#4A1521]" />
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#5C5349]">
                Superficie
              </p>
              <p className="font-editorial text-lg sm:text-xl font-semibold">
                {accommodation.areaLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#4A1521]" />
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#5C5349]">
                Capacidad
              </p>
              <p className="font-editorial text-lg sm:text-xl font-semibold">
                {accommodation.capacityLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <BedDouble className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#4A1521]" />
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#5C5349]">
                Distribución
              </p>
              <p className="font-editorial text-base sm:text-lg font-semibold leading-tight">
                {accommodation.bedsLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#4A1521]" />
            <div className="min-w-0">
              <p className="font-technical text-[10px] uppercase tracking-widest text-[#5C5349]">
                Estancias
              </p>
              <p className="font-editorial text-lg sm:text-xl font-semibold">
                {accommodation.roomsLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción Detallada + Widget Sticky de Reserva */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-12">
          {/* Columna Izquierda: 100% Descripción Original */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-editorial text-3xl font-medium text-[#1A1615]">Descripción</h2>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-technical text-xs uppercase tracking-[0.18em] text-[#4A1521]">
                    Capacidad y distribución
                  </h3>
                  <div className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-[#5C5349]">
                    {accommodation.sections.capacityAndDistribution.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-technical text-xs uppercase tracking-[0.18em] text-[#4A1521]">
                    Cocina y equipamiento interior
                  </h3>
                  <div className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-[#5C5349]">
                    {accommodation.sections.kitchenAndInterior.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-technical text-xs uppercase tracking-[0.18em] text-[#4A1521]">
                    Exteriores y zonas comunes
                  </h3>
                  <div className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-[#5C5349]">
                    {accommodation.sections.exteriorsAndCommonAreas.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {accommodation.sections.includedServices && (
                  <div>
                    <h3 className="font-technical text-xs uppercase tracking-[0.18em] text-[#4A1521]">
                      Servicios incluidos
                    </h3>
                    <div className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-[#5C5349]">
                      {accommodation.sections.includedServices.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-[#D8CFC2] bg-[#EAE3D9]/55 p-4 sm:p-6">
                  <h3 className="font-technical text-xs uppercase tracking-[0.18em] text-[#4A1521]">
                    Condiciones y suplementos
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#5C5349]">
                    {accommodation.sections.conditionsAndSupplements.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A1521]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Servicios y Facilidades */}
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615]">
                Servicios
              </h2>
              <p className="mt-1.5 text-sm text-[#5C5349]">
                Estos son los servicios y facilidades disponibles en este alojamiento.
              </p>
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3">
                {accommodation.amenities.map((am) => (
                  <div
                    key={am.label}
                    className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-[#D8CFC2] bg-white p-3 sm:p-3.5 min-w-0"
                  >
                    <img
                      src={am.iconUrl}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 object-contain opacity-85"
                    />
                    <span className="text-[11px] sm:text-xs font-medium text-[#1A1615] break-words leading-snug">
                      {am.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Galería Completa del Alojamiento */}
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615]">
                    Galeria de fotos
                  </h2>
                  <p className="mt-1 text-sm text-[#5C5349]">
                    Pulsa cualquier fotografía para ampliar en alta resolución.
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3">
                {accommodation.gallery.map((img, idx) => (
                  <OptimizedImage
                    key={img + idx}
                    src={img}
                    alt={`${accommodation.name} interior ${idx + 1}`}
                    aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
                    className="hover:scale-105"
                    onClick={() => setLightboxIdx(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Sticky de Reserva Directa */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 rounded-2xl border border-[#D8CFC2] bg-[#141110] p-5 sm:p-7 text-[#F6F3EE] shadow-2xl">
              <p className="font-technical text-[10px] uppercase tracking-[0.22em] text-[#C5A572]">
                Reserva Directa Garantizada
              </p>
              <h3 className="mt-2 font-editorial text-3xl font-medium">{accommodation.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#D8CFC2]/80">
                {accommodation.location === 'muralla'
                  ? 'Alojamiento en el casco histórico de Peñafiel con capacidad conjunta Muralla I y II hasta 16 personas.'
                  : 'Estancia entre viñedos en Finca Entreviñedos con piscina en temporada y vistas al Castillo de Peñafiel.'}
              </p>

              <div className="my-6 space-y-2.5 border-y border-white/15 py-5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#D8CFC2]/70">Superficie</span>
                  <span className="font-technical text-[#F6F3EE]">{accommodation.areaLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#D8CFC2]/70">Capacidad</span>
                  <span className="font-technical text-[#F6F3EE]">
                    {accommodation.capacityLabel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#D8CFC2]/70">Check-in</span>
                  <span className="font-technical text-[#F6F3EE]">12:00–14:00 / 17:00–22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#D8CFC2]/70">Check-out</span>
                  <span className="font-technical text-[#F6F3EE]">Hasta 12:00 h</span>
                </div>
              </div>

              <Link
                to={`/alojamientos?casa=${accommodation.slug}#reservar`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
              >
                RESERVAR AHORA
                <ArrowUpRight className="h-4 w-4 text-[#C5A572]" />
              </Link>

              <Link
                to="/catas"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-[#C5A572]/45 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#C5A572] transition hover:bg-[#C5A572] hover:text-[#141110]"
              >
                Añadir Cata con Magia (25€/pers.)
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#D8CFC2]/75">
                <Phone className="h-3.5 w-3.5 text-[#C5A572]" />
                <a
                  href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                  className="hover:text-[#C5A572]"
                >
                  {SITE_METADATA.contact.primaryPhoneFormatted}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Descubre nuestra finca */}
      <section className="cv-auto border-y border-[#D8CFC2] bg-[#EAE3D9]/55 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
                Descubre nuestra finca
              </h2>
              <p className="mt-1 text-sm text-[#5C5349]">
                Aquí podrás ver todo de lo que puedes disfrutar en Finca Entreviñedos
              </p>
            </div>
            <Link
              to="/lafinca"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A1521] hover:underline"
            >
              Ver todo →
            </Link>
          </div>
          <div className="mt-6 sm:mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-5">
            {ESTATE_DISCOVERY_CAROUSEL_IMAGES.map((img, i) => (
              <OptimizedImage
                key={img}
                src={img}
                alt={`Entorno de Finca Entreviñedos ${i + 1}`}
                aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Políticas de uso + Preguntas Frecuentes */}
      <section className="cv-auto mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 md:px-8 space-y-12 sm:space-y-16">
        <div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
            Políticas de uso
          </h2>
          <p className="mt-1 mb-6 text-sm text-[#5C5349]">Consulta las normas de la casa</p>
          <EditorialAccordion items={policyItems} defaultOpenIndex={0} />
        </div>

        <div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
            Preguntas Frecuentes
          </h2>
          <div className="mt-6">
            <EditorialAccordion items={faqItems} defaultOpenIndex={null} />
          </div>
        </div>
      </section>

      {/* Más casas */}
      <section className="cv-auto border-t border-[#D8CFC2] bg-[#EAE3D9]/35 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
              Más casas
            </h2>
            <Link
              to="/alojamientos"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A1521] hover:underline"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherHouses.map((acc) => (
              <AccommodationCard key={acc.slug} accommodation={acc} />
            ))}
          </div>
        </div>
      </section>

      {/* Portal Editorial "Siguiente Estancia" */}
      <section className="cv-auto bg-[#141110] py-16 sm:py-20 text-[#F6F3EE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Link
            to={`/alojamientos/${nextHouse.slug}`}
            data-cursor="SIGUIENTE ESTANCIA"
            className="group grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[#1B1715] p-5 sm:p-8 transition hover:border-[#C5A572]/60 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 space-y-2.5">
              <span className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#C5A572]">
                Siguiente Estancia · {nextHouse.location === 'muralla' ? 'Casco Histórico' : 'Finca entre Viñedos'}
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#F6F3EE] group-hover:text-[#C5A572] transition-colors">
                {nextHouse.name.replace(/^\d+\.\s*/, '')}
              </h2>
              <p className="font-technical text-xs text-[#D8CFC2]/75">
                {nextHouse.locationLabel} · {nextHouse.areaLabel} · {nextHouse.capacityLabel}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C5A572]/45 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5A572] transition group-hover:bg-[#C5A572] group-hover:text-[#141110]">
                Descubrir Estancia
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src={nextHouse.heroImage}
                alt={nextHouse.name}
                aspectClassName="aspect-[16/9]"
                className="group-hover:scale-105"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Barra fija inferior de reserva para móvil y tablet */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/15 bg-[#141110]/95 px-4 py-3 text-[#F6F3EE] backdrop-blur-xl shadow-2xl lg:hidden">
        <div className="min-w-0">
          <p className="truncate font-editorial text-base sm:text-lg font-semibold leading-tight text-[#F6F3EE]">
            {accommodation.name}
          </p>
          <p className="truncate font-technical text-[10px] uppercase tracking-wider text-[#C5A572]">
            {accommodation.capacityLabel} · {accommodation.areaLabel}
          </p>
        </div>
        <Link
          to={`${accommodation.bookingRoute}?casa=${accommodation.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#4A1521] px-4 sm:px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C]"
        >
          Reservar Ahora
          <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A572]" />
        </Link>
      </div>

      <LightboxGallery
        images={accommodation.gallery}
        activeIndex={lightboxIdx}
        title={accommodation.name}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
