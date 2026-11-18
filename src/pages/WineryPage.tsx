import React, { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wine } from 'lucide-react';
import { WINERY_DATA } from '../data/wineryAndTastings';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { OptimizedImage } from '../components/ui/OptimizedImage';

const LiquidTerroirCanvas = lazy(() => import('../webgl/scenes/LiquidTerroirCanvas'));

export const WineryPage: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <main className="bg-[#141110] text-[#F6F3EE]">
      {/* Hero Bodega con Shader Líquido Gran Reserva */}
      <section className="relative flex min-h-[54vh] sm:min-h-[65vh] items-end overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0">
          <OptimizedImage
            src={WINERY_DATA.heroImages[0]}
            alt="Bodegas Marcos en Ribera del Duero"
            aspectClassName="h-full w-full"
            priority
            className="opacity-45"
          />
          <Suspense fallback={null}>
            <LiquidTerroirCanvas className="absolute inset-0 h-full w-full" intensity={0.65} />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/40 to-[#141110]/80" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="inline-flex items-center gap-2 font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C5A572]">
            <Wine className="h-3.5 w-3.5 shrink-0" />
            {WINERY_DATA.eyebrow}
          </p>
          <h1 className="mt-3 font-editorial text-4xl sm:text-5xl font-medium md:text-6xl lg:text-7xl">
            {WINERY_DATA.title}
          </h1>
        </div>
      </section>

      {/* Nuestra Historia (en Piedra Caliza para máximo contraste editorial) */}
      <section className="bg-[#F6F3EE] py-14 sm:py-20 text-[#1A1615]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#9A7B56]">
                Bodegas Marcos · Peñafiel
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
                {WINERY_DATA.storyHeading}
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#5C5349]">
                {WINERY_DATA.storyParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  to="/catas"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
                >
                  Reservar Cata con Magia
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              <OptimizedImage
                src={WINERY_DATA.heroImages[1]}
                alt="Espacios de Bodegas Marcos"
                aspectClassName="aspect-[4/3] rounded-2xl border border-[#D8CFC2]"
              />
              <OptimizedImage
                src={WINERY_DATA.heroImages[2]}
                alt="Bodega y crianza en Peñafiel"
                aspectClassName="aspect-[4/3] lg:aspect-[16/9] rounded-2xl border border-[#D8CFC2]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Características del Terroir */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#C5A572]">
            Terroir de Peñafiel
          </p>
          <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium text-[#F6F3EE] md:text-5xl">
            {WINERY_DATA.characteristicsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WINERY_DATA.terroirPillars.map((pillar) => (
            <article
              key={pillar.id}
              className="overflow-hidden rounded-2xl border border-[#D8CFC2]/15 bg-[#1B1715]"
            >
              <OptimizedImage
                src={pillar.image}
                alt={pillar.imageAlt}
                aspectClassName="aspect-[16/10]"
              />
              <div className="p-5 sm:p-6">
                <h4 className="font-editorial text-xl sm:text-2xl font-medium text-[#C5A572]">
                  {pillar.title}
                </h4>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#D8CFC2]/85">
                  {pillar.description.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Nuestros Vinos */}
      <section className="border-t border-white/10 bg-[#EAE3D9] py-14 sm:py-20 text-[#1A1615]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 sm:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#4A1521]">
                {WINERY_DATA.winesSection.eyebrow}
              </p>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
                {WINERY_DATA.winesSection.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5C5349]">
                {WINERY_DATA.winesSection.summaryCardDescription}
              </p>
            </div>
            <Link
              to="/contacto"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#1A1615] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#4A1521]"
            >
              Consultar Venta y Envíos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {WINERY_DATA.winesSection.ranges.map((wine) => (
              <div
                key={wine.id}
                className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-[#F6F3EE] shadow-sm"
              >
                <OptimizedImage
                  src={wine.image}
                  alt={wine.name}
                  aspectClassName="aspect-[4/3]"
                />
                <div className="p-5 sm:p-6">
                  <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#9A7B56]">
                    {wine.subtitle}
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-medium text-[#4A1521]">
                    {wine.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C5349]">{wine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería Bodega */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F6F3EE] md:text-4xl">
            {WINERY_DATA.galleryTitle}
          </h2>
          <p className="mt-1 text-sm text-[#D8CFC2]/75">{WINERY_DATA.gallerySubtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 md:grid-cols-5">
          {WINERY_DATA.galleryImages.map((img, idx) => (
            <OptimizedImage
              key={img}
              src={img}
              alt={`Bodegas Marcos galería ${idx + 1}`}
              aspectClassName="aspect-square rounded-xl border border-white/15"
              className="hover:scale-105"
              onClick={() => setLightboxIdx(idx)}
            />
          ))}
        </div>
      </section>

      <LightboxGallery
        images={WINERY_DATA.galleryImages}
        activeIndex={lightboxIdx}
        title={WINERY_DATA.galleryTitle}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
