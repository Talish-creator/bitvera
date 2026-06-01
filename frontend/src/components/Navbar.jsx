import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Solutions', hasDropdown: true },
    { label: 'Services', hasDropdown: true },
    { label: 'Pricing', hasDropdown: false },
    { label: 'Industries', hasDropdown: false },
    { label: 'Knowledge Base', hasDropdown: true },
    { label: 'About Us', hasDropdown: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SE</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Systems Experts</span>
              <span className="text-xs text-slate-500">خبراء الأنظمة</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center space-x-1 text-slate-700 hover:text-cyan-600 transition-colors text-sm font-medium py-2">
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={16} />}
                </button>
              </div>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-slate-700 hover:text-cyan-600 transition-colors text-sm font-medium">
              English
            </button>
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white">
              Book a demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-between w-full px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown size={16} />}
              </button>
            ))}
            <div className="px-4 py-4 space-y-2">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white">
                Book a demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;