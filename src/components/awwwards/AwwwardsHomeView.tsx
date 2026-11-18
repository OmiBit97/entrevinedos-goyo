import React, { Suspense, lazy, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Compass,
  Expand,
  MapPin,
  Sparkles,
  Wine,
} from 'lucide-react';
import { ACCOMMODATIONS, ALOJAMIENTOS_PAGE_COPY } from '../../data/accommodations';
import { HOME_CONTENT } from '../../data/estateAndEvents';
import { FAQS } from '../../data/faqsAndPolicies';
import { SITE_METADATA } from '../../data/siteMetadata';
import { TASTINGS_DATA } from '../../data/wineryAndTastings';
import { LightboxGallery } from '../accommodations/LightboxGallery';
import { EditorialAccordion } from '../ui/EditorialAccordion';
import { OptimizedImage } from '../ui/OptimizedImage';
import { AwwwardsAccommodationShowcase } from './AwwwardsAccommodationShowcase';
import { DirectBookingEngine } from './DirectBookingEngine';

const LiquidTerroirCanvas = lazy(() => import('../../webgl/scenes/LiquidTerroirCanvas'));

interface AwwwardsHomeViewProps {
  onOpenBooking: () => void;
}

const MARQUEE_ITEMS = [
  'PEÑAFIEL · RIBERA DEL DUERO',
  '9 CASAS ENTRE VIÑEDOS',
  '2 CASAS EN LA MURALLA (HASTA 16 PAX)',
  'BODEGAS MARCOS · DESDE 1926',
  'CATAS DE VINO CON MAGIA · 25€/PERS.',
  'VISTAS AL CASTILLO DE PEÑAFIEL',
  'RESERVA DIRECTA SIN COMISIONES',
];

export const AwwwardsHomeView: React.FC<AwwwardsHomeViewProps> = ({ onOpenBooking }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const faqAccordionItems = useMemo(
    () =>
      FAQS.map((item, idx) => ({
        id: `awwwards-faq-${idx}`,
        title: item.question,
        paragraphs: item.answer,
        badge: String(idx + 1).padStart(2, '0'),
      })),
    [],
  );

  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* =========================================================================
          00 · HERO EDITORIAL CENTRADO CON MOTOR DE RESERVA DIRECTO INTEGRADO
          ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#141110] pt-28 sm:pt-36 pb-10 sm:pb-12 text-[#F6F3EE]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={SITE_METADATA.assets.heroPosterUrl}
            className="h-full w-full object-cover opacity-50 scale-[1.02]"
          >
            <source src={SITE_METADATA.assets.heroVideoUrl} type="video/mp4" />
          </video>
          <Suspense fallback={null}>
            <LiquidTerroirCanvas
              className="absolute inset-0 h-full w-full mix-blend-screen"
              intensity={0.78}
              showParticles
            />
          </Suspense>
          <div className="film-grain pointer-events-none absolute inset-0 opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141110]/80 via-[#141110]/45 to-[#141110]" />
        </div>

        {/* Contenido Totalmente Centrado + Motor Interno Directo */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 text-center">
          <div className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#C5A572]/45 bg-[#141110]/65 px-4 py-1.5 backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
              <span className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
                Peñafiel · Ribera del Duero · Bodegas Marcos
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-editorial text-xl sm:text-2xl italic text-[#C5A572]/95">
                L&apos;Art d&apos;Habiter le Vignoble
              </p>
              <h1 className="font-editorial text-4xl font-medium tracking-tight text-[#F6F3EE] sm:text-6xl lg:text-[5rem] xl:text-[5.75rem] leading-[0.98]">
                {HOME_CONTENT.heroTitle}
              </h1>
            </div>

            <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#EAE3D9]/90">
              {HOME_CONTENT.heroSubtitle}
            </p>
          </div>

          {/* Motor de Reserva Directo Interno Simulado */}
          <div className="mt-8 sm:mt-10">
            <DirectBookingEngine />
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="relative z-10 mx-auto hidden sm:flex items-center justify-center pt-8">
          <a
            href="#alojamientos-showcase"
            className="inline-flex items-center gap-2 font-technical text-[10px] uppercase tracking-[0.28em] text-[#C5A572]/85 hover:text-[#F6F3EE] transition"
          >
            <span>{HOME_CONTENT.heroScrollLabel}</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          MARQUESINA CINÉTICA EDITORIAL
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y border-[#C5A572]/35 bg-[#141110] py-3.5 text-[#C5A572]"
      >
        <div className="animate-awwwards-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-6 px-4">
              <span className="font-technical text-[11px] uppercase tracking-[0.26em] whitespace-nowrap">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A1521] ring-1 ring-[#C5A572]/60" />
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          01 · NUESTROS ALOJAMIENTOS (ATELIER INTERACTIVO)
          ========================================================================= */}
      <section
        id="alojamientos-showcase"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:px-8"
      >
        <div className="mb-10 sm:mb-12 flex flex-col gap-6 border-b border-[#D8CFC2] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#9A7B56]">
              {HOME_CONTENT.roomsSection.eyebrow}
            </span>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1A1615] md:text-6xl">
              {HOME_CONTENT.roomsSection.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C5349]">
              {HOME_CONTENT.roomsSection.altDescription}
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#4A1521]">
              {HOME_CONTENT.roomsSection.subtitle}
            </p>
          </div>

          <Link
            to="/alojamientos"
            data-cursor="ALOJAMIENTOS"
            className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-[#1A1615] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1615] transition hover:bg-[#1A1615] hover:text-[#F6F3EE]"
          >
            {HOME_CONTENT.roomsSection.cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <AwwwardsAccommodationShowcase />
      </section>

      {/* =========================================================================
          02 · DUALIDAD TERRITORIAL: FINCA ENTRE VIÑEDOS vs CASCO HISTÓRICO
          ========================================================================= */}
      <section className="cv-auto border-y border-[#D8CFC2] bg-[#EAE3D9]/55 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#4A1521]">
                02 / DOS ENCLAVES ÚNICOS EN PEÑAFIEL
              </p>
              <h2 className="mt-2 font-editorial text-3xl sm:text-5xl font-medium text-[#1A1615]">
                Entre viñas centenarias o bajo el Castillo
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#5C5349]">
              {ALOJAMIENTOS_PAGE_COPY.introParagraphs[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Monolito A: Finca entre Viñedos */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D8CFC2] bg-[#141110] text-[#F6F3EE] shadow-xl">
              <div>
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={ALOJAMIENTOS_PAGE_COPY.heroImages[0]}
                    alt="Finca Entreviñedos entre viñedos de Ribera del Duero"
                    aspectClassName="aspect-[16/10]"
                    className="group-hover:scale-105 opacity-90"
                  />
                  <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-[#C5A572]/50 bg-[#141110]/75 px-3.5 py-1 font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572] backdrop-blur">
                    ENCLAVE 01 · CASAS 1 A 8
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="font-editorial text-3xl sm:text-4xl font-medium">
                    Finca entre Viñedos
                  </h3>
                  <p className="text-sm leading-relaxed text-[#D8CFC2]/85">
                    {ALOJAMIENTOS_PAGE_COPY.introParagraphs[2]}
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 p-6 sm:px-8 flex flex-wrap items-center justify-between gap-3">
                <span className="font-technical text-xs text-[#C5A572]">
                  2 a 8 huéspedes · Piscina &amp; Barbacoa
                </span>
                <Link
                  to="/reserva-finca"
                  data-cursor="RESERVAR"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C5A572] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#141110] transition hover:bg-[#d8b885]"
                >
                  {ALOJAMIENTOS_PAGE_COPY.reserveFincaLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Monolito B: Casco Histórico La Muralla I & II */}
            <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D8CFC2] bg-white text-[#1A1615] shadow-xl">
              <div>
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={ACCOMMODATIONS[8]?.heroImage || ALOJAMIENTOS_PAGE_COPY.heroImages[1]}
                    alt="Casco Histórico La Muralla I y II en Peñafiel"
                    aspectClassName="aspect-[16/10]"
                    className="group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-[#4A1521]/40 bg-[#F6F3EE]/90 px-3.5 py-1 font-technical text-[10px] uppercase tracking-[0.2em] text-[#4A1521] backdrop-blur">
                    ENCLAVE 02 · CASAS 9 &amp; 10
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="font-editorial text-3xl sm:text-4xl font-medium">
                    Casco Histórico · La Muralla I &amp; II
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5C5349]">
                    {ALOJAMIENTOS_PAGE_COPY.introParagraphs[1]}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#D8CFC2] p-6 sm:px-8 flex flex-wrap items-center justify-between gap-3">
                <span className="font-technical text-xs text-[#4A1521]">
                  8+8 huéspedes (16 máx.) · Centro de Peñafiel
                </span>
                <Link
                  to="/reserva-muralla"
                  data-cursor="RESERVAR"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4A1521] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
                >
                  {ALOJAMIENTOS_PAGE_COPY.reserveMurallaLabel}
                  <ArrowRight className="h-3.5 w-3.5 text-[#C5A572]" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 · GALERÍA DE LA FINCA & FILMSTRIP FOTOGRÁFICA
          ========================================================================= */}
      <section id="terroir-3d" className="cv-auto scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#4A1521]">
                03 / PAISAJE, VIÑEDOS &amp; ARQUITECTURA · PEÑAFIEL
              </p>
              <h2 className="mt-2 font-editorial text-3xl sm:text-5xl font-medium text-[#1A1615]">
                {HOME_CONTENT.gallerySection.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/mapa-finca"
                className="inline-flex items-center gap-2 rounded-full border border-[#4A1521]/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4A1521] transition hover:bg-[#4A1521] hover:text-[#F6F3EE]"
              >
                <Compass className="h-3.5 w-3.5" />
                Ver mapa interactivo de la finca
              </Link>
              <Link
                to="/lafinca"
                data-cursor="LA FINCA"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A1521] hover:underline underline-offset-4"
              >
                Explorar los 5 espacios de La Finca
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Filmstrip Editorial Horizontal */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#4A1521]" />
                <h3 className="font-editorial text-2xl font-medium text-[#1A1615]">
                  {HOME_CONTENT.gallerySection.eyebrow}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIdx(0)}
                data-cursor="GALERÍA"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A1521] hover:underline underline-offset-4 cursor-pointer"
              >
                <Expand className="h-3.5 w-3.5" />
                Abrir galería ({HOME_CONTENT.gallerySection.images.length} imágenes)
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {HOME_CONTENT.gallerySection.images.slice(0, 12).map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  data-cursor="AMPLIAR"
                  className="group relative w-56 sm:w-64 shrink-0 overflow-hidden rounded-2xl border border-[#D8CFC2] cursor-pointer text-left"
                >
                  <OptimizedImage
                    src={img}
                    alt={`Finca Entreviñedos ${idx + 1}`}
                    aspectClassName="aspect-[4/3]"
                    className="group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-[#141110]/75 px-2.5 py-0.5 font-technical display-numeral text-[10px] text-[#C5A572] backdrop-blur">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 · TRILOGÍA EXPERIENCIAL: FINCA, CATAS CON MAGIA Y BODEGA
          ========================================================================= */}
      <section className="cv-auto bg-[#141110] py-16 sm:py-24 text-[#F6F3EE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-16">
          <div>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
              <div className="max-w-2xl">
                <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#C5A572]">
                  04 / {HOME_CONTENT.servicesSection.eyebrow}
                </p>
                <h2 className="mt-2 font-editorial text-3xl sm:text-5xl font-medium">
                  {HOME_CONTENT.servicesSection.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#D8CFC2]/80">
                  {HOME_CONTENT.servicesSection.description}
                </p>
              </div>
              <Link
                to="/lafinca"
                data-cursor="DESCUBRIR"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#C5A572]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5A572] transition hover:bg-[#C5A572] hover:text-[#141110]"
              >
                {HOME_CONTENT.servicesSection.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {HOME_CONTENT.servicesSection.items.map((item, idx) => (
                <article
                  key={item.id}
                  className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#1B1715] transition hover:border-[#C5A572]/50 ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    aspectClassName={
                      idx === 0 ? 'aspect-[16/10] sm:aspect-[21/10]' : 'aspect-[16/10]'
                    }
                    className="group-hover:scale-105"
                  />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#C5A572]">
                      <Wine className="h-4 w-4" />
                      <span className="font-technical text-[10px] uppercase tracking-[0.2em]">
                        Entreviñedos Experience
                      </span>
                    </div>
                    <h3 className="mt-2 font-editorial text-2xl font-medium text-[#F6F3EE]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#D8CFC2]/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Spotlight Catas con Magia de Bodegas Marcos */}
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-[#C5A572]/35 bg-gradient-to-br from-[#1B1715] via-[#261116] to-[#141110] p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <OptimizedImage
                src={TASTINGS_DATA.secondaryHeroImage}
                alt={TASTINGS_DATA.title}
                aspectClassName="aspect-[4/3] lg:aspect-[4/5] rounded-2xl border border-[#C5A572]/30"
              />
            </div>
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A572]/45 bg-[#141110]/70 px-3.5 py-1 font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572]">
                <Clock className="h-3.5 w-3.5" />
                {TASTINGS_DATA.priceTag}
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-[#F6F3EE]">
                {TASTINGS_DATA.sectionHeading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#D8CFC2]/85">
                {TASTINGS_DATA.intro}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
                {TASTINGS_DATA.steps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                      Acto 0{step.number}
                    </p>
                    <p className="mt-1 font-editorial text-lg font-medium text-[#F6F3EE]">
                      {step.title.replace(/^\d+-\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/catas"
                  data-cursor="CATAS"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C5A572] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141110] transition hover:bg-[#d8b885]"
                >
                  {TASTINGS_DATA.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/bodega"
                  data-cursor="BODEGA"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:border-[#C5A572] hover:text-[#C5A572]"
                >
                  Conocer Bodegas Marcos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05 · EVENTOS Y CELEBRACIONES
          ========================================================================= */}
      <section className="cv-auto mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#9A7B56]">
              05 / {HOME_CONTENT.eventsSection.eyebrow} · {HOME_CONTENT.eventsSection.subtitle}
            </p>
            <h2 className="mt-2 font-editorial text-3xl sm:text-5xl font-medium text-[#1A1615]">
              {HOME_CONTENT.eventsSection.title}
            </h2>
          </div>
          <Link
            to="/eventos"
            data-cursor="EVENTOS"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#1A1615] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#4A1521]"
          >
            {HOME_CONTENT.eventsSection.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {HOME_CONTENT.eventsSection.items.map((ev, idx) => (
            <div
              key={ev.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D8CFC2] bg-white shadow-sm transition hover:border-[#9A7B56] hover:shadow-xl"
            >
              <div>
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={ev.image}
                    alt={ev.title}
                    aspectClassName="aspect-[16/9]"
                    className="group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-[#141110]/75 px-3 py-1 font-technical display-numeral text-[10px] text-[#C5A572] backdrop-blur">
                    EXPERIENCIA 0{idx + 1}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h4 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615]">
                    {ev.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5C5349]">
                    {ev.description}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-7 pb-6">
                <Link
                  to={ev.link}
                  data-cursor="CONSULTAR"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A1521] hover:underline underline-offset-4"
                >
                  {ev.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          06 · PREGUNTAS FRECUENTES
          ========================================================================= */}
      <section className="cv-auto border-t border-[#D8CFC2] bg-[#EAE3D9]/45 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <div className="mb-10 text-center">
            <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#9A7B56]">
              06 / PREGUNTAS FRECUENTES
            </p>
            <h2 className="mt-2 font-editorial text-3xl sm:text-5xl font-medium text-[#1A1615]">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-sm text-[#5C5349]">
              Todo lo que necesita saber para disfrutar de una estancia perfecta.
            </p>
          </div>
          <EditorialAccordion items={faqAccordionItems} defaultOpenIndex={0} />
        </div>
      </section>

      {/* =========================================================================
          07 · CIERRE CINEMATOGRÁFICO CON VÍDEO DE VIÑEDO
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#141110] py-16 sm:py-24 text-[#F6F3EE]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={SITE_METADATA.assets.contactPosterUrl}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        >
          <source src={SITE_METADATA.assets.contactVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141110]/92 via-[#4A1521]/55 to-[#141110]/92" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center md:px-8">
          <Sparkles className="mx-auto mb-4 h-6 w-6 text-[#C5A572]" />
          <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-[#F6F3EE]">
            {HOME_CONTENT.contactBanner.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#EAE3D9]/90">
            {HOME_CONTENT.contactBanner.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              data-cursor="RESERVAR"
              className="w-full sm:w-auto rounded-full bg-[#C5A572] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141110] transition hover:bg-[#d6b785] cursor-pointer"
            >
              Reservar Alojamiento
            </button>
            <Link
              to="/contacto"
              data-cursor="RECEPCIÓN"
              className="w-full sm:w-auto rounded-full border border-[#F6F3EE]/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:border-[#C5A572] hover:text-[#C5A572]"
            >
              Contactar con Recepción
            </Link>
          </div>
        </div>
      </section>

      <LightboxGallery
        images={HOME_CONTENT.gallerySection.images}
        activeIndex={lightboxIdx}
        title="Galería de Finca Entreviñedos"
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
