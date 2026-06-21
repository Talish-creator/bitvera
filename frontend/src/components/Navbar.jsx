import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const menuOrder = ['solutions', 'services', 'pricing', 'knowledge', 'about'];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-2xl relative z-50">
      {menuOrder.map((key) => (
        <div key={key} className="relative group">
          <button 
            className="flex items-center text-[10px] sm:text-xs md:text-sm transition-colors duration-300"
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E1E0CC';
              setActiveDropdown(key);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
            }}
          >
            {t(`navbar.${key}`)}
          </button>
        </div>
      ))}

      {/* Language Toggle */}
      <button 
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
        className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm font-medium uppercase transition-colors duration-300"
        style={{ color: 'rgba(225, 224, 204, 0.8)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'}
      >
        <Globe size={14} />
        {i18n.language}
      </button>
    </div>
  );
};

export default Navbar;