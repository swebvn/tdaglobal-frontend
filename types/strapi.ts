import { decode } from 'he';

// Strapi Media Types
export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Strapi v5 Media Relation Types
export interface StrapiMediaData {
  id: number;
  attributes: StrapiMedia;
}

export interface StrapiMediaRelation {
  data: StrapiMediaData | null;
}

export interface StrapiMediaArrayRelation {
  data: StrapiMediaData[];
}

// Strapi Category Types
export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// Strapi News Types
export interface StrapiNewsAttributes {
  title: string;
  slug: string;
  content: string;
  category?: StrapiCategory | null;
  thumbnail?: StrapiMedia | null; // Direct object, not wrapped with data
  localizations: StrapiNewsItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiNewsItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  category?: StrapiCategory | null;
  thumbnail?: StrapiMedia | null; // Direct object, not wrapped with data
  localizations: StrapiNewsItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiNewsResponse {
  data: StrapiNewsItem[];
  meta: {
    pagination: StrapiPagination;
  };
}

// Helper function to get image URL for Strapi media
export function getStrapiImageUrl(
  media: StrapiMedia | undefined | null, 
  format: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string {
  if (!media) {
    return '/images/news1.jpg'; // fallback image
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  if (format === 'original') {
    return `${baseUrl}${media.url}`;
  }
  
  const formatImage = media.formats[format];
  if (formatImage) {
    return `${baseUrl}${formatImage.url}`;
  }
  
  // Fallback to original if format not available
  return `${baseUrl}${media.url}`;
}

// Helper function to extract plain text from HTML content
export function extractExcerpt(htmlContent: string, maxLength: number = 150): string {
  // Remove HTML tags
  let plainText = htmlContent.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities using 'he' library
  plainText = decode(plainText);
  
  // Remove extra whitespace and newlines
  plainText = plainText.replace(/\s+/g, ' ').trim();
  
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText;
}

// Helper function to extract HTML excerpt with formatting
export function extractHtmlExcerpt(htmlContent: string, maxLength: number = 200): string {
  // First, get plain text length to check if we need to truncate
  const plainText = htmlContent.replace(/<[^>]*>/g, '');
  const decodedText = decode(plainText);
  
  if (decodedText.length <= maxLength) {
    return htmlContent;
  }
  
  // If we need to truncate, find a good breaking point
  let truncated = '';
  let currentLength = 0;
  let insideTag = false;
  const tagStack: string[] = [];
  
  for (let i = 0; i < htmlContent.length; i++) {
    const char = htmlContent[i];
    
    if (char === '<') {
      insideTag = true;
      truncated += char;
    } else if (char === '>') {
      insideTag = false;
      truncated += char;
      
      // Track opening/closing tags
      const tagMatch = htmlContent.substring(truncated.lastIndexOf('<'), i + 1).match(/<\/?([a-zA-Z]+)/);
      if (tagMatch) {
        const tagName = tagMatch[1].toLowerCase();
        if (htmlContent[truncated.lastIndexOf('<') + 1] === '/') {
          // Closing tag
          tagStack.pop();
        } else if (!['br', 'img', 'hr'].includes(tagName)) {
          // Opening tag (not self-closing)
          tagStack.push(tagName);
        }
      }
    } else if (!insideTag) {
      truncated += char;
      currentLength++;
      
      if (currentLength >= maxLength) {
        break;
      }
    } else {
      truncated += char;
    }
  }
  
  // Close any remaining open tags
  while (tagStack.length > 0) {
    const tag = tagStack.pop();
    truncated += `</${tag}>`;
  }
  
  return truncated + '...';
}

// Helper function to get category name safely
export function getCategoryName(category?: StrapiCategory | null): string | null {
  if (!category) return null;
  if (typeof category === 'string') return category; // Backward compatibility
  return category.name || null;
}

// Helper functions for handling API responses
export function decodeHtmlEntities(text: string): string {
  return decode(text);
}