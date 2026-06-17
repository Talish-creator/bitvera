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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-transparent dark:border-slate-800 transition-colors">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-6 text-white flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">{t('login_modal.welcome_back')}</h2>
            <p className="text-sm text-cyan-100 mt-1">{t('login_modal.login_to_account')}</p>
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
            <Label htmlFor="email">{t('login_modal.email_label')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('login_modal.email_placeholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="password">{t('login_modal.password_label')}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
              <span className="text-slate-600 dark:text-slate-300 transition-colors">{t('login_modal.remember_me')}</span>
            </label>
            <button type="button" className="text-cyan-600 dark:text-cyan-400 hover:underline transition-colors">
              {t('login_modal.forgot_password')}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('login_modal.logging_in') : t('login_modal.login_btn')}
          </Button>

          <p className="text-sm text-slate-600 dark:text-slate-300 text-center flex items-center justify-center gap-1 transition-colors">
            {t('login_modal.no_account')}
            <button type="button" className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold transition-colors">
              {t('login_modal.contact_sales')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;