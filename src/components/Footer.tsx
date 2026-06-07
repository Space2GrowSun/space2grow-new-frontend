import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3">
            <img 
              src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/logo.png" 
              alt="A Space 2 Grow Logo" 
              className="w-12 h-auto object-contain brightness-0 invert"
            />
            A Space 2 Grow
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A volunteer-led community garden where staff, students, and local residents come together to grow, learn, and connect.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Featured Causes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Impact Report</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Community</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Newsletter Signup</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} A Space 2 Grow. All rights reserved.
      </div>
    </footer>
  );
}
