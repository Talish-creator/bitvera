import React from 'react';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool

const Footer = () => {
  const { t } = useTranslation(); // <-- 2. Activate tool

  const footerLinks = {
    Solutions: ['ERP Implementation', 'CRM Integration', 'Process Automation', 'Custom Development'],
    Services: ['Business Consulting', 'Technical Support', 'Training & Onboarding', 'Maintenance'],
    Company: ['About Us', 'Careers', 'Blog', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/logo.jpeg"
                alt="BitVera Solutions Logo"
                className="h-10 w-auto bg-white p-1 rounded"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold">{t('BitVera IT Solutions')}</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {t('footer.brand_desc')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{t(category)}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors text-sm">
                      {t(link)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Mail size={18} className="text-cyan-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t('footer.email')}</div>
                <div className="text-sm">info@bitvera.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Phone size={18} className="text-cyan-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t('footer.phone')}</div>
                <a href="tel:+966580608336" className="text-sm hover:text-cyan-500 transition-colors" dir="ltr">
                  +966 58 060 8336
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-cyan-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t('footer.location')}</div>
                <div className="text-sm">{t('footer.riyadh')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              {t('Privacy Policy')}
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              {t('Terms of Service')}
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              {t('footer.cookie_settings')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;