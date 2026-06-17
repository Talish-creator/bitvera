import React from 'react';
import { modulesData } from '../mock/data';
import { DollarSign, Users, Package, Archive, Award, Target, FolderKanban, Warehouse, CreditCard, Factory, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap = {
  DollarSign,
  Users,
  Package,
  Archive,
  Award,
  Target,
  FolderKanban,
  Warehouse,
  CreditCard,
  Factory,
  ShoppingCart,
  ShoppingBag
};

const Modules = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 dark:from-slate-900 to-cyan-50/20 dark:to-slate-800/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            {t('modules_page.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors">
            {t('modules_page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modulesData.map((module, index) => {
            const Icon = iconMap[module.icon];
            return (
              <a
                key={index}
                href={module.link}
                className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:from-cyan-500 group-hover:to-teal-600 transition-all duration-300">
                  <Icon size={32} className="text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {/* We tell the translator to look inside the solution_names group! */}
                  {t(`solution_names.${module.name}`)}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Modules;