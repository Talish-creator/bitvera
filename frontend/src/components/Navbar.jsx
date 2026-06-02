import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  Menu, X, ChevronDown, Calculator, FileCog, Network, 
  PackageCheck, UserSearch, Factory, FileSpreadsheet, 
  Settings, Users, Warehouse, TrendingUp, Package, 
  Lightbulb, Info, Briefcase, Phone 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import BookingModal from './BookingModal';

// All links have been updated to connect to the new ServicePage!
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

const menuOrder = ['solutions', 'services', 'pricing', 'industries', 'knowledge', 'about'];

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
            
            {/* Logo Section */}
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
            <div className="hidden lg:flex items-center space-x-1">
              {menuOrder.map((key) => {
                if (key === 'industries') {
                  return (
                    <a key="industries" href="#industries" className="px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium">
                      Industries
                    </a>
                  );
                }

                const menu = menuData[key];
                return (
                  <div key={key} className="relative group">
                    <button 
                      className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
                      onMouseEnter={() => setActiveDropdown(key)}
                    >
                      <span>{menu.title}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === key && (
                      <div 
                        className={`absolute left-0 top-full mt-1 ${menu.width} bg-white rounded-2xl shadow-xl border border-slate-200 py-4`}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {/* Dropdown Header */}
                        <div className="px-6 pb-4 mb-2 border-b border-slate-100">
                          <h3 className="text-lg font-bold text-indigo-950">{menu.title}</h3>
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
                                  className="flex items-center space-x-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                >
                                  <Icon className="w-6 h-6 text-indigo-900 group-hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
                                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
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
                                    className="flex items-center space-x-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                  >
                                    <Icon className="w-6 h-6 text-indigo-900 group-hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
                                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="bg-slate-50 rounded-xl w-full h-full min-h-[140px] border border-slate-100"></div>
                          </div>
                        )}

                        {/* Standard List Layout (Pricing, Knowledge, About) */}
                        {menu.layout === 'list' && (
                          <div className="flex flex-col px-3 space-y-1">
                            {menu.items.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link 
                                  key={idx} 
                                  to={item.link} 
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-center space-x-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                >
                                  <Icon className="w-6 h-6 text-indigo-900 group-hover:text-indigo-600 transition-colors" strokeWidth={1.5} />
                                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
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
              {menuOrder.map((key) => {
                if (key === 'industries') {
                  return (
                    <a 
                      key="industries" 
                      href="#industries" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Industries
                    </a>
                  );
                }

                const menu = menuData[key];
                return (
                  <div key={key} className="mb-2">
                    <button
                      onClick={() => handleDropdownToggle(key)}
                      className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <span>{menu.title}</span>
                      <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === key && (
                      <div className="bg-slate-50 py-2 px-2">
                        {menu.items.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              to={item.link}
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsOpen(false);
                              }}
                              className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-cyan-600 hover:bg-slate-100 rounded-lg"
                            >
                              <Icon className="w-5 h-5 text-indigo-900" strokeWidth={1.5} />
                              <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
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