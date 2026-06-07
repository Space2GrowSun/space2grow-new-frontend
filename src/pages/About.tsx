import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

function AboutHero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-sm font-bold tracking-widest text-[#E37D6E] uppercase mb-4">Monkwearmouth Monastery site</p>
        <h1 className="text-6xl md:text-8xl font-black text-brand-dark mb-6 leading-none">
          About<br />Us.
        </h1>
        <p className="text-gray-700 mb-10 leading-relaxed text-lg max-w-md">
          At the historic Monkwearmouth Monastery site, a group of dedicated volunteers has transformed the earth into A Space 2 Grow&mdash;a community haven of quiet beauty near the heart of Sunderland.
        </p>
        <button className="bg-[#1A2F24] hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all text-md flex items-center gap-2">
          Visit The Garden <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full mt-8 md:mt-0">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/about-header-2.png" 
          alt="Entrance Photo" 
          className="absolute top-0 right-0 w-[75%] md:w-[400px] h-auto object-contain rounded-2xl md:rounded-3xl shadow-lg"
        />
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/historical-site.png" 
          alt="Garden photo with flowerbeds" 
          className="absolute bottom-0 left-0 w-[75%] md:w-[480px] h-auto md:h-[360px] aspect-[4/3] object-cover rounded-2xl md:rounded-3xl border-4 md:border-8 border-[#FAF9F6] z-10"
        />
        {/* Leaf decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-12px] ml-[30px] bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white z-20">
          <span className="text-3xl md:text-4xl">🍂</span>
        </div>
      </div>
    </section>
  );
}

function GroundedInHistory() {
  return (
    <section className="bg-[#F8F9F8] w-full py-24 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative mb-12 md:mb-0">
          <img 
            src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/grounded-history.png" 
            alt="Garden path" 
            className="w-full h-auto aspect-[4/3] object-cover rounded-3xl relative z-0"
          />
          <div className="absolute -bottom-6 left-4 right-4 md:left-auto md:-bottom-0 md:right-0 md:translate-y-1/4 md:translate-x-1/4 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl max-w-none md:max-w-[280px] z-10">
            <h4 className="text-xl font-bold text-brand-dark mb-2">Our Mission</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              To foster a space where history, nature, and community intertwine, offering a sanctuary for growth and reflection.
            </p>
          </div>
        </div>

        <div className="pl-0 md:pl-12 pt-8 md:pt-0">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
            Grounded in History,<br />Growing for Tomorrow.
          </h2>
          <p className="text-gray-700 mb-12 leading-relaxed text-lg">
            A Space 2 Grow is more than just a garden. It is a social ecosystem. We believe that by working the soil together, we don't just grow vegetables&mdash;we grow connections, resilience, and a deeper understanding of our shared heritage at the St Peters campus site.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-16 border-t border-gray-200 pt-8">
            <div className="text-center sm:text-left">
              <p className="text-4xl md:text-4xl font-black text-brand-dark mb-1">50+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Volunteers</p>
            </div>
            <div className="hidden sm:block w-px bg-gray-300"></div>
            <div className="text-center sm:text-left">
              <p className="text-4xl md:text-4xl font-black text-brand-dark mb-1">7th C.</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Historical Roots</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreePillars() {
  const pillars = [
    {
      img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/pilar-gardening.png",
      title: "Gardening",
      text: "Get your hands dirty and learn about sustainable food sources. From seasonal vegetables to beautiful flowers, our garden is an educational space for cultivation and growth."
    },
    {
      img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/pilar-community.png",
      title: "Community",
      text: "A vibrant, welcoming space where volunteers, students, and locals connect. We believe the strongest roots we put down are the relationships we build by working the soil together."
    },
    {
      img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/pilar-relaxation.png",
      title: "Relaxation",
      text: "A peaceful sanctuary away from the urban noise. Specially designed for quiet reflection, inviting visitors to sit, breathe, and enjoy the calming beauty of nature."
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">The Three Pillars</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our garden is divided into three intentional zones, each serving a unique purpose for the community and the soul.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full border border-gray-100 flex flex-col">
            <img src={pillar.img} alt={pillar.title} className="w-full h-auto aspect-[4/3] object-cover" />
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-brand-dark mb-2 md:mb-4">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">{pillar.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "What is A Space 2 Grow?",
      answer: "A group of volunteers that have worked together to create a community garden near the centre of Sunderland. It is a place of quiet beauty and also a place to garden, grow veg and meet others."
    },
    {
      question: "Can I help out or get involved?",
      answer: "Yes – we have regular volunteer sessions at weekends and sometimes during the week. For updates see our facebook page."
    },
    {
      question: "What can I do there?",
      answer: (
        <div>
          <p className="mb-4">Lots or just relax and enjoy the space! Just come and enjoy the garden or come for a natter – we are a social bunch.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="text-[#E37D6E]">✓</span> Learn about gardening and growing veg and herbs.</li>
            <li className="flex items-center gap-2"><span className="text-[#E37D6E]">✓</span> Help with watering, planting and sowing.</li>
            <li className="flex items-center gap-2"><span className="text-[#E37D6E]">✓</span> Help us run volunteer sessions or raise money.</li>
            <li className="flex items-center gap-2"><span className="text-[#E37D6E]">✓</span> Help with running activities for groups.</li>
          </ul>
        </div>
      )
    },
    {
      question: "Where is it?",
      answer: (
        <div>
          <p className="mb-6">Next to St Peters church, opposite the University of Sunderland's St Peters campus. This is a very special site as it's history goes back to the 7th century when Benedict Biscop set up a monastery here.</p>
          <img src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/st-peters.png" alt="Monastery aerial" className="w-full h-64 object-cover object-[center_80%] rounded-xl" />
        </div>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F8F9F8] w-full py-24">
      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-[#E37D6E] w-12"></div>
          <h2 className="text-2xl font-black text-brand-dark tracking-widest uppercase">Everything you need to know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button 
                className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-brand-dark"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
                {openIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {openIndex === idx && (
                <div className="px-8 pb-6 text-gray-600 text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="bg-white rounded-[40px] px-6 py-24 text-center shadow-xl border border-gray-100 relative overflow-hidden">
        {/* Decorative subtle background elements */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f8d4c9] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-brand-dark mb-6 leading-tight">
            Ready to get<br />your hands dirty?
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            We are always looking for new friends, skills, and stories. Join us next weekend for our open volunteer session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#1A2F24] hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all text-sm border border-[#1A2F24]">
              Join the Volunteers
            </button>
            <button className="bg-white hover:bg-gray-50 text-brand-dark font-semibold py-3 px-8 rounded-full transition-all text-sm border border-gray-300 shadow-sm">
              Follow on Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <GroundedInHistory />
      <ThreePillars />
      <FAQ />
      <CTASection />
    </>
  );
}
