import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '../hooks/use-toast';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); // <-- 2. Activate tool

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate login - In production, this would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('login_modal.toast_success_title'),
        description: t('login_modal.toast_success_desc'),
      });
      
      setFormData({ email: '', password: '' });
      onClose();
      
      // Redirect to admin or dashboard
      // window.location.href = '/admin';
    } catch (error) {
      toast({
        title: t('login_modal.toast_fail_title'),
        description: t('login_modal.toast_fail_desc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101010]/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-white/10 transition-colors">
        <div className="bg-[#101010]/90 p-6 text-[#DEDBC8] flex items-center justify-between border-b border-white/10 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">{t('login_modal.welcome_back')}</h2>
            <p className="text-sm text-[#DEDBC8]/70 mt-1">{t('login_modal.login_to_account')}</p>
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
            <Label htmlFor="email" className="text-[#DEDBC8]">{t('login_modal.email_label')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('login_modal.email_placeholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[#DEDBC8]">{t('login_modal.password_label')}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isSubmitting}
              className="bg-[#212121] border-white/10 text-[#DEDBC8] focus:border-[#DEDBC8] focus-visible:ring-[#DEDBC8] placeholder:text-[#DEDBC8]/30 mt-1.5"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-white/20 bg-[#212121] text-[#DEDBC8] focus:ring-[#DEDBC8]" />
              <span className="text-[#DEDBC8]/70 hover:text-[#DEDBC8] transition-colors">{t('login_modal.remember_me')}</span>
            </label>
            <button type="button" className="text-[#DEDBC8] hover:underline transition-colors">
              {t('login_modal.forgot_password')}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#DEDBC8] hover:bg-[#DEDBC8]/90 text-black font-semibold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('login_modal.logging_in') : t('login_modal.login_btn')}
          </Button>

          <p className="text-sm text-[#DEDBC8]/70 text-center flex items-center justify-center gap-1 transition-colors mt-4">
            {t('login_modal.no_account')}
            <button type="button" className="text-[#DEDBC8] hover:underline font-semibold transition-colors">
              {t('login_modal.contact_sales')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;