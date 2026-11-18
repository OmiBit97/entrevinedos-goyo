import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { Compass, Eye, Sparkles } from 'lucide-react';
import { useWebGLContext } from '../WebGLContext';
import type { CameraWaypoint, EstatePOI } from '../types';

const WAYPOINTS: CameraWaypoint[] = [
  { id: 'overview', label: 'Vista Global de Peñafiel', position: [0, 5.2, 7.6], lookAt: [0, 0.2, 0] },
  { id: 'vinedos', label: 'Casas Entreviñedos (1–8)', position: [-3.4, 3.3, 4.6], lookAt: [-1.2, 0.4, -0.3] },
  { id: 'bodega', label: 'Bodega & Catas Mágicas', position: [3.2, 3.0, 4.3], lookAt: [1.5, 0.4, -0.5] },
  { id: 'castillo', label: 'Vistas al Castillo & Piscina', position: [0.4, 2.7, 5.5], lookAt: [0.2, 0.8, -2.5] },
];

const ESTATE_POIS: EstatePOI[] = [
  {
    id: 'casas-finca',
    title: 'Estancias 1–8 Entreviñedos',
    category: 'alojamiento',
    subtitle: 'Malbec, Merlot, Bodegas Marcos, Tempranillo, Verdejo (PMR), Garnacha, Cabernet Sauvignon y Albillo.',
    coords: [-1.5, 0.55, 0.4],
    link: '/alojamientos',
  },
  {
    id: 'bodegas-marcos',
    title: 'Bodega Propia · Bodegas Marcos',
    category: 'bodega',
    subtitle: 'Catas de Vino con Magia (25€/persona · 90 min), degustación desde barrica y vinos Reserva y Crianza.',
    coords: [1.65, 0.65, -0.3],
    link: '/catas',
  },
  {
    id: 'piscina-barbacoas',
    title: 'Piscina, Barbacoas y Zonas Comunes',
    category: 'zona-comun',
    subtitle: 'Piscina descubierta de temporada (11:30–20:30), merenderos de carbón vegetal y zona infantil.',
    coords: [-0.2, 0.48, 1.4],
    link: '/lafinca',
  },
  {
    id: 'castillo-muralla',
    title: 'Castillo & Casco Histórico (La Muralla I & II)',
    category: 'entorno',
    subtitle: 'Vistas privilegiadas al Castillo de Peñafiel y 2 casas históricas en el centro (capacidad total 16 personas).',
    coords: [0.4, 1.25, -2.2],
    link: '/alojamientos/la-muralla-i',
  },
];

/**
 * Escena Three.js modular de topografía 3D del terroir de Peñafiel.
 * Preparada para ampliación futura con modelos GLTF de la finca y recorridos inmersivos.
 */
export const EstateMap3DPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isEnabled, activeWaypointId, setActiveWaypointId } = useWebGLContext();
  const [selectedPoi, setSelectedPoi] = useState<EstatePOI>(ESTATE_POIS[0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isEnabled) return;

    let animId = 0;
    let isVisible = true;
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x141110, 0.068);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    const initialWp = WAYPOINTS.find((w) => w.id === activeWaypointId) || WAYPOINTS[0];
    camera.position.set(...initialWp.position);

    const targetPos = new THREE.Vector3(...initialWp.position);
    const currentLookAt = new THREE.Vector3(...initialWp.lookAt);
    const targetLookAt = new THREE.Vector3(...initialWp.lookAt);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Luz cálida de atardecer en Ribera del Duero
    const ambient = new THREE.AmbientLight(0xf6f3ee, 0.55);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xc5a572, 1.8);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    const burgundyRim = new THREE.PointLight(0x8c233a, 2.2, 14);
    burgundyRim.position.set(-3, 2.5, -2);
    scene.add(burgundyRim);

    // Terreno topográfico ondulado (laderas calcáreas de Peñafiel)
    const terrainGeo = new THREE.PlaneGeometry(11, 9, 44, 36);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const ridge =
        Math.sin(x * 0.65) * 0.28 +
        Math.cos(z * 0.55) * 0.24 +
        (z < -1.2 ? Math.exp(-Math.pow((x - 0.4) * 0.7, 2)) * 0.9 : 0);
      posAttr.setY(i, ridge);
    }
    terrainGeo.computeVertexNormals();

    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x3b2d26,
      wireframe: true,
      roughness: 0.75,
      metalness: 0.15,
    });
    const terrainWire = new THREE.Mesh(terrainGeo, wireMat);
    scene.add(terrainWire);

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x1c1614,
      transparent: true,
      opacity: 0.85,
      roughness: 0.9,
    });
    const terrainSolid = new THREE.Mesh(terrainGeo, solidMat);
    terrainSolid.position.y = -0.02;
    scene.add(terrainSolid);

    // Hileras de viñedo estilizadas en dorado vendimia
    const vineLinesGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc5a572,
      transparent: true,
      opacity: 0.38,
    });
    for (let r = -3.2; r <= 3.2; r += 0.45) {
      const pts: THREE.Vector3[] = [];
      for (let z = -1.6; z <= 2.4; z += 0.25) {
        const y = Math.sin(r * 0.65) * 0.28 + Math.cos(z * 0.55) * 0.24 + 0.05;
        pts.push(new THREE.Vector3(r, y, z));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      vineLinesGroup.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(vineLinesGroup);

    // Nodos 3D interactivos (POIs)
    const markersGroup = new THREE.Group();
    const markerGeo = new THREE.OctahedronGeometry(0.18, 0);
    const ringGeo = new THREE.RingGeometry(0.24, 0.28, 32);
    ringGeo.rotateX(-Math.PI / 2);

    const markerMeshes: THREE.Mesh[] = [];
    ESTATE_POIS.forEach((poi) => {
      const isSelected = poi.id === selectedPoi.id;
      const mat = new THREE.MeshStandardMaterial({
        color: poi.category === 'bodega' ? 0x8b2138 : isSelected ? 0xc5a572 : 0xf6f3ee,
        emissive: isSelected ? 0x4a1521 : 0x1a1615,
        metalness: 0.5,
        roughness: 0.25,
      });
      const marker = new THREE.Mesh(markerGeo, mat);
      marker.position.set(...poi.coords);
      marker.userData = { poiId: poi.id };
      markersGroup.add(marker);
      markerMeshes.push(marker);

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc5a572,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isSelected ? 0.85 : 0.3,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(poi.coords[0], poi.coords[1] - 0.14, poi.coords[2]);
      markersGroup.add(ring);
    });
    scene.add(markersGroup);

    let dragOffset = 0;
    let pointerDownX: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      pointerDownX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerDownX === null) return;
      dragOffset += (e.clientX - pointerDownX) * 0.008;
      pointerDownX = e.clientX;
    };
    const onPointerUp = () => {
      pointerDownX = null;
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => onResize()) : null;
    resizeObserver?.observe(container);

    const clock = new THREE.Clock();
    const tick = () => {
      animId = window.requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const wp = WAYPOINTS.find((w) => w.id === activeWaypointId) || WAYPOINTS[0];
      targetPos.set(
        wp.position[0] * Math.cos(dragOffset) - wp.position[2] * Math.sin(dragOffset) * 0.35,
        wp.position[1],
        wp.position[2],
      );
      targetLookAt.set(...wp.lookAt);

      camera.position.lerp(targetPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      markerMeshes.forEach((m, idx) => {
        m.rotation.y = t * 0.8 + idx;
        m.position.y = ESTATE_POIS[idx].coords[1] + Math.sin(t * 1.5 + idx) * 0.05;
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      window.cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver?.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      terrainGeo.dispose();
      wireMat.dispose();
      solidMat.dispose();
      lineMat.dispose();
      markerGeo.dispose();
      ringGeo.dispose();
      renderer.dispose();
      if (domEl.parentNode === container) container.removeChild(domEl);
    };
  }, [isEnabled, activeWaypointId, selectedPoi.id]);

  return (
    <div className="rounded-2xl border border-[#D8CFC2]/30 bg-[#141110] text-[#F6F3EE] overflow-hidden shadow-2xl">
      <div className="flex flex-col gap-3 sm:gap-4 border-b border-[#D8CFC2]/15 px-4 sm:px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C5A572]/40 bg-[#4A1521]/40 text-[#C5A572]">
            <Compass className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#C5A572]">
              Módulo WebGL / Three.js · Terroir 3D
            </p>
            <h3 className="font-editorial text-lg sm:text-xl font-medium text-[#F6F3EE] leading-snug">
              Explorador Espacial de Finca Entreviñedos & Peñafiel
            </h3>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 pb-1 sm:pb-0 -mx-1 px-1">
          {WAYPOINTS.map((wp) => (
            <button
              key={wp.id}
              type="button"
              onClick={() => setActiveWaypointId(wp.id)}
              className={`shrink-0 rounded-full px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                activeWaypointId === wp.id
                  ? 'bg-[#4A1521] text-[#F6F3EE] border border-[#C5A572]/60 shadow-sm'
                  : 'border border-[#D8CFC2]/20 bg-white/5 text-[#D8CFC2] hover:bg-white/10'
              }`}
            >
              {wp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-8 min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] bg-[#141110]">
          {isEnabled ? (
            <div ref={containerRef} className="h-[260px] sm:h-[340px] lg:h-[420px] w-full cursor-grab active:cursor-grabbing" />
          ) : (
            <div className="flex h-[260px] sm:h-[340px] lg:h-[420px] flex-col items-center justify-center p-6 sm:p-8 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-[#C5A572]" />
              <p className="font-editorial text-xl sm:text-2xl text-[#F6F3EE]">
                Modo ahorro / movimiento reducido activo
              </p>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-[#D8CFC2]/75">
                Puedes explorar todos los puntos de interés y estancias de la finca desde este panel lateral.
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10">
            <Eye className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
            <span className="truncate font-technical text-[10px] uppercase tracking-wider text-[#F6F3EE]/85">
              Arrastra para orbitar · Arquitectura lista para recorrido GLTF/3D
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#D8CFC2]/15 bg-[#1B1715] p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <p className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              Puntos de Interés de la Finca
            </p>
            {ESTATE_POIS.map((poi) => {
              const active = poi.id === selectedPoi.id;
              return (
                <button
                  key={poi.id}
                  type="button"
                  onClick={() => {
                    setSelectedPoi(poi);
                    if (poi.id === 'casas-finca') setActiveWaypointId('vinedos');
                    if (poi.id === 'bodegas-marcos') setActiveWaypointId('bodega');
                    if (poi.id === 'piscina-barbacoas') setActiveWaypointId('overview');
                    if (poi.id === 'castillo-muralla') setActiveWaypointId('castillo');
                  }}
                  className={`w-full text-left rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer border ${
                    active
                      ? 'border-[#C5A572]/60 bg-[#4A1521]/30'
                      : 'border-[#D8CFC2]/10 bg-white/[0.02] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="font-editorial text-base sm:text-lg font-medium text-[#F6F3EE]">
                      {poi.title}
                    </span>
                    <span className="font-technical text-[10px] uppercase tracking-widest text-[#C5A572]">
                      {poi.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#D8CFC2]/80">
                    {poi.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {selectedPoi.link && (
            <Link
              to={selectedPoi.link}
              className="inline-flex items-center justify-center text-center rounded-full bg-[#C5A572] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#141110] transition hover:bg-[#d8b885]"
            >
              Explorar {selectedPoi.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstateMap3DPreview;
