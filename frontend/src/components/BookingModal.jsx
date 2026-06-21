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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101010]/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10 transition-colors">
        <div className="sticky top-0 bg-[#101010]/90 p-6 text-[#DEDBC8] flex items-center justify-between border-b border-white/10 z-10">
          <div>
            <h2 className="text-2xl font-bold">{t('booking_modal.title')}</h2>
            <p className="text-sm text-[#DEDBC8]/70 mt-1">{t('booking_modal.subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/10 rounded-full p-2 transition-colors text-[#DEDBC8]"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-[#DEDBC8]">
          <div>
            <Label htmlFor="name" className="text-[#DEDBC8]">{t('booking_modal.full_name')}</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-[#DEDBC8]">{t('booking_modal.company_name')}</Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-[#DEDBC8]">{t('booking_modal.business_email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="demoDate" className="text-[#DEDBC8]">{t('booking_modal.preferred_date')}</Label>
            <Input
              id="demoDate"
              type="date"
              value={formData.demoDate}
              onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
              required
              disabled={isSubmitting}
              min={new Date().toISOString().split('T')[0]}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] [&::-webkit-calendar-picker-indicator]:invert-[0.8] mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="additionalInfo" className="text-[#DEDBC8]">{t('booking_modal.challenges_label')}</Label>
            <Textarea
              id="additionalInfo"
              placeholder={t('booking_modal.challenges_placeholder')}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={4}
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-white/10 text-[#DEDBC8] hover:bg-white/5 hover:text-[#DEDBC8]"
              disabled={isSubmitting}
            >
              {t('booking_modal.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#DEDBC8] hover:bg-[#DEDBC8]/90 text-black font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('booking_modal.submitting_btn') : t('booking_modal.submit_btn')}
            </Button>
          </div>

          <p className="text-xs text-[#DEDBC8]/50 text-center mt-4 transition-colors">
            {t('booking_modal.call_directly')}{' '}
            <a href="tel:+966580608336" className="text-[#DEDBC8] hover:underline font-semibold" dir="ltr">
              +966 58 060 8336
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;