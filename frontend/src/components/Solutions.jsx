import React, { useState } from 'react';
import { solutionsData } from '../mock/solutions';
import { Building2, FileCheck, Network, ShoppingBag, UserSearch, Factory, Receipt, BadgeCheck, Users, Warehouse, TrendingUp, Package, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import BookingModal from './BookingModal';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const iconMap = {
  Building2,
  FileCheck,
  Network,
  ShoppingBag,
  UserSearch,
  Factory,
  Receipt,
  BadgeCheck,
  Users,
  Warehouse,
  TrendingUp,
  Package
};

const SolutionModal = ({ solution, isOpen, onClose, onBookDemo }) => {
  const { t } = useTranslation(); // <-- 2. Activate tool in Modal
  const Icon = solution ? iconMap[solution.icon] : null;

  if (!isOpen || !solution) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-transparent dark:border-slate-700 transition-colors">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {Icon && (
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon size={32} />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold">{t(`solution_names.${solution.name}`)}</h2>
                <p className="text-sm text-indigo-100 mt-1">{t('solutions_page.modal_erp_subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-8">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 transition-colors">{t(solution.description)}</p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">{t('solutions_page.key_features')}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {solution.features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300 transition-colors">{t(feature)}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 dark:from-indigo-900/30 to-blue-50 dark:to-blue-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800/50 mb-8 transition-colors">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors">{t('solutions_page.benefits')}</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 transition-colors">
              <li>• {t('solutions_page.benefit_1')}</li>
              <li>• {t('solutions_page.benefit_2')}</li>
              <li>• {t('solutions_page.benefit_3')}</li>
              <li>• {t('solutions_page.benefit_4')}</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => {
                onClose();
                onBookDemo();
              }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              size="lg"
            >
              {t('solutions_page.schedule_demo')}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              size="lg"
            >
              {t('solutions_page.close')}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 transition-colors">
            {t('solutions_page.need_help')}
            <a href="tel:+966580608336" className="text-indigo-600 hover:underline font-semibold mx-1" dir="ltr">
              +966 58 060 8336
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const { t } = useTranslation(); // <-- 3. Activate tool in Main Component

  const handleSolutionClick = (solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="solutions" className="py-20 bg-gradient-to-br from-slate-50 dark:from-slate-900 to-blue-50/20 dark:to-slate-800/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-indigo-900 dark:text-indigo-400 mb-4 transition-colors">{t('solutions_page.title')}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors">
              {t('solutions_page.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {solutionsData.map((solution) => {
              const Icon = iconMap[solution.icon];
              return (
                <Card
                  key={solution.id}
                  onClick={() => handleSolutionClick(solution)}
                  className="cursor-pointer bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-indigo-500 group-hover:to-blue-600 transition-all duration-300">
                        <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                          {t(`solution_names.${solution.name}`)}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-2 transition-colors">
                      {t(solution.description)}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>{t('solutions_page.learn_more')}</span>
                      <svg className="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-4 transition-colors">
              {t('solutions_page.cant_find')}
            </p>
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
            >
              {t('solutions_page.contact_btn')}
            </Button>
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