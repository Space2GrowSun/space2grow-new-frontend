import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

export default function GetInvolved() {
  return (
    <div className="w-full bg-[#fbfbfb]">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] mb-16">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/hero-section-tomatoes.png" 
          alt="Tomato plants" 
          className="absolute inset-0 w-full h-full object-cover"
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
              Monkwearmouth Site<br />
              Opposite University Campus<br />
              Sunderland, SR6 0AA
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[#f4f4f4] p-10 flex flex-col items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-6">
              <Phone className="text-[#2b6b60]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Phone</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              General Inquiries<br />
              +44 (0) 191 555 0123<br />
              Mon-Fri, 9am - 5pm
            </p>
          </div>

          {/* Email */}
          <div className="bg-[#f4f4f4] p-10 flex flex-col items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b2f0e8] rounded-full flex items-center justify-center mb-6">
              <Mail className="text-[#2b6b60]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Email</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              hello@verdantgrowth.org<br />
              volunteer@verdantgrowth.org<br />
              Response within 24h
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 md:p-16 border border-gray-200 rounded-sm mb-24 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Send a Message</h2>
          <p className="text-gray-600 text-sm mb-10">
            Fill out the form below and our team will get back to you within 24 business hours.
          </p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your first name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2b6b60] focus:ring-1 focus:ring-[#2b6b60] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your last name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2b6b60] focus:ring-1 focus:ring-[#2b6b60] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2b6b60] focus:ring-1 focus:ring-[#2b6b60] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">Subject</label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2b6b60] focus:ring-1 focus:ring-[#2b6b60] appearance-none bg-white text-gray-700">
                  <option>General Inquiry</option>
                  <option>Volunteering</option>
                  <option>Donations</option>
                  <option>Partnerships</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">Message</label>
              <textarea 
                placeholder="How can we help you?" 
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#2b6b60] focus:ring-1 focus:ring-[#2b6b60] bg-white resize-y"
              ></textarea>
            </div>

            <div>
              <button 
                type="button" 
                className="bg-[#356b60] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-sm transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Find Us Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-brand-dark mb-2">Find Us</h2>
            <p className="text-gray-600 text-sm">Visit our main hub and community greenhouse.</p>
          </div>
          <button className="flex items-center gap-2 border border-[#356b60] text-[#356b60] hover:bg-[#356b60] hover:text-white font-medium py-2.5 px-6 rounded-sm transition-all self-start md:self-auto">
            <Navigation size={18} />
            Get Directions
          </button>
        </div>

        {/* Map Placeholder Image */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
            alt="Map showing location" 
            className="w-full h-full object-cover"
          />
          {/* Stylized map pin overlay */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 drop-shadow-2xl">
            <div className="w-16 h-16 bg-[#356b60] rounded-full rounded-br-sm rotate-45 flex items-center justify-center border-4 border-white">
              <div className="-rotate-45">
                 <img src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/logo.png" alt="Logo pin" className="w-8 h-8 object-contain brightness-0 invert" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
