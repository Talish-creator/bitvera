import React from 'react';
import { modulesData } from '../mock/data';
import { DollarSign, Users, Package, Archive, Award, Target, FolderKanban, Warehouse, CreditCard, Factory, ShoppingCart, ShoppingBag } from 'lucide-react';

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
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Transform your business with our innovative SaaS solutions
          </h2>
          <p className="text-lg text-slate-600">
            Tailored for you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {modulesData.map((module, index) => {
            const Icon = iconMap[module.icon];
            return (
              <a
                key={index}
                href={module.link}
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:from-cyan-500 group-hover:to-teal-600 transition-all duration-300">
                  <Icon size={32} className="text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">
                  {module.name}
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