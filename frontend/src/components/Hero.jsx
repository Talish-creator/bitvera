import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BookingModal from './BookingModal';
import WordsPullUp from './ui/WordsPullUp';
import Navbar from './Navbar';

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="h-screen w-full bg-black p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Overlays */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-10" />

        {/* Navbar inside Hero container */}
        <div className="absolute top-0 left-0 w-full flex justify-center z-50">
          <Navbar />
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            
            {/* Giant Heading */}
            <div className="md:col-span-8">
              <WordsPullUp 
                text={t('hero.title_1') + " " + t('hero.title_2')} 
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]"
                showAsterisk={true}
              />
            </div>

            {/* Subtitle & CTA */}
            <div className="md:col-span-4 flex flex-col items-start md:items-end justify-end space-y-6 md:pb-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-sm md:text-right"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.button
                onClick={() => setIsBookingOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-2 hover:gap-3 bg-primary text-black rounded-full pl-5 pr-2 py-2 transition-all duration-300"
              >
                <span className="font-medium text-sm sm:text-base">{t('hero.book_consultation')}</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight size={18} className="text-[#DEDBC8]" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
};

export default Hero;