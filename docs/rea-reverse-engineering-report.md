# Informe de Ingeniería Inversa (REA) — `fincaentrevinedos.com`

**Fecha de auditoría:** 2026-11-17  
**Target:** `https://www.fincaentrevinedos.com/` (Framer Site ID: `687e0e110d5341029569b66ea95cd2f2d5b646954d5a8a262608fa5ad6cd70c6`, CDN Bundle `6fHXuIbp7MbXpgqunvP534`)  
**Motor de verificación:** REA (`reverse-engineer-anything`) MCP (`rea-playwright-browser-scenario` + `analyze_javascript_application`)

---

## 1. Registros de Evidencia REA Generados (`rea_evidence_bundle.json`)

| Evidence ID | Operación REA | Cobertura |
|---|---|---|
| `ev_ab1397756a0909e881f4ebdb7cb3716630b701113cfcc54d1307df6eca04f685` | `capture_browser_scenario` | Carga inicial de `/`, DOM completo (522.413 bytes), árbol de accesibilidad y traza de red. |
| `ev_5772c20723849e8d07a367d50097c018560b501915a90e9eb2057874c843427d` | `capture_browser_scenario` | Navegación por páginas principales (`/`, `/alojamientos`, `/alojamientos/malbec`, `/lafinca`, `/bodega`, `/catas`, `/eventos`, `/contacto`). |
| `ev_dbf339268feecba6cac70c216ee4d2b90525bd2d03fae3ba3b4b8f43241528cb` | `capture_browser_scenario` | Navegación por los 9 alojamientos restantes + páginas legales (`/cookies`, `/politica-privacidad`). |
| `ev_3c3a8da8d3af2e883c0e93e755d8e531827c962af7e704c93ff011f5e52a2576` | `capture_browser_scenario` | Páginas del motor de reservas `/reserva-finca` y `/reserva-muralla` (widget MisterPlan `id_casa=584391`, `idw=4367`). |
| `ev_cc53dbecf6dfbab106efb213760533cc056cc4118a36580febf12850c7c8cd22` | `capture_browser_scenario` | 12 rutas ocultas del portal de huéspedes descubiertas en `script_main.Cb78Vwvx.mjs` (`/huespedes`, `/muralla`, `/normas`, `/catas-marcos`, `/penafiel`, `/clave-wifi`, `/restauracion`, `/tiendas`, `/transporte`, `/catering`, `/check-in`, `/confirmacion.html`). |
| `ev_421fe1dd4b7ff35bb07095c0e4c459513dc81ee7d3e535b862741a4682493304` | `analyze_javascript_application` | Análisis estático AST de `script_main.Cb78Vwvx.mjs` sobre los 41 módulos ESM del bundle de Framer (37.420 nodos AST visitados, 187 hallazgos). |
| `ev_d231d1e7648edbd61839a9a762ac5c6d9c6fc786cc77e7cbe8a44a631ff8df74` | `inspect_analysis_view` | Proyección de resumen del grafo JS de `framer_bundle` (`sha256: 251780bf18623015138f2cd2edb29e961400fcbbec75f7050337e21170fe8c53`). |

---

## 2. Árbol Completo de Navegación Descubierto (34 Rutas)

### A. Rutas Públicas Principales (7)
- `/` — Inicio (`Bienvenidos a Finca Entreviñedos`)
- `/alojamientos` — Catálogo de Estancias (9 casas en Finca + 2 casas en Casco Histórico; 10 fichas individuales en CMS)
- `/lafinca` — La Finca (Zonas Comunes, Barbacoas, Columpios, Vistas, Piscina, El Viñedo)
- `/catas` — Catas en Bodegas Marcos (Cata Premium 25€/persona · 90 min · Magia en directo)
- `/bodega` — La Bodega (Historia de Bodegas Marcos, La Vendimia, El Suelo, El Clima, Los Viñedos, La Uva, Reserva/Crianza/Vendimia Seleccionada)
- `/eventos` — Eventos y Servicios (Bodas, Celebraciones, Catering, Pinchos variados, Alquiler de bicicletas)
- `/contacto` — Atención al cliente, mapa, teléfonos (`+34 625 184 872 | +34 655 344 177`), email (`info@bodegasmarcos.com`), FAQs

### B. Colección CMS de Alojamientos (`/alojamientos/:slug` — 10 Rutas)
1. `/alojamientos/malbec` — `1. Malbec` (60 m², 4–6 personas, 2 habitaciones)
2. `/alojamientos/merlot` — `2. Merlot` (60 m², 4–6 personas, 2 habitaciones)
3. `/alojamientos/bodegas-marcos` — `3. Bodegas Marcos` (95 m², 6–8 personas, 3 habitaciones, 2 baños)
4. `/alojamientos/tempranillo` — `4. Tempranillo` (70 m², 4–6 personas, 2 habitaciones, 2 baños)
5. `/alojamientos/verdejo` — `5. Verdejo` (40 m², 2–4 personas, Estudio adaptado PMR)
6. `/alojamientos/garnacha` — `6. Garnacha` (30 m², 2–4 personas, Estudio diáfano)
7. `/alojamientos/cabernet-sauvignon` — `7. Cabernet Sauvignon` (60 m², 4–6 personas, 2 habitaciones, 2 baños)
8. `/alojamientos/albillo` — `8. Albillo` (30 m², 2–4 personas, Estudio diáfano)
9. `/alojamientos/la-muralla-i` — `La Muralla I` (80 m², 6–8 personas, 3 habitaciones, 2 baños, Casco Histórico)
10. `/alojamientos/la-muralla-ii` — `La Muralla II` (120 m², 6–8 personas, 3 habitaciones, 2 baños, barbacoa privada + piscina desmontable en verano, Casco Histórico)

### C. Motor de Reservas y Confirmación (3 Rutas)
- `/reserva-finca` — Widget MisterPlan (`id_casa=584391`, `idw=4367`, `paramHash=dc0610a51f241c478736347ee435440ae011eb74`)
- `/reserva-muralla` — Widget MisterPlan (`id_casa=584391`, `idw=4367`, `paramHash=dc0610a51f241c478736347ee435440ae011eb74`)
- `/confirmacion.html` — Confirmación (`TBudgetV2Inc.php?activehead=1`)

### D. Portal Digital de Huéspedes / Rutas Ocultas (11 Rutas descubiertas en `script_main`)
- `/huespedes` — Portal de bienvenida para huéspedes de Finca Entreviñedos
- `/muralla` — Portal de bienvenida para huéspedes de Muralla I y Muralla II
- `/check-in` — Guía de Huésped Digital interactiva (5 pasos, código teclado peatonal `4821`, tarjetas de luz, QR Wi-Fi, piscina)
- `/normas` — 11 Normas del Alojamiento (Régimen Interno y fianza/penalización de 150 €)
- `/clave-wifi` — Red `FINCA_ENTREVINEDOS` / Contraseña `Desde1926`
- `/restauracion` — 9 restaurantes y asadores recomendados en Peñafiel con teléfono y enlace directo
- `/tiendas` — 5 supermercados y tiendas locales (`Supermercado Lupa`, `Supermercado Día`, `Supermercado Agropal`, `La Compra`, `El Coso`)
- `/transporte` — 4 taxis locales + `Autocares La Regional` (`983 881 748`)
- `/penafiel` — Mapa turístico de Peñafiel
- `/catas-marcos` — Tarjeta rápida de Catas de Vino con Magia
- `/catering` — Tarjeta rápida de Servicio de Catering

### E. Rutas Legales y Sistema (3 Rutas)
- `/cookies` — Política de Cookies (Actualizada Octubre 2025, GREGORIO MARCOS MINGUEZ)
- `/politica-privacidad` — Política de Privacidad y Aviso Legal (Actualizada Mayo 2025, CIF `12372778C`, Pol. Ind. La Laguna P-6 Parcela 41, Peñafiel)
- `/404` — Página de error

---

## 3. Activos Multimedia y Endpoints Externos Identificados
- **286 imágenes únicas** alojadas en `https://framerusercontent.com/images/*` (fotografías de las 10 casas, iconografía de servicios, galería de la finca, bodega, catas, eventos, restauración y mapa de Peñafiel).
- **2 vídeos HD** referenciados en módulos MJS:
  - `https://framerusercontent.com/assets/Cgs02RKEjqVSmK0I9SjjWd7Q.mp4`
  - `https://videos.pexels.com/video-files/4932586/4932586-uhd_2732_1440_30fps.mp4`
- **Endpoint de formulario Framer**: `https://api.framer.com/forms/v1/forms/4331d561-4930-45f8-a12d-5ca23fb170a3/submit`
- **Widget de reservas MisterPlan**: `https://www.mrplan.es/experiencias/modulos/TExpReverse/lib/TExpReverseInc.php?id_casa=584391&idw=4367&paramHash=dc0610a51f241c478736347ee435440ae011eb74`
