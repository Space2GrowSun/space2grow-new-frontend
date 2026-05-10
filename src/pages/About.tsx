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

      <div className="relative h-[600px]">
        {/* We can use placeholders or find suitable images since the design shows specific photos */}
        <img 
          src="https://picsum.photos/seed/about1/500/600" 
          alt="Hands planting seedling" 
          className="absolute top-0 right-0 w-[400px] h-[500px] object-cover rounded-3xl"
        />
        <img 
          src="https://picsum.photos/seed/about2/500/500" 
          alt="Volunteers in garden" 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] object-cover rounded-3xl border-8 border-[#FAF9F6]"
        />
        {/* Leaf decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white">
          {/* Using an emoji or icon as placeholder for the leaf decoration */}
          <span className="text-4xl">🍂</span>
        </div>
      </div>
    </section>
  );
}

function GroundedInHistory() {
  return (
    <section className="bg-[#F8F9F8] w-full py-24 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/about3/600/500" 
            alt="Garden path" 
            className="w-full h-[500px] object-cover rounded-3xl"
          />
          <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 bg-white p-8 rounded-3xl shadow-xl max-w-[280px]">
            <h4 className="text-xl font-bold text-brand-dark mb-2">Our Mission</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              To foster a space where history, nature, and community intertwine, offering a sanctuary for growth and reflection.
            </p>
          </div>
        </div>

        <div className="pl-0 md:pl-12">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
            Grounded in History,<br />Growing for Tomorrow.
          </h2>
          <p className="text-gray-700 mb-12 leading-relaxed text-lg">
            A Space 2 Grow is more than just a garden. It is a social ecosystem. We believe that by working the soil together, we don't just grow vegetables&mdash;we grow connections, resilience, and a deeper understanding of our shared heritage at the St Peters campus site.
          </p>

          <div className="flex gap-16 border-t border-gray-200 pt-8">
            <div>
              <p className="text-4xl font-black text-brand-dark mb-1">50+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Volunteers</p>
            </div>
            <div className="w-px bg-gray-300"></div>
            <div>
              <p className="text-4xl font-black text-brand-dark mb-1">7th C.</p>
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
      img: "https://picsum.photos/seed/kitchengarden/400/300",
      title: "The Kitchen Garden",
      text: "Where we cultivate seasonal vegetables and sustainable food sources. A place of labor, reward, and education on growing your own food."
    },
    {
      img: "https://picsum.photos/seed/herbgarden/400/300",
      title: "The Herb Garden",
      text: "A sensory explosion of aromas and healing properties. Dedicated to traditional medicinal and culinary herbs used through the centuries."
    },
    {
      img: "https://picsum.photos/seed/quietgarden/400/300",
      title: "The Quiet Garden",
      text: "For reflection and peace. A sanctuary away from urban noise, inviting visitors to sit, breathe, and enjoy the beauty of silence."
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
            <img src={pillar.img} alt={pillar.title} className="w-full h-56 object-cover" />
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-brand-dark mb-4">{pillar.title}</h3>
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
          <img src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/about-us/st-peters.png" alt="Monastery aerial" className="w-full h-48 object-cover rounded-xl" />
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
