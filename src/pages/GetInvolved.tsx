import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import SEO from '../components/SEO';

export default function GetInvolved() {
  return (
    <div className="w-full bg-[#fbfbfb]">
      <SEO 
        title="Get Involved - A Space to Grow" 
        description="Join our community garden in Monkwearmouth. Find out how to volunteer, donate, and participate." 
      />
      {/* Hero Section */}
      <section className="relative w-full h-[400px] mb-16">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/hero-section-tomatoes.png" 
          alt="Tomato plants" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-brand-dark/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white relative z-10 text-center">
            Get Involved
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Location */}
          <div className="bg-[#f4f4f4] p-10 flex flex-col items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-6">
              <MapPin className="text-[#2b6b60]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Location</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Next to St Peters church<br />
              St Peter's Way<br />
              Sunderland. SR6 0DY
            </p>
          </div>

          {/* Connect */}
          <div className="bg-[#f4f4f4] p-10 flex flex-col items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-6">
              <Phone className="text-[#2b6b60]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Social</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Facebook: @aspace2grow<br />
              LinkedIn: A Space 2 Grow
            </p>
          </div>

          {/* Email */}
          <div className="bg-[#f4f4f4] p-10 flex flex-col items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-6">
              <Mail className="text-[#2b6b60]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Email</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              as2g.sunderland@gmail.com<br />
              sustainability@sunderland.ac.uk<br />
              Response within 24h
            </p>
          </div>
        </div>

        {/* Contact Us Directly */}
        <div className="bg-white p-10 md:p-16 border border-gray-200 rounded-sm mb-24 max-w-4xl mx-auto shadow-sm text-center flex flex-col items-center relative overflow-hidden">
          <div className="w-20 h-20 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-8 relative z-10">
            <Mail className="text-[#356b60]" size={40} />
          </div>
          <h2 className="text-4xl font-bold text-brand-dark mb-6 relative z-10">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl relative z-10">
            Whether you'd like to partner with Space 2 Grow, volunteer, donate, or get involved in any way, we would love to hear from you. Please email us directly and we'll get back to you as soon as possible.
          </p>
          <a 
            href="mailto:as2g.sunderland@gmail.com"
            className="bg-[#356b60] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-sm transition-all inline-flex items-center gap-2 relative z-10"
          >
            <Mail size={18} />
            Send us an Email
          </a>
        </div>

        {/* Find Us Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-2">Find Us</h2>
            <p className="text-gray-600 text-sm">Visit our main hub and community greenhouse.</p>
          </div>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=54.9134968696855,-1.3740604984662772" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-[#356b60] text-[#356b60] hover:bg-[#356b60] hover:text-white font-medium py-2.5 px-6 rounded-sm transition-all self-start md:self-auto"
          >
            <Navigation size={18} />
            Get Directions
          </a>
        </div>

        {/* Interactive Map via iframe */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative shadow-md">
          <iframe 
            src="https://maps.google.com/maps?q=54.9134968696855,-1.3740604984662772+(A%20Space%202%20Grow)&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
