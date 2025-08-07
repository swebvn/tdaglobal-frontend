import { useState, useEffect, useCallback } from 'react';
import { StrapiNewsItem, StrapiNewsResponse } from '@/types/strapi';
import { strapiService } from '@/services/strapi';

interface UseNewsParams {
  page?: number;
  pageSize?: number;
  locale?: string;
  category?: string | null;
  search?: string;
}

interface UseNewsReturn {
  news: StrapiNewsItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
  refetch: () => void;
}

export function useNews(params: UseNewsParams = {}): UseNewsReturn {
  const [news, setNews] = useState<StrapiNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseNewsReturn['pagination']>(null);

  // Destructure params để tránh dependency issues
  const { page, pageSize, locale, category, search } = params;

  const fetchNews = useCallback(async (append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: StrapiNewsResponse = await strapiService.getNews({
        page,
        pageSize,
        locale,
        category: category || undefined,
        search
      });
      
      if (append && page && page > 1) {
        // Append new data for "Load More"
        setNews(prevNews => [...prevNews, ...response.data]);
      } else {
        // Replace data for initial load or filter changes
        setNews(response.data);
      }
      
      setPagination(response.meta.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, locale, category, search]);

  useEffect(() => {
    const shouldAppend = !!(page && page > 1);
    fetchNews(shouldAppend);
  }, [fetchNews, page]);

  const refetch = useCallback(() => {
    fetchNews(false);
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    pagination,
    refetch,
  };
}

interface UseNewsItemParams {
  slug?: string;
  id?: string;
  locale?: string;
}

interface UseNewsItemReturn {
  newsItem: StrapiNewsItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useNewsItem(params: UseNewsItemParams): UseNewsItemReturn {
  const [newsItem, setNewsItem] = useState<StrapiNewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsItem = useCallback(async () => {
    if (!params.slug && !params.id) {
      setError('Either slug or id must be provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let item: StrapiNewsItem | null = null;
      
      if (params.slug) {
        item = await strapiService.getNewsBySlug(params.slug, params.locale);
      } else if (params.id) {
        item = await strapiService.getNewsById(params.id);
      }
      
      setNewsItem(item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news item');
      console.error('Error fetching news item:', err);
    } finally {
      setLoading(false);
    }
  }, [params.slug, params.id, params.locale]);

  useEffect(() => {
    fetchNewsItem();
  }, [fetchNewsItem]);

  return {
    newsItem,
    loading,
    error,
    refetch: fetchNewsItem,
  };
}

export function useFeaturedNews(locale?: string) {
  const [featuredNews, setFeaturedNews] = useState<StrapiNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const news = await strapiService.getFeaturedNews(locale);
      setFeaturedNews(news);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured news');
      console.error('Error fetching featured news:', err);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchFeaturedNews();
  }, [fetchFeaturedNews]);

  return {
    featuredNews,
    loading,
    error,
    refetch: fetchFeaturedNews,
  };
}