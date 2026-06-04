import React from 'react';
import { whyChooseData } from '../mock/data';
import { Target, TrendingUp, Shield, MapPin, Clock, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  Target,
  TrendingUp,
  Shield,
  MapPin,
  Clock,
  Layers
};

const WhyChoose = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose BitVera?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We're not just another ERP provider. We're your strategic partner in digital transformation.
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
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">{item.description}</CardDescription>
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