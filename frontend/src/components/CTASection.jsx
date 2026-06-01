import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, DollarSign, TrendingUp, Zap } from 'lucide-react';

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    demoDate: '',
    additionalInfo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you soon.');
    setFormData({
      name: '',
      company: '',
      email: '',
      demoDate: '',
      additionalInfo: ''
    });
  };

  const benefits = [
    { icon: CheckCircle, text: 'Transparent Pricing' },
    { icon: DollarSign, text: 'Cost Efficiency' },
    { icon: TrendingUp, text: 'Scalability' },
    { icon: Zap, text: 'Tailored Solutions' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Try it free today
              </h2>
              <p className="text-2xl font-semibold text-cyan-600 mb-2">
                explore the system's capabilities.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle>One Step Away</CardTitle>
              <CardDescription>Fill in your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    placeholder="Company's name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Business email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Preferred Demo Date"
                    value={formData.demoDate}
                    onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Additional info"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
                  size="lg"
                >
                  Get started for free
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;