import React, { useMemo, useState } from 'react';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { FAQS } from '../data/faqsAndPolicies';
import { SITE_METADATA } from '../data/siteMetadata';
import { EditorialAccordion } from '../components/ui/EditorialAccordion';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const faqItems = useMemo(
    () =>
      FAQS.map((f, idx) => ({
        id: `contact-faq-${idx}`,
        title: f.question,
        paragraphs: f.answer,
        badge: String(idx + 1).padStart(2, '0'),
      })),
    [],
  );

  return (
    <main className="bg-[#F6F3EE] pt-24 sm:pt-28 text-[#1A1615]">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 md:px-8">
        <div className="max-w-3xl">
          <p className="font-technical text-[11px] uppercase tracking-[0.24em] text-[#9A7B56]">
            Atención al cliente
          </p>
          <h1 className="mt-2 font-editorial text-4xl sm:text-5xl font-medium text-[#1A1615] md:text-6xl">
            Contacta con nosotros
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5C5349]">
            En Finca Entreviñedos estaremos encantados de atenderte. Escríbenos, llámanos o ven a
            conocernos: te ayudaremos a planear tu estancia, reservar una cata mágica o resolver
            cualquier duda. ¡Será un placer recibirte en Peñafiel!
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Información Corporativa */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#D8CFC2] bg-[#141110] p-5 sm:p-8 text-[#F6F3EE] space-y-5 sm:space-y-6">
              <div>
                <p className="font-technical text-[10px] uppercase tracking-[0.22em] text-[#C5A572]">
                  Finca Entreviñedos · Bodegas Marcos
                </p>
                <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-medium">
                  Finca Entreviñedos
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#D8CFC2]/85">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#C5A572]" />
                  <div>
                    <p className="font-semibold text-[#F6F3EE]">Dirección</p>
                    <p>{SITE_METADATA.contact.addressLine1}</p>
                    <p>{SITE_METADATA.contact.addressLine2}</p>
                    <a
                      href={SITE_METADATA.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs text-[#C5A572] hover:underline"
                    >
                      Abrir en Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[#C5A572]" />
                  <div>
                    <p className="font-semibold text-[#F6F3EE]">Teléfono</p>
                    <p className="text-xs text-[#D8CFC2]/70">Reservas, alojamientos y catas:</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <a
                        href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                        className="text-[#C5A572] hover:underline"
                      >
                        {SITE_METADATA.contact.primaryPhoneFormatted}
                      </a>
                      <span className="text-white/30">|</span>
                      <a
                        href={`tel:${SITE_METADATA.contact.secondaryPhone}`}
                        className="text-[#C5A572] hover:underline"
                      >
                        {SITE_METADATA.contact.secondaryPhoneFormatted}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-[#C5A572]" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#F6F3EE]">Email</p>
                    <a
                      href={`mailto:${SITE_METADATA.contact.email}`}
                      className="text-[#C5A572] break-all sm:break-normal hover:underline"
                    >
                      {SITE_METADATA.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 text-xs text-[#D8CFC2]/70">
                <p>Horario de atención: {SITE_METADATA.contact.supportHours}</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7 rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-8 md:p-10 shadow-sm">
            {submitted ? (
              <div className="rounded-xl bg-[#EAE3D9]/65 p-6">
                <h2 className="font-editorial text-3xl font-medium text-[#4A1521]">
                  Mensaje enviado
                </h2>
                <p className="mt-2 text-sm text-[#5C5349]">
                  Hemos recibido tu consulta. Te atenderemos muy pronto a través de nuestro correo{' '}
                  {SITE_METADATA.contact.email} o por teléfono.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#1A1615]">Nombre</span>
                    <input
                      required
                      type="text"
                      placeholder="Escribe tu nombre"
                      className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#1A1615]">Email</span>
                    <input
                      required
                      type="email"
                      placeholder="Introduce tu email"
                      className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#1A1615]">Asunto</span>
                  <select
                    defaultValue="Alojamientos"
                    className="w-full rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] px-4 py-3 text-sm focus:border-[#4A1521] focus:outline-none"
                  >
                    <option value="Alojamientos">Alojamientos</option>
                    <option value="Catas">Catas</option>
                    <option value="Eventos y celebraciones">Eventos y celebraciones</option>
                    <option value="Peticiones especiales">Peticiones especiales</option>
                    <option value="Deja un comentario">Deja un comentario</option>
                    <option value="Otros">Otros</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-[#1A1615]">Mensaje</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="¿En qué podemos ayudarte?"
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
      </section>

      {/* Preguntas Frecuentes */}
      <section className="cv-auto border-t border-[#D8CFC2] bg-[#EAE3D9]/45 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1A1615]">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-sm text-[#5C5349]">
              Todo lo que necesitas saber, puedes consultarlo en estas preguntas frecuentes.
            </p>
          </div>
          <EditorialAccordion items={faqItems} defaultOpenIndex={0} />
        </div>
      </section>
    </main>
  );
};
