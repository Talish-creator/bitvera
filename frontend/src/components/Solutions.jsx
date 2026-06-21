import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { solutionsData } from '../mock/solutions';
import { 
  Building2, FileCheck, Network, ShoppingBag, UserSearch, 
  Factory, Receipt, BadgeCheck, Users, Warehouse, 
  TrendingUp, Package, X, Check, ArrowRight 
} from 'lucide-react';
import { Button } from './ui/button';
import BookingModal from './BookingModal';
import { useTranslation } from 'react-i18next';
import WordsPullUpMultiStyle from './ui/WordsPullUpMultiStyle';

const iconMap = {
  Building2, FileCheck, Network, ShoppingBag, UserSearch,
  Factory, Receipt, BadgeCheck, Users, Warehouse,
  TrendingUp, Package
};

const SolutionModal = ({ solution, isOpen, onClose, onBookDemo }) => {
  const { t } = useTranslation();
  const Icon = solution ? iconMap[solution.icon] : null;

  if (!isOpen || !solution) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-main/80 backdrop-blur-sm">
      <div className="bg-surface-raised rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border-glass/10">
        <div className="sticky top-0 bg-surface-main/80 backdrop-blur-md p-6 border-b border-border-glass/10 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            {Icon && <Icon size={32} className="text-text-accent" />}
            <h2 className="text-2xl font-bold text-text-accent">{t(`solution_names.${solution.name}`)}</h2>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8">
          <p className="text-text-secondary mb-8">{t(solution.description)}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {solution.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-surface-elevated rounded-lg">
                <Check size={20} className="text-text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{t(feature)}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button onClick={() => { onClose(); onBookDemo(); }} className="flex-1 bg-text-accent text-black hover:bg-white">
              {t('solutions_page.schedule_demo')}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 border-white/20 text-text-primary hover:bg-white/10">
              {t('solutions_page.close')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const { t } = useTranslation();

  const handleSolutionClick = (solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const headerSegments = [
    { text: t('solutions_page.title'), className: "text-text-accent" },
    { text: t('solutions_page.subtitle'), className: "text-gray-500 block w-full mt-2" }
  ];

  // Take only the first 3 solutions to perfectly fit the requested 4-column layout
  const topSolutions = solutionsData.slice(0, 3);

  return (
    <>
      <section id="solutions" className="relative min-h-screen bg-surface-main py-24 md:py-32 overflow-hidden">
        <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
              <WordsPullUpMultiStyle segments={headerSegments} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            
            {/* Card 1: Static Video Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[300px] md:h-full group"
            >
              <video
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#E1E0CC] text-lg font-medium">Your creative canvas.</span>
              </div>
            </motion.div>

            {/* Cards 2-4: Bitvera Dynamic Solutions */}
            {topSolutions.map((solution, idx) => {
              const Icon = iconMap[solution.icon] || Check;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: (idx + 1) * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-surface-elevated rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col h-[400px] md:h-full hover:bg-[#2a2a2a] transition-colors"
                >
                  <div className="flex justify-between items-start mb-8">
                    <Icon className="text-text-accent w-6 h-6" />
                    <span className="text-gray-500 font-serif italic text-xl">0{idx + 1}</span>
                  </div>
                  
                  <h3 className="text-[#E1E0CC] text-lg font-medium mb-6">
                    {t(`solution_names.${solution.name}`)}
                  </h3>
                  
                  <ul className="space-y-4 mb-auto">
                    {solution.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check size={16} className="text-text-accent mt-1 flex-shrink-0" />
                        <span className="text-text-secondary text-sm leading-relaxed">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSolutionClick(solution)}
                    className="mt-8 text-text-accent flex items-center gap-2 group text-sm font-medium hover:text-text-primary transition-colors"
                  >
                    {t('solutions_page.learn_more')}
                    <ArrowRight size={16} className="transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SolutionModal
        solution={selectedSolution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookDemo={() => setIsBookingOpen(true)}
      />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Solutions;