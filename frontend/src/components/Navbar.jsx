import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Menu, X, ChevronDown, Calculator, FileCog, Network, 
  PackageCheck, UserSearch, Factory, FileSpreadsheet, 
  Settings, Users, Warehouse, TrendingUp, Package, 
  Lightbulb, Info, Briefcase, Phone, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import BookingModal from './BookingModal';

const menuData = {
  solutions: {
    title: 'Solutions',
    layout: 'grid',
    width: 'w-[650px]',
    items: [
      { name: 'Accounting & Finance', icon: Calculator, link: '/service/accounting' },
      { name: 'Project Management', icon: FileCog, link: '/service/project-management' },
      { name: 'Asset Management', icon: Network, link: '/service/asset-management' },
      { name: 'Procurement Management', icon: PackageCheck, link: '/service/procurement' },
      { name: 'HR Management', icon: UserSearch, link: '/service/hr-management' },
      { name: 'Production or Manufacturing', icon: Factory, link: '/service/production' },
      { name: 'Payroll', icon: FileSpreadsheet, link: '/service/payroll' },
      { name: 'Quality Management', icon: Settings, link: '/service/quality' },
      { name: 'CRM', icon: Users, link: '/service/crm' },
      { name: 'Warehouse Management', icon: Warehouse, link: '/service/warehouse' },
      { name: 'Sales Management', icon: TrendingUp, link: '/service/sales' },
      { name: 'Inventory Management', icon: Package, link: '/service/inventory' }
    ]
  },
  services: {
    title: 'Services',
    layout: 'split',
    width: 'w-[550px]',
    items: [
      { name: 'ERPNext System implementation', icon: FileSpreadsheet, link: '/service/erpnext' },
      { name: 'Business Consulting', icon: Lightbulb, link: '/service/consulting' }
    ]
  },
  pricing: {
    title: 'Pricing',
    layout: 'list',
    width: 'w-72',
    items: [
      { name: 'Subscription plans', icon: FileSpreadsheet, link: '/service/subscriptions' },
      { name: 'Customize your own plan', icon: FileSpreadsheet, link: '/service/custom-plan' }
    ]
  },
  knowledge: {
    title: 'Knowledge Base',
    layout: 'list',
    width: 'w-72',
    items: [
      { name: 'ERPNext System', icon: FileSpreadsheet, link: '/service/erp-knowledge' },
      { name: 'FAQ\'s & Download', icon: FileSpreadsheet, link: '/service/faq' },
      { name: 'Blog', icon: FileSpreadsheet, link: '/service/blog' }
    ]
  },
  about: {
    title: 'About Us',
    layout: 'list',
    width: 'w-64',
    items: [
      { name: 'Our Story', icon: Info, link: '/service/story' },
      { name: 'Team', icon: Users, link: '/service/team' },
      { name: 'Careers', icon: Briefcase, link: '/service/careers' },
      { name: 'Contact', icon: Phone, link: '/service/contact' }
    ]
  }
};

const menuOrder = ['solutions', 'services', 'pricing', 'knowledge', 'about'];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center z-50">
      <div className="bg-black/90 backdrop-blur-xl rounded-b-3xl px-8 py-4 flex items-center justify-center gap-12 shadow-2xl border-x border-b border-white/10 relative">
        {menuOrder.map((key) => {
          const menu = menuData[key];
          return (
            <div key={key} className="relative group">
              <button 
                className="flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-300"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#DEDBC8';
                  setActiveDropdown(key);
                  setIsLangOpen(false);
                }}
              >
                {t(`navbar.${key}`)}
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === key && (
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 ${menu.width} bg-[#101010]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-4`}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Dropdown Header */}
                  <div className="px-6 pb-4 mb-2 border-b border-white/10">
                    <h3 className="text-lg font-serif italic text-[#DEDBC8]">{t(`navbar.${key}`)}</h3>
                  </div>

                  {/* Grid Layout (Solutions) */}
                  {menu.layout === 'grid' && (
                    <div className="grid grid-cols-2 gap-2 px-3">
                      {menu.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link 
                            key={idx} 
                            to={item.link} 
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center space-x-4 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors group"
                          >
                            <Icon className="w-5 h-5 text-[#DEDBC8] opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t(`navbar_dropdowns.${item.name}`)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Split Layout (Services) */}
                  {menu.layout === 'split' && (
                    <div className="grid grid-cols-2 gap-4 px-4">
                      <div className="flex flex-col space-y-2">
                        {menu.items.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link 
                              key={idx} 
                              to={item.link}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center space-x-4 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors group"
                            >
                              <Icon className="w-5 h-5 text-[#DEDBC8] opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t(`navbar_dropdowns.${item.name}`)}</span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="bg-[#212121]/50 rounded-xl w-full h-full min-h-[140px] border border-white/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
                      </div>
                    </div>
                  )}

                  {/* Standard List Layout */}
                  {menu.layout === 'list' && (
                    <div className="flex flex-col px-3 space-y-1">
                      {menu.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link 
                            key={idx} 
                            to={item.link} 
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center space-x-4 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors group"
                          >
                            <Icon className="w-5 h-5 text-[#DEDBC8] opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t(`navbar_dropdowns.${item.name}`)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Language Toggle */}
        <div className="relative group">
          <button 
            className="flex items-center gap-1 text-[13px] font-medium uppercase transition-colors duration-300"
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#DEDBC8';
              setIsLangOpen(true);
              setActiveDropdown(null);
            }}
          >
            <Globe size={14} />
            {i18n.language}
            <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLangOpen && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-40 bg-[#101010]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2 z-50"
              onMouseLeave={() => setIsLangOpen(false)}
            >
              <button
                onClick={() => {
                  i18n.changeLanguage('en');
                  setIsLangOpen(false);
                }}
                className={`w-full text-start px-4 py-3 text-sm hover:bg-white/5 transition-colors ${i18n.language === 'en' ? 'text-[#DEDBC8] font-bold' : 'text-gray-300 font-medium'}`}
              >
                English
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage('ar');
                  setIsLangOpen(false);
                }}
                className={`w-full text-start px-4 py-3 text-sm hover:bg-white/5 transition-colors ${i18n.language === 'ar' ? 'text-[#DEDBC8] font-bold' : 'text-gray-300 font-medium'}`}
              >
                العربية (Arabic)
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-[13px] font-medium text-gray-300 hover:text-[#DEDBC8] transition-colors"
          >
            {t('navbar.login')}
          </button>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-[#DEDBC8] text-black px-4 py-2 rounded-full text-[13px] font-bold hover:bg-white transition-colors"
          >
            {t('hero.book_demo')}
          </button>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default Navbar;