import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useWebGLContext } from '../WebGLContext';
import {
  liquidWineFragmentShader,
  liquidWineVertexShader,
} from '../shaders/liquidWineShader';
import {
  terroirParticlesFragmentShader,
  terroirParticlesVertexShader,
} from '../shaders/terroirParticlesShader';

interface LiquidTerroirCanvasProps {
  className?: string;
  intensity?: number;
  showParticles?: boolean;
}

/**
 * Escena WebGL modular de fluido orgánico ("Vino Gran Reserva & Caliza").
 * Incluye pausa automática fuera de viewport (IntersectionObserver) para preservar Core Web Vitals.
 */
export const LiquidTerroirCanvas: React.FC<LiquidTerroirCanvasProps> = ({
  className = '',
  intensity = 0.85,
  showParticles = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isEnabled, capabilities } = useWebGLContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isEnabled) return;

    let animationFrameId = 0;
    let isVisible = true;
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerCurrent = new THREE.Vector2(0.5, 0.5);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 640;
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      capabilities.qualityTier === 'high' ? 1.75 : 1.25,
    );

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: pointerCurrent },
      uScroll: { value: 0 },
      uIntensity: { value: intensity },
      uResolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
    };

    const planeGeo = new THREE.PlaneGeometry(2, 2);
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: liquidWineVertexShader,
      fragmentShader: liquidWineFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(planeMesh);

    let particlesGeo: THREE.BufferGeometry | null = null;
    let particlesMat: THREE.ShaderMaterial | null = null;
    let particlesMesh: THREE.Points | null = null;

    if (showParticles) {
      const count = capabilities.qualityTier === 'high' ? 48 : 24;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2.0;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2.0;
        positions[i * 3 + 2] = Math.random() * 0.6;
        scales[i] = 0.6 + Math.random() * 1.4;
        phases[i] = Math.random() * Math.PI * 2;
      }

      particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      particlesGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

      particlesMat = new THREE.ShaderMaterial({
        vertexShader: terroirParticlesVertexShader,
        fragmentShader: terroirParticlesFragmentShader,
        uniforms: {
          uTime: uniforms.uTime,
          uPixelRatio: { value: pixelRatio },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerTarget.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };

    const onScroll = () => {
      const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      uniforms.uScroll.value = window.scrollY / scrollMax;
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 640;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * pixelRatio, h * pixelRatio);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const tick = () => {
      animationFrameId = window.requestAnimationFrame(tick);
      if (!isVisible) return;

      const delta = clock.getDelta();
      uniforms.uTime.value += delta;
      pointerCurrent.lerp(pointerTarget, 0.05);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      planeGeo.dispose();
      planeMat.dispose();
      particlesGeo?.dispose();
      particlesMat?.dispose();
      if (particlesMesh) scene.remove(particlesMesh);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isEnabled, capabilities.qualityTier, intensity, showParticles]);

  if (!isEnabled) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none bg-gradient-to-br from-[#141110]/80 via-[#4A1521]/45 to-[#141110]/90 ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default LiquidTerroirCanvas;
