import React, { useState } from 'react';
import { Button } from './ui/button';
import { heroData } from '../mock/data';
import { CheckCircle, Zap, Headphones, Trophy } from 'lucide-react';
import BookingModal from './BookingModal';
import { useTranslation } from 'react-i18next';

const iconMap = {
  CheckCircle,
  Zap,
  Headphones,
  Trophy
};

const FeatureBadge = ({ feature, index }) => {
  const { t } = useTranslation();
  const Icon = iconMap[feature.icon];
  return (
    <div className="flex items-center space-x-3 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      {/* Translates the badge text dynamically */}
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t(`features.${feature.text}`)}</span>
    </div>
  );
};

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t } = useTranslation(); 

  return (
    <>
      <section className="relative pt-24 pb-20 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 dark:from-slate-900 via-cyan-50/30 dark:via-slate-800/50 to-teal-50/20 dark:to-slate-900"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    {t('hero.title_1')} 
                  </span>
                  <br />
                  <span>{t('hero.title_2')}</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl transition-colors">
                  {t('hero.subtitle')}
                </p>
                <p className="text-base text-slate-500 dark:text-slate-400 transition-colors">
                  {t('hero.trusted_partner')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
                  onClick={() => setIsBookingOpen(true)}
                >
                  {t('hero.book_consultation')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
                  onClick={() => setIsBookingOpen(true)}
                >
                  {t('hero.book_demo')}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {heroData.features.map((feature, index) => (
                  <FeatureBadge key={`feature-${index}`} feature={feature} index={index} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-600 h-10 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                </div>
                <div className="p-6">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto rounded-lg shadow-inner"
                    poster="/images/hero-mockup.png"
                  >
                    <source src="/videos/hero-dashboard-loop.mp4" type="video/mp4" />
                    <img
                      src="/images/hero-mockup.png"
                      alt="ERP Dashboard Analytics"
                      className="w-full h-auto rounded-lg shadow-inner"
                      loading="lazy"
                    />
                  </video>
                </div>
              </div>
              
              {/* Added ltr: and rtl: to handle the absolute positioning dynamically */}
              <div className="absolute -bottom-6 ltr:-left-6 rtl:-right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white transition-colors">{t('features.Implementation')}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{t('features.95% Success Rate')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;