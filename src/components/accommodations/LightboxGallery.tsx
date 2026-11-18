import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxGalleryProps {
  images: string[];
  activeIndex: number | null;
  title?: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({
  images,
  activeIndex,
  title,
  onClose,
  onChangeIndex,
}) => {
  const isOpen = activeIndex !== null && images.length > 0;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChangeIndex((activeIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onChangeIndex((activeIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeIndex, images.length, onClose, onChangeIndex]);

  if (!isOpen || activeIndex === null) return null;

  const currentSrc = images[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Galería fotográfica'}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141110]/95 p-3 sm:p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-6xl items-center justify-between gap-3 pb-3 sm:pb-4 text-[#F6F3EE]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          {title && (
            <p className="truncate font-editorial text-lg sm:text-xl font-medium text-[#F6F3EE]">
              {title}
            </p>
          )}
          <p className="font-technical text-xs uppercase tracking-widest text-[#C5A572]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex w-full max-w-6xl flex-1 items-center justify-center min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onChangeIndex((activeIndex - 1 + images.length) % images.length)}
          aria-label="Imagen anterior"
          className="absolute left-1.5 sm:left-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-[#141110]/70 text-white backdrop-blur transition hover:bg-[#4A1521] cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <img
          src={currentSrc}
          alt={`${title || 'Finca Entreviñedos'} - fotografía ${activeIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-h-[64dvh] sm:max-h-[74vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
        />

        <button
          type="button"
          onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
          aria-label="Imagen siguiente"
          className="absolute right-1.5 sm:right-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-[#141110]/70 text-white backdrop-blur transition hover:bg-[#4A1521] cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      <div
        className="mt-3 sm:mt-4 flex w-full max-w-5xl gap-2 overflow-x-auto no-scrollbar py-1"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={img + idx}
            type="button"
            onClick={() => onChangeIndex(idx)}
            className={`h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 transition cursor-pointer ${
              idx === activeIndex
                ? 'border-[#C5A572] opacity-100'
                : 'border-transparent opacity-45 hover:opacity-80'
            }`}
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
