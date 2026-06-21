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
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            A Space 2 Grow
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A volunteer-led community garden where staff, students, and local residents come together to grow, learn, and connect.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Stories & News</a></li>
            <li><a href="/get-involved" className="hover:text-white transition-colors">Get Involved</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Stay Connected</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="mailto:as2g.sunderland@gmail.com" className="hover:text-white transition-colors">Email: as2g.sunderland@gmail.com</a></li>
            <li><a href="https://facebook.com/aspace2grow" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook: @aspace2grow</a></li>
            <li><a href="https://linkedin.com/company/a-space-2-grow" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn: A Space 2 Grow</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-brand-accent">Location</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li>Next to St Peters church</li>
            <li>St Peter's Way</li>
            <li>Sunderland. SR6 0DY</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} A Space 2 Grow. All rights reserved.
      </div>
    </footer>
  );
}
