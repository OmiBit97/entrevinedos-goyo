import React, { Suspense, lazy, useState } from 'react';
import { ArrowRight, Clock, Sparkles, Wine } from 'lucide-react';
import { TASTINGS_DATA } from '../data/wineryAndTastings';
import { SITE_METADATA } from '../data/siteMetadata';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { OptimizedImage } from '../components/ui/OptimizedImage';

const LiquidTerroirCanvas = lazy(() => import('../webgl/scenes/LiquidTerroirCanvas'));

export const TastingsPage: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* Hero Catas Mágicas */}
      <section className="relative flex min-h-[54vh] sm:min-h-[64vh] items-end overflow-hidden bg-[#141110] pt-28 sm:pt-32 pb-12 sm:pb-16 text-[#F6F3EE]">
        <div className="absolute inset-0">
          <OptimizedImage
            src={TASTINGS_DATA.heroImage}
            alt={TASTINGS_DATA.title}
            aspectClassName="h-full w-full"
            priority
            className="opacity-50"
          />
          <Suspense fallback={null}>
            <LiquidTerroirCanvas className="absolute inset-0 h-full w-full" intensity={0.6} />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/45 to-[#141110]/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="inline-flex items-center gap-2 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C5A572]">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {TASTINGS_DATA.eyebrow}
          </p>
          <h1 className="mt-3 font-editorial text-4xl sm:text-5xl font-medium md:text-6xl lg:text-7xl">
            {TASTINGS_DATA.title}
          </h1>
          <div className="mt-4 sm:mt-5 inline-flex flex-wrap items-center gap-2.5 sm:gap-3 rounded-2xl sm:rounded-full border border-[#C5A572]/45 bg-[#141110]/75 px-4 sm:px-5 py-2 backdrop-blur">
            <Clock className="h-4 w-4 shrink-0 text-[#C5A572]" />
            <span className="font-technical text-[11px] sm:text-xs text-[#F6F3EE]">
              {TASTINGS_DATA.priceTag}
            </span>
          </div>
        </div>
      </section>

      {/* Estructura de la Cata Premium (3 Pasos + Niños) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615] md:text-5xl">
              {TASTINGS_DATA.sectionHeading}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C5349]">
              {TASTINGS_DATA.intro}
            </p>

            <div className="rounded-2xl border border-[#D8CFC2] bg-[#EAE3D9]/55 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#4A1521]">
                {TASTINGS_DATA.includesLabel}
              </p>
              {TASTINGS_DATA.steps.map((step) => (
                <div key={step.number} className="border-l-2 border-[#4A1521] pl-3.5 sm:pl-4">
                  <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#1A1615]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5C5349]">
                    {step.description}
                  </p>
                </div>
              ))}

              <div className="rounded-xl border border-[#C5A572]/50 bg-[#F6F3EE] p-4">
                <p className="font-editorial text-lg font-semibold text-[#4A1521]">
                  {TASTINGS_DATA.kidsNote.title}
                </p>
                <p className="mt-1 text-sm text-[#5C5349]">{TASTINGS_DATA.kidsNote.description}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
              <a
                href="#reserva-cata"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
              >
                {TASTINGS_DATA.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-xs italic text-[#5C5349]">{TASTINGS_DATA.closingCallout}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <OptimizedImage
              src={TASTINGS_DATA.secondaryHeroImage}
              alt="Cata con magia en Bodegas Marcos"
              aspectClassName="aspect-[4/3] lg:aspect-[4/5] rounded-2xl border border-[#D8CFC2] shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Bloques Narrativos (Brindis con Sentido / Disfruta en grupo / La Magia de la Cata) */}
      <section className="cv-auto bg-[#141110] py-14 sm:py-20 text-[#F6F3EE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12">
          {TASTINGS_DATA.narrativeBlocks.map((block, idx) => (
            <div
              key={block.id}
              className="grid grid-cols-1 items-center gap-6 sm:gap-8 rounded-2xl border border-white/10 bg-[#1B1715] p-5 sm:p-6 md:p-10 lg:grid-cols-12"
            >
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <OptimizedImage
                  src={block.image}
                  alt={block.title}
                  aspectClassName="aspect-[4/3] rounded-xl"
                />
              </div>
              <div className={`lg:col-span-7 space-y-3 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="inline-flex items-center gap-1.5 font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
                  <Wine className="h-3.5 w-3.5 shrink-0" />
                  {block.subtitle}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium md:text-4xl">
                  {block.title}
                </h2>
                {block.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm md:text-base leading-relaxed text-[#D8CFC2]/85">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galería de Catas + Formulario de Reserva */}
      <section className="cv-auto mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8">
        <div className="mb-6 sm:mb-8">
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
            {TASTINGS_DATA.galleryTitle}
          </h3>
          <p className="mt-1 text-sm text-[#5C5349]">{TASTINGS_DATA.gallerySubtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 md:grid-cols-4">
          {TASTINGS_DATA.galleryImages.map((img, idx) => (
            <OptimizedImage
              key={img}
              src={img}
              alt={`Catas mágicas en Bodegas Marcos ${idx + 1}`}
              aspectClassName="aspect-square rounded-xl border border-[#D8CFC2]"
              className="hover:scale-105"
              onClick={() => setLightboxIdx(idx)}
            />
          ))}
        </div>

        {/* Formulario de Solicitud de Cata */}
        <div
          id="reserva-cata"
          className="mx-auto mt-14 sm:mt-20 max-w-3xl rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-8 md:p-10 shadow-sm"
        >
          <p className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#9A7B56]">
            Experiencia Ribera del Duero
          </p>
          <h3 className="mt-2 font-editorial text-3xl font-medium text-[#1A1615]">
            {TASTINGS_DATA.formHeading}
          </h3>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-[#4A1521]/30 bg-[#EAE3D9]/60 p-6">
              <p className="font-editorial text-2xl font-medium text-[#4A1521]">
                Solicitud recibida
              </p>
              <p className="mt-2 text-sm text-[#5C5349]">
                {TASTINGS_DATA.formDisclaimer} También puedes confirmar por teléfono en{' '}
                <a
                  href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                  className="font-semibold text-[#4A1521] underline"
                >
                  {SITE_METADATA.contact.primaryPhoneFormatted}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">Nombre</span>
                  <input
                    required
                    type="text"
                    placeholder="Escribe tu nombre"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1A1615]">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="Introduce tu email"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#1A1615]">Asunto</span>
                <select
                  defaultValue="Catas"
                  className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                >
                  <option value="Catas">Catas</option>
                  <option value="Alojamientos">Alojamientos</option>
                  <option value="Eventos y celebraciones">Eventos y celebraciones</option>
                  <option value="Peticiones especiales">Peticiones especiales</option>
                  <option value="Otros">Otros</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#1A1615]">Mensaje</span>
                <textarea
                  rows={4}
                  required
                  placeholder="Indícanos fecha deseada, número de personas y si asisten niños..."
                  className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                />
              </label>

              <p className="text-xs leading-relaxed text-[#5C5349]">
                {TASTINGS_DATA.formDisclaimer}
              </p>

              <button
                type="submit"
                className="w-full rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C] cursor-pointer"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>

      <LightboxGallery
        images={TASTINGS_DATA.galleryImages}
        activeIndex={lightboxIdx}
        title={TASTINGS_DATA.galleryTitle}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
