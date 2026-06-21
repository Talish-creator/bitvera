import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createCheckoutSession } from '../utils/api';
import { toast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const PurchaseModal = ({ isOpen, onClose, plan }) => {
  const { t } = useTranslation(); // <-- 2. Activate tool

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const checkoutData = {
        package_id: plan.id,
        payment_type: 'subscription',
        billing_period: billingPeriod,
        origin_url: window.location.origin,
        email: formData.email,
        metadata: {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          plan_name: plan.name
        }
      };
      
      const result = await createCheckoutSession(checkoutData);
      
      if (result.success && result.checkout_url) {
        window.location.href = result.checkout_url;
      }
    } catch (error) {
      toast({
        title: t('purchase_modal.toast_error_title'),
        description: t('purchase_modal.toast_error_desc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !plan) return null;

  const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-main/80 backdrop-blur-sm">
      <div className="bg-surface-raised/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border-glass/10 transition-colors">
        <div className="sticky top-0 bg-surface-raised/90 p-6 text-text-accent border-b border-border-glass/10 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{t('purchase_modal.get_started')} {t(plan.name)}</h2>
            <button
              onClick={onClose}
              className="hover:bg-white/10 rounded-full p-2 transition-colors text-text-accent"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-text-accent/70">{t('purchase_modal.enter_details')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-text-accent">
          <div className="bg-surface-elevated p-4 rounded-lg border border-border-glass/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-text-accent/70 transition-colors">{t('purchase_modal.plan_label')}</span>
              <span className="text-lg font-bold text-text-accent transition-colors">{t(plan.name)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-text-accent/70 transition-colors">{t('purchase_modal.billing_label')}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-text-accent text-black'
                      : 'bg-surface-main/50 text-text-accent/70 hover:bg-white/10 hover:text-text-accent'
                  }`}
                >
                  {t('purchase_modal.monthly_btn')}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'annual'
                      ? 'bg-text-accent text-black'
                      : 'bg-surface-main/50 text-text-accent/70 hover:bg-white/10 hover:text-text-accent'
                  }`}
                >
                  {t('purchase_modal.annual_btn')}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border-glass/10 transition-colors">
              <span className="text-sm font-semibold text-text-accent/70 transition-colors">{t('purchase_modal.total_label')}</span>
              <span className="text-2xl font-bold text-text-accent">
                <span dir="ltr">{price}</span> {t('purchase_modal.sar_mo')}
              </span>
            </div>
            <p className="text-xs text-text-accent/50 mt-2 transition-colors">
              {t('purchase_modal.implementation_fee_prefix')} <span dir="ltr">{plan.implementationFee.toLocaleString()}</span> {t('purchase_modal.sar_one_time')}
            </p>
          </div>

          <div>
            <Label htmlFor="name" className="text-text-accent">{t('purchase_modal.full_name')}</Label>
            <Input
              id="name"
              placeholder={t('purchase_modal.placeholder_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-surface-elevated border-border-glass/10 text-text-accent focus:border-text-accent focus-visible:ring-text-accent placeholder:text-text-accent/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-text-accent">{t('purchase_modal.company_name')}</Label>
            <Input
              id="company"
              placeholder={t('purchase_modal.placeholder_company')}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-surface-elevated border-border-glass/10 text-text-accent focus:border-text-accent focus-visible:ring-text-accent placeholder:text-text-accent/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-text-accent">{t('purchase_modal.business_email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('purchase_modal.placeholder_email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-surface-elevated border-border-glass/10 text-text-accent focus:border-text-accent focus-visible:ring-text-accent placeholder:text-text-accent/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-text-accent">{t('purchase_modal.phone_number')}</Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              placeholder={t('purchase_modal.placeholder_phone')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-surface-elevated border-border-glass/10 text-text-accent focus:border-text-accent focus-visible:ring-text-accent placeholder:text-text-accent/30 mt-1.5"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-border-glass/10 text-text-accent hover:bg-white/5 hover:text-text-accent"
              disabled={isSubmitting}
            >
              {t('purchase_modal.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-text-accent hover:bg-text-accent/90 text-black font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('purchase_modal.processing_btn') : t('purchase_modal.proceed_btn')}
            </Button>
          </div>

          <p className="text-xs text-text-accent/50 text-center transition-colors mt-4">
            {t('purchase_modal.secure_payment')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;