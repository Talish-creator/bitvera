import React, { useState } from 'react';
import { Button } from './ui/button';
import { heroData } from '../mock/data';
import { CheckCircle, Zap, Headphones, Trophy } from 'lucide-react';
import BookingModal from './BookingModal';

const iconMap = {
  CheckCircle,
  Zap,
  Headphones,
  Trophy
};

const FeatureBadge = ({ feature, index }) => {
  const Icon = iconMap[feature.icon];
  return (
    <div className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <span className="text-sm font-medium text-slate-700">{feature.text}</span>
    </div>
  );
};

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/20"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    Right Solution
                  </span>
                  <br />
                  <span>From The First Time</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                  {heroData.subtitle}
                </p>
                <p className="text-base text-slate-500">
                  BitVera, your trusted ERPNext implementation partner.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book a Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book a demo
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {heroData.features.map((feature, index) => (
                  <FeatureBadge key={`feature-${index}`} feature={feature} index={index} />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-600 h-10 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30"></div>
                </div>
                <div className="p-6">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    alt="ERP Dashboard Analytics"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Implementation</div>
                    <div className="text-xs text-slate-500">95% Success Rate</div>
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