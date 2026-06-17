import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { submitContactForm } from '../utils/api';
import { toast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const CTASection = () => {
  const { t } = useTranslation(); // <-- 2. Activate tool

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    demoDate: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast({
          title: t('cta_section.toast_success'),
          description: result.message,
        });
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          demoDate: '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      toast({
        title: t('cta_section.toast_error'),
        description: t('cta_section.toast_error_desc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: CheckCircle, text: 'Transparent Pricing' },
    { icon: DollarSign, text: 'Cost Efficiency' },
    { icon: TrendingUp, text: 'Scalability' },
    { icon: Zap, text: 'Tailored Solutions' }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
                {t('cta_section.title')}
              </h2>
              <p className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 mb-2 transition-colors">
                {t('cta_section.subtitle')}
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
                    <span className="text-lg text-slate-700 dark:text-slate-300 font-medium transition-colors">{t(benefit.text)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl transition-colors">
            <CardHeader>
              <CardTitle className="dark:text-white transition-colors">{t('cta_section.card_title')}</CardTitle>
              <CardDescription className="dark:text-slate-400 transition-colors">{t('cta_section.card_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder={t('cta_section.placeholder_name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    placeholder={t('cta_section.placeholder_company')}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t('cta_section.placeholder_email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder={t('cta_section.placeholder_date')}
                    value={formData.demoDate}
                    onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t('cta_section.placeholder_info')}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('cta_section.submitting_btn') : t('cta_section.submit_btn')}
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