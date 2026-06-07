import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const categories = ['All Stories', 'Environment', 'Education', 'Health'];

const allPosts = [
  {
    title: "How one community garden changed an entire zip code's diet",
    category: "HEALTH",
    readTime: "5 MIN READ",
    excerpt: "Beyond just fresh vegetables, the Space2grow project fostered a new culture of nutrition and shared knowledge that reduced food insecurity by 40% in just two years.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/home-page/group-photo.png",
    author: {
      name: "Elena Rodriguez",
      role: "Project Lead, Urban Renewal",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    featured: true
  },
  {
    title: "Investing in the next generation of digital creators",
    category: "EDUCATION",
    readTime: "4 min read",
    excerpt: "",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    title: "The Clean Spring Initiative: A Year in Review",
    category: "ENVIRONMENT",
    readTime: "8 min read",
    excerpt: "",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    title: "Reforesting the Emerald Corridor",
    category: "ENVIRONMENT",
    readTime: "6 min read",
    excerpt: "",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
    }
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Stories');

  const filteredPosts = activeCategory === 'All Stories' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory.toUpperCase());

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(post => post !== featuredPost);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] mb-16">
        <img 
          src="https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/hero-section-tomatoes.png" 
          alt="Tomato plants" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
                Featured Story
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Stories from<br />the Field
              </h1>
              <p className="text-xl text-gray-200 mb-10 max-w-lg">
                Witness the transformative power of local action through the eyes of those leading the change in their own neighborhoods.
              </p>
              <button className="bg-brand-accent hover:bg-opacity-90 text-brand-dark font-semibold py-4 px-8 rounded-full transition-all flex items-center gap-2 group">
                Read the Journal 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-brand-dark text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post (if exists in filtered list) */}
        {featuredPost && (
          <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[2.5rem] overflow-hidden shadow-sm mb-12">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-full min-h-[400px] object-cover"
            />
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#E8F3E5] text-brand-dark text-xs font-bold tracking-wider rounded-md">
                  {featuredPost.category}
                </span>
                <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={featuredPost.author.avatar} 
                  alt={featuredPost.author.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-brand-dark text-sm">{featuredPost.author.name}</p>
                  {featuredPost.author.role && (
                    <p className="text-gray-500 text-xs">{featuredPost.author.role}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {regularPosts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[240px] border-none object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold tracking-wider rounded-md shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-dark mb-8 flex-grow">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-gray-600 font-medium text-sm">{post.author.name}</p>
                  </div>
                  <span className="text-gray-400 text-xs font-semibold">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pb-8">
          <button className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold py-3 px-10 rounded-full transition-colors">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
}
