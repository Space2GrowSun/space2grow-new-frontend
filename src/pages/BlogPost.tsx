import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactPlayer from 'react-player';
import { allPosts } from '../data/posts';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center py-24">
        <SEO title="Post Not Found - A Space to Grow" description="The requested blog post could not be found." />
        <h1 className="text-4xl font-bold text-brand-dark mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The story you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="bg-brand-accent hover:bg-opacity-90 text-brand-dark font-medium py-3 px-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#f2db7b] focus:ring-offset-2">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SEO 
        title={`${post.title} - A Space to Grow`} 
        description={post.excerpt} 
      />
      <div className="pt-8 pb-24">
        {/* Back navigation */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-500 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Stories
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#E8F3E5] text-brand-dark text-xs font-bold tracking-wider rounded-md">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-bold text-brand-dark">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                )}
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
            
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar size={18} className="text-gray-400" />
              {post.date}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="rounded-[2rem] overflow-hidden aspect-[21/9] bg-gray-100 max-h-[600px]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg prose-green max-w-none 
                        prose-headings:text-brand-dark prose-headings:font-bold 
                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8
                        prose-a:text-[#356b60] hover:prose-a:text-[#2b6b60] prose-a:underline
                        prose-strong:text-brand-dark
                        markdown-body">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({node, ...props}) => {
                  const url = props.href;
                  if (url && ReactPlayer.canPlay(url)) {
                    return (
                      <span className="my-8 aspect-video w-full rounded-xl overflow-hidden shadow-lg relative bg-black not-prose block">
                        <ReactPlayer
                          src={url}
                          width="100%"
                          height="100%"
                          style={{ position: 'absolute', top: 0, left: 0 }}
                          controls
                        />
                      </span>
                    );
                  }
                  return <a {...props} target="_blank" rel="noopener noreferrer" />
                }
              }}
            >
              {post.content.replace(/\n\s*\n/g, '\n\n')}
            </Markdown>
          </div>
          
          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-bold text-brand-dark">Share this story:</span>
                <div className="flex gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E8F3E5] hover:text-[#356b60] transition-colors text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
              
              <Link to="/blog" className="bg-[#356b60] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-sm transition-all focus:outline-none">
                More Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
