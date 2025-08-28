import { StrapiNewsResponse, StrapiNewsItem } from '@/types/strapi';
import { StrapiJobResponse, StrapiJobItem } from '@/types/job-real';
import { mapLocaleForStrapi } from '@/lib/locale-utils'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

class StrapiService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to Strapi server. Please ensure Strapi is running on http://localhost:1337');
      }
      throw error;
    }
  }

  // Get all news articles
  async getNews(params?: {
    page?: number;
    pageSize?: number;
    locale?: string;
    category?: string;
    search?: string;
  }): Promise<StrapiNewsResponse> {
    const searchParams = new URLSearchParams();
    
    // Always populate relations
    searchParams.append('populate', '*');
    
    // Add pagination
    if (params?.page) {
      searchParams.append('pagination[page]', params.page.toString());
    }
    if (params?.pageSize) {
      searchParams.append('pagination[pageSize]', params.pageSize.toString());
    }
    
    // Add locale filter
    if (params?.locale) {
      const strapiLocale = mapLocaleForStrapi(params.locale);
      searchParams.append('filters[locale][$eq]', strapiLocale);
    }
    
    // Add category filter
    if (params?.category) {
      searchParams.append('filters[category][documentId][$eq]', params.category);
    }
    
    // Add search filter
    if (params?.search) {
      searchParams.append('filters[$or][0][title][$containsi]', params.search);
      searchParams.append('filters[$or][1][content][$containsi]', params.search);
    }
    
    // Sort by publication date (newest first)
    searchParams.append('sort[0]', 'publishedAt:desc');

    const response = await this.fetchAPI(`/news?${searchParams.toString()}`);
    return response.json();
  }

  // Get single news article by slug
  async getNewsBySlug(slug: string, locale?: string): Promise<StrapiNewsItem | null> {
    const searchParams = new URLSearchParams();
    searchParams.append('populate', '*');
    searchParams.append('filters[slug][$eq]', slug);
    
    if (locale) {
      const strapiLocale = mapLocaleForStrapi(locale);
      searchParams.append('filters[locale][$eq]', strapiLocale);
    }

    try {
      const response = await this.fetchAPI(`/news?${searchParams.toString()}`);
      const data: StrapiNewsResponse = await response.json();
      
      return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error fetching news by slug:', error);
      return null;
    }
  }

  // Get single news article by ID
  async getNewsById(id: string): Promise<StrapiNewsItem | null> {
    try {
      const response = await this.fetchAPI(`/news/${id}?populate=*`);
      const data = await response.json();
      
      return data.data || null;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      return null;
    }
  }

  // Get featured/latest news (first 3)
  async getFeaturedNews(locale?: string): Promise<StrapiNewsItem[]> {
    const response = await this.getNews({
      pageSize: 3,
      locale,
    });
    
    return response.data;
  }

  // ==================== JOBS METHODS ====================
  
  // Get all jobs
  async getJobs(params?: {
    page?: number;
    pageSize?: number;
    locale?: string;
    category?: string;
    search?: string;
  }): Promise<StrapiJobResponse> {
    const searchParams = new URLSearchParams();
    
    // Always populate relations
    searchParams.append('populate', '*');
    
    // Add pagination
    if (params?.page) {
      searchParams.append('pagination[page]', params.page.toString());
    }
    if (params?.pageSize) {
      searchParams.append('pagination[pageSize]', params.pageSize.toString());
    }
    
    // Add locale filter
    if (params?.locale) {
      const strapiLocale = mapLocaleForStrapi(params.locale);
      searchParams.append('filters[locale][$eq]', strapiLocale);
    }
    
    // Add category filter
    if (params?.category) {
      searchParams.append('filters[category][documentId][$eq]', params.category);
    }
    
    // Add search filter - only search in title for jobs
    if (params?.search) {
      searchParams.append('filters[title][$containsi]', params.search);
    }
    
    // Sort by publication date (newest first)
    searchParams.append('sort[0]', 'publishedAt:desc');

    const response = await this.fetchAPI(`/jobs?${searchParams.toString()}`);
    return response.json();
  }

  // Get single job by slug
  async getJobBySlug(slug: string, locale?: string): Promise<StrapiJobItem | null> {
    const searchParams = new URLSearchParams();
    searchParams.append('populate', '*');
    searchParams.append('filters[slug][$eq]', slug);
    
    if (locale) {
      const strapiLocale = mapLocaleForStrapi(locale);
      searchParams.append('filters[locale][$eq]', strapiLocale);
    }

    try {
      const response = await this.fetchAPI(`/jobs?${searchParams.toString()}`);
      const data: StrapiJobResponse = await response.json();
      
      return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error fetching job by slug:', error);
      return null;
    }
  }

  // Get single job by ID
  async getJobById(id: string): Promise<StrapiJobItem | null> {
    try {
      const response = await this.fetchAPI(`/jobs/${id}?populate=*`);
      const data = await response.json();
      
      return data.data || null;
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      return null;
    }
  }
}

// Export singleton instance
export const strapiService = new StrapiService();
export default strapiService;