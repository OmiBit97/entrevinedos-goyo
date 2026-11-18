import { useCallback, useRef } from 'react';
import { useWebGLContext } from '../WebGLContext';
import type { WebGLSceneMode } from '../types';

export function useWebGLScene() {
  const ctx = useWebGLContext();
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const handlePointerMove = useCallback((clientX: number, clientY: number, rect?: DOMRect) => {
    if (rect) {
      pointerRef.current = {
        x: Math.min(1, Math.max(0, (clientX - rect.left) / Math.max(rect.width, 1))),
        y: Math.min(1, Math.max(0, 1 - (clientY - rect.top) / Math.max(rect.height, 1))),
      };
      return;
    }
    pointerRef.current = {
      x: clientX / Math.max(window.innerWidth, 1),
      y: 1 - clientY / Math.max(window.innerHeight, 1),
    };
  }, []);

  const focusWaypoint = useCallback(
    (waypointId: string) => {
      ctx.setActiveWaypointId(waypointId);
    },
    [ctx],
  );

  const switchMode = useCallback(
    (mode: WebGLSceneMode) => {
      ctx.setActiveMode(mode);
    },
    [ctx],
  );

  return {
    ...ctx,
    pointerRef,
    handlePointerMove,
    focusWaypoint,
    switchMode,
  };
}
