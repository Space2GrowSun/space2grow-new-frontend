import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allPosts } from '../data/posts';
import SEO from '../components/SEO';

const categories = ['All Stories', 'Events', 'Community', 'Environment', 'News'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Stories');

  const globalFeaturedPost = allPosts.find(post => post.featured) || allPosts[0];

  const filteredPosts = activeCategory === 'All Stories' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory.toUpperCase());

  return (
    <div className="w-full">
      <SEO 
        title="Blog & News - A Space to Grow" 
        description="Read our latest stories, event announcements, and community updates from A Space to Grow." 
      />
      {/* Hero Section */}
      <section className="relative w-full h-[600px] mb-16">
        <img 
          src={globalFeaturedPost.image} 
          alt={globalFeaturedPost.title} 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
                Featured Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {globalFeaturedPost.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg line-clamp-3">
                {globalFeaturedPost.excerpt}
              </p>
              <Link to={`/blog/${globalFeaturedPost.slug}`} className="bg-brand-accent hover:bg-opacity-90 text-brand-dark font-semibold py-4 px-8 rounded-full transition-all inline-flex items-center gap-2 group">
                Read the Story 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
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

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, idx) => (
            <Link to={`/blog/${post.slug}`} key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group translate-y-0 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[240px] border-none object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold tracking-wider rounded-md shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-dark mb-8 flex-grow group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <p className="text-gray-600 font-medium text-sm">{post.author.name}</p>
                  </div>
                  <span className="text-gray-400 text-xs font-semibold">{post.date}</span>
                </div>
              </div>
            </Link>
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
