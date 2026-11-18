import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { LA_FINCA_DATA } from '../data/estateAndEvents';
import { FAQS } from '../data/faqsAndPolicies';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { EditorialAccordion } from '../components/ui/EditorialAccordion';
import { OptimizedImage } from '../components/ui/OptimizedImage';

export const EstatePage: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const faqItems = useMemo(
    () =>
      FAQS.map((f, idx) => ({
        id: `finca-faq-${idx}`,
        title: f.question,
        paragraphs: f.answer,
        badge: String(idx + 1).padStart(2, '0'),
      })),
    [],
  );

  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* Hero */}
      <section className="relative flex min-h-[52vh] sm:min-h-[62vh] items-end overflow-hidden bg-[#141110] pt-28 sm:pt-32 pb-12 sm:pb-16 text-[#F6F3EE]">
        <div className="absolute inset-0">
          <OptimizedImage
            src={LA_FINCA_DATA.heroImages[0]}
            alt={LA_FINCA_DATA.title}
            aspectClassName="h-full w-full"
            priority
            className="opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/45 to-[#141110]/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C5A572]">
            {LA_FINCA_DATA.introTitle} · Peñafiel
          </p>
          <h1 className="mt-3 font-editorial text-4xl sm:text-5xl font-medium md:text-6xl lg:text-7xl">
            {LA_FINCA_DATA.title}
          </h1>
        </div>
      </section>

      {/* Zonas Comunes Intro */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
              {LA_FINCA_DATA.introTitle}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C5349]">
              {LA_FINCA_DATA.introText}
            </p>
            <div className="pt-2">
              <Link
                to="/alojamientos"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
              >
                {LA_FINCA_DATA.ctaReserve}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-3">
            <OptimizedImage
              src={LA_FINCA_DATA.heroImages[1]}
              alt="Entorno de Finca Entreviñedos"
              aspectClassName="aspect-[4/3] rounded-2xl border border-[#D8CFC2]"
            />
            <OptimizedImage
              src={LA_FINCA_DATA.heroImages[2]}
              alt="Piscina de Finca Entreviñedos"
              aspectClassName="aspect-[4/3] rounded-2xl border border-[#D8CFC2]"
            />
          </div>
        </div>

        {/* 5 Espacios de la Finca */}
        <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-12">
          {LA_FINCA_DATA.spaces.map((space, idx) => (
            <div
              key={space.id}
              className="grid grid-cols-1 items-center gap-6 sm:gap-8 rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-6 md:p-8 lg:grid-cols-12"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <OptimizedImage
                  src={space.image}
                  alt={space.title}
                  aspectClassName="aspect-[16/10] rounded-xl"
                />
              </div>
              <div className={`lg:col-span-6 space-y-3 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#9A7B56]">
                  0{idx + 1} · Espacio Entreviñedos
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
                  {space.title}
                </h3>
                {space.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-[#5C5349]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Acceso al Mapa Interactivo 3D Full-Screen */}
      <section className="cv-auto border-y border-[#D8CFC2] bg-[#141110] py-12 sm:py-16 text-[#F6F3EE]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center md:px-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 font-technical text-[11px] uppercase tracking-[0.22em] text-[#C5A572]">
              <Compass className="h-3.5 w-3.5" />
              Cartografía Espacial · Finca &amp; Peñafiel
            </p>
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium">
              Recorre cada alojamiento, bodega y zona común en vista interactiva
            </h3>
            <p className="text-sm text-[#D8CFC2]/85">
              Cambia entre iluminación solar de amanecer, atardecer o noche, filtra por estancias o plano cenital táctil en una experiencia diseñada a pantalla completa.
            </p>
          </div>
          <Link
            to="/mapa-finca"
            className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#C5A572] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#141110] shadow-lg transition hover:bg-[#d8b885]"
          >
            <Compass className="h-4 w-4" />
            Ver mapa interactivo de la finca
          </Link>
        </div>
      </section>

      {/* Galería de Finca */}
      <section className="cv-auto mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:px-8">
        <div className="mb-6 sm:mb-8">
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
            {LA_FINCA_DATA.galleryTitle}
          </h3>
          <p className="mt-1 text-sm text-[#5C5349]">{LA_FINCA_DATA.gallerySubtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {LA_FINCA_DATA.galleryImages.map((img, idx) => (
            <OptimizedImage
              key={img}
              src={img}
              alt={`Finca Entreviñedos galería ${idx + 1}`}
              aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
              className="hover:scale-105"
              onClick={() => setLightboxIdx(idx)}
            />
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="cv-auto border-t border-[#D8CFC2] bg-[#EAE3D9]/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 text-center">
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-[#4A1521]" />
            <h3 className="font-editorial text-3xl font-medium text-[#1A1615]">
              Preguntas Frecuentes
            </h3>
          </div>
          <EditorialAccordion items={faqItems} defaultOpenIndex={null} />
        </div>
      </section>

      <LightboxGallery
        images={LA_FINCA_DATA.galleryImages}
        activeIndex={lightboxIdx}
        title={LA_FINCA_DATA.galleryTitle}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
