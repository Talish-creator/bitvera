import React from 'react';
import { whyChooseData } from '../mock/data';
import { Target, TrendingUp, Shield, MapPin, Clock, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const iconMap = {
  Target,
  TrendingUp,
  Shield,
  MapPin,
  Clock,
  Layers
};

const WhyChoose = () => {
  const { t } = useTranslation(); // <-- 2. Activate tool

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t('why_choose_page.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('why_choose_page.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Card key={index} className="border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-cyan-500 group-hover:to-teal-600 transition-all duration-300">
                    <Icon size={28} className="text-cyan-600 group-hover:text-white transition-colors" />
                  </div>
                  {/* Translate mapped dynamic title */}
                  <CardTitle className="text-xl">{t(item.title)}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Translate mapped dynamic description */}
                  <CardDescription className="text-slate-600">{t(item.description)}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;