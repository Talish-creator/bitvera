import React from 'react';
import { partnersData } from '../mock/partners';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 bg-surface-main border-y border-border-glass/10 transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl font-bold text-center text-text-accent mb-12 transition-colors">
          {t('partners_section.trusted_by')}
        </h2>
        {/* Added dir="ltr" to protect the scrolling animation in Arabic mode */}
        <div className="relative overflow-hidden" dir="ltr">
          <div className="flex space-x-12 animate-scroll">
            {[...partnersData, ...partnersData].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center opacity-30 hover:opacity-100 transition-all duration-500 hover:drop-shadow-[0_0_12px_#DEDBC8] grayscale hover:grayscale-0 bg-transparent"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-16 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Partners;