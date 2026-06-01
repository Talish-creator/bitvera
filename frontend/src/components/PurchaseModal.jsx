import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createCheckoutSession } from '../utils/api';
import { toast } from '../hooks/use-toast';

const PurchaseModal = ({ isOpen, onClose, plan }) => {
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
        title: "Error",
        description: "Failed to start checkout. Please try again or call +966 58 060 8336.",
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Get Started with {plan.name}</h2>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-cyan-100">Enter your details to proceed to payment</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Plan</span>
              <span className="text-lg font-bold text-slate-900">{plan.name}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Billing</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    billingPeriod === 'annual'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Annual (Save 15%)
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-300">
              <span className="text-sm font-semibold text-slate-600">Total</span>
              <span className="text-2xl font-bold text-cyan-600">{price} SAR/mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">+ Implementation Fee: {plan.implementationFee.toLocaleString()} SAR (one-time)</p>
          </div>

          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email">Business Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+966 XX XXX XXXX"
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
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            🔒 Secure payment powered by Stripe
          </p>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;