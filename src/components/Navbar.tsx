import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-4 md:py-6 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/logo.png" 
              alt="Space 2 Grow Logo" 
              className="w-[90px] md:w-[108px] h-auto object-contain"
            />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-dark">
          <Link to="/" className={`${isActive('/') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>Home</Link>
          <Link to="/about" className={`${isActive('/about') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>AboutUs</Link>
          <Link to="/blog" className={`${isActive('/blog') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>Blog</Link>
          <Link to="/get-involved" className={`${isActive('/get-involved') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>Get Involved</Link>
        </div>
        
        <div className="hidden md:block">
          <button className="bg-[#CDB4DB] hover:bg-opacity-90 text-brand-dark font-semibold py-2 px-6 rounded-full transition-all">
            Volunteer
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-brand-dark p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-6 md:hidden border-t z-50">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg ${isActive('/') ? 'font-bold text-brand-dark' : 'text-gray-600'}`}>Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg ${isActive('/about') ? 'font-bold text-brand-dark' : 'text-gray-600'}`}>AboutUs</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg ${isActive('/blog') ? 'font-bold text-brand-dark' : 'text-gray-600'}`}>Blog</Link>
          <Link to="/get-involved" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg ${isActive('/get-involved') ? 'font-bold text-brand-dark' : 'text-gray-600'}`}>Get Involved</Link>
          <button className="bg-[#CDB4DB] text-brand-dark font-semibold py-3 px-6 rounded-full w-full text-center mt-2">
            Volunteer
          </button>
        </div>
      )}
    </nav>
  );
}
