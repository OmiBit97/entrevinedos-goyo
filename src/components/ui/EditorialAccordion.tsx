import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  title: string;
  paragraphs: string[];
  badge?: string;
  children?: React.ReactNode;
}

interface EditorialAccordionProps {
  items: AccordionEntry[];
  defaultOpenIndex?: number | null;
  variant?: 'light' | 'dark';
}

export const EditorialAccordion: React.FC<EditorialAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  variant = 'light',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const isDark = variant === 'dark';

  return (
    <div
      className={`divide-y border-y ${
        isDark ? 'divide-[#D8CFC2]/15 border-[#D8CFC2]/15' : 'divide-[#D8CFC2] border-[#D8CFC2]'
      }`}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.id} className="group">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-3 sm:gap-6 py-4 sm:py-5 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {item.badge && (
                  <span
                    className={`font-technical inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-xs ${
                      isOpen
                        ? 'bg-[#4A1521] text-[#F6F3EE]'
                        : isDark
                          ? 'bg-white/10 text-[#C5A572]'
                          : 'bg-[#EAE3D9] text-[#5C5349]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  className={`font-editorial text-lg sm:text-xl md:text-2xl font-medium transition-colors ${
                    isDark
                      ? isOpen
                        ? 'text-[#C5A572]'
                        : 'text-[#F6F3EE] group-hover:text-[#C5A572]'
                      : isOpen
                        ? 'text-[#4A1521]'
                        : 'text-[#1A1615] group-hover:text-[#4A1521]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#4A1521]' : 'text-[#9A7B56]'
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-5 sm:pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-2.5 pl-0 sm:pl-11">
                  {item.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className={`text-sm md:text-[15px] leading-relaxed ${
                        isDark ? 'text-[#D8CFC2]/85' : 'text-[#5C5349]'
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                  {item.children}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
