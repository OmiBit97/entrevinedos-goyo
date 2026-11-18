import React from 'react';
import { COOKIES_POLICY, PRIVACY_POLICY } from '../data/faqsAndPolicies';

interface LegalPageProps {
  type: 'cookies' | 'privacidad';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  if (type === 'cookies') {
    return (
      <main className="min-h-screen bg-[#F6F3EE] pt-24 sm:pt-32 pb-16 sm:pb-24 text-[#1A1615]">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 space-y-6 break-words">
          <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#9A7B56]">
            {COOKIES_POLICY.updatedAt}
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
            {COOKIES_POLICY.title}
          </h1>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#5C5349]">
            {COOKIES_POLICY.paragraphs.map((p, idx) => (
              <p key={idx} className="break-words">
                {p}
              </p>
            ))}
          </div>

          {COOKIES_POLICY.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3 pt-4 border-t border-[#D8CFC2]">
              <h2 className="font-editorial text-xl sm:text-2xl font-medium text-[#1A1615]">
                {sec.heading}
              </h2>
              <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#5C5349]">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="break-words">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F3EE] pt-24 sm:pt-32 pb-16 sm:pb-24 text-[#1A1615]">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 space-y-6 break-words">
        <p className="font-technical text-xs uppercase tracking-[0.2em] text-[#9A7B56]">
          {PRIVACY_POLICY.updatedAt}
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium md:text-5xl">
          {PRIVACY_POLICY.title}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-[#5C5349] break-words">
          {PRIVACY_POLICY.intro}
        </p>

        <section className="space-y-3 pt-4 border-t border-[#D8CFC2]">
          <h2 className="font-editorial text-xl sm:text-2xl font-medium text-[#1A1615]">
            {PRIVACY_POLICY.leadSection.heading}
          </h2>
          <div className="space-y-3 text-sm md:text-base leading-relaxed text-[#5C5349]">
            {PRIVACY_POLICY.leadSection.paragraphs.map((p, idx) => (
              <p key={idx} className="break-words">
                {p}
              </p>
            ))}
          </div>
        </section>

        {PRIVACY_POLICY.sections.map((sec) => (
          <section key={sec.heading} className="space-y-3 pt-4 border-t border-[#D8CFC2]">
            <h2 className="font-editorial text-xl sm:text-2xl font-medium text-[#1A1615]">
              {sec.heading}
            </h2>
            <div className="space-y-2 text-sm md:text-base leading-relaxed text-[#5C5349]">
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="break-words">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
};
