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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-transparent dark:border-slate-800 transition-colors">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{t('purchase_modal.get_started')} {t(plan.name)}</h2>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-cyan-100">{t('purchase_modal.enter_details')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors">{t('purchase_modal.plan_label')}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{t(plan.name)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors">{t('purchase_modal.billing_label')}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  {t('purchase_modal.monthly_btn')}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'annual'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  {t('purchase_modal.annual_btn')}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-300 dark:border-slate-600 transition-colors">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors">{t('purchase_modal.total_label')}</span>
              <span className="text-2xl font-bold text-cyan-600">
                <span dir="ltr">{price}</span> {t('purchase_modal.sar_mo')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 transition-colors">
              {t('purchase_modal.implementation_fee_prefix')} <span dir="ltr">{plan.implementationFee.toLocaleString()}</span> {t('purchase_modal.sar_one_time')}
            </p>
          </div>

          <div>
            <Label htmlFor="name">{t('purchase_modal.full_name')}</Label>
            <Input
              id="name"
              placeholder={t('purchase_modal.placeholder_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="company">{t('purchase_modal.company_name')}</Label>
            <Input
              id="company"
              placeholder={t('purchase_modal.placeholder_company')}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email">{t('purchase_modal.business_email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('purchase_modal.placeholder_email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="phone">{t('purchase_modal.phone_number')}</Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              placeholder={t('purchase_modal.placeholder_phone')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {t('purchase_modal.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('purchase_modal.processing_btn') : t('purchase_modal.proceed_btn')}
            </Button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center transition-colors">
            {t('purchase_modal.secure_payment')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;