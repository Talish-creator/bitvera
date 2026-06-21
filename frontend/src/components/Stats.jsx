import React from 'react';
import { statsData } from '../mock/data';
import { useTranslation } from 'react-i18next'; // 1. Import translation tool

const Stats = () => {
  const { t } = useTranslation(); // 2. Activate tool

  return (
    <section className="relative py-16 bg-surface-raised border-y border-border-glass/10 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-text-accent mb-2 drop-shadow-md">
                {stat.value}
              </div>
              {/* 3. Wrap label in t() using the 'stats' group we created */}
              <div className="text-sm md:text-base text-text-primary/60 uppercase tracking-wider">
                {t(`stats.${stat.label}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;