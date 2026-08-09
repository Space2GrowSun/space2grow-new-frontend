import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string | null;
  publishedAt?: string;
  canonicalPath?: string;
}

export default function SEO({ title, description, ogImage, publishedAt, canonicalPath }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {canonicalPath && <link rel="canonical" href={canonicalPath} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage ? (
        <meta name="twitter:image" content={ogImage} />
      ) : (
        <meta name="twitter:card" content="summary_large_image" />
      )}
    </Helmet>
  );
}
