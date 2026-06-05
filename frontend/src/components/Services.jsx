import React, { useState } from 'react';
import { servicesData } from '../mock/data';
import { Sparkles, Users, Settings, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const iconMap = {
  Sparkles,
  Users,
  Settings,
  Palette
};

// We map each tab to a specific, high-quality live image to guarantee they load instantly!
const imageMap = {
  erp: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1024",
  crm: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  automation: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  customization: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
};

const Services = () => {
  const [activeService, setActiveService] = useState('erp');
  const { t } = useTranslation(); // <-- 2. Activate tool

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t('services_page.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('services_page.subtitle')}
          </p>
        </div>

        <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
          <TabsList className="w-full justify-center bg-white border border-slate-200 p-1 mb-12 flex-wrap sm:flex-nowrap h-auto">
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white m-1"
                >
                  <Icon size={18} />
                  <span>{t(service.title)}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {servicesData.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Image/Illustration */}
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 overflow-hidden">
                    <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-slate-50">
                      <img
                        src={imageMap[service.id]}
                        alt={t(service.heading)}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* Decorative gradient */}
                  <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl -z-10"></div>
                </div>

                {/* Right - Content */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-slate-900">
                    {t(service.heading)}
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-slate-600">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {service.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 text-center shadow-lg"
                      >
                        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-300 mt-2">{t(stat.label)}</div>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white">
                    {t('services_page.learn_more')}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Services;