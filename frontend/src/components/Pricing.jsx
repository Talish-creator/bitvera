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
      <section className="relative py-20 bg-surface-main transition-colors duration-300">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4 transition-colors">
              {t('pricing_page.title')}
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto transition-colors">
              {t('pricing_page.subtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="inline-block">
              <TabsList className="bg-surface-raised border border-border-glass/10 p-1 transition-colors rounded-xl">
                <TabsTrigger value="monthly" className="data-[state=active]:bg-surface-elevated data-[state=active]:text-text-accent text-text-secondary rounded-lg">{t('pricing_page.monthly')}</TabsTrigger>
                <TabsTrigger value="annually" className="relative data-[state=active]:bg-surface-elevated data-[state=active]:text-text-accent text-text-secondary rounded-lg">
                  {t('pricing_page.annually')}
                  <Badge className="ms-2 bg-text-accent text-black text-xs font-semibold">{t('pricing_page.save_15')}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative bg-surface-raised border-border-glass/10 ${plan.popular ? 'border-text-accent/50 shadow-2xl shadow-text-accent/10 bg-[#1a1a1a]' : ''} hover:bg-surface-elevated transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 start-1/2 transform -translate-x-1/2">
                    <Badge className="bg-text-accent text-black px-4 py-1 font-semibold uppercase tracking-wider text-xs">
                      {t('pricing_page.most_popular')}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary transition-colors">{t(plan.name)}</CardTitle>
                  <CardDescription className="text-text-secondary transition-colors">{t(plan.description)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-text-primary transition-colors">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      <span className="text-xl text-gray-500 ms-2 transition-colors">{t('pricing_page.sar_month')}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 transition-colors">
                      {t('pricing_page.implementation_fee')} {plan.implementationFee?.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {plan.features.slice(0, 5).map((feature) => (
                      <div key={feature} className="flex items-start space-x-2">
                        <Check size={18} className="text-text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary transition-colors">{t(feature, { nsSeparator: false })}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <details className="text-sm text-text-accent cursor-pointer group">
                        <summary className="hover:text-text-primary transition-colors">{t('pricing_page.see_more')}</summary>
                        <div className="mt-3 space-y-3">
                          {plan.features.slice(5).map((feature) => (
                            <div key={feature} className="flex items-start space-x-2">
                              <Check size={18} className="text-text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-text-secondary transition-colors">{t(feature, { nsSeparator: false })}</span>
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
                    className={`w-full font-semibold transition-colors duration-300 ${plan.popular ? 'bg-text-accent hover:bg-text-accent/80 text-black' : 'bg-surface-elevated hover:bg-text-accent hover:text-black text-text-primary border border-border-glass/10'}`}
                  >
                    {t('pricing_page.choose_plan')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8 transition-colors">
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