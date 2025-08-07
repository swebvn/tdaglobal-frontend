import { useState, useEffect, useCallback } from 'react';
import { StrapiJobItem } from '@/types/job';
import { jobService } from '@/services/job';

interface UseJobsParams {
  page?: number;
  pageSize?: number;
  locale?: string;
}

interface UseJobsReturn {
  jobs: StrapiJobItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  refetch: () => void;
}

export function useJobs(params: UseJobsParams = {}): UseJobsReturn {
  const [jobs, setJobs] = useState<StrapiJobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    pageCount: 1,
    total: 0,
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await jobService.getJobs(params);
      setJobs(response.data);
      setPagination(response.meta.pagination);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const refetch = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    pagination,
    refetch,
  };
}

interface UseJobParams {
  documentId?: string;
  slug?: string;
  locale?: string;
}

interface UseJobReturn {
  job: StrapiJobItem | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJob(params: UseJobParams): UseJobReturn {
  const [job, setJob] = useState<StrapiJobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    if (!params.documentId && !params.slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let response: StrapiJobItem | null = null;
      
      if (params.documentId) {
        response = await jobService.getJobById(params.documentId);
      } else if (params.slug) {
        response = await jobService.getJobBySlug(params.slug, params.locale);
      }
      
      setJob(response);
    } catch (err) {
      console.error('Error fetching job:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch job');
    } finally {
      setLoading(false);
    }
  }, [params.documentId, params.slug, params.locale]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const refetch = useCallback(() => {
    fetchJob();
  }, [fetchJob]);

  return {
    job,
    loading,
    error,
    refetch,
  };
}
