import React, { useState } from 'react';
import { pricingPlans } from '../mock/data';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import PurchaseModal from './PurchaseModal';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  
  const { t } = useTranslation();

  const handleChoosePlan = (plan, index) => {
    const planWithId = {
      ...plan,
      id: ['standard', 'professional', 'enterprise'][index]
    };
    setSelectedPlan(planWithId);
    setIsPurchaseModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t('pricing_page.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('pricing_page.subtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="inline-block">
              <TabsList className="bg-slate-100">
                <TabsTrigger value="monthly">{t('pricing_page.monthly')}</TabsTrigger>
                <TabsTrigger value="annually" className="relative">
                  {t('pricing_page.annually')}
                  <Badge className="ml-2 bg-green-500 text-white text-xs">{t('pricing_page.save_15')}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? 'border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20' : 'border-slate-200'} hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-4 py-1">
                      {t('pricing_page.most_popular')}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{t(plan.name)}</CardTitle>
                  <CardDescription>{t(plan.description)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-slate-900">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      <span className="text-xl text-slate-500 ml-2">{t('pricing_page.sar_month')}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      {t('pricing_page.implementation_fee')} {plan.implementationFee?.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {plan.features.slice(0, 5).map((feature) => (
                      <div key={feature} className="flex items-start space-x-2">
                        <Check size={18} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{t(feature, { nsSeparator: false })}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <details className="text-sm text-cyan-600 cursor-pointer">
                        <summary>{t('pricing_page.see_more')}</summary>
                        <div className="mt-3 space-y-3">
                          {plan.features.slice(5).map((feature) => (
                            <div key={feature} className="flex items-start space-x-2">
                              <Check size={18} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-600">{t(feature, { nsSeparator: false })}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleChoosePlan(plan, index)}
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                  >
                    {t('pricing_page.choose_plan')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-8">
            {t('pricing_page.disclaimer')}
          </p>
        </div>
      </section>

      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => setIsPurchaseModalOpen(false)}
        plan={selectedPlan}
      />
    </>
  );
};

export default Pricing;