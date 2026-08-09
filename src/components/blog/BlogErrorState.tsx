import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { isSanityConfigured } from '../../lib/sanityClient';

interface BlogErrorStateProps {
  /** The error to display (optional — a default message is used when absent). */
  error?: Error | null;
  /** Called when the user clicks the retry button. */
  onRetry?: () => void;
  /** Context for the error message ('listing' | 'article'). Defaults to 'listing'. */
  context?: 'listing' | 'article';
}

/**
 * Accessible error state for blog fetching failures.
 * Distinguishes between a missing Sanity configuration and a network error.
 */
export function BlogErrorState({ error, onRetry, context = 'listing' }: BlogErrorStateProps) {
  const isConfigError = !isSanityConfigured;

  const heading = isConfigError
    ? 'Content management not yet connected'
    : context === 'article'
      ? 'Could not load this article'
      : 'Could not load stories';

  const message = isConfigError
    ? 'The Sanity CMS environment variables are not set. Add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file, then restart the development server.'
    : error?.message ?? 'Something went wrong while loading the content. Please check your connection and try again.';

  return (
    <section
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle size={28} className="text-red-500" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-bold text-brand-dark mb-3">{heading}</h2>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">{message}</p>

      {!isConfigError && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try again
        </button>
      )}
    </section>
  );
}
