import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  Layers,
  List,
  Maximize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Users,
  Wine,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ACCOMMODATIONS, type Accommodation } from '../data/accommodations';
import { LA_FINCA_DATA } from '../data/estateAndEvents';
import { TASTINGS_DATA } from '../data/wineryAndTastings';
import { OptimizedImage } from '../components/ui/OptimizedImage';

type MapCategory = 'all' | 'finca' | 'muralla' | 'zonas';
type AtmosphereId = 'amanecer' | 'mediodia' | 'atardecer' | 'noche';

interface MapNode {
  id: string;
  code: string;
  title: string;
  badge: string;
  category: Exclude<MapCategory, 'all'>;
  coords: [number, number, number];
  buildingSize: [number, number, number];
  roofColor: number;
  summary: string;
  image: string;
  gallery?: string[];
  detailPath: string;
  bookingPath?: string;
  accommodation?: Accommodation;
  highlights: string[];
}

interface AtmospherePreset {
  id: AtmosphereId;
  label: string;
  skyHex: number;
  fogHex: number;
  fogDensity: number;
  ambientHex: number;
  ambientIntensity: number;
  sunHex: number;
  sunIntensity: number;
  sunPos: [number, number, number];
  rimHex: number;
  rimIntensity: number;
  groundHex: number;
  windowGlowIntensity: number;
  poolHex: number;
}

const ATMOSPHERES: Record<AtmosphereId, AtmospherePreset> = {
  amanecer: {
    id: 'amanecer',
    label: 'Amanecer',
    skyHex: 0x2a1f24,
    fogHex: 0x2d2126,
    fogDensity: 0.036,
    ambientHex: 0xf7dfd4,
    ambientIntensity: 0.85,
    sunHex: 0xf4a27e,
    sunIntensity: 1.9,
    sunPos: [9, 4.5, -5],
    rimHex: 0xc5a572,
    rimIntensity: 1.5,
    groundHex: 0x241c18,
    windowGlowIntensity: 0.65,
    poolHex: 0x3b7b8c,
  },
  mediodia: {
    id: 'mediodia',
    label: 'Mediodía',
    skyHex: 0x23262b,
    fogHex: 0x22252a,
    fogDensity: 0.026,
    ambientHex: 0xf6f3ee,
    ambientIntensity: 1.15,
    sunHex: 0xfff3dc,
    sunIntensity: 2.3,
    sunPos: [2, 12, 5],
    rimHex: 0xc5a572,
    rimIntensity: 0.9,
    groundHex: 0x27231e,
    windowGlowIntensity: 0.2,
    poolHex: 0x2a95b3,
  },
  atardecer: {
    id: 'atardecer',
    label: 'Atardecer',
    skyHex: 0x171211,
    fogHex: 0x171211,
    fogDensity: 0.038,
    ambientHex: 0xf5e5d3,
    ambientIntensity: 0.72,
    sunHex: 0xd9a15b,
    sunIntensity: 2.1,
    sunPos: [-9, 4.2, 5],
    rimHex: 0x8c233a,
    rimIntensity: 2.4,
    groundHex: 0x1f1916,
    windowGlowIntensity: 0.95,
    poolHex: 0x286f84,
  },
  noche: {
    id: 'noche',
    label: 'Noche',
    skyHex: 0x0e0d14,
    fogHex: 0x0e0d14,
    fogDensity: 0.036,
    ambientHex: 0x8ea0c2,
    ambientIntensity: 0.75,
    sunHex: 0xb4c7ea,
    sunIntensity: 1.25,
    sunPos: [-5, 10, -7],
    rimHex: 0xc5a572,
    rimIntensity: 3.1,
    groundHex: 0x201d24,
    windowGlowIntensity: 2.1,
    poolHex: 0x22b5db,
  },
};

const ACCOMMODATION_LAYOUT: Record<
  string,
  { code: string; coords: [number, number, number]; size: [number, number, number] }
> = {
  malbec: { code: '01', coords: [-4.1, 0.36, -1.0], size: [0.95, 0.42, 0.65] },
  merlot: { code: '02', coords: [-3.3, 0.38, 0.25], size: [0.85, 0.38, 0.6] },
  'bodegas-marcos': { code: '03', coords: [-2.15, 0.44, -1.25], size: [1.05, 0.48, 0.7] },
  tempranillo: { code: '04', coords: [-2.45, 0.42, 1.45], size: [1.1, 0.46, 0.72] },
  verdejo: { code: '05', coords: [-1.1, 0.38, 0.3], size: [0.9, 0.38, 0.66] },
  garnacha: { code: '06', coords: [-0.95, 0.42, 1.95], size: [0.88, 0.4, 0.62] },
  'cabernet-sauvignon': { code: '07', coords: [0.55, 0.42, -1.15], size: [0.95, 0.44, 0.65] },
  albillo: { code: '08', coords: [0.45, 0.38, 0.25], size: [0.88, 0.38, 0.6] },
  'la-muralla-i': { code: 'M1', coords: [1.9, 1.12, -3.55], size: [1.05, 0.56, 0.76] },
  'la-muralla-ii': { code: 'M2', coords: [3.2, 1.15, -3.25], size: [1.05, 0.56, 0.76] },
};

const ATMOSPHERE_ICONS: Record<AtmosphereId, React.ReactNode> = {
  amanecer: <Sunrise className="h-3.5 w-3.5" />,
  mediodia: <Sun className="h-3.5 w-3.5" />,
  atardecer: <Sunset className="h-3.5 w-3.5" />,
  noche: <Moon className="h-3.5 w-3.5" />,
};

export const InteractiveMapPage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [category, setCategory] = useState<MapCategory>('all');
  const [atmosphere, setAtmosphere] = useState<AtmosphereId>('atardecer');
  const [isTopDown, setIsTopDown] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerHeight >= 600 : true,
  );
  const [drawerListOpen, setDrawerListOpen] = useState(false);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const [glSupported, setGlSupported] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Construimos las 14 ubicaciones reales a partir de nuestros datos verificados
  const nodes: MapNode[] = useMemo(() => {
    const houseNodes: MapNode[] = ACCOMMODATIONS.map((house, idx) => {
      const layout = ACCOMMODATION_LAYOUT[house.slug] ?? {
        code: String(idx + 1).padStart(2, '0'),
        coords: [-3 + idx * 0.7, 0.4, 0],
        size: [0.9, 0.4, 0.65],
      };

      const highlights = [house.areaLabel, house.capacityLabel, house.bedsLabel];
      if (house.isPmrAdapted) highlights.push('Accesible PMR');

      return {
        id: house.slug,
        code: layout.code,
        title: house.name,
        badge: house.location === 'finca' ? 'Finca · Entreviñedos' : 'Peñafiel · Alojamientos Muralla',
        category: house.location === 'finca' ? 'finca' : 'muralla',
        coords: layout.coords,
        buildingSize: layout.size,
        roofColor: house.location === 'finca' ? 0x6b2232 : 0xa5844e,
        summary: house.shortDescription,
        image: house.heroImage,
        gallery: house.gallery.slice(0, 4),
        detailPath: `/alojamientos/${house.slug}`,
        bookingPath: `${house.bookingRoute}?casa=${house.slug}`,
        accommodation: house,
        highlights,
      };
    });

    const poolSpace = LA_FINCA_DATA.spaces.find((s) => s.id === 'piscina');
    const bbqSpace = LA_FINCA_DATA.spaces.find((s) => s.id === 'barbacoas');
    const kidsSpace = LA_FINCA_DATA.spaces.find((s) => s.id === 'columpios');

    const zoneNodes: MapNode[] = [
      {
        id: 'zona-bodega-catas',
        code: 'BG',
        title: 'Bodegas Marcos & Catas con Magia',
        badge: 'Bodega Propia · Enología',
        category: 'zonas',
        coords: [2.7, 0.56, -0.35],
        buildingSize: [1.55, 0.68, 1.1],
        roofColor: 0x4a1521,
        summary:
          'Nuestra bodega familiar en la propia finca: elaboración de Reserva y Crianza, degustación desde barrica y exclusivas Catas con Magia.',
        image: TASTINGS_DATA.heroImage,
        gallery: [TASTINGS_DATA.heroImage, TASTINGS_DATA.secondaryHeroImage],
        detailPath: '/catas',
        highlights: ['Cata Premium · 25€/persona', '90 min aprox.', 'Degustación en barrica'],
      },
      {
        id: 'zona-piscina',
        code: 'PS',
        title: 'Piscina con Vistas al Castillo',
        badge: 'Zona Común · Temporada',
        category: 'zonas',
        coords: [1.0, 0.34, 2.05],
        buildingSize: [1.65, 0.14, 0.95],
        roofColor: 0x2a86a3,
        summary:
          poolSpace?.paragraphs[0] ??
          'Piscina exterior rodeada de pradera y tumbonas con horizonte directo al Castillo de Peñafiel.',
        image: poolSpace?.image ?? LA_FINCA_DATA.heroImages[2],
        detailPath: '/lafinca',
        highlights: ['Uso gratuito alojados', '11:30–20:30 en temporada', 'Horizonte al Castillo'],
      },
      {
        id: 'zona-barbacoas',
        code: 'BQ',
        title: 'Barbacoas y Merenderos',
        badge: 'Zona Común · Aire Libre',
        category: 'zonas',
        coords: [-1.45, 0.34, 3.3],
        buildingSize: [1.1, 0.32, 0.85],
        roofColor: 0x8a5e3b,
        summary:
          bbqSpace?.paragraphs[0] ??
          'Áreas de barbacoa de carbón vegetal y amplios merenderos integrados junto al paisaje de viñedos.',
        image: bbqSpace?.image ?? LA_FINCA_DATA.heroImages[0],
        detailPath: '/lafinca',
        highlights: ['Carbón vegetal', 'Merenderos amplios', 'Ideal grupos y familias'],
      },
      {
        id: 'zona-jardines',
        code: 'JN',
        title: 'Jardines, Columpios y Viñedo',
        badge: 'Entorno · Naturaleza',
        category: 'zonas',
        coords: [-3.55, 0.36, 2.55],
        buildingSize: [1.0, 0.24, 0.85],
        roofColor: 0x3b6040,
        summary:
          kidsSpace?.paragraphs[0] ??
          'Zonas ajardinadas privadas, área infantil con columpios y senderos tranquilos entre cepas centenarias.',
        image: kidsSpace?.image ?? LA_FINCA_DATA.heroImages[1],
        detailPath: '/lafinca',
        highlights: ['Zona infantil segura', 'Paseos entre cepas', 'Atardeceres en la finca'],
      },
    ];

    return [...houseNodes, ...zoneNodes];
  }, []);

  const visibleNodes = useMemo(() => {
    if (category === 'all') return nodes;
    return nodes.filter((n) => n.category === category);
  }, [category, nodes]);

  const [selectedId, setSelectedId] = useState<string>('malbec');

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? visibleNodes[0] ?? nodes[0],
    [nodes, selectedId, visibleNodes],
  );

  // Refs compartidos con el loop Three.js para no reconstruir el canvas al interactuar
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  const visibleIdSetRef = useRef<Set<string>>(new Set());
  visibleIdSetRef.current = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;

  const isTopDownRef = useRef(isTopDown);
  isTopDownRef.current = isTopDown;

  const sheetExpandedRef = useRef(sheetExpanded);
  sheetExpandedRef.current = sheetExpanded;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768 || window.innerHeight < 600) {
        setSheetExpanded(false);
      }
      if (window.innerWidth >= 768) {
        setMobileControlsOpen(false);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Estado orbital objetivo de la cámara (spherical: azimuth, polar, radius + target)
  const orbitRef = useRef({
    azimuth: 0.36,
    polar: 0.88,
    radius: 11.4,
    targetAzimuth: 0.36,
    targetPolar: 0.88,
    targetRadius: 11.4,
    lookAt: new THREE.Vector3(-0.35, 0.35, -0.35),
    targetLookAt: new THREE.Vector3(-0.35, 0.35, -0.35),
    userDragging: false,
  });

  // Controlador de escena y luces mutables sin re-montar WebGL
  const sceneControllersRef = useRef<{
    scene: THREE.Scene;
    ambient: THREE.AmbientLight;
    sun: THREE.DirectionalLight;
    rim: THREE.PointLight;
    groundMat: THREE.MeshStandardMaterial;
    poolMat: THREE.MeshStandardMaterial;
    windowMats: THREE.MeshStandardMaterial[];
  } | null>(null);

  // Enfocar cámara hacia un nodo concreto
  const focusNode = (node: MapNode, zoomRadius = 6.2) => {
    setSelectedId(node.id);
    setActiveImageIdx(0);
    setDrawerListOpen(false);
    setMobileControlsOpen(false);
    if (window.innerWidth >= 768 && window.innerHeight >= 600) {
      setSheetExpanded(true);
    }

    const isMobile = window.innerWidth < 768;
    const o = orbitRef.current;
    o.targetLookAt.set(
      node.coords[0],
      node.coords[1] + 0.15,
      node.coords[2] + (isMobile ? 0.95 : 0.35),
    );
    o.targetRadius = Math.max(4.4, Math.min(isMobile ? Math.max(zoomRadius, 8.2) : zoomRadius, 9.4));
    if (!isTopDownRef.current) {
      o.targetPolar = node.category === 'muralla' ? 0.78 : 0.84;
    }
  };

  const resetOverview = () => {
    setIsAutoTour(false);
    setIsTopDown(false);
    const o = orbitRef.current;
    o.targetAzimuth = 0.36;
    o.targetPolar = 0.88;
    o.targetRadius = window.innerWidth < 768 ? 14.0 : 11.4;
    o.targetLookAt.set(-0.35, 0.35, -0.35);
  };

  const toggleTopDownView = () => {
    setIsTopDown((prev) => {
      const next = !prev;
      const o = orbitRef.current;
      if (next) {
        o.targetPolar = 0.14;
        o.targetRadius = window.innerWidth < 768 ? 15.6 : 13.4;
        o.targetLookAt.set(-0.3, 0.35, -0.35);
      } else {
        o.targetPolar = 0.86;
        o.targetRadius = window.innerWidth < 768 ? 13.2 : 10.6;
      }
      return next;
    });
  };

  const adjustZoom = (delta: number) => {
    const o = orbitRef.current;
    o.targetRadius = THREE.MathUtils.clamp(o.targetRadius + delta, 3.8, 17.5);
  };

  const stepTour = (dir: 1 | -1) => {
    const list = visibleNodes.length > 0 ? visibleNodes : nodes;
    const idx = list.findIndex((n) => n.id === selectedNode.id);
    const nextIdx = (idx + dir + list.length) % list.length;
    focusNode(list[nextIdx], 6.4);
  };

  // Auto-Tour periódico cuando está activo
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = window.setInterval(() => {
      const list = visibleNodes.length > 0 ? visibleNodes : nodes;
      setSelectedId((prev) => {
        const idx = list.findIndex((n) => n.id === prev);
        const nextNode = list[(idx + 1) % list.length];
        if (nextNode) {
          const o = orbitRef.current;
          o.targetLookAt.set(nextNode.coords[0], nextNode.coords[1] + 0.15, nextNode.coords[2] + 0.35);
          o.targetRadius = 6.3;
          o.targetAzimuth += 0.25;
        }
        return nextNode?.id ?? prev;
      });
      setActiveImageIdx(0);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isAutoTour, visibleNodes, nodes]);

  // Cuando cambia el filtro y el nodo actual ya no pertenece al grupo, enfocamos el primero visible
  useEffect(() => {
    if (visibleNodes.length > 0 && !visibleNodes.some((n) => n.id === selectedId)) {
      focusNode(visibleNodes[0], 7.4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Aplicar atmósfera dinámica cuando el usuario cambia entre Amanecer/Mediodía/Atardecer/Noche
  useEffect(() => {
    const ctrl = sceneControllersRef.current;
    if (!ctrl) return;
    const preset = ATMOSPHERES[atmosphere];
    ctrl.scene.background = new THREE.Color(preset.skyHex);
    ctrl.scene.fog = new THREE.FogExp2(preset.fogHex, preset.fogDensity);
    ctrl.ambient.color.setHex(preset.ambientHex);
    ctrl.ambient.intensity = preset.ambientIntensity;
    ctrl.sun.color.setHex(preset.sunHex);
    ctrl.sun.intensity = preset.sunIntensity;
    ctrl.sun.position.set(...preset.sunPos);
    ctrl.rim.color.setHex(preset.rimHex);
    ctrl.rim.intensity = preset.rimIntensity;
    ctrl.groundMat.color.setHex(preset.groundHex);
    ctrl.poolMat.color.setHex(preset.poolHex);
    ctrl.poolMat.emissive.setHex(preset.poolHex);
    ctrl.poolMat.emissiveIntensity = atmosphere === 'noche' ? 0.55 : 0.16;
    for (const mat of ctrl.windowMats) {
      mat.emissiveIntensity = preset.windowGlowIntensity;
    }
  }, [atmosphere]);

  // Inicialización de escena Three.js interactiva y proyección 3D->2D de marcadores
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
      setGlSupported(false);
      return;
    }

    const initialW = container.clientWidth || window.innerWidth;
    const initialH = container.clientHeight || window.innerHeight;
    if (initialW < 768) {
      orbitRef.current.radius = 14.0;
      orbitRef.current.targetRadius = 14.0;
    }

    const preset = ATMOSPHERES[atmosphere];
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(preset.skyHex);
    scene.fog = new THREE.FogExp2(preset.fogHex, preset.fogDensity);

    const camera = new THREE.PerspectiveCamera(42, initialW / initialH, 0.1, 80);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialW, initialH);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // Iluminación del Terroir
    const ambient = new THREE.AmbientLight(preset.ambientHex, preset.ambientIntensity);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(preset.sunHex, preset.sunIntensity);
    sun.position.set(...preset.sunPos);
    scene.add(sun);

    const rim = new THREE.PointLight(preset.rimHex, preset.rimIntensity, 18);
    rim.position.set(1.5, 2.2, -3.5);
    scene.add(rim);

    // Base Topográfica Ribera del Duero
    const groundGeo = new THREE.PlaneGeometry(34, 28, 72, 60);
    const gPos = groundGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const x = gPos.getX(i);
      const y = gPos.getY(i); // será Z al rotar -PI/2
      const hillRidge = Math.max(0, -y - 1.2) * 0.24;
      const castleMound = Math.exp(-((x - 1.2) ** 2 + (y - 4.3) ** 2) * 0.22) * 1.45;
      const undulation = Math.sin(x * 0.42) * 0.14 + Math.cos(y * 0.36) * 0.11;
      gPos.setZ(i, hillRidge * 0.3 + castleMound + undulation);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: preset.groundHex,
      roughness: 0.9,
      metalness: 0.05,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);

    // Curvas topográficas sutiles en dorado
    const contourGroup = new THREE.Group();
    const contourMat = new THREE.LineBasicMaterial({ color: 0xc5a572, transparent: true, opacity: 0.14 });
    for (let ring = 0; ring < 9; ring++) {
      const pts: THREE.Vector3[] = [];
      const rx = 2.6 + ring * 0.95;
      const rz = 2.0 + ring * 0.72;
      for (let a = 0; a <= 64; a++) {
        const theta = (a / 64) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(theta) * rx - 0.5,
            0.06 + Math.sin(theta * 2) * 0.04,
            Math.sin(theta) * rz + 0.25,
          ),
        );
      }
      contourGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), contourMat));
    }
    scene.add(contourGroup);

    // Sendero principal entre casas y bodega
    const pathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, 0.14, 0.2),
      new THREE.Vector3(-2.6, 0.14, 0.5),
      new THREE.Vector3(-0.7, 0.14, 0.95),
      new THREE.Vector3(1.1, 0.14, 0.75),
      new THREE.Vector3(2.55, 0.16, -0.35),
    ]);
    const pathGeo = new THREE.TubeGeometry(pathCurve, 44, 0.08, 6, false);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc2,
      roughness: 0.9,
      transparent: true,
      opacity: 0.48,
    });
    scene.add(new THREE.Mesh(pathGeo, pathMat));

    // Hileras de Viñedos Centenarios (enclaves sur y oeste)
    const vineGroup = new THREE.Group();
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x3b4d2b, roughness: 0.85 });
    const rowCoords = [
      [-4.6, -2.5, 4.2],
      [-4.6, -2.0, 4.2],
      [-4.3, 1.85, 3.8],
      [-4.3, 2.35, 3.8],
      [-4.3, 2.85, 3.8],
      [2.1, 1.55, 3.3],
      [2.1, 2.05, 3.3],
      [2.1, 2.55, 3.3],
      [2.1, 3.05, 3.3],
    ];
    rowCoords.forEach(([cx, cz, len]) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(len, 0.11, 0.12), vineMat);
      mesh.position.set(cx + len * 0.2, 0.16, cz);
      vineGroup.add(mesh);
    });
    scene.add(vineGroup);

    // Silueta Monumental del Castillo de Peñafiel en la cresta norte
    const castleGroup = new THREE.Group();
    const limestoneMat = new THREE.MeshStandardMaterial({
      color: 0xbba98e,
      roughness: 0.75,
      emissive: 0x3f2e1e,
      emissiveIntensity: 0.25,
    });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.52, 0.58), limestoneMat);
    hull.position.set(1.25, 1.38, -4.35);
    hull.rotation.y = -0.14;
    const keep = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.92, 0.54), limestoneMat);
    keep.position.set(1.15, 1.72, -4.35);
    keep.rotation.y = -0.14;
    const prow = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.65, 5), limestoneMat);
    prow.position.set(2.98, 1.48, -4.1);
    castleGroup.add(hull, keep, prow);
    scene.add(castleGroup);

    // Maqueta Arquitectónica de cada Alojamiento y Zona Común
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xede6da, roughness: 0.6 });
    const windowMats: THREE.MeshStandardMaterial[] = [];
    let poolMat = new THREE.MeshStandardMaterial({
      color: preset.poolHex,
      roughness: 0.15,
      metalness: 0.35,
      emissive: preset.poolHex,
      emissiveIntensity: 0.2,
    });

    const nodeMeshes = new Map<string, THREE.Group>();

    nodesRef.current.forEach((node) => {
      const grp = new THREE.Group();
      grp.position.set(node.coords[0], node.coords[1], node.coords[2]);

      const [bw, bh, bd] = node.buildingSize;

      if (node.id === 'zona-piscina') {
        const deck = new THREE.Mesh(
          new THREE.BoxGeometry(bw + 0.28, 0.08, bd + 0.26),
          new THREE.MeshStandardMaterial({ color: 0xd8cfc2, roughness: 0.7 }),
        );
        deck.position.y = -0.04;
        const water = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.07, bd), poolMat);
        water.position.y = 0.01;
        grp.add(deck, water);
      } else {
        const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), wallMat);
        body.position.y = bh / 2 - 0.12;
        const roofMat = new THREE.MeshStandardMaterial({ color: node.roofColor, roughness: 0.5 });
        const roof = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.08, 0.09, bd + 0.08), roofMat);
        roof.position.y = bh - 0.09;

        const wMat = new THREE.MeshStandardMaterial({
          color: 0xffd79b,
          emissive: 0xf4b45c,
          emissiveIntensity: preset.windowGlowIntensity,
          roughness: 0.25,
        });
        windowMats.push(wMat);
        const winBand = new THREE.Mesh(new THREE.BoxGeometry(bw * 0.62, bh * 0.28, bd + 0.025), wMat);
        winBand.position.y = bh * 0.42 - 0.1;

        grp.add(body, roof, winBand);
      }

      // Halo circular en suelo para resaltar el nodo activo
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(Math.max(bw, bd) * 0.62, Math.max(bw, bd) * 0.74, 32),
        new THREE.MeshBasicMaterial({
          color: 0xc5a572,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.28,
        }),
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.y = -0.14;
      halo.name = 'halo';
      grp.add(halo);

      scene.add(grp);
      nodeMeshes.set(node.id, grp);
    });

    sceneControllersRef.current = {
      scene,
      ambient,
      sun,
      rim,
      groundMat,
      poolMat,
      windowMats,
    };

    // Controles táctiles + puntero (Orbit 1 dedo/mouse + Pinch 2 dedos + Wheel zoom)
    const el = renderer.domElement;
    const pointers = new Map<number, { x: number; y: number }>();
    let lastPinchDist: number | null = null;

    const getPinchDistance = () => {
      if (pointers.size !== 2) return null;
      const pts = Array.from(pointers.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      return Math.hypot(dx, dy);
    };

    const onPointerDown = (e: PointerEvent) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      orbitRef.current.userDragging = true;
      setIsAutoTour(false);
      if (pointers.size === 2) {
        lastPinchDist = getPinchDistance();
      }
      el.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;

      if (pointers.size === 1) {
        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;
        const o = orbitRef.current;
        o.targetAzimuth -= dx * 0.0068;
        o.targetPolar = THREE.MathUtils.clamp(o.targetPolar - dy * 0.0052, 0.14, 1.32);
      }

      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2) {
        const dist = getPinchDistance();
        if (dist !== null && lastPinchDist !== null) {
          const delta = lastPinchDist - dist;
          orbitRef.current.targetRadius = THREE.MathUtils.clamp(
            orbitRef.current.targetRadius + delta * 0.032,
            3.8,
            17.5,
          );
        }
        lastPinchDist = dist;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastPinchDist = null;
      if (pointers.size === 0) orbitRef.current.userDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsAutoTour(false);
      orbitRef.current.targetRadius = THREE.MathUtils.clamp(
        orbitRef.current.targetRadius + e.deltaY * 0.006,
        3.8,
        17.5,
      );
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Loop 60fps: suavizado orbital + proyección 3D→2D de pines vía DOM refs (cero re-renders)
    let animId = 0;
    const projVec = new THREE.Vector3();
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const t = clock.getElapsedTime();
      const o = orbitRef.current;

      // Suave deriva contemplativa cuando está en vista general sin arrastrar
      if (!o.userDragging && !isTopDownRef.current && o.targetRadius > 9.6) {
        o.targetAzimuth += 0.0007;
      }

      o.azimuth += (o.targetAzimuth - o.azimuth) * 0.085;
      o.polar += (o.targetPolar - o.polar) * 0.085;
      o.radius += (o.targetRadius - o.radius) * 0.085;
      o.lookAt.lerp(o.targetLookAt, 0.085);

      const sinP = Math.sin(o.polar);
      camera.position.set(
        o.lookAt.x + o.radius * sinP * Math.sin(o.azimuth),
        o.lookAt.y + o.radius * Math.cos(o.polar),
        o.lookAt.z + o.radius * sinP * Math.cos(o.azimuth),
      );
      camera.lookAt(o.lookAt);

      const canvasW = container.clientWidth || window.innerWidth;
      const canvasH = container.clientHeight || window.innerHeight;
      const activeId = selectedIdRef.current;
      const visSet = visibleIdSetRef.current;

      for (const node of nodesRef.current) {
        const grp = nodeMeshes.get(node.id);
        const pinEl = markerRefs.current[node.id];
        const isVisible = visSet.has(node.id);
        const isSelected = node.id === activeId;

        if (grp) {
          grp.visible = isVisible;
          const halo = grp.getObjectByName('halo') as THREE.Mesh | undefined;
          if (halo && halo.material instanceof THREE.MeshBasicMaterial) {
            halo.material.opacity = isSelected ? 0.72 + Math.sin(t * 4) * 0.18 : 0.22;
            const s = isSelected ? 1.18 + Math.sin(t * 3) * 0.06 : 1;
            halo.scale.set(s, s, 1);
          }
        }

        if (pinEl) {
          if (!isVisible) {
            pinEl.style.opacity = '0';
            pinEl.style.pointerEvents = 'none';
            continue;
          }
          projVec.set(node.coords[0], node.coords[1] + 0.55, node.coords[2]);
          projVec.project(camera);

          if (projVec.z > 1) {
            pinEl.style.opacity = '0';
            pinEl.style.pointerEvents = 'none';
          } else {
            const sx = (projVec.x * 0.5 + 0.5) * canvasW;
            const sy = (-projVec.y * 0.5 + 0.5) * canvasH;

            const isNarrow = canvasW < 768;
            const topSafe = isNarrow ? 62 : 114;
            const bottomSafe = isNarrow
              ? canvasH - (sheetExpandedRef.current ? 265 : 138)
              : canvasH - 28;

            const hitsBottomCard =
              !isNarrow &&
              sx < 445 &&
              sy > canvasH - (sheetExpandedRef.current ? 285 : 140);
            const hitsRightControls =
              !isNarrow && sx > canvasW - 170 && sy > canvasH - 265;
            const outOfSafeBounds =
              sx < 28 ||
              sx > canvasW - 28 ||
              sy < topSafe ||
              sy > bottomSafe ||
              hitsBottomCard ||
              hitsRightControls;

            if (outOfSafeBounds) {
              pinEl.style.opacity = '0';
              pinEl.style.pointerEvents = 'none';
            } else {
              pinEl.style.opacity = '1';
              pinEl.style.pointerEvents = 'auto';
              pinEl.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -100%)`;
              pinEl.style.zIndex = isSelected ? '30' : '15';
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('wheel', onWheel);
      sceneControllersRef.current = null;
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentGallery =
    selectedNode.gallery && selectedNode.gallery.length > 0 ? selectedNode.gallery : [selectedNode.image];
  const heroSrc = currentGallery[activeImageIdx] ?? selectedNode.image;

  return (
    <main className="fixed inset-0 z-50 h-dvh max-h-dvh w-full overflow-hidden bg-[#141110] text-[#F6F3EE] select-none">
      {/* =========================================================================
          LIENZO INTERACTIVO 3D FULL-SCREEN (touch-action: none para gestos fluidos)
          ========================================================================= */}
      <div
        ref={mountRef}
        className="absolute inset-0 h-full w-full touch-none cursor-grab active:cursor-grabbing"
      />

      {/* Fallback Arquitectónico 2D Interactivo en caso de dispositivos sin WebGL */}
      {!glSupported && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#2a201d,#141110)] p-6 pt-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#C5A572]/30 bg-[#1B1615]/90 p-5 text-center backdrop-blur">
            <p className="font-technical text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              Plano Arquitectónico de Peñafiel
            </p>
            <p className="mt-1 text-xs text-[#D8CFC2]">
              Tu dispositivo ha activado el plano táctil 2D de alta compatibilidad. Selecciona cualquier ubicación en la lista inferior.
            </p>
          </div>
        </div>
      )}

      {/* Marcadores Proyectados sobre el Lienzo 3D */}
      {glSupported && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNode.id;
            const isZone = node.category === 'zonas';
            return (
              <button
                key={node.id}
                ref={(el) => {
                  markerRefs.current[node.id] = el;
                }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoTour(false);
                  focusNode(node, 6.2);
                }}
                aria-label={`Seleccionar ${node.title}`}
                className="pointer-events-auto absolute left-0 top-0 group flex flex-col items-center focus:outline-none"
                style={{ opacity: 0 }}
              >
                <span
                  className={`flex min-h-[34px] min-w-[34px] items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-xl backdrop-blur-md transition-all ${
                    isSelected
                      ? 'scale-110 border-[#C5A572] bg-[#4A1521] text-[#F6F3EE] ring-4 ring-[#C5A572]/30'
                      : isZone
                        ? 'border-[#C5A572]/45 bg-[#1B1615]/88 text-[#C5A572] hover:border-[#C5A572] hover:bg-[#2A201E]'
                        : 'border-[#F6F3EE]/35 bg-[#141110]/85 text-[#F6F3EE] hover:border-[#C5A572]'
                  }`}
                >
                  <span className="font-technical text-[10px] tracking-[0.12em] text-[#C5A572]">
                    {node.code}
                  </span>
                  <span
                    className={
                      isSelected
                        ? 'hidden sm:inline max-w-[140px] truncate'
                        : 'hidden lg:inline max-w-[125px] truncate'
                    }
                  >
                    {node.title}
                  </span>
                </span>
                <span
                  className={`mt-0.5 h-2 w-0.5 transition-colors ${
                    isSelected ? 'bg-[#C5A572]' : 'bg-[#F6F3EE]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          BARRA SUPERIOR FLOTANTE DE NAVEGACIÓN & FILTROS
          ========================================================================= */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-col gap-2.5 p-3 sm:p-5">
        <div className="pointer-events-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/alojamientos"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#F6F3EE]/20 bg-[#141110]/85 px-3.5 sm:px-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F6F3EE] backdrop-blur-xl transition hover:border-[#C5A572] hover:text-[#C5A572]"
            >
              <ArrowLeft className="h-4 w-4 text-[#C5A572]" />
              <span className="hidden sm:inline">Volver a Alojamientos</span>
              <span className="sm:hidden">Volver</span>
            </Link>

            <div className="hidden lg:flex flex-col rounded-full border border-[#F6F3EE]/10 bg-[#141110]/75 px-4 py-1.5 backdrop-blur-xl">
              <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572]">
                Cartografía 3D Interactiva · Peñafiel
              </span>
              <span className="font-editorial text-sm font-medium text-[#F6F3EE]">
                Finca Entreviñedos &amp; La Muralla ({nodes.length} enclaves)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileControlsOpen(false);
                setDrawerListOpen((v) => !v);
              }}
              aria-expanded={drawerListOpen}
              className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-xl transition cursor-pointer ${
                drawerListOpen
                  ? 'border-[#C5A572] bg-[#C5A572] text-[#141110]'
                  : 'border-[#F6F3EE]/20 bg-[#141110]/85 text-[#F6F3EE] hover:border-[#C5A572]'
              }`}
            >
              <List className={`h-3.5 w-3.5 ${drawerListOpen ? 'text-[#141110]' : 'text-[#C5A572]'}`} />
              <span>Lugares ({visibleNodes.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDrawerListOpen(false);
                setMobileControlsOpen((v) => !v);
              }}
              aria-expanded={mobileControlsOpen}
              className={`md:hidden inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-xl transition cursor-pointer ${
                mobileControlsOpen || isAutoTour || isTopDown
                  ? 'border-[#C5A572] bg-[#4A1521] text-[#F6F3EE]'
                  : 'border-[#F6F3EE]/20 bg-[#141110]/85 text-[#F6F3EE]'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#C5A572]" />
              <span>Vista</span>
            </button>

            <Link
              to={selectedNode.bookingPath ?? '/reserva-finca'}
              className="hidden md:inline-flex h-10 items-center gap-1.5 rounded-full bg-[#4A1521] px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F6F3EE] shadow-lg transition hover:bg-[#631D2C]"
            >
              <CalendarCheck className="h-3.5 w-3.5 text-[#C5A572]" />
              <span>Reservar</span>
            </Link>
          </div>
        </div>

        {/* Filtros de Capa + Selector Solar de Luz (visibles directamente en Tablet/Desktop) */}
        <div className="pointer-events-auto hidden md:flex flex-wrap items-center justify-between gap-2">
          <div className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-[#F6F3EE]/12 bg-[#141110]/80 p-1 backdrop-blur-xl">
            {(
              [
                { id: 'all', label: `Todo (${nodes.length})` },
                { id: 'finca', label: 'Casas Finca (8)' },
                { id: 'muralla', label: 'La Muralla (2)' },
                { id: 'zonas', label: 'Bodega & Zonas (4)' },
              ] as const
            ).map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setIsAutoTour(false);
                    setCategory(tab.id);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition cursor-pointer ${
                    active
                      ? 'bg-[#C5A572] text-[#141110]'
                      : 'text-[#D8CFC2] hover:bg-[#241E1C] hover:text-[#F6F3EE]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[#F6F3EE]/12 bg-[#141110]/80 p-1 backdrop-blur-xl">
            {(Object.values(ATMOSPHERES) as AtmospherePreset[]).map((preset) => {
              const active = atmosphere === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setAtmosphere(preset.id)}
                  aria-label={`Iluminación ${preset.label}`}
                  title={`Iluminación ${preset.label}`}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] transition cursor-pointer ${
                    active
                      ? 'bg-[#4A1521] text-[#F6F3EE] border border-[#C5A572]/60'
                      : 'text-[#D8CFC2] hover:bg-[#241E1C]'
                  }`}
                >
                  <span className={active ? 'text-[#C5A572]' : 'text-[#8C8175]'}>
                    {ATMOSPHERE_ICONS[preset.id]}
                  </span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =========================================================================
          POPOVER MINIMALISTA DE CONTROLES "VISTA" EN MÓVIL (< md)
          ========================================================================= */}
      {mobileControlsOpen && (
        <>
          <div
            onClick={() => setMobileControlsOpen(false)}
            className="md:hidden absolute inset-0 z-30 bg-[#141110]/40 backdrop-blur-[1px]"
            aria-hidden="true"
          />
          <div className="md:hidden absolute right-3 top-14 z-40 w-[min(19.5rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-4.5rem)] overflow-y-auto rounded-2xl border border-[#C5A572]/35 bg-[#181413]/96 p-4 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F6F3EE]/10 pb-2">
              <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572]">
                Controles de Vista y Luz
              </span>
              <button
                type="button"
                onClick={() => setMobileControlsOpen(false)}
                aria-label="Cerrar controles de vista"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#241E1C] text-[#D8CFC2]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-technical text-[10px] uppercase tracking-[0.16em] text-[#D8CFC2]/75">
                Cámara y Perspectiva
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    toggleTopDownView();
                    setMobileControlsOpen(false);
                  }}
                  className={`col-span-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border text-[11px] font-semibold uppercase tracking-wider transition ${
                    isTopDown
                      ? 'border-[#C5A572] bg-[#C5A572] text-[#141110]'
                      : 'border-[#F6F3EE]/15 bg-[#241E1C] text-[#F6F3EE]'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{isTopDown ? 'Vista 3D' : 'Cenital'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => adjustZoom(-2.0)}
                  aria-label="Acercar zoom"
                  className="flex h-10 items-center justify-center rounded-xl border border-[#F6F3EE]/15 bg-[#241E1C] text-[#F6F3EE]"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustZoom(2.0)}
                  aria-label="Alejar zoom"
                  className="flex h-10 items-center justify-center rounded-xl border border-[#F6F3EE]/15 bg-[#241E1C] text-[#F6F3EE]"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetOverview();
                  setMobileControlsOpen(false);
                }}
                className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-[#F6F3EE]/10 bg-[#211C1A] text-[11px] font-medium text-[#C5A572]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Centrar toda la finca</span>
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-technical text-[10px] uppercase tracking-[0.16em] text-[#D8CFC2]/75">
                Iluminación Solar
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.values(ATMOSPHERES) as AtmospherePreset[]).map((preset) => {
                  const active = atmosphere === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setAtmosphere(preset.id)}
                      className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border text-[11px] font-semibold uppercase tracking-wider transition ${
                        active
                          ? 'border-[#C5A572] bg-[#4A1521] text-[#F6F3EE]'
                          : 'border-[#F6F3EE]/10 bg-[#241E1C] text-[#D8CFC2]'
                      }`}
                    >
                      <span className={active ? 'text-[#C5A572]' : 'text-[#8C8175]'}>
                        {ATMOSPHERE_ICONS[preset.id]}
                      </span>
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAutoTour((v) => !v);
                setMobileControlsOpen(false);
              }}
              className={`flex h-10 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition ${
                isAutoTour
                  ? 'bg-[#C5A572] text-[#141110]'
                  : 'bg-[#4A1521] text-[#F6F3EE]'
              }`}
            >
              {isAutoTour ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-[#C5A572]" />}
              <span>{isAutoTour ? 'Pausar Auto-Tour' : 'Iniciar Auto-Tour'}</span>
            </button>
          </div>
        </>
      )}

      {/* =========================================================================
          CAJÓN DESPLEGABLE DE LUGARES & FILTROS
          ========================================================================= */}
      {drawerListOpen && (
        <>
          <div
            onClick={() => setDrawerListOpen(false)}
            className="absolute inset-0 z-30 bg-[#141110]/40 backdrop-blur-[1px]"
            aria-hidden="true"
          />
          <aside className="absolute inset-x-3 top-14 md:top-[112px] md:left-auto md:right-5 md:w-80 z-40 max-h-[calc(100dvh-4.5rem)] md:max-h-[calc(100dvh-8.25rem)] overflow-y-auto rounded-2xl border border-[#C5A572]/35 bg-[#181413]/96 p-3 shadow-2xl backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between border-b border-[#F6F3EE]/10 pb-2 px-1">
              <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[#C5A572]">
                Explorar enclaves ({visibleNodes.length})
              </span>
              <button
                type="button"
                onClick={() => setDrawerListOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#241E1C] text-[#D8CFC2] hover:text-[#F6F3EE]"
                aria-label="Cerrar lugares"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Filtros integrados dentro del cajón para móvil */}
            <div className="mb-2.5 grid grid-cols-2 gap-1.5 md:hidden">
              {(
                [
                  { id: 'all', label: `Todo (${nodes.length})` },
                  { id: 'finca', label: 'Casas Finca (8)' },
                  { id: 'muralla', label: 'La Muralla (2)' },
                  { id: 'zonas', label: 'Bodega & Zonas (4)' },
                ] as const
              ).map((tab) => {
                const active = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setIsAutoTour(false);
                      setCategory(tab.id);
                    }}
                    className={`rounded-xl px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wider transition ${
                      active
                        ? 'bg-[#C5A572] text-[#141110]'
                        : 'bg-[#241E1C] text-[#D8CFC2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5">
              {visibleNodes.map((node) => {
                const active = node.id === selectedNode.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setIsAutoTour(false);
                      focusNode(node, 6.2);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                      active
                        ? 'border border-[#C5A572]/60 bg-[#4A1521]/45 text-[#F6F3EE]'
                        : 'border border-transparent bg-[#211C1A]/75 text-[#D8CFC2] hover:border-[#F6F3EE]/20'
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#141110] font-technical text-[11px] font-semibold text-[#C5A572]">
                      {node.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-[#F6F3EE]">{node.title}</p>
                      <p className="truncate text-[11px] text-[#C5A572]">{node.highlights[0] ?? node.badge}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        </>
      )}

      {/* =========================================================================
          CONTROLES LATERALES DE CÁMARA Y TOUR GUIADO (DESKTOP & TABLET >= md)
          ========================================================================= */}
      <div className="hidden md:flex absolute right-5 bottom-6 z-20 flex-col items-end gap-2">
        {/* Auto-Tour + Anterior/Siguiente */}
        <div className="flex items-center gap-1 rounded-full border border-[#F6F3EE]/15 bg-[#141110]/85 p-1 backdrop-blur-xl shadow-xl">
          <button
            type="button"
            onClick={() => {
              setIsAutoTour(false);
              stepTour(-1);
            }}
            aria-label="Ubicación anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#D8CFC2] transition hover:bg-[#241E1C] hover:text-[#F6F3EE] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsAutoTour((v) => !v)}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold uppercase tracking-[0.14em] transition cursor-pointer ${
              isAutoTour
                ? 'bg-[#C5A572] text-[#141110]'
                : 'bg-[#241E1C] text-[#F6F3EE] hover:bg-[#4A1521]'
            }`}
          >
            {isAutoTour ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-[#C5A572]" />}
            <span>{isAutoTour ? 'Pausar Tour' : 'Auto-Tour'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsAutoTour(false);
              stepTour(1);
            }}
            aria-label="Ubicación siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#D8CFC2] transition hover:bg-[#241E1C] hover:text-[#F6F3EE] cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Botones de Vista Cenital, Zoom y Centrado */}
        <div className="flex flex-col gap-1.5 rounded-2xl border border-[#F6F3EE]/15 bg-[#141110]/85 p-1.5 backdrop-blur-xl shadow-xl">
          <button
            type="button"
            onClick={toggleTopDownView}
            aria-label={isTopDown ? 'Volver a Vista 3D Panorámica' : 'Cambiar a Plano Cenital'}
            title={isTopDown ? 'Volver a Vista 3D Panorámica' : 'Cambiar a Plano Cenital 2D/3D'}
            className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition cursor-pointer ${
              isTopDown
                ? 'bg-[#C5A572] text-[#141110]'
                : 'text-[#F6F3EE] hover:bg-[#241E1C]'
            }`}
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span>{isTopDown ? 'Vista 3D' : 'Plano Cenital'}</span>
          </button>

          <div className="h-px bg-[#F6F3EE]/10" />

          <button
            type="button"
            onClick={() => adjustZoom(-2.0)}
            aria-label="Acercar zoom"
            className="flex h-9 w-full items-center justify-center rounded-xl text-[#F6F3EE] transition hover:bg-[#241E1C] cursor-pointer"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => adjustZoom(2.0)}
            aria-label="Alejar zoom"
            className="flex h-9 w-full items-center justify-center rounded-xl text-[#F6F3EE] transition hover:bg-[#241E1C] cursor-pointer"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <div className="h-px bg-[#F6F3EE]/10" />

          <button
            type="button"
            onClick={resetOverview}
            aria-label="Centrar finca completa"
            title="Centrar toda la finca"
            className="flex h-9 w-full items-center justify-center rounded-xl text-[#C5A572] transition hover:bg-[#241E1C] cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          INSPECTOR CONTEXTUAL (TARJETA COMPACTA POR DEFECTO EN MÓVIL · COMPLETA EN DESKTOP)
          ========================================================================= */}
      <section
        aria-label="Detalle del enclave seleccionado"
        className={`absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:w-[380px] md:bottom-5 md:left-5 md:w-[410px] max-h-[calc(100dvh-5.25rem)] overflow-y-auto z-20 rounded-2xl border border-[#C5A572]/30 bg-[#181413]/92 shadow-2xl backdrop-blur-xl transition-all ${
          drawerListOpen || mobileControlsOpen ? 'hidden md:block' : ''
        }`}
      >
        {/* Cabecera con navegación Anterior / Siguiente integrada y botón Detalles */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#C5A572]/40 bg-[#4A1521]/60 font-technical text-[11px] font-semibold text-[#C5A572]">
              {selectedNode.code}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-technical text-[10px] uppercase tracking-[0.16em] text-[#C5A572] truncate">
                {sheetExpanded ? selectedNode.badge : selectedNode.highlights.slice(0, 2).join(' · ')}
              </p>
              <h2 className="font-editorial text-base sm:text-lg font-medium text-[#F6F3EE] truncate">
                {selectedNode.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsAutoTour(false);
                stepTour(-1);
              }}
              aria-label="Enclave anterior"
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-[#F6F3EE]/15 bg-[#241E1C] text-[#D8CFC2] hover:text-[#F6F3EE]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoTour(false);
                stepTour(1);
              }}
              aria-label="Siguiente enclave"
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-[#F6F3EE]/15 bg-[#241E1C] text-[#D8CFC2] hover:text-[#F6F3EE]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSheetExpanded((v) => !v)}
              aria-expanded={sheetExpanded}
              aria-label={sheetExpanded ? 'Contraer detalles' : 'Ver detalles'}
              className="flex h-8 items-center gap-1 rounded-full border border-[#F6F3EE]/15 bg-[#241E1C] px-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#C5A572] cursor-pointer"
            >
              <span className="md:hidden">{sheetExpanded ? 'Menos' : 'Detalles'}</span>
              {sheetExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Cuerpo Expandido con Foto, Métricas y Descripción */}
        {sheetExpanded && (
          <div className="border-t border-[#F6F3EE]/10 px-3.5 sm:px-4 pt-2.5 pb-1.5 space-y-2.5">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 relative overflow-hidden rounded-xl border border-[#F6F3EE]/15">
                <OptimizedImage
                  src={heroSrc}
                  alt={selectedNode.title}
                  aspectClassName="aspect-[4/3]"
                />
                {currentGallery.length > 1 && (
                  <div className="absolute bottom-1.5 right-1.5 flex gap-1">
                    {currentGallery.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        aria-label={`Foto ${idx + 1}`}
                        className={`h-2 w-2 rounded-full transition ${
                          activeImageIdx === idx ? 'bg-[#C5A572] scale-125' : 'bg-[#F6F3EE]/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-7 space-y-1.5">
                <p className="text-xs leading-relaxed text-[#D8CFC2] line-clamp-2 sm:line-clamp-3">
                  {selectedNode.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {selectedNode.highlights.slice(0, 3).map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full border border-[#C5A572]/30 bg-[#241E1C] px-2 py-0.5 text-[10px] text-[#E6DDD0]"
                    >
                      {idx === 0 &&
                        (selectedNode.accommodation ? (
                          <Maximize2 className="h-2.5 w-2.5 text-[#C5A572]" />
                        ) : (
                          <Wine className="h-2.5 w-2.5 text-[#C5A572]" />
                        ))}
                      {idx === 1 && selectedNode.accommodation && (
                        <Users className="h-2.5 w-2.5 text-[#C5A572]" />
                      )}
                      {idx === 2 && selectedNode.accommodation && (
                        <BedDouble className="h-2.5 w-2.5 text-[#C5A572]" />
                      )}
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Acciones Directas (siempre accesibles en compacto o expandido) */}
        <div className="grid grid-cols-2 gap-2 px-3.5 pb-3 pt-1 sm:px-4 sm:pb-4">
          <Link
            to={selectedNode.detailPath}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#C5A572]/50 bg-[#241E1C] px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#F6F3EE] transition hover:bg-[#2F2724]"
          >
            <span>Ver Ficha</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
          </Link>

          {selectedNode.bookingPath ? (
            <Link
              to={selectedNode.bookingPath}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4A1521] px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C]"
            >
              <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
              <span>Reservar</span>
            </Link>
          ) : (
            <Link
              to="/reserva-finca"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4A1521] px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#F6F3EE] shadow-md transition hover:bg-[#631D2C]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#C5A572]" />
              <span>Reservar Finca</span>
            </Link>
          )}
        </div>
      </section>

      {/* Indicador sutil de ayuda gestual en escritorio amplio sin solape */}
      <div className="pointer-events-none absolute bottom-5 left-[450px] right-[180px] hidden xl:flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F6F3EE]/10 bg-[#141110]/70 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#D8CFC2]/80 backdrop-blur">
          <Compass className="h-3.5 w-3.5 text-[#C5A572]" />
          <span>Arrastra para rotar · Rueda para zoom · Toca cualquier pin</span>
        </div>
      </div>
    </main>
  );
};

export default InteractiveMapPage;
