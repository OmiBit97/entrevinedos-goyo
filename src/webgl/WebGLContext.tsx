import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { WebGLCapabilities, WebGLQualityTier, WebGLSceneMode } from './types';

interface WebGLContextValue {
  capabilities: WebGLCapabilities;
  isEnabled: boolean;
  activeMode: WebGLSceneMode;
  activeWaypointId: string;
  toggleWebGL: () => void;
  setActiveMode: (mode: WebGLSceneMode) => void;
  setActiveWaypointId: (id: string) => void;
  setQualityTier: (tier: WebGLQualityTier) => void;
}

const WebGLContext = createContext<WebGLContextValue | null>(null);

function detectWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

export const WebGLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supported] = useState<boolean>(() => detectWebGLSupport());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [qualityTier, setQualityTier] = useState<WebGLQualityTier>(() =>
    prefersReducedMotion ? 'reduced' : 'high',
  );
  const [isEnabled, setIsEnabled] = useState<boolean>(() => supported && !prefersReducedMotion);
  const [activeMode, setActiveMode] = useState<WebGLSceneMode>('liquid-terroir');
  const [activeWaypointId, setActiveWaypointId] = useState<string>('overview');

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setQualityTier('reduced');
        setIsEnabled(false);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const value = useMemo<WebGLContextValue>(
    () => ({
      capabilities: {
        supported,
        prefersReducedMotion,
        qualityTier,
      },
      isEnabled: supported && isEnabled,
      activeMode,
      activeWaypointId,
      toggleWebGL: () => {
        if (!supported) return;
        setIsEnabled((prev) => !prev);
      },
      setActiveMode,
      setActiveWaypointId,
      setQualityTier,
    }),
    [supported, prefersReducedMotion, qualityTier, isEnabled, activeMode, activeWaypointId],
  );

  return <WebGLContext.Provider value={value}>{children}</WebGLContext.Provider>;
};

export function useWebGLContext(): WebGLContextValue {
  const ctx = useContext(WebGLContext);
  if (!ctx) {
    throw new Error('useWebGLContext must be used inside WebGLProvider');
  }
  return ctx;
}
