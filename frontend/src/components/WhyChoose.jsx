import React from 'react';
import { useTranslation } from 'react-i18next';
import WordsPullUpMultiStyle from './ui/WordsPullUpMultiStyle';
import AnimatedLetter from './ui/AnimatedLetter';

const WhyChoose = () => {
  const { t } = useTranslation();

  const titleSegments = [
    { text: t('why_choose_page.title'), className: "font-serif italic" }
  ];

  return (
    <section className="bg-surface-main py-24 md:py-32 flex items-center justify-center">
      <div className="bg-surface-raised w-full max-w-6xl mx-4 sm:mx-6 lg:mx-8 rounded-3xl p-8 md:p-16 flex flex-col items-center text-center">
        
        {/* Top Label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8 md:mb-12">
          {t('BitVera IT Solutions')}
        </span>

        {/* Main Heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-text-accent mb-12 md:mb-16">
          <WordsPullUpMultiStyle segments={titleSegments} />
        </div>

        {/* Scroll-Revealed Subtitle */}
        <div className="text-text-accent text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          <AnimatedLetter text={t('why_choose_page.subtitle')} />
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;