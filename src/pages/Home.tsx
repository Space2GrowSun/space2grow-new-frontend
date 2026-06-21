import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, TreePine, Bug, Flower2, ArrowRight, ArrowLeft, Leaf, BookOpen, Megaphone, Hammer, Users, Briefcase } from 'lucide-react';
import Divider from '../components/Divider';
import SEO from '../components/SEO';
import { allPosts } from '../data/posts';

function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-12 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f8d4c9] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 -z-10 translate-x-1/4 -translate-y-1/4"></div>

      <div className="max-w-xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-brand-dark leading-[1.1] mb-6">
          Cultivating the <span className="text-[#E3C9B6]">Space</span><br />for shared<br />growth.
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          A Space 2 Grow is a volunteer-led community garden beside St Peter's Church in Monkwearmouth where staff, students, and local residents come together to grow, learn, and connect.
        </p>
        <Link to="/get-involved" className="bg-brand-purple hover:bg-opacity-90 text-brand-dark font-semibold py-3 px-8 rounded-full transition-all text-lg inline-block">
          Volunteer
        </Link>
      </div>

      <div className="relative flex justify-center md:justify-end items-center isolate w-full md:w-[715px] mt-12 md:mt-0">
        {/* Temporary shadow image that you can replace */}
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/shadow-red-circles.png" 
          alt="Red Circles Shadows" 
          className="absolute top-4 right-0 md:top-8 md:-right-4 w-[110%] max-w-none md:max-w-[725px] h-auto object-contain -z-10 pointer-events-none rounded-3xl"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/group-photo.png" 
          alt="Group photo of volunteers" 
          className="w-[95%] md:w-[640px] flex-shrink-0 h-auto object-cover relative z-20 translate-x-0 md:translate-x-4 md:mr-[90px] rounded-3xl shadow-2xl"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

function HomeAbout() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-sm font-bold tracking-widest text-brand-dark uppercase mb-4">About Us</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight">
          A volunteer-led sanctuary in Sunderland
        </h2>
        <p className="text-gray-700 mb-10 leading-relaxed text-lg">
          Nestled in the heart of Monkwearmouth, A Space 2 Grow has transformed from a neglected plot into a thriving urban oasis. Since 2014, our community has worked hand-in-hand to nurture a space that offers more than just plants—it offers a sense of belonging.
        </p>
        
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          {[
            { icon: Leaf, label: "Kitchen garden" },
            { icon: Sprout, label: "Herb garden" },
            { icon: Flower2, label: "Quiet reflection garden" },
            { icon: TreePine, label: "Fruit trees" },
            { icon: Bug, label: "Honey bees" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-brand-dark" />
              <span className="font-medium text-brand-dark">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-12 md:mt-0">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/overlay-plus-shadow.png" 
          alt="Hands planting seedling" 
          className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl rounded-br-[100px]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute bottom-6 left-0 sm:left-[-2rem] bg-brand-dark text-white p-4 md:p-6 pr-8 md:pr-12 rounded-r-2xl shadow-xl">
          <p className="text-3xl md:text-4xl font-extrabold mb-1">10+ Years</p>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-300">Growth & Community</p>
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      <Link to="/get-involved" className="bg-[#F4F5F4] p-12 rounded-3xl relative overflow-hidden group hover:shadow-lg transition-all block">
        <h3 className="text-3xl font-extrabold text-brand-dark mb-4">Volunteer With Us</h3>
        <p className="text-gray-700 mb-8 max-w-sm text-lg relative z-10">
          Join our regular sessions to learn new gardening skills, meet the community, and help us maintain our green oasis.
        </p>
        <div className="flex items-center gap-2 font-bold text-brand-dark relative z-10">
          Get Involved <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
        <Users className="absolute -bottom-8 -right-8 w-48 h-48 text-[#E8EAE8] opacity-50 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
      </Link>

      <Link to="/get-involved" className="bg-[#E3C9B6] p-12 rounded-3xl relative overflow-hidden group hover:shadow-lg transition-all block">
        <h3 className="text-3xl font-extrabold text-brand-dark mb-4">Corporate Partners</h3>
        <p className="text-gray-800 mb-8 max-w-sm text-lg relative z-10">
          Looking for a meaningful team-building day? Partner with us to make a lasting impact on our community garden.
        </p>
        <div className="flex items-center gap-2 font-bold text-brand-dark relative z-10">
          Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
        <Briefcase className="absolute -bottom-4 -right-12 text-[#D2B5A0] w-56 h-56 opacity-40 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
      </Link>
    </section>
  );
}

function Blog() {
  // Get the 3 most recent posts to show on the homepage
  const recentPosts = allPosts.slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <p className="text-sm font-bold tracking-widest text-brand-dark uppercase mb-2 text-[#4A785A]">Our Blog</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark">Check out our recent stories...</h2>
        </div>
        <Link to="/blog" className="flex items-center gap-2 font-bold text-brand-dark hover:underline mt-4 md:mt-0">
          View all <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {recentPosts.map((post, idx) => (
          <Link to={`/blog/${post.slug}`} key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full group">
            <div className="overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-[234px] object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" loading="lazy" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">{post.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{post.excerpt}</p>
              <div className="w-full bg-brand-dark text-white py-3 rounded-full font-semibold group-hover:bg-opacity-90 transition-colors text-center">
                See More &gt;&gt;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function GrowWithUs() {
  const cards = [
    { icon: Leaf, title: "Gardening", text: "Join our planting days and maintain our diverse garden plots." },
    { icon: BookOpen, title: "Events & Education", text: "Lead workshops or help organize our seasonal festivals." },
    { icon: Megaphone, title: "Promotion & Fundraising", text: "Help us share our message and secure resources for the future." },
    { icon: Hammer, title: "Special Projects", text: "Bring your unique skills in carpentry, art, or beekeeping." },
  ];

  return (
    <section className="bg-brand-dark w-full py-20 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">How you can grow with us</h2>
        <p className="text-brand-light opacity-80 mb-12 text-lg">We are entirely volunteer-run. Your time and energy fuel our community mission.</p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-[#1A2F24] p-8 rounded-2xl text-white">
              <div className="w-12 h-12 bg-white text-brand-dark rounded-xl flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="opacity-80 leading-relaxed text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const galleryItems = [
  {
    img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/new-composting-bins-work.png",
    category: "Community • Composting",
    description: "Building new composting bins to enrich our garden soil."
  },
  {
    img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/voluteers-story.png",
    category: "Community • Volunteers",
    description: "Our dedicated team bringing life to the garden."
  },
  {
    img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/apples-work.png",
    category: "Harvest • Fruit Trees",
    description: "Enjoying the fresh, crisp harvest from our apple trees."
  },
  {
    img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/pots-work.png",
    category: "Planting • Seedlings",
    description: "Getting pots ready for the new spring seedlings."
  },
  {
    img: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/team-photo-work.png",
    category: "Community • Greenhouse",
    description: "The heartbeat of our garden: our wonderful team of volunteers."
  }
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const getPreviousIndex = () => (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const getNextIndex = () => (currentIndex + 1) % galleryItems.length;

  return (
    <section className="bg-brand-dark w-full pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Work</h2>
        <p className="text-brand-light opacity-60 tracking-[0.2em] text-xs uppercase font-semibold mb-16">
          A VISUAL JOURNEY THROUGH THE SEASONS AT A SPACE 2 GROW
        </p>

        <div className="relative flex items-center justify-center h-[400px] mb-8">
          <button 
            onClick={handlePrev}
            className="absolute left-4 z-30 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center w-full relative h-full">
            <AnimatePresence initial={false}>
              {/* Previous Image */}
              <motion.img
                key={`prev-${getPreviousIndex()}`}
                src={galleryItems[getPreviousIndex()].img}
                initial={{ opacity: 0, scale: 0.8, x: -100 }}
                animate={{ opacity: 0.4, scale: 0.9, x: -300 }}
                exit={{ opacity: 0, scale: 0.8, x: -500 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-[250px] h-[300px] object-cover rounded-2xl hidden md:block"
                referrerPolicy="no-referrer"
              />

              {/* Current Image */}
              <motion.img
                key={`current-${currentIndex}`}
                src={galleryItems[currentIndex].img}
                initial={{ opacity: 0, scale: 0.9, zIndex: 10 }}
                animate={{ opacity: 1, scale: 1, zIndex: 20 }}
                exit={{ opacity: 0, scale: 0.9, zIndex: 10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-full max-w-[600px] h-[400px] object-cover rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Next Image */}
              <motion.img
                key={`next-${getNextIndex()}`}
                src={galleryItems[getNextIndex()].img}
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 0.4, scale: 0.9, x: 300 }}
                exit={{ opacity: 0, scale: 0.8, x: 500 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-[250px] h-[300px] object-cover rounded-2xl hidden md:block"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-4 z-30 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors border border-white/20"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          key={`text-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white opacity-80 text-sm tracking-widest uppercase mb-2">
            {galleryItems[currentIndex].category}
          </p>
          <p className="text-white text-lg">
            {galleryItems[currentIndex].description}
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {galleryItems.map((item, idx) => (
            <img 
              key={idx}
              src={item.img} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 object-cover rounded-md cursor-pointer transition-all duration-300 ${
                idx === currentIndex 
                  ? "border-2 border-brand-accent opacity-100" 
                  : "opacity-40 hover:opacity-100"
              }`} 
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {galleryItems.map((_, idx) => (
            <div 
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "w-6 h-1 bg-brand-accent" 
                  : "w-1.5 h-1.5 bg-white/30 mt-[-1px]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FindUs() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
      <div className="bg-[#F4F5F4] p-12 rounded-3xl h-full flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold text-brand-dark mb-10">Find Us</h2>
        
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Address</h4>
          <p className="text-gray-700">Church St, Monkwearmouth<br />Sunderland, SR6 0DY</p>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Transport</h4>
          <p className="text-gray-700">5 minute walk from St Peter's Metro Station. Bus routes 9, 10, 11 stop nearby.</p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Parking</h4>
          <p className="text-gray-700">Limited on-site visitor parking. Additional street parking available on Church St.</p>
        </div>
      </div>
      
      <div className="h-full min-h-[400px]">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/aerial-photo-trees.png" 
          alt="Aerial view of forest" 
          className="w-full h-full object-cover rounded-3xl"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-12">
      <div className="bg-gradient-to-br from-[#2F4D3C] to-[#5C7D64] rounded-[40px] px-6 py-20 text-center text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight">
            A Space 2 Grow is more than a garden—it's a movement.
          </h2>
          <Link to="/get-involved" className="bg-brand-accent hover:bg-[#b0d453] text-brand-dark font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg inline-block">
            Get Involved Today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO 
        title="A Space to Grow - Home" 
        description="A Space 2 Grow is a volunteer-led community garden beside St Peter's Church in Monkwearmouth." 
      />
      <Hero />
      <Divider />
      <HomeAbout />
      <FeatureCards />
      <Blog />
      <GrowWithUs />
      <Gallery />
      <Divider flip />
      <FindUs />
      <CTA />
    </>
  );
}
