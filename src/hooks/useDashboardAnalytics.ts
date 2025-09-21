import { useState, useEffect } from 'react';
import { dashboardApi, DashboardAnalytics } from '@/utils/api';

interface UseDashboardAnalyticsReturn {
  data: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardAnalytics = (): UseDashboardAnalyticsReturn => {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await dashboardApi.getAnalytics();
      
      if (response.error) {
        setError(response.error);
        setData(null);
      } else if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};

