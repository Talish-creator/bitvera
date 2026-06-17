import React from 'react';
import { partnersData } from '../mock/partners';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-300 mb-12 transition-colors">
          {t('partners_section.trusted_by')}
        </h2>
        {/* Added dir="ltr" to protect the scrolling animation in Arabic mode */}
        <div className="relative overflow-hidden" dir="ltr">
          <div className="flex space-x-12 animate-scroll">
            {[...partnersData, ...partnersData].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 bg-transparent dark:brightness-200"
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