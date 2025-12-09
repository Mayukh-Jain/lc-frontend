import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Activity, LineChart, Droplets, Home, MessageSquare, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/crop", icon: Sprout, label: "Crop" },
    { path: "/fertilizer", icon: Droplets, label: "Fertilizer" },
    { path: "/yield", icon: LineChart, label: "Yield" },
    { path: "/disease", icon: Activity, label: "Disease" },
    { path: "/chat", icon: MessageSquare, label: "AI Chat" },
  ];

  return (
    <nav className="bg-agriGreen p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:scale-105 transition">
          <Sprout size={32} />
          <span>LeafCompass</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.label}
                to={item.path} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-white text-agriGreen shadow-md' 
                    : 'text-green-100 hover:bg-green-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-green-800 rounded-lg p-2 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-white p-3 hover:bg-green-700 rounded-md"
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;