import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import BookingModal from './BookingModal';

const menuData = {
  solutions: {
    title: 'Solutions',
    items: [
      { name: 'ERP Implementation', desc: 'Complete ERP solutions', link: '#' },
      { name: 'CRM Integration', desc: 'Customer management', link: '#' },
      { name: 'Process Automation', desc: 'Automate workflows', link: '#' },
      { name: 'Custom Development', desc: 'Tailored solutions', link: '#' }
    ]
  },
  services: {
    title: 'Services',
    items: [
      { name: 'Business Consulting', desc: 'Expert guidance', link: '#' },
      { name: 'Technical Support', desc: '24/7 assistance', link: '#' },
      { name: 'Training & Onboarding', desc: 'Team enablement', link: '#' },
      { name: 'Maintenance', desc: 'Ongoing support', link: '#' }
    ]
  },
  knowledge: {
    title: 'Knowledge Base',
    items: [
      { name: 'Documentation', desc: 'User guides', link: '#' },
      { name: 'API Reference', desc: 'Developer docs', link: '#' },
      { name: 'Video Tutorials', desc: 'Learn visually', link: '#' },
      { name: 'Blog', desc: 'Latest insights', link: '#' }
    ]
  },
  about: {
    title: 'About Us',
    items: [
      { name: 'Our Story', desc: 'Who we are', link: '#' },
      { name: 'Team', desc: 'Meet our experts', link: '#' },
      { name: 'Careers', desc: 'Join us', link: '#' },
      { name: 'Contact', desc: 'Get in touch', link: '#' }
    ]
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://customer-assets.emergentagent.com/job_style-forge-111/artifacts/o13twt3g_WhatsApp%20Image%202026-06-01%20at%2017.04.10.jpeg"
                alt="BitVera IT Solutions Logo"
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900">BitVera IT Solutions</span>
                <span className="text-xs text-slate-500">ERP Implementation Experts</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Solutions Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                >
                  <span>Solutions</span>
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'solutions' && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {menuData.solutions.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="flex flex-col px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
                  onMouseEnter={() => setActiveDropdown('services')}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'services' && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {menuData.services.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="flex flex-col px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <a href="#pricing" className="px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">
                Pricing
              </a>

              {/* Industries */}
              <a href="#industries" className="px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">
                Industries
              </a>

              {/* Knowledge Base Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
                  onMouseEnter={() => setActiveDropdown('knowledge')}
                >
                  <span>Knowledge Base</span>
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'knowledge' && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {menuData.knowledge.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="flex flex-col px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* About Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
                  onMouseEnter={() => setActiveDropdown('about')}
                >
                  <span>About Us</span>
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                {activeDropdown === 'about' && (
                  <div 
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {menuData.about.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="flex flex-col px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="text-slate-700"
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white shadow-md"
                onClick={() => setIsBookingOpen(true)}
              >
                Book a Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-700 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200 max-h-[80vh] overflow-y-auto">
              {Object.entries(menuData).map(([key, menu]) => (
                <div key={key} className="mb-2">
                  <button
                    onClick={() => handleDropdownToggle(key)}
                    className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <span>{menu.title}</span>
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === key && (
                    <div className="bg-slate-50 py-2">
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.link}
                          className="block px-6 py-2 text-sm text-slate-600 hover:text-cyan-600"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <a href="#pricing" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 font-medium">
                Pricing
              </a>
              <a href="#industries" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 font-medium">
                Industries
              </a>
              
              <div className="px-4 py-4 space-y-2 border-t border-slate-200 mt-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white"
                  onClick={() => {
                    setIsBookingOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;