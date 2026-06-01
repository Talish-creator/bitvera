import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import BookingModal from './BookingModal';

const menuItems = [
  { id: 'solutions', label: 'Solutions', hasDropdown: true },
  { id: 'services', label: 'Services', hasDropdown: true },
  { id: 'pricing', label: 'Pricing', hasDropdown: false },
  { id: 'industries', label: 'Industries', hasDropdown: false },
  { id: 'knowledge', label: 'Knowledge Base', hasDropdown: true },
  { id: 'about', label: 'About Us', hasDropdown: true }
];

const NavMenuItem = ({ item }) => (
  <div className="relative group">
    <button className="flex items-center space-x-1 text-slate-700 hover:text-cyan-600 transition-colors text-sm font-medium py-2">
      <span>{item.label}</span>
      {item.hasDropdown && <ChevronDown size={16} />}
    </button>
  </div>
);

const MobileMenuItem = ({ item }) => (
  <button className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
    <span>{item.label}</span>
    {item.hasDropdown && <ChevronDown size={16} />}
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://customer-assets.emergentagent.com/job_style-forge-111/artifacts/o13twt3g_WhatsApp%20Image%202026-06-01%20at%2017.04.10.jpeg"
                alt="BitVera Solutions Logo"
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Vortexa</span>
                <span className="text-xs text-slate-600">BitVera IT Solutions</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => (
                <NavMenuItem key={item.id} item={item} />
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/admin" className="text-slate-700 hover:text-cyan-600 transition-colors text-sm font-medium">
                Admin
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                onClick={() => setIsBookingOpen(true)}
              >
                Book a demo
              </Button>
            </div>

            <button
              className="lg:hidden text-slate-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200">
              {menuItems.map((item) => (
                <MobileMenuItem key={item.id} item={item} />
              ))}
              <div className="px-4 py-4 space-y-2">
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
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  onClick={() => {
                    setIsBookingOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Book a demo
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