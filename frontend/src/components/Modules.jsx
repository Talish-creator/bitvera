import React from 'react';
import { modulesData } from '../mock/data';
import { DollarSign, Users, Package, Archive, Award, Target, FolderKanban, Warehouse, CreditCard, Factory, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
    <section className="relative py-20 bg-[#101010] transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 transition-colors">
            {t('modules_page.title')}
          </h2>
          <p className="text-lg text-[#DEDBC8]/70 transition-colors">
            {t('modules_page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modulesData.map((module, index) => {
            const Icon = iconMap[module.icon];
            return (
              <Link
                key={index}
                to={module.link}
                className="group relative bg-[#212121] rounded-xl p-6 border border-white/10 hover:border-[#DEDBC8]/50 hover:shadow-2xl hover:shadow-[#DEDBC8]/5 transition-all duration-300 flex flex-col items-center text-center space-y-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                <div className="w-16 h-16 bg-[#101010] border border-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#DEDBC8] transition-all duration-300 relative z-10">
                  <Icon size={32} className="text-[#DEDBC8] group-hover:text-[#101010] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#DEDBC8] transition-colors relative z-10">
                  {/* We tell the translator to look inside the solution_names group! */}
                  {t(`solution_names.${module.name}`)}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Modules;