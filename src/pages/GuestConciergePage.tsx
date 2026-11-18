import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  ShoppingBag,
  Utensils,
  Wifi,
} from 'lucide-react';
import { GUEST_PORTAL_DATA } from '../data/guestConcierge';
import { HOUSE_RULES } from '../data/faqsAndPolicies';
import { SITE_METADATA } from '../data/siteMetadata';
import { EditorialAccordion } from '../components/ui/EditorialAccordion';
import { LightboxGallery } from '../components/accommodations/LightboxGallery';
import { OptimizedImage } from '../components/ui/OptimizedImage';

export type ConciergeViewKind =
  | 'huespedes'
  | 'muralla'
  | 'check-in'
  | 'normas'
  | 'clave-wifi'
  | 'restauracion'
  | 'tiendas'
  | 'transporte'
  | 'penafiel'
  | 'catas-marcos'
  | 'catering';

interface GuestConciergePageProps {
  view: ConciergeViewKind;
}

export const GuestConciergePage: React.FC<GuestConciergePageProps> = ({ view }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [gateCodeRevealed, setGateCodeRevealed] = useState(false);
  const [mapZoomOpen, setMapZoomOpen] = useState<number | null>(null);

  // Mantener páginas de huéspedes privadas y excluidas de buscadores
  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const prevContent = robotsMeta?.getAttribute('content') || 'max-image-preview:large';
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }
    return () => {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', prevContent);
      }
    };
  }, []);

  const copyToClipboard = (value: string, key: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  };

  if (view === 'huespedes' || view === 'muralla') {
    const isMuralla = view === 'muralla';
    const tiles = GUEST_PORTAL_DATA.tiles.filter((t) => (isMuralla ? t.includeInMuralla : true));

    return (
      <main className="min-h-screen bg-[#F6F3EE] pt-24 sm:pt-28 pb-16 sm:pb-20 text-[#1A1615]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <img
              src={SITE_METADATA.assets.logoConcierge}
              alt="Finca Entreviñedos"
              className="mx-auto h-12 sm:h-14 w-auto mb-5 sm:mb-6"
            />
            <p className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#9A7B56]">
              {GUEST_PORTAL_DATA.welcomeSubtitleEn}
            </p>
            <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
              {isMuralla
                ? GUEST_PORTAL_DATA.murallaWelcomeTitle
                : GUEST_PORTAL_DATA.fincaWelcomeTitle}
            </h1>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-2">
            {tiles.map((tile) => (
              <Link
                key={tile.route + tile.title}
                to={tile.route}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#D8CFC2] bg-white p-4 sm:p-5 transition hover:border-[#4A1521] hover:shadow-md"
              >
                <div className="min-w-0">
                  <h2 className="font-editorial text-lg sm:text-xl font-semibold text-[#1A1615] group-hover:text-[#4A1521]">
                    {tile.title}
                  </h2>
                  <p className="mt-0.5 font-technical text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9A7B56]">
                    {tile.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#4A1521] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#D8CFC2] bg-[#EAE3D9]/70 p-5 sm:p-8 text-center sm:text-left">
            <div>
              <p className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#4A1521]">
                Asistencia 24h durante tu estancia
              </p>
              <p className="mt-1 font-editorial text-xl sm:text-2xl font-medium text-[#1A1615]">
                ¿Necesitas ayuda en la llegada?
              </p>
            </div>
            <a
              href={`tel:${SITE_METADATA.contact.primaryPhone}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] transition hover:bg-[#631D2C]"
            >
              <Phone className="h-4 w-4" />
              {SITE_METADATA.contact.primaryPhoneFormatted}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F3EE] pt-24 sm:pt-28 pb-16 sm:pb-20 text-[#1A1615]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          to="/huespedes"
          className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-[0.16em] text-[#5C5349] hover:text-[#4A1521]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Portal de Huéspedes
        </Link>

        {/* GUÍA DIGITAL CHECK-IN */}
        {view === 'check-in' && (
          <div className="mt-6 space-y-6 sm:space-y-8">
            <div className="rounded-2xl bg-[#141110] p-5 sm:p-8 text-[#F6F3EE]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A572]/40 bg-[#4A1521]/40 px-3 py-1 font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {GUEST_PORTAL_DATA.checkInGuide.badge}
              </span>
              <h1 className="mt-4 font-editorial text-3xl sm:text-4xl font-medium">
                {GUEST_PORTAL_DATA.checkInGuide.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#D8CFC2]/85">
                {GUEST_PORTAL_DATA.checkInGuide.subtitle}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={GUEST_PORTAL_DATA.checkInGuide.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#C5A572] px-5 py-2.5 text-xs font-semibold text-[#141110]"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Cómo llegar
                </a>
                <a
                  href={`tel:${SITE_METADATA.contact.primaryPhone}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-xs font-medium text-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Llamar a Finca
                </a>
              </div>
            </div>

            {/* Caja Interactiva Código Puerta Peatonal */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-[#4A1521]/30 bg-[#EAE3D9]/70 p-5 sm:p-6">
              <div>
                <p className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#4A1521]">
                  Código Puerta Peatonal (Paso 1.2)
                </p>
                <p className="mt-1 font-technical text-3xl font-semibold tracking-[0.22em] text-[#1A1615]">
                  {gateCodeRevealed ? GUEST_PORTAL_DATA.checkInGuide.gateCode : '••••'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGateCodeRevealed((v) => !v)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-5 py-3 text-xs font-semibold text-[#F6F3EE] cursor-pointer"
              >
                {gateCodeRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {gateCodeRevealed ? 'Ocultar Código' : 'Desvelar Código'}
              </button>
            </div>

            <EditorialAccordion
              defaultOpenIndex={0}
              items={GUEST_PORTAL_DATA.checkInGuide.steps.map((st) => {
                const stepImages = st.subItems.filter((sub) => Boolean(sub.image));
                return {
                  id: st.id,
                  badge: st.number,
                  title: `${st.title} — ${st.subtitle}`,
                  paragraphs: st.subItems.map((sub) => `${sub.code} ${sub.title}: ${sub.description}`),
                  children:
                    stepImages.length > 0 ? (
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {stepImages.map((sub) => (
                          <div
                            key={sub.code}
                            className="overflow-hidden rounded-xl border border-[#D8CFC2] bg-white"
                          >
                            {sub.image && (
                              <OptimizedImage
                                src={sub.image}
                                alt={sub.imageAlt || sub.title}
                                aspectClassName="aspect-[16/10]"
                              />
                            )}
                            <div className="p-3">
                              <p className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                                Paso {sub.code}
                              </p>
                              <p className="font-editorial text-base font-medium text-[#1A1615]">
                                {sub.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : undefined,
                };
              })}
            />
          </div>
        )}

        {/* NORMAS DEL ALOJAMIENTO */}
        {view === 'normas' && (
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-technical text-[11px] uppercase tracking-[0.22em] text-[#9A7B56]">
                {HOUSE_RULES.subtitle}
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
                {HOUSE_RULES.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5C5349]">{HOUSE_RULES.intro}</p>
            </div>

            <div className="space-y-4">
              {HOUSE_RULES.rules.map((r) => (
                <div
                  key={r.number}
                  className="rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-6"
                >
                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#4A1521]">
                    {r.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C5349]">{r.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#4A1521]/30 bg-[#EAE3D9]/70 p-5 sm:p-6 text-sm text-[#1A1615]">
              <p className="font-medium">{HOUSE_RULES.closingWarning}</p>
              <p className="mt-2 text-[#5C5349]">{HOUSE_RULES.closingThanks}</p>
            </div>
          </div>
        )}

        {/* CLAVE WIFI */}
        {view === 'clave-wifi' && (
          <div className="mt-6 rounded-2xl border border-[#D8CFC2] bg-white p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 sm:gap-3 text-[#4A1521]">
              <Wifi className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              <span className="font-technical text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                {GUEST_PORTAL_DATA.wifi.subtitle}
              </span>
            </div>
            <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium">
              {GUEST_PORTAL_DATA.wifi.title}
            </h1>
            <p className="mt-2 text-sm text-[#5C5349]">{GUEST_PORTAL_DATA.wifi.instruction}</p>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#D8CFC2] bg-[#F6F3EE] p-4 sm:p-5">
                <div className="min-w-0">
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#9A7B56]">
                    {GUEST_PORTAL_DATA.wifi.networkLabel}
                  </span>
                  <p className="mt-0.5 font-technical text-base sm:text-lg font-semibold break-all text-[#1A1615]">
                    {GUEST_PORTAL_DATA.wifi.ssid}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GUEST_PORTAL_DATA.wifi.ssid, 'ssid')}
                  className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#1A1615] px-4 py-2.5 text-xs font-medium cursor-pointer transition hover:bg-[#1A1615] hover:text-[#F6F3EE]"
                >
                  {copiedKey === 'ssid' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedKey === 'ssid' ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#4A1521]/30 bg-[#EAE3D9]/55 p-4 sm:p-5">
                <div className="min-w-0">
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#4A1521]">
                    Contraseña Wi-Fi
                  </span>
                  <p className="mt-0.5 font-technical text-lg sm:text-xl font-semibold break-all text-[#4A1521]">
                    {GUEST_PORTAL_DATA.wifi.password}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(GUEST_PORTAL_DATA.wifi.password, 'pass')}
                  className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#4A1521] px-4 py-2.5 text-xs font-medium text-[#F6F3EE] cursor-pointer transition hover:bg-[#631D2C]"
                >
                  {copiedKey === 'pass' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedKey === 'pass' ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESTAURACIÓN */}
        {view === 'restauracion' && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-[#9A7B56]">
              <Utensils className="h-4 w-4 shrink-0" />
              <span className="font-technical text-xs uppercase tracking-[0.2em]">
                {GUEST_PORTAL_DATA.restaurants.subtitle}
              </span>
            </div>
            <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
              {GUEST_PORTAL_DATA.restaurants.title}
            </h1>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GUEST_PORTAL_DATA.restaurants.items.map((rest) => (
                <div
                  key={rest.name}
                  className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white"
                >
                  <OptimizedImage
                    src={rest.image}
                    alt={rest.name}
                    aspectClassName="aspect-[4/3]"
                  />
                  <div className="p-4 sm:p-5">
                    <h2 className="font-editorial text-xl sm:text-2xl font-medium">{rest.name}</h2>
                    <a
                      href={`tel:${rest.phone.replace(/\s+/g, '')}`}
                      className="mt-2 flex items-center gap-1.5 font-technical text-xs text-[#4A1521] hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {rest.phone}
                    </a>
                    <a
                      href={rest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#5C5349] hover:text-[#1A1615]"
                    >
                      Ver ubicación / reseñas
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUPERMERCADOS Y TIENDAS */}
        {view === 'tiendas' && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-[#9A7B56]">
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span className="font-technical text-xs uppercase tracking-[0.2em]">
                {GUEST_PORTAL_DATA.shops.subtitle}
              </span>
            </div>
            <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
              {GUEST_PORTAL_DATA.shops.title}
            </h1>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
              {GUEST_PORTAL_DATA.shops.items.map((shop) => (
                <div
                  key={shop.name}
                  className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white"
                >
                  <OptimizedImage
                    src={shop.image}
                    alt={shop.name}
                    aspectClassName="aspect-[16/10]"
                  />
                  <div className="p-4 sm:p-5">
                    <h2 className="font-editorial text-xl sm:text-2xl font-medium">{shop.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAXIS Y AUTOBUSES */}
        {view === 'transporte' && (
          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#9A7B56]">
                <Bus className="h-4 w-4 shrink-0" />
                <span className="font-technical text-xs uppercase tracking-[0.2em]">
                  {GUEST_PORTAL_DATA.transport.subtitle}
                </span>
              </div>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
                {GUEST_PORTAL_DATA.transport.title}
              </h1>
            </div>

            <OptimizedImage
              src={GUEST_PORTAL_DATA.transport.heroImage}
              alt={GUEST_PORTAL_DATA.transport.title}
              aspectClassName="aspect-[16/9] sm:aspect-[21/9] rounded-2xl border border-[#D8CFC2]"
            />

            <div className="space-y-3">
              {GUEST_PORTAL_DATA.transport.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-[#D8CFC2] bg-white p-4 sm:p-5"
                >
                  <div>
                    <h2 className="font-editorial text-xl sm:text-2xl font-medium">{item.name}</h2>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#4A1521] hover:underline"
                      >
                        Web Autocares La Regional
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <a
                    href={`tel:${item.phone.replace(/\s+/g, '')}`}
                    className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-[#4A1521] px-5 py-2.5 font-technical text-xs text-[#F6F3EE]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {item.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAPA DE PEÑAFIEL */}
        {view === 'penafiel' && (
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#9A7B56]">
                {GUEST_PORTAL_DATA.penafielMap.subtitle}
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium">
                {GUEST_PORTAL_DATA.penafielMap.title}
              </h1>
            </div>
            <OptimizedImage
              src={GUEST_PORTAL_DATA.penafielMap.image}
              alt="Mapa de Peñafiel"
              aspectClassName="aspect-[4/3] rounded-2xl border border-[#D8CFC2]"
              onClick={() => setMapZoomOpen(0)}
            />
            <LightboxGallery
              images={[GUEST_PORTAL_DATA.penafielMap.image]}
              activeIndex={mapZoomOpen}
              title="Mapa de Peñafiel"
              onClose={() => setMapZoomOpen(null)}
              onChangeIndex={setMapZoomOpen}
            />
          </div>
        )}

        {/* CATAS MARCOS (RÁPIDA HUÉSPEDES) */}
        {view === 'catas-marcos' && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white">
            <OptimizedImage
              src={GUEST_PORTAL_DATA.catasMarcosQuick.image}
              alt={GUEST_PORTAL_DATA.catasMarcosQuick.heading}
              aspectClassName="aspect-[16/9]"
            />
            <div className="p-5 sm:p-8 space-y-3">
              <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#9A7B56]">
                {GUEST_PORTAL_DATA.catasMarcosQuick.subtitle}
              </p>
              <h1 className="font-editorial text-3xl sm:text-4xl font-medium">
                {GUEST_PORTAL_DATA.catasMarcosQuick.heading}
              </h1>
              <p className="text-sm sm:text-base text-[#5C5349]">
                {GUEST_PORTAL_DATA.catasMarcosQuick.description}
              </p>
              <p className="font-editorial text-lg sm:text-xl italic text-[#4A1521]">
                {GUEST_PORTAL_DATA.catasMarcosQuick.tagline}
              </p>
              <div className="pt-2">
                <Link
                  to="/catas"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE]"
                >
                  {GUEST_PORTAL_DATA.catasMarcosQuick.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CATERING (RÁPIDA HUÉSPEDES) */}
        {view === 'catering' && (
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#9A7B56]">
                {GUEST_PORTAL_DATA.cateringQuick.subtitle}
              </p>
              <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-medium">
                {GUEST_PORTAL_DATA.cateringQuick.heading}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#5C5349]">
                {GUEST_PORTAL_DATA.cateringQuick.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-3">
              {GUEST_PORTAL_DATA.cateringQuick.cards.map((c) => (
                <div
                  key={c.title}
                  className="overflow-hidden rounded-2xl border border-[#D8CFC2] bg-white"
                >
                  <OptimizedImage src={c.image} alt={c.title} aspectClassName="aspect-[4/3]" />
                  <div className="p-4 sm:p-5">
                    <h2 className="font-editorial text-xl sm:text-2xl font-medium">{c.title}</h2>
                    <p className="text-xs text-[#5C5349]">{c.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/eventos#catering"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4A1521] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F3EE]"
            >
              {GUEST_PORTAL_DATA.cateringQuick.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
