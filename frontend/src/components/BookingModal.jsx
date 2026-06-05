import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const BookingModal = ({ isOpen, onClose }) => {
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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bf10d9e5-ae8b-4410-a2b8-efe8f4a82130",
          subject: "New Consultation Booking from BitVera IT Solutions",
          "Full Name": formData.name,
          "Company Name": formData.company,
          "Business Email": formData.email,
          "Preferred Date": formData.demoDate,
          "Additional Info": formData.additionalInfo,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: t('booking_modal.toast_success_title'),
          description: t('booking_modal.toast_success_desc'),
        });
        
        setFormData({
          name: '',
          company: '',
          email: '',
          demoDate: '',
          additionalInfo: ''
        });
        onClose();
      } else {
        console.error("Web3Forms API Error:", result);
        toast({
          title: t('booking_modal.toast_reject_title'),
          description: result.message || "Please verify your form details and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Network/System Error:", error);
      toast({
        title: t('booking_modal.toast_error_title'),
        description: t('booking_modal.toast_error_desc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t('booking_modal.title')}</h2>
            <p className="text-sm text-cyan-100 mt-1">{t('booking_modal.subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">{t('booking_modal.full_name')}</Label>
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
            <Label htmlFor="company">{t('booking_modal.company_name')}</Label>
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
            <Label htmlFor="email">{t('booking_modal.business_email')}</Label>
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
            <Label htmlFor="demoDate">{t('booking_modal.preferred_date')}</Label>
            <Input
              id="demoDate"
              type="date"
              value={formData.demoDate}
              onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
              required
              disabled={isSubmitting}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label htmlFor="additionalInfo">{t('booking_modal.challenges_label')}</Label>
            <Textarea
              id="additionalInfo"
              placeholder={t('booking_modal.challenges_placeholder')}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={4}
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
              {t('booking_modal.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('booking_modal.submitting_btn') : t('booking_modal.submit_btn')}
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-4">
            {t('booking_modal.call_directly')}{' '}
            <a href="tel:+966580608336" className="text-cyan-600 hover:underline font-semibold" dir="ltr">
              +966 58 060 8336
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;