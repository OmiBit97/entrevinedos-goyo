export type WebGLSceneMode =
  | 'liquid-terroir'
  | 'cellar-atmosphere'
  | 'estate-topography'
  | 'off';

export type WebGLQualityTier = 'high' | 'balanced' | 'reduced';

export interface TerroirUniforms {
  uTime: number;
  uPointerX: number;
  uPointerY: number;
  uScrollProgress: number;
  uIntensity: number;
}

export interface CameraWaypoint {
  id: string;
  label: string;
  position: [number, number, number];
  lookAt: [number, number, number];
}

export interface EstatePOI {
  id: string;
  title: string;
  category: 'alojamiento' | 'bodega' | 'zona-comun' | 'entorno';
  subtitle: string;
  coords: [number, number, number];
  link?: string;
}

export interface WebGLCapabilities {
  supported: boolean;
  prefersReducedMotion: boolean;
  qualityTier: WebGLQualityTier;
}
