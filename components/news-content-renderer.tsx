import React from 'react';

interface NewsContentRendererProps {
  content: string;
  className?: string;
}

export default function NewsContentRenderer({ content, className = '' }: NewsContentRendererProps) {
  // Basic sanitization - remove potentially dangerous scripts
  const sanitizeContent = (htmlContent: string) => {
    // Remove script tags and other potentially dangerous elements
    return htmlContent
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers like onclick, onload, etc.
  };

  const sanitizedContent = sanitizeContent(content);

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: sanitizedContent 
      }}
      style={{
        // Ensure images are responsive
        '--prose-img': 'max-width: 100%; height: auto; border-radius: 8px;',
      } as React.CSSProperties}
    />
  );
}
