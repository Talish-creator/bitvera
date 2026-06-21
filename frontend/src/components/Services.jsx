import React, { useState } from 'react';
import { servicesData } from '../mock/data';
import { Sparkles, Users, Settings, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { useTranslation } from 'react-i18next'; 

const iconMap = {
  Sparkles,
  Users,
  Settings,
  Palette
};

// We map each tab to a specific, high-quality live image to guarantee they load instantly!
const imageMap = {
  erp: "/images/service-erp.jpeg",
  crm: "/images/service-crm.jpeg",
  automation: "/images/service-automation.jpeg",
  customization: "/images/service-custom.jpeg"
};

const Services = () => {
  const [activeService, setActiveService] = useState('erp');
  const { t } = useTranslation(); 

  return (
    <section className="relative py-20 bg-surface-main transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4 transition-colors">
            {t('services_page.title')}
          </h2>
          <p className="text-lg text-text-secondary transition-colors">
            {t('services_page.subtitle')}
          </p>
        </div>

        <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
          <TabsList className="w-full justify-center bg-surface-raised border border-border-glass/10 p-1 mb-12 flex-wrap sm:flex-nowrap h-auto transition-colors rounded-xl">
            {servicesData.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center space-x-2 text-text-secondary hover:bg-surface-elevated hover:text-text-accent data-[state=active]:bg-surface-elevated data-[state=active]:text-text-accent m-1 transition-colors rounded-lg border border-transparent data-[state=active]:border-border-glass/10"
                >
                  <Icon size={18} />
                  <span>{t(service.title, { nsSeparator: false })}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {servicesData.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Image/Illustration */}
                <div className="relative">
                  <div className="bg-surface-raised rounded-2xl shadow-2xl border border-border-glass/10 p-4 overflow-hidden transition-colors">
                    <div className="aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-surface-elevated">
                      <img
                        src={imageMap[service.id]}
                        alt={t(service.heading, { nsSeparator: false })}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
                      />
                    </div>
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-text-accent/10 rounded-full blur-3xl -z-10"></div>
                </div>

                {/* Right - Content */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-text-primary transition-colors">
                    {t(service.heading, { nsSeparator: false })}
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-surface-elevated border border-border-glass/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-3 h-3 text-text-accent"
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
                        <span className="text-text-secondary transition-colors">{t(feature, { nsSeparator: false })}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {service.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-surface-raised border border-border-glass/10 rounded-xl p-6 text-center shadow-lg transition-colors hover:bg-surface-elevated duration-300"
                      >
                        <div className="text-4xl font-bold text-text-accent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-text-secondary mt-2">{t(stat.label, { nsSeparator: false })}</div>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="bg-text-accent text-black hover:bg-text-accent/80 font-semibold transition-colors duration-300">
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