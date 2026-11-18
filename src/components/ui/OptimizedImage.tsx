import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

/**
 * Componente de imagen optimizado para Core Web Vitals:
 * - Reserva aspecto geométrico anti-CLS
 * - Skeleton cálido de piedra caliza mientras decodifica
 * - fetchPriority="high" + loading="eager" solo en LCP/Hero; lazy + async en el resto
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = '',
  priority = false,
  sizes,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE3D9] ${aspectClassName} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          className="skeleton-limestone absolute inset-0 h-full w-full"
        />
      )}
      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
          } ${className}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#EAE3D9] p-4 text-center">
          <span className="font-editorial text-sm italic text-[#5C5349]">
            Finca Entreviñedos · Peñafiel
          </span>
        </div>
      )}
    </div>
  );
};
