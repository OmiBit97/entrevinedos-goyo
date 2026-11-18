import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { EVENTS_DATA } from '../data/estateAndEvents';
import { SITE_METADATA } from '../data/siteMetadata';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { OptimizedImage } from '../components/ui/OptimizedImage';

export const EventsPage: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-[#F6F3EE] text-[#1A1615]">
      {/* Hero Eventos */}
      <section className="relative flex min-h-[54vh] sm:min-h-[64vh] items-end overflow-hidden bg-[#141110] pt-28 sm:pt-32 pb-12 sm:pb-16 text-[#F6F3EE]">
        <div className="absolute inset-0">
          <OptimizedImage
            src={EVENTS_DATA.heroImages[0]}
            alt={EVENTS_DATA.title}
            aspectClassName="h-full w-full"
            priority
            className="opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-[#141110]/45 to-[#141110]/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <p className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#C5A572]">
            {EVENTS_DATA.eyebrow}
          </p>
          <h1 className="mt-3 font-editorial text-4xl sm:text-5xl font-medium md:text-6xl lg:text-7xl">
            {EVENTS_DATA.title}
          </h1>
        </div>
      </section>

      {/* Servicios y Eventos */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8">
        <div className="max-w-3xl">
          <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#9A7B56]">
            {EVENTS_DATA.sectionEyebrow}
          </p>
          <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615] md:text-5xl">
            {EVENTS_DATA.sectionTitle}
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {EVENTS_DATA.categories.map((cat) => (
            <article
              key={cat.id}
              id={cat.id}
              className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white shadow-sm"
            >
              <OptimizedImage
                src={cat.image}
                alt={cat.title}
                aspectClassName="aspect-[16/10]"
              />
              <div className="p-5 sm:p-7">
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615]">
                  {cat.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-sm md:text-base leading-relaxed text-[#5C5349]">
                  {cat.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Galería de Eventos */}
      <section className="cv-auto border-y border-[#D8CFC2] bg-[#EAE3D9]/55 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1A1615] md:text-4xl">
            {EVENTS_DATA.galleryTitle}
          </h3>
          <p className="mt-1 mb-6 sm:mb-8 text-sm text-[#5C5349]">{EVENTS_DATA.gallerySubtitle}</p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {EVENTS_DATA.galleryImages.map((img, idx) => (
              <OptimizedImage
                key={img}
                src={img}
                alt={`Eventos Finca Entreviñedos ${idx + 1}`}
                aspectClassName="aspect-[4/3] rounded-xl border border-[#D8CFC2]"
                className="hover:scale-105"
                onClick={() => setLightboxIdx(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detalle Servicio de Catering y Alquiler de Bicicletas */}
      <section id="catering" className="cv-auto scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 md:px-8 space-y-12 sm:space-y-16">
        <div>
          <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#9A7B56]">
            {EVENTS_DATA.servicesTitle}
          </p>
          <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615] md:text-5xl">
            {EVENTS_DATA.cateringDetail.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#5C5349]">
            {EVENTS_DATA.servicesSubtitle}
          </p>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {EVENTS_DATA.cateringDetail.blocks.map((block) => (
              <div
                key={block.heading}
                className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white"
              >
                <OptimizedImage
                  src={block.image}
                  alt={block.heading}
                  aspectClassName="aspect-[16/10]"
                />
                <div className="p-5 sm:p-6">
                  <h3 className="font-editorial text-2xl font-medium text-[#4A1521]">
                    {block.heading}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5C5349]">{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alquiler de Bicicletas */}
        <div
          id="bicicletas"
          className="scroll-mt-24 grid grid-cols-1 items-center gap-6 sm:gap-8 rounded-2xl border border-[#D8CFC2] bg-[#141110] p-5 sm:p-6 text-[#F6F3EE] md:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <OptimizedImage
              src={EVENTS_DATA.bicycleDetail.image}
              alt={EVENTS_DATA.bicycleDetail.title}
              aspectClassName="aspect-[16/10] rounded-xl"
            />
          </div>
          <div className="lg:col-span-6 space-y-3">
            <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#C5A572]">
              {EVENTS_DATA.bicycleDetail.eyebrow}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium">
              {EVENTS_DATA.bicycleDetail.title}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#D8CFC2]/85">
              {EVENTS_DATA.bicycleDetail.description}
            </p>
          </div>
        </div>
      </section>

      {/* Formulario Contacta para tu Evento */}
      <section className="cv-auto border-t border-[#D8CFC2] bg-[#EAE3D9]/55 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
                {EVENTS_DATA.contactHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#5C5349]">{EVENTS_DATA.contactSubtitle}</p>

              <div className="space-y-4 rounded-2xl border border-[#D8CFC2] bg-[#F6F3EE] p-5 sm:p-6 text-sm text-[#5C5349]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#4A1521]" />
                  <div>
                    <p className="font-semibold text-[#1A1615]">Dirección</p>
                    <p>{SITE_METADATA.contact.addressLine1}</p>
                    <p>{SITE_METADATA.contact.addressLine2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[#4A1521]" />
                  <div>
                    <p className="font-semibold text-[#1A1615]">
                      Teléfono · Reservas, alojamientos y catas:
                    </p>
                    <a
                      href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                      className="text-[#4A1521] hover:underline"
                    >
                      {SITE_METADATA.contact.primaryPhoneFormatted} |{' '}
                      {SITE_METADATA.contact.secondaryPhoneFormatted}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-[#4A1521]" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1A1615]">Email</p>
                    <a
                      href={`mailto:${SITE_METADATA.contact.email}`}
                      className="text-[#4A1521] break-all sm:break-normal hover:underline"
                    >
                      {SITE_METADATA.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="rounded-xl bg-[#EAE3D9]/60 p-6">
                  <h3 className="font-editorial text-2xl font-medium text-[#4A1521]">
                    Consulta enviada
                  </h3>
                  <p className="mt-2 text-sm text-[#5C5349]">
                    Gracias por contactar con Finca Entreviñedos. Nuestro equipo te responderá a la
                    mayor brevedad posible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium">Nombre</span>
                      <input
                        required
                        type="text"
                        placeholder="Escribe tu nombre"
                        className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium">Email</span>
                      <input
                        required
                        type="email"
                        placeholder="Introduce tu email"
                        className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium">Asunto</span>
                    <select
                      defaultValue="Eventos y celebraciones"
                      className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                    >
                      <option value="Eventos y celebraciones">Eventos y celebraciones</option>
                      <option value="Alojamientos">Alojamientos</option>
                      <option value="Catas">Catas</option>
                      <option value="Peticiones especiales">Peticiones especiales</option>
                      <option value="Deja un comentario">Deja un comentario</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium">Mensaje</span>
                    <textarea
                      required
                      rows={4}
                      placeholder="Cuéntanos detalles del evento, fecha estimada y número de invitados..."
                      className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#4A1521] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F6F3EE] transition hover:bg-[#631D2C] cursor-pointer"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <LightboxGallery
        images={EVENTS_DATA.galleryImages}
        activeIndex={lightboxIdx}
        title={EVENTS_DATA.galleryTitle}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </main>
  );
};
