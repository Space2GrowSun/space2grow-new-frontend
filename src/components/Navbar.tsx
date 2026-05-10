import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <Link to="/">
            <img 
              src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/logo.png" 
              alt="Space 2 Grow Logo" 
              className="w-[108px] h-[65px] object-contain"
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-dark">
        <Link to="/" className={`${isActive('/') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>Home</Link>
        <Link to="/about" className={`${isActive('/about') ? 'border-b-2 border-brand-dark pb-1' : 'text-gray-500 hover:text-brand-dark transition-colors'}`}>AboutUs</Link>
        <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">Blog</a>
        <a href="#" className="text-gray-500 hover:text-brand-dark transition-colors">Get Involved</a>
      </div>
      <button className="bg-[#CDB4DB] hover:bg-opacity-90 text-brand-dark font-semibold py-2 px-6 rounded-full transition-all">
        Volunteer
      </button>
    </nav>
  );
}
