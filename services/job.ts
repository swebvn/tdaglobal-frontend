import { StrapiJobResponse, StrapiJobDetailResponse, StrapiJobItem } from '@/types/job';
import { mapLocaleForStrapi } from '@/lib/locale-utils';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

class JobService {
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

  // Get all jobs
  async getJobs(params?: {
    page?: number;
    pageSize?: number;
    locale?: string;
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
    
    // Sort by publication date (newest first)
    searchParams.append('sort[0]', 'publishedAt:desc');

    const response = await this.fetchAPI(`/jobs?${searchParams.toString()}`);
    return response.json();
  }

  // Get single job by documentId
  async getJobById(documentId: string): Promise<StrapiJobItem | null> {
    try {
      const response = await this.fetchAPI(`/jobs/${documentId}?populate=*`);
      const data: StrapiJobDetailResponse = await response.json();
      
      return data.data || null;
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      return null;
    }
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

  // Get featured jobs (first 3)
  async getFeaturedJobs(locale?: string): Promise<StrapiJobItem[]> {
    const response = await this.getJobs({
      pageSize: 3,
      locale,
    });
    
    return response.data;
  }
}

// Export singleton instance
export const jobService = new JobService();
export default jobService;
