import React from 'react';
import { Button } from './ui/button';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SnapchatIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1 2.2c-.3 0-.7 0-1 .1-2.9.3-4.8 2.3-5 5.2-.1.9-.1 1.8 0 2.7.2 1.4.5 2.8 1.4 3.9-.1.2-.4.4-.7.4-.5-.1-1.1-.3-1.6-.4-.3 0-.6-.1-.9 0-.4.1-.4.4-.2.7 1.2 2 3.1 3 5.4 3.3.4.1.7.3.7.8 0 .5-.2.8-.7 1-.9.3-1.8.6-2.6 1-.3.2-.6.4-.9.8-.1.2-.1.5.1.7.3.3.8.4 1.2.4h9.6c.4 0 .9-.1 1.2-.4.2-.2.2-.5.1-.7-.3-.4-.6-.6-.9-.8-.8-.4-1.7-.7-2.6-1-.5-.2-.7-.5-.7-1 0-.5.3-.7.7-.8 2.3-.3 4.2-1.3 5.4-3.3.2-.3.2-.6-.2-.7-.3-.1-.6 0-.9 0-.5.1-1.1.3-1.6.4-.3 0-.6-.2-.7-.4.9-1.1 1.2-2.5 1.4-3.9.1-.9.1-1.8 0-2.7-.2-2.9-2.1-4.9-5-5.2-.3-.1-.6-.1-.9-.1z" />
  </svg>
); // <-- 1. Import Translation Tool

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
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#0077b5] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/bitvera_erp_solution/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#E1306C] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://snapchat.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-colors">
                <SnapchatIcon size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590713159077" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <XIcon size={16} />
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