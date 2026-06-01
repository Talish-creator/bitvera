import React from 'react';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Solutions: ['ERP Implementation', 'CRM Integration', 'Process Automation', 'Custom Development'],
    Services: ['Business Consulting', 'Technical Support', 'Training & Onboarding', 'Maintenance'],
    Company: ['About Us', 'Careers', 'Blog', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Vortexa</span>
                <span className="text-xs text-slate-400">Innovation Driven</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Your trusted ERPNext implementation partner for digital transformation.
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
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors text-sm">
                      {link}
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
                <div className="text-xs text-slate-400">Email</div>
                <div className="text-sm">info@vortexa.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Phone size={18} className="text-cyan-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Phone</div>
                <div className="text-sm">+966 XX XXX XXXX</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-cyan-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Location</div>
                <div className="text-sm">Riyadh, Saudi Arabia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            © 2025 Vortexa. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;