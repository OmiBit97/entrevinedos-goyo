import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, MapPin, Phone, Mail } from 'lucide-react';
import { ACCOMMODATIONS } from '../../data/accommodations';
import { SITE_METADATA } from '../../data/siteMetadata';

export const LuxuryFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#D8CFC2]/20 bg-[#141110] text-[#F6F3EE]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Columna de Marca y Dirección */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src={SITE_METADATA.assets.logoFooter}
                alt="Finca Entreviñedos - Bodegas Marcos"
                className="h-11 w-auto brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#D8CFC2]/80">
              {SITE_METADATA.metaDescription}
            </p>
            <div className="space-y-2 text-xs text-[#D8CFC2]/80">
              <a
                href={SITE_METADATA.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#C5A572] transition"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
                <span>
                  {SITE_METADATA.contact.addressLine1} · {SITE_METADATA.contact.addressLine2}
                </span>
              </a>
              <a
                href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                className="flex items-center gap-2 hover:text-[#C5A572] transition"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
                <span>
                  {SITE_METADATA.contact.primaryPhoneFormatted} |{' '}
                  {SITE_METADATA.contact.secondaryPhoneFormatted}
                </span>
              </a>
              <a
                href={`mailto:${SITE_METADATA.contact.email}`}
                className="flex items-center gap-2 hover:text-[#C5A572] transition"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
                <span>{SITE_METADATA.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Navegación y Accesos Directos */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D8CFC2]/85">
              <li>
                <Link to="/" className="hover:text-[#C5A572] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/alojamientos" className="hover:text-[#C5A572] transition">
                  Alojamientos
                </Link>
              </li>
              <li>
                <Link to="/lafinca" className="hover:text-[#C5A572] transition">
                  La Finca
                </Link>
              </li>
              <li>
                <Link to="/catas" className="hover:text-[#C5A572] transition">
                  Catas
                </Link>
              </li>
              <li>
                <Link to="/bodega" className="hover:text-[#C5A572] transition">
                  La Bodega
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-[#C5A572] transition">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-[#C5A572] transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Casas y Alojamientos */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              Casas y alojamientos
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-[#D8CFC2]/85">
              {ACCOMMODATIONS.map((acc) => (
                <li key={acc.slug}>
                  <Link
                    to={`/alojamientos/${acc.slug}`}
                    className="hover:text-[#C5A572] transition"
                  >
                    {acc.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                to="/reserva-finca"
                className="rounded-full bg-[#4A1521] px-3.5 py-1.5 text-[11px] font-medium text-[#F6F3EE] hover:bg-[#631D2C]"
              >
                Reserva en la Finca
              </Link>
              <Link
                to="/reserva-muralla"
                className="rounded-full border border-[#D8CFC2]/30 px-3.5 py-1.5 text-[11px] font-medium text-[#F6F3EE] hover:border-[#C5A572]"
              >
                Reserva en La Muralla
              </Link>
            </div>
          </div>

          {/* Reservas, Experiencias y Políticas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              Reservas &amp; Políticas
            </h3>
            <ul className="space-y-2 text-xs text-[#D8CFC2]/85">
              <li>
                <Link
                  to="/reserva-finca"
                  className="inline-flex items-center gap-1.5 text-[#C5A572] hover:underline"
                >
                  <CalendarCheck className="h-3.5 w-3.5" />
                  Motor Directo · Finca Entreviñedos
                </Link>
              </li>
              <li>
                <Link to="/reserva-muralla" className="hover:text-[#C5A572] transition">
                  Motor Directo · Casco Histórico La Muralla
                </Link>
              </li>
              <li>
                <Link to="/catas" className="hover:text-[#C5A572] transition">
                  Catas de Vino con Magia
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-[#C5A572] transition">
                  Bodas, Eventos &amp; Catering
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-[#C5A572] transition">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="hover:text-[#C5A572] transition">
                  Política de Privacidad
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <p className="mb-2 font-technical text-[10px] uppercase tracking-[0.2em] text-[#D8CFC2]/60">
                ¡Siguenos en Redes!
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <a
                  href={SITE_METADATA.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 hover:border-[#C5A572] hover:text-[#C5A572] transition"
                >
                  Instagram
                </a>
                <a
                  href={SITE_METADATA.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 hover:border-[#C5A572] hover:text-[#C5A572] transition"
                >
                  TikTok
                </a>
                <a
                  href={SITE_METADATA.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 hover:border-[#C5A572] hover:text-[#C5A572] transition"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-xs text-[#D8CFC2]/60 md:flex-row md:text-left">
          <p>{SITE_METADATA.copyright}</p>
          <p className="font-technical text-[10px] tracking-wider uppercase break-words">
            {SITE_METADATA.contact.coordinates}
          </p>
        </div>
      </div>
    </footer>
  );
};
